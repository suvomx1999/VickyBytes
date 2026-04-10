import Logo from './Logo'

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="text-lg font-bold tracking-wide text-white">LiveScape</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Curated live events, streams, and interactive chat experiences — all in one beautiful platform.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Browse Events</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Categories</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Going Live</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Schedule</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Community</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Discord</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Twitter</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">GitHub</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Help Center</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">© 2026 LiveScape. Built for the VickyBytes Internship assignment.</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Made by</span>
            <span className="text-red-400">♥</span>
            <a href="https://github.com/suvomx1999" target="_blank" rel="noreferrer" className="font-medium text-slate-400 hover:text-cyan-400 transition-colors">
              Shubashis Mete
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
