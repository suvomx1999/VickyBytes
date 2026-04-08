# Live Event Streaming Platform

## Project Overview
Live Event Streaming Platform is a frontend-first React application for browsing and watching live-style events with an immersive UI. It includes a searchable listing experience, event-specific streaming pages, and a local interactive chat panel with simulated live activity.

## Features
- Event discovery grid with responsive card layout
- Real-time search by event title
- Filter chips for All, Live Now, and categories
- Event streaming page with embedded video player
- Event detail section with tags and streamer metadata
- Local live chat with seed messages, user messages, and simulated incoming messages
- Smooth route transitions and card/message animation effects
- Sticky, blurred navbar and mobile-friendly layout behavior
- Optional YouTube Data API integration for dynamic video thumbnails and metadata

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router v6
- YouTube Data API v3 (optional)

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

3. Set environment variables:

```bash
cp .env.example .env
```

Then add your key in `.env`:

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
```

4. Start development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Environment Variables
- `VITE_YOUTUBE_API_KEY` (optional): Enables dynamic YouTube video search, thumbnails, and metadata.

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
4. Add environment variable in Vercel project settings:
- `VITE_YOUTUBE_API_KEY`

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
- Add listing page screenshot
- Add streaming page screenshot

## Live URL
- YOUR_VERCEL_URL
