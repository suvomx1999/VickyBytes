import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import EventListingPage from './pages/EventListingPage'
import EventStreamingPage from './pages/EventStreamingPage'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-screen text-slate-100 font-body">
      <div key={location.pathname} className="animate-fadeIn">
        <Routes>
          <Route path="/" element={<EventListingPage />} />
          <Route path="/event/:id" element={<EventStreamingPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App