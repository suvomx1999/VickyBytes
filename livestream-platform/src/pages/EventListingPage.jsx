import { useCallback, useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import ShareToast from '../components/ShareToast'
import events from '../data/events'
import useEventFilters from '../hooks/useEventFilters'

const filterOptions = [
  { label: 'All', icon: '🌐' },
  { label: 'Live Now', icon: null },
  { label: 'Gaming', icon: '🎮' },
  { label: 'Music', icon: '🎵' },
  { label: 'Sports', icon: '⚽' },
  { label: 'Tech', icon: '💻' },
  { label: 'Art', icon: '🎨' },
]

function EventListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const filteredEvents = useEventFilters(events, searchQuery, activeFilter)
  const liveCount = events.filter((event) => event.isLive).length
  const categoryCount = new Set(events.map((event) => event.category)).size
  const featuredEvent = events.find((event) => event.isLive) || events[0]

  const handleShare = useCallback((message) => {
    setToastMessage(message)
    setToastVisible(true)
  }, [])

  const handleCloseToast = useCallback(() => {
    setToastVisible(false)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Navbar logic: hide when scrolling down past 100px, show when scrolling up
          if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            setShowNavbar(false)
          } else {
            setShowNavbar(true)
          }

          setLastScrollY(currentScrollY)
          setShowScrollTop(currentScrollY > 500)
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pb-0">
      {/* ───── Header ───── */}
      <header
        className={`sticky top-0 z-30 border-b border-slate-800/50 bg-slate-950/60 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <Logo size="md" />
            <div>
              <div className="text-xl font-bold tracking-wide text-white sm:text-2xl">
                LiveScape
              </div>
              <p className="hidden text-xs text-slate-400 sm:block">
                Curated live events &amp; streams
              </p>
            </div>
          </div>

          {/* Search Bar */}
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
                id="search-events"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search events, streamers, or themes..."
                className="h-11 w-full rounded-2xl border border-slate-700/80 bg-slate-900/80 pl-11 pr-10 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-slate-900 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-white"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </label>
          </div>

          {/* Badge */}
          <div className="order-2 ml-auto flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400 sm:order-3">
            <span className="hidden lg:inline">Live Event Streaming</span>
            <span className="relative flex h-2 w-2 lg:hidden">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filterOptions.map(({ label, icon }) => {
              const isActive = activeFilter === label

              return (
                <button
                  key={label}
                  id={`filter-${label.toLowerCase().replace(/\s/g, '-')}`}
                  type="button"
                  onClick={() => setActiveFilter(label)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-200 shadow-lg shadow-cyan-500/5'
                      : 'border-slate-700/80 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {label === 'Live Now' ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    </span>
                  ) : icon ? (
                    <span className="text-sm">{icon}</span>
                  ) : null}
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* ───── Hero Section ───── */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/85 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.10),transparent_35%)]" />
          {/* Animated orbs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange-500/8 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

          <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                {liveCount} Live now
              </div>

              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Discover streams that feel{' '}
                  <span className="gradient-text">active, curated, and worth opening.</span>
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300/90 sm:text-base">
                  Browse live events across gaming, music, sports, tech, and art — with a cleaner,
                  more immersive interface built for fast scanning and easy watching.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 px-5 py-3.5 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Events</p>
                  <p className="mt-1 text-2xl font-bold text-white">{events.length}</p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 px-5 py-3.5 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Categories</p>
                  <p className="mt-1 text-2xl font-bold text-white">{categoryCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/60 px-5 py-3.5 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Showing</p>
                  <p className="mt-1 text-2xl font-bold text-white">{filteredEvents.length}</p>
                </div>
              </div>
            </div>

            {/* Featured Event Card */}
            {featuredEvent ? (
              <div className="group/featured relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-xl shadow-black/15 transition-transform duration-300 hover:-translate-y-1">
                <img
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  className="h-56 w-full object-cover opacity-70 transition-all duration-500 group-hover/featured:scale-105 group-hover/featured:opacity-80 sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-200">
                    <span className="live-badge inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 font-semibold text-white">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      Featured
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 backdrop-blur-sm">{featuredEvent.category}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
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

        {/* ───── Browse Section Header ───── */}
        <section className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Browse events</h2>
            <p className="mt-1 text-sm text-slate-400">
              Narrow the feed with live and category filters.
            </p>
          </div>
          <p className="hidden text-sm text-slate-400 sm:block">
            {filteredEvents.length} result{filteredEvents.length === 1 ? '' : 's'}
          </p>
        </section>

        {/* ───── Event Grid ───── */}
        <section className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                animationDelay={index * 60}
                onShare={handleShare}
              />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-12 text-center shadow-xl shadow-black/15">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl">
                  🔎
                </div>
                <h3 className="mt-5 text-2xl font-bold text-white">No events found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-300">
                  Try another keyword or switch to a different filter to find the stream you're
                  looking for.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveFilter('All')
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  Clear all filters
                </button>
              </section>
            </div>
          )}
        </section>
      </main>

      {/* ───── Footer ───── */}
      <Footer />

      {/* ───── Share Toast ───── */}
      <ShareToast message={toastMessage} isVisible={toastVisible} onClose={handleCloseToast} />

      {/* ───── Scroll to Top ───── */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''} flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-300 shadow-xl shadow-black/30 backdrop-blur-lg transition-colors hover:border-cyan-400/50 hover:text-white`}
        aria-label="Scroll to top"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path d="M12 19V5m0 0-7 7m7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default EventListingPage