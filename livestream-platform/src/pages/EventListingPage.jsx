import { useState } from 'react'
import EventCard from '../components/EventCard'
import events from '../data/events'
import useEventFilters from '../hooks/useEventFilters'

const filterOptions = ['All', 'Live Now', 'Gaming', 'Music', 'Sports', 'Tech', 'Art']

function EventListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const filteredEvents = useEventFilters(events, searchQuery, activeFilter)
  const liveCount = events.filter((event) => event.isLive).length
  const categoryCount = new Set(events.map((event) => event.category)).size
  const featuredEvent = events.find((event) => event.isLive) || events[0]

  return (
    <div className="pb-12">
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              LS
            </div>
            <div>
              <div className="text-xl font-bold tracking-wide text-white sm:text-2xl">LiveScape</div>
              <p className="text-xs text-slate-400">Curated live events, streams, and chat</p>
            </div>
          </div>

          <div className="order-3 w-full sm:order-2 sm:flex-1">
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M21 21l-4.4-4.4m1.4-5.1a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search events, streamers, or themes..."
                className="h-11 w-full rounded-2xl border border-slate-700 bg-slate-900/90 pl-11 pr-4 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:bg-slate-900"
              />
            </label>
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
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.12),transparent_30%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Live now {liveCount}
              </div>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Discover streams that feel active, curated, and worth opening.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Browse live events across gaming, music, sports, tech, and art with a cleaner,
                  more immersive interface built for fast scanning and easy watching.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/75 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Events</p>
                  <p className="mt-1 text-xl font-bold text-white">{events.length}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/75 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Categories</p>
                  <p className="mt-1 text-xl font-bold text-white">{categoryCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/75 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Filtered</p>
                  <p className="mt-1 text-xl font-bold text-white">{filteredEvents.length}</p>
                </div>
              </div>
            </div>

            {featuredEvent ? (
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80">
                <img
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  className="h-56 w-full object-cover opacity-75 sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-200">
                    <span className="rounded-full bg-red-500 px-2.5 py-1 font-semibold text-white">
                      Featured live
                    </span>
                    <span>{featuredEvent.category}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {featuredEvent.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {featuredEvent.streamer} · {featuredEvent.viewerCount.toLocaleString()} viewers
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Browse events</h2>
            <p className="mt-1 text-sm text-slate-400">
              Narrow the feed with live and category filters.
            </p>
          </div>
          <p className="hidden text-sm text-slate-400 sm:block">
            {filteredEvents.length} result{filteredEvents.length === 1 ? '' : 's'}
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} animationDelay={index * 50} />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3">
              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 text-center shadow-xl shadow-black/15">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl">
                  🔎
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">No events found</h3>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-300">
                  Try another keyword or switch to a different filter to find the stream you’re looking for.
                </p>
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default EventListingPage