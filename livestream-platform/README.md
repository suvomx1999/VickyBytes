# Live Event Streaming Platform

## Project Overview
Live Event Streaming Platform is a responsive, frontend-only React application for browsing and watching live-style events. It includes a searchable event listing page, an event streaming page with a responsive video player, and a local interactive chat panel with simulated messages. The project is built to meet the assignment requirements with a strong focus on UI, UX, and code quality.

## Features
- Responsive event discovery grid with 15 local event cards
- Search bar and category/live filtering
- Like, share, and watch actions on each card
- Responsive event streaming page with large video section
- Local-only live chat with seed messages, user input, and simulated incoming messages
- Event description, tags, and streamer information
- Smooth route transitions, animated cards, and chat message motion
- Sticky, blurred navbar and mobile-friendly layout behavior

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router v6

## Project Rules Followed
- No backend
- No Firebase
- No shadcn UI
- No external APIs in the final implementation
- Local data only

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

## Deployment
### Vercel CLI
1. Install CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. For production deploy:

```bash
vercel --prod
```

### GitHub + Vercel Dashboard
1. Push this project to GitHub.
2. Import the repository in Vercel dashboard.
3. Use these build settings:
  - Build command: `npm run build`
  - Output directory: `dist`
4. Ensure the environment is deployed as a static frontend project.

## SPA Routing (Important)
This app uses client-side routing. Keep [vercel.json](vercel.json) with rewrite rules so direct visits such as `/event/3` do not 404.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Folder Structure
```text
src/
  assets/
  components/
  data/
  hooks/
  pages/
  App.jsx
  index.css
  main.jsx
```

## Screenshots
- Add listing page screenshot here
- Add streaming page screenshot here

## Live URL
- YOUR_VERCEL_URL

## Notes
- All event data is hardcoded locally in the repository.
- The app is optimized for mobile, tablet, and desktop layouts.
- If you change routes or add new pages, keep the Vercel rewrite rule in place.
