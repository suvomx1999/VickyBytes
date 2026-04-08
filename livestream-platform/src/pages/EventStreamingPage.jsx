import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import events from '../data/events'
import { useNavigate } from 'react-router-dom'

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
]

function getTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getAvatarColor(name) {
  const value = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return avatarColors[value % avatarColors.length]
}

function EventStreamingPage() {
  const { id } = useParams()
  const event = useMemo(() => events.find((item) => item.id === Number(id)), [id])
  const navigate = useNavigate()

  const [messages, setMessages] = useState(seedMessages)
  const [draftMessage, setDraftMessage] = useState('')
  const chatContainerRef = useRef(null)

  useEffect(() => {
    setMessages(seedMessages)
  }, [id])

  useEffect(() => {
    if (!chatContainerRef.current) {
      return
    }

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    const intervalDelay = 4000 + Math.floor(Math.random() * 3000)
    const intervalId = setInterval(() => {
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
    }, intervalDelay)

    return () => clearInterval(intervalId)
  }, [id])

  const handleSendMessage = () => {
    const value = draftMessage.trim()
    if (!value) {
      return
    }

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

  if (!event) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-white">Event not found</h1>
        <p className="mt-3 text-slate-300">The event you requested does not exist.</p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
        >
          Back to events
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to events
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
          <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_0_6px_rgba(248,113,113,0.12)]" />
          Live broadcast
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.75fr] xl:grid-cols-[1.6fr_0.7fr]">
        <div className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/85 shadow-2xl shadow-black/20">
            <div className="grid gap-5 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {event.title}
                </h1>
                {event.isLive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-red-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Live
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                  {event.viewerCount.toLocaleString()} viewers
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                  {event.category}
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1">
                  {event.date} · {event.time}
                </span>
              </div>

              <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-black">
              <iframe
                src={event.videoUrl}
                title={event.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-white">About this event</h2>
              <p className="mt-3 leading-7 text-slate-300">{event.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-700/50 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Host</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-black text-slate-950">
                  {event.streamer.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{event.streamer}</p>
                  <p className="text-sm text-slate-400">Streaming on the LiveScape stage</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
                Streamed by <span className="font-semibold text-white">{event.streamer}</span> on {event.date}{' '}
                at {event.time}
              </div>
            </div>
          </section>
        </div>

        <aside className="w-full rounded-3xl border border-slate-800 bg-slate-950/85 shadow-2xl shadow-black/20 lg:sticky lg:top-24 lg:w-80 lg:shrink-0 lg:self-start">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <h2 className="text-lg font-semibold text-white">Live Chat</h2>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-200">
              {event.viewerCount.toLocaleString()} online
            </span>
          </div>

          <div
            ref={chatContainerRef}
            className="chat-scrollbar h-[350px] overflow-y-auto px-4 py-3 sm:h-[420px] lg:h-[560px]"
          >
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 animate-chatMessageIn"
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(
                      message.username,
                    )}`}
                  >
                    {message.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-cyan-200">
                      {message.username}{' '}
                      <span className="font-normal text-slate-400">{message.timestamp}</span>
                    </p>
                    <p className="break-words text-sm text-slate-200">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a message..."
                className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default EventStreamingPage