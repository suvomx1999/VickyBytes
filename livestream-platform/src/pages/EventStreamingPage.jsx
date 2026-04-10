import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import events from '../data/events'

/* ───────────────────────── Chat data ───────────────────────── */

const seedMessages = [
  { id: 'seed-1', username: 'Ari', text: 'This intro shot is incredible.', timestamp: '10:01' },
  { id: 'seed-2', username: 'Niko', text: 'Audio mix is super clean today!', timestamp: '10:02' },
  { id: 'seed-3', username: 'Mei', text: 'Can we get a replay on that part?', timestamp: '10:02' },
  { id: 'seed-4', username: 'Jules', text: 'Chat is moving fast right now.', timestamp: '10:03' },
  { id: 'seed-5', username: 'Ivy', text: 'Production quality keeps getting better.', timestamp: '10:03' },
  { id: 'seed-6', username: 'Rex', text: 'The streamer timing is so good.', timestamp: '10:04' },
  { id: 'seed-7', username: 'Zara', text: 'This is my favorite session this week.', timestamp: '10:04' },
  { id: 'seed-8', username: 'Omar', text: 'Huge energy in this event.', timestamp: '10:05' },
]

const randomMessages = [
  'This segment is so good.',
  'Anyone else watching from mobile?',
  'That transition was smooth.',
  'The crowd reaction is wild.',
  'Bookmarking this one for later.',
  'Love the pacing so far.',
  'Can we get behind-the-scenes content next?',
  'Quality is crisp even on slower internet.',
  'Best stream lineup this month.',
  'Chat is carrying the vibe right now.',
  '🔥🔥🔥',
  'GG that was insane!',
  'This deserves way more viewers.',
]

const randomUsers = ['Nova', 'Kai', 'Lina', 'Milo', 'Tara', 'Ben', 'Rin', 'Skye', 'Vera', 'Lex']
const avatarColors = [
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-orange-500',
  'bg-fuchsia-500',
  'bg-violet-500',
]

const quickEmojis = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '💯', '🚀']

/* ───────────────────────── Helpers ───────────────────────── */

function getTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getAvatarColor(name) {
  const value = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return avatarColors[value % avatarColors.length]
}

/* ───────────────────────── Category colors ───────────────────────── */

const categoryBadgeColors = {
  Gaming: 'border-purple-500/30 bg-purple-500/15 text-purple-200',
  Music: 'border-pink-500/30 bg-pink-500/15 text-pink-200',
  Sports: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200',
  Tech: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-200',
  Art: 'border-amber-500/30 bg-amber-500/15 text-amber-200',
}

/* ───────────────────────── Component ───────────────────────── */

