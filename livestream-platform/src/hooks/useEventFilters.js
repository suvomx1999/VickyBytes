import { useMemo } from 'react'

function useEventFilters(events, searchQuery, activeFilter) {
  return useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(normalizedQuery)
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Live Now' ? event.isLive : event.category === activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [activeFilter, events, searchQuery])
}

export default useEventFilters