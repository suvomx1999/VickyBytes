# LiveScape — Live Event Streaming Platform

## Project Overview

LiveScape is a responsive, frontend-only React application for browsing and watching live-style events. It features a searchable event listing page with category filtering, an event streaming page with a responsive video player, and a fully interactive local chat panel with simulated messages, typing indicators, and emoji support. The project emphasizes premium UI design, smooth micro-animations, and polished user experience.

## Features

### Event Listing Page (Part 1)
- Responsive event grid with 15 local event cards (3-column desktop, 2-column tablet, 1-column mobile)
- Real-time search bar with clear button
- Category filter pills with emoji icons (🎮 Gaming, 🎵 Music, ⚽ Sports, 💻 Tech, 🎨 Art)
- Like / Share / Watch Now actions on each card
- Category-specific color-coded badges (purple for Gaming, pink for Music, etc.)
- Image loading skeleton with shimmer animation
- Animated gradient hero text
- Featured live event highlight card
- Share toast notification feedback
- Scroll-to-top floating button
- Staggered card entrance animations

### Event Streaming Page (Part 2)
- Large responsive video container with embedded YouTube player
- Live chat panel with:
  - Simulated incoming messages with typing indicator
  - Quick emoji picker bar (👍 ❤️ 🔥 😂 👏 🎉 💯 🚀)
  - "You" messages styled distinctively
  - Auto-scroll to latest messages
  - Disabled send button when empty
- Event description and tags section
- Streamer info card with follow button
- Related events section (same category)
- Like button on video page

### Design & UX
- Glassmorphism effects with backdrop blur
- Card hover glow with gradient borders
- "Watch Now" button shimmer sweep effect
- Live badge glow animation
- Smooth page transitions
- Sticky glassmorphic navbar
- Professional 4-column footer
- Mobile-first responsive layout
- Custom styled scrollbars

## Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3** (responsive utilities + custom animations)
- **React Router v6** (client-side routing)
- Custom CSS animations (no external animation libraries)

## Project Rules Followed
- ❌ No backend
- ❌ No Firebase / APIs
- ❌ No shadcn UI
- ❌ No MUI for entire card component
- ✅ Custom-built event cards
- ✅ Local data only
- ✅ Fully responsive (mobile, tablet, desktop)

## Local Setup

1. Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd livestream-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Folder Structure
```text
src/
  components/
    EventCard.jsx        — Premium event card with glassmorphism
    Footer.jsx           — 4-column responsive footer
    ShareToast.jsx       — Toast notification for share actions
  data/
    events.js            — 15 hardcoded event entries
  hooks/
    useEventFilters.js   — Search + category filter logic
  pages/
    EventListingPage.jsx — Landing page with hero + grid
    EventStreamingPage.jsx — Video + chat + related events
  App.jsx                — Router setup + page transitions
  index.css              — Global styles, animations, utilities
  main.jsx               — React entry point
```

## Deployment

### Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### GitHub + Vercel Dashboard
1. Push to GitHub
2. Import repository in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`

## SPA Routing
This app uses client-side routing. The `vercel.json` file includes rewrite rules so direct URL visits (e.g., `/event/3`) work correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Live URL
- https://vicky-bytes.vercel.app/

## Bonus Features Implemented
- ✅ Smooth animations (staggered cards, page transitions, chat messages)
- ✅ Better filtering logic (search + category combined)
- ✅ Chat UX improvements (typing indicator, emoji picker, styled self-messages)
- ✅ Related events discovery
- ✅ Share feedback toast
- ✅ Scroll-to-top button
- ✅ Image loading skeletons
- ✅ Premium glassmorphism design
