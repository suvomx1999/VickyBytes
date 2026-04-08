import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={filled ? 'currentColor' : 'none'}>
      <path
        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.08A6.01 6.01 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M16 8 8 12l8 4M18 6a2 2 0 1 1 0 .01V6ZM6 14a2 2 0 1 1 0 .01V14Zm12 4a2 2 0 1 1 0 .01V18Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EventCard({ event, animationDelay = 0 }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [isPopping, setIsPopping] = useState(false)
  const [imageSrc, setImageSrc] = useState(event.imageUrl)

  useEffect(() => {
    setImageSrc(event.imageUrl)
  }, [event.imageUrl])

  const handleLikeClick = () => {
    setLiked((current) => !current)
    setIsPopping(true)
    setTimeout(() => setIsPopping(false), 180)
  }

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/90 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-black/35 animate-cardIn"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageSrc(event.imageUrl)}
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex items-center gap-2">
            {event.isLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Live
              </span>
            ) : null}
            <span className="rounded-full border border-slate-200/20 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm">
              {event.category}
            </span>
          </div>

          <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm">
            {event.viewerCount.toLocaleString()} watching
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent p-4 pt-12">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">Now streaming</p>
              <p className="mt-1 truncate text-sm font-semibold text-white">{event.streamer}</p>
            </div>
            <div className="text-right text-xs text-slate-300">
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <h3 className="min-h-[3.5rem] text-lg font-semibold leading-6 text-white [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
            {event.tags[0]}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
            {event.tags[1]}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
            {event.viewerCount.toLocaleString()} viewers
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleLikeClick}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-all duration-200 hover:border-red-400 hover:text-red-400 ${
                isPopping ? 'scale-125' : 'scale-100'
              } ${liked ? 'border-red-500/70 text-red-500' : ''}`}
              aria-label={liked ? 'Unlike event' : 'Like event'}
            >
              <HeartIcon filled={liked} />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-300"
              aria-label="Share event"
            >
              <ShareIcon />
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/event/${event.id}`)}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-200 hover:brightness-110 sm:ml-auto"
          >
            Watch Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default EventCard