import { useEffect, useState } from 'react'

const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY
const CACHE_KEY = 'livescape_youtube_video_cache_v1'
const inMemoryCache = {}

function buildQuery(event) {
  return `${event.title} ${event.category} live stream`
}

function mapSearchItemToVideo(item) {
  const videoId = item?.id?.videoId
  if (!videoId) {
    return null
  }

  return {
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelTitle: item?.snippet?.channelTitle || '',
    title: item?.snippet?.title || '',
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // Ignore quota/storage errors; the app still works without cache.
  }
}

function useYoutubeEventVideos(events) {
  const [videoMap, setVideoMap] = useState({})
  const [loading, setLoading] = useState(false)
  const eventIdsKey = (events || []).map((event) => event.id).join(',')

  useEffect(() => {
    let isMounted = true

    const loadVideos = async () => {
      if (!youtubeApiKey || !Array.isArray(events) || events.length === 0) {
        return
      }

      const cache = { ...readCache(), ...inMemoryCache }
      const nextMap = {}
      const pendingEvents = []

      events.forEach((event) => {
        const cached = cache[event.id]
        if (cached?.embedUrl && cached?.thumbnailUrl) {
          nextMap[event.id] = cached
        } else {
          pendingEvents.push(event)
        }
      })

      if (isMounted) {
        setVideoMap(nextMap)
      }

      if (pendingEvents.length === 0) {
        return
      }

      setLoading(true)

      const requests = pendingEvents.map(async (event) => {
        const query = encodeURIComponent(buildQuery(event))
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${youtubeApiKey}`

        try {
          const response = await fetch(url)
          if (!response.ok) {
            return [event.id, null]
          }

          const payload = await response.json()
          const video = mapSearchItemToVideo(payload?.items?.[0])
          return [event.id, video]
        } catch {
          return [event.id, null]
        }
      })

      const results = await Promise.all(requests)
      const freshMap = {}
      const freshCache = { ...cache }

      results.forEach(([eventId, video]) => {
        if (video) {
          freshMap[eventId] = video
          freshCache[eventId] = video
          inMemoryCache[eventId] = video
        }
      })

      writeCache(freshCache)

      if (isMounted) {
        setVideoMap((current) => ({ ...current, ...freshMap }))
        setLoading(false)
      }
    }

    loadVideos()

    return () => {
      isMounted = false
    }
  }, [eventIdsKey, events])

  return { videoMap, loading, hasApiKey: Boolean(youtubeApiKey) }
}

export default useYoutubeEventVideos