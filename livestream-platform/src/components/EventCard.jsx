import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categoryColors = {
  Gaming: { border: 'border-purple-500/30', bg: 'bg-purple-500/15', text: 'text-purple-200', glow: 'group-hover:shadow-purple-500/5' },
  Music: { border: 'border-pink-500/30', bg: 'bg-pink-500/15', text: 'text-pink-200', glow: 'group-hover:shadow-pink-500/5' },
  Sports: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/15', text: 'text-emerald-200', glow: 'group-hover:shadow-emerald-500/5' },
  Tech: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/15', text: 'text-cyan-200', glow: 'group-hover:shadow-cyan-500/5' },
  Art: { border: 'border-amber-500/30', bg: 'bg-amber-500/15', text: 'text-amber-200', glow: 'group-hover:shadow-amber-500/5' },
}

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

function EventCard({ event, animationDelay = 0, onShare }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [isPopping, setIsPopping] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const colors = categoryColors[event.category] || categoryColors.Tech

  const handleLikeClick = () => {
    setLiked((current) => !current)
    setIsPopping(true)
    setTimeout(() => setIsPopping(false), 280)
  }

  const handleShareClick = () => {
    if (onShare) {
      onShare(`"${event.title}" link copied!`)
    }
  }

  return (
    <article
      className={`card-hover group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-b from-slate-900/90 to-slate-950/95 shadow-lg shadow-black/20 backdrop-blur-sm animate-cardIn ${colors.glow}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Subtle gradient border on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(168,85,247,0.08), rgba(249,115,22,0.08))',
        }}
      />

      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%]" />
        )}
        <img
          src={event.imageUrl}
          alt={event.title}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Top badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex items-center gap-2">
            {event.isLive ? (
              <span className="live-badge inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Live
              </span>
            ) : null}
            <span
              className={`rounded-full ${colors.border} ${colors.bg} px-2.5 py-1 text-xs font-semibold ${colors.text} backdrop-blur-sm`}
            >
              {event.category}
            </span>
          </div>

          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
            👁 {event.viewerCount.toLocaleString()}
          </div>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 pt-14">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Streaming by
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-white">
                {event.streamer}
              </p>
            </div>
            <div className="shrink-0 text-right text-xs">
              <p className="font-medium text-slate-200">{event.date}</p>
              <p className="text-slate-400">{event.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative space-y-4 p-5">
        <h3 className="min-h-[3.25rem] text-lg font-bold leading-snug text-white [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700/50 bg-slate-800/40 px-2.5 py-1 text-[11px] text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLikeClick}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                liked
                  ? 'border-red-500/50 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/10'
                  : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-400'
              } ${isPopping ? 'scale-125' : 'scale-100'}`}
              aria-label={liked ? 'Unlike event' : 'Like event'}
            >
              <HeartIcon filled={liked} />
            </button>

            <button
              type="button"
              onClick={handleShareClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
              aria-label="Share event"
            >
              <ShareIcon />
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/event/${event.id}`)}
            className="watch-btn relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/15 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 sm:ml-auto"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default EventCard