import { useEffect } from 'react'

function ShareToast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2800)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-toastIn">
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-700/80 bg-slate-900/95 px-5 py-3.5 text-sm font-medium text-white shadow-2xl shadow-black/50 backdrop-blur-xl">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
          <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {message}
      </div>
    </div>
  )
}

export default ShareToast
