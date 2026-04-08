import { useState } from 'react'
import EventCard from '../components/EventCard'
import events from '../data/events'
import useEventFilters from '../hooks/useEventFilters'
import useYoutubeEventVideos from '../hooks/useYoutubeEventVideos'

const filterOptions = ['All', 'Live Now', 'Gaming', 'Music', 'Sports', 'Tech', 'Art']

function EventListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const { videoMap } = useYoutubeEventVideos(events)

  const enrichedEvents = events.map((event) => {
    const youtubeVideo = videoMap[event.id]

    return {
      ...event,
      fallbackImageUrl: event.imageUrl,
      imageUrl: youtubeVideo?.thumbnailUrl || event.imageUrl,
      videoUrl: youtubeVideo?.embedUrl || event.videoUrl,
    }
  })

  const filteredEvents = useEventFilters(enrichedEvents, searchQuery, activeFilter)

  return (
    <div className="pb-10">
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0 shrink-0 text-xl font-bold tracking-wide text-white sm:text-2xl">
            LiveScape
          </div>

          <div className="order-3 w-full sm:order-2 sm:flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search events by title..."
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          <div className="order-2 ml-auto text-xs font-medium uppercase tracking-widest text-slate-400 sm:order-3">
            Live Event Streaming
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 flex-nowrap no-scrollbar">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
                      : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {filter === 'Live Now' ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </span>
                  ) : null}
                  {filter}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {filteredEvents.length > 0 ? (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} animationDelay={index * 50} />
            ))}
          </section>
        ) : (
          <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
            <h2 className="text-2xl font-semibold text-white">No events found</h2>
            <p className="mt-2 text-slate-300">
              Try a different search term or choose another filter.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default EventListingPage