function EventStreamingPage() {
  const { id } = useParams()
  const event = useMemo(() => events.find((item) => item.id === Number(id)), [id])
  const navigate = useNavigate()

  const [messages, setMessages] = useState(seedMessages)
  const [draftMessage, setDraftMessage] = useState('')
  const [showTyping, setShowTyping] = useState(false)
  const [liked, setLiked] = useState(false)
  const chatContainerRef = useRef(null)

  // Related events from same category (exclude current)
  const relatedEvents = useMemo(() => {
    if (!event) return []
    return events
      .filter((e) => e.category === event.category && e.id !== event.id)
      .slice(0, 3)
  }, [event])

  // Reset messages on event change
  useEffect(() => {
    setMessages(seedMessages)
    setShowTyping(false)
    setLiked(false)
  }, [id])

  // Auto-scroll chat
  useEffect(() => {
    if (!chatContainerRef.current) return
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, showTyping])

  // Simulated incoming messages with typing indicator
  useEffect(() => {
    let messageTimer
    let typingTimer

    function scheduleNext() {
      const delay = 4000 + Math.floor(Math.random() * 3000)
      const typingDelay = Math.max(800, delay - 1800)

      typingTimer = setTimeout(() => setShowTyping(true), typingDelay)

      messageTimer = setTimeout(() => {
        const username = randomUsers[Math.floor(Math.random() * randomUsers.length)]
        const text = randomMessages[Math.floor(Math.random() * randomMessages.length)]

        setMessages((current) => [
          ...current,
          {
            id: `auto-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            username,
            text,
            timestamp: getTimestamp(),
          },
        ])
        setShowTyping(false)
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      clearTimeout(messageTimer)
      clearTimeout(typingTimer)
    }
  }, [id])

  const handleSendMessage = () => {
    const value = draftMessage.trim()
    if (!value) return

    setMessages((current) => [
      ...current,
      {
        id: `self-${Date.now()}`,
        username: 'You',
        text: value,
        timestamp: getTimestamp(),
      },
    ])
    setDraftMessage('')
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiClick = (emoji) => {
    setDraftMessage((current) => current + emoji)
  }

  if (!event) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-4xl">
          📺
        </div>
        <h1 className="mt-5 text-3xl font-bold text-white">Event not found</h1>
        <p className="mt-3 text-slate-300">The event you requested does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to events
        </Link>
      </div>
    )
  }

  const catColors = categoryBadgeColors[event.category] || categoryBadgeColors.Tech

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      {/* ───── Top Bar ───── */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-3">
          {event.isLive && (
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              Live
            </div>
          )}
          <span className={`hidden rounded-full border ${catColors} px-3 py-1 text-xs font-semibold sm:inline-flex`}>
            {event.category}
          </span>
        </div>
      </div>

      {/* ───── Main Grid (Video + Chat) ───── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
        {/* Left Column — Video + Info */}
        <div className="min-w-0 space-y-5">
          {/* Video Container */}
          <section className="overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/85 shadow-2xl shadow-black/25">
            <div className="p-4 sm:p-5">
              {/* Title + Meta */}
              <div className="mb-4 flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                    {event.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs">
                      👁 {event.viewerCount.toLocaleString()} viewers
                    </span>
                    <span className={`rounded-full border ${catColors} px-3 py-1 text-xs font-medium sm:hidden`}>
                      {event.category}
                    </span>
                    <span className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs">
                      📅 {event.date} · {event.time}
                    </span>
                  </div>
                </div>

                {/* Like button */}
                <button
                  type="button"
                  onClick={() => setLiked((c) => !c)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-200 ${
                    liked
                      ? 'border-red-500/50 bg-red-500/10 text-red-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-red-400/50 hover:text-red-400'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={liked ? 'currentColor' : 'none'}>
                    <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.08A6.01 6.01 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {liked ? 'Liked' : 'Like'}
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800/60 bg-black shadow-inner">
                <iframe
                  src={event.videoUrl}
                  title={event.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* ───── Info Panels ───── */}
          <section className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
            {/* About */}
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-white">About this event</h2>
              <p className="mt-3 leading-7 text-slate-300">{event.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-700/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Streamer Info */}
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Host</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/15">
                  {event.streamer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-white">{event.streamer}</p>
                  <p className="text-sm text-slate-400">Streaming on LiveScape</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-2xl border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/15"
              >
                Follow
              </button>

              <div className="mt-4 rounded-2xl border border-slate-800/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-300">
                Streamed by{' '}
                <span className="font-semibold text-white">{event.streamer}</span> on {event.date} at{' '}
                {event.time}
              </div>
            </div>
          </section>

          {/* ───── Related Events ───── */}
          {relatedEvents.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white">
                More in {event.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map((related, index) => (
                  <Link
                    key={related.id}
                    to={`/event/${related.id}`}
                    className="group/related overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 animate-slideUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/related:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      {related.isLive && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          <span className="h-1 w-1 rounded-full bg-white" />
                          Live
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-white line-clamp-1">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {related.streamer} · {related.viewerCount.toLocaleString()} viewers
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ───── Chat Panel ───── */}
        <aside className="flex w-full flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/85 shadow-2xl shadow-black/20 lg:sticky lg:top-5 lg:max-h-[calc(100vh-40px)] lg:self-start">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-800/60 px-4 py-3.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Live Chat</h2>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-200">
              {event.viewerCount.toLocaleString()} online
            </span>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="chat-scrollbar flex-1 overflow-y-auto px-3 py-3"
            style={{ minHeight: '300px', maxHeight: '520px' }}
          >
            <div className="space-y-2.5">
              {messages.map((message) => {
                const isSelf = message.username === 'You'

                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 rounded-2xl border p-3 animate-chatMessageIn ${
                      isSelf
                        ? 'chat-self'
                        : 'border-slate-800/60 bg-slate-900/60'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                        isSelf ? 'bg-gradient-to-br from-cyan-400 to-indigo-500' : getAvatarColor(message.username)
                      }`}
                    >
                      {message.username.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">
                        <span className={isSelf ? 'text-cyan-300' : 'text-cyan-200'}>
                          {message.username}
                        </span>
                        <span className="ml-2 font-normal text-slate-500">{message.timestamp}</span>
                      </p>
                      <p className="mt-0.5 break-words text-sm text-slate-200">{message.text}</p>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {showTyping && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-800/40 bg-slate-900/40 p-3 animate-chatMessageIn">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[11px] font-bold text-white">
                    ?
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                    <span className="ml-1">Someone is typing</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Emojis */}
          <div className="border-t border-slate-800/40 px-3 py-2">
            <div className="flex items-center gap-1">
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="emoji-btn rounded-lg px-1.5 py-1 text-base hover:bg-slate-800/60"
                  aria-label={`Add ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-slate-800/60 p-3">
            <div className="flex items-center gap-2">
              <input
                id="chat-input"
                type="text"
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a message..."
                className="h-10 flex-1 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/60 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.06)]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!draftMessage.trim()}
                className="h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 text-sm font-semibold text-slate-950 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ───── Footer ───── */}
      <Footer />
    </div>
  )
}

export default EventStreamingPage