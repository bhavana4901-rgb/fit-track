# FitTrack

A modern fitness tracking web app built with React. Track your workouts, monitor progress, and stay motivated on your fitness journey.

## Live Demo

🚀 [View Live Demo](https://fit-track-live.netlify.app/) 

## What is this?

FitTrack is a clean, responsive fitness tracking application I built to help people log their workouts and visualize their progress. It's got a nice dark mode, smooth animations, and works offline as a PWA.

The app includes a landing page with pricing tiers, a multi-step registration flow, and a dashboard where users can see their stats and workout history.

## Features

- **Multi-step Registration** - 5-step onboarding flow with progress indicator
- **Dashboard** - View workout stats, weekly activity charts, and quick actions
- **Dark Mode** - Toggle between light and dark themes (persists across sessions)
- **Responsive Design** - Works on mobile (375px), tablet (768px), and desktop (1440px+)
- **PWA Support** - Install on your device, works offline
- **Form Validation** - Real-time validation using Zod and React Hook Form
- **Smooth Animations** - Framer Motion for page transitions and micro-interactions
- **Loading States** - Skeleton loaders and empty states for better UX

## Tech Stack

**Frontend:**
- React 19 - UI framework
- React Router 7 - Client-side routing
- Tailwind CSS 3 - Styling
- Framer Motion 12 - Animations
- Lucide React - Icons

**Forms & Validation:**
- React Hook Form 7 - Form state management
- Zod 4 - Schema validation
- @hookform/resolvers - Integration layer

**Data Visualization:**
- Recharts 3 - Charts and graphs

**Build Tools:**
- Vite 8 - Build tool and dev server
- Vite PWA Plugin - Progressive Web App support
- ESLint 10 - Code linting
- PostCSS & Autoprefixer - CSS processing



## Screenshots
![alt text](/screenshots/image.png)

![alt text](/screenshots/image-1.png)

![alt text](/screenshots/image-2.png)

![alt text](/screenshots/image-3.png)

![alt text](/screenshots/image-4.png)

![alt text](/screenshots/image-5.png)

![alt text](/screenshots/image-6.png)

![alt text](/screenshots/image-7.png)


## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repo


2. Install dependencies
```bash
npm install
```

3. Start the dev server
```bash
npm run dev
```

The app will open at `http://localhost:5174/`

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
fit-track/
├── public/
│   ├── icons/          # PWA icons (44 files)
│   ├── favicon.svg
│   ├── logo.svg
│   ├── manifest.json
│   ├── offline.html
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── auth/       # Login, Register, Stepper
│   │   ├── common/     # EmptyState, Loading, ProtectedRoute
│   │   ├── dashboard/  # Dashboard components
│   │   ├── landing/    # Landing page sections
│   │   └── ui/         # Button, Card, Input
│   ├── contexts/       # Auth, Theme, User contexts
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Design Decisions

### Why React 19?
Wanted to use the latest features and the new compiler optimizations. The automatic memoization is nice.

### Tailwind over CSS-in-JS
Tailwind keeps the styling close to the components and the build output is tiny. Extended the default theme with custom colors and spacing tokens instead of using arbitrary values everywhere.

### Framer Motion for Animations
Could've used CSS animations, but Framer Motion makes complex animations way easier. The gesture support and layout animations are great for the interactive elements.

### Zod + React Hook Form
This combo is solid for forms. Zod gives you type-safe validation schemas, and React Hook Form handles the state without re-rendering the whole form on every keystroke.

### Component Organization
Organized by feature (auth, dashboard, landing) instead of by type (buttons, cards, etc.). Makes it easier to find related components. The `ui/` folder has the generic reusable stuff.

### PWA Implementation
Used Vite PWA plugin with Workbox. The service worker caches static assets and has a custom offline fallback page. Works great for the "install to home screen" experience.

### Dark Mode
Implemented with CSS variables and Tailwind's dark mode. The theme preference is stored in localStorage and applied before the page renders to avoid flash of wrong theme.

## Performance

- **Build time:** ~3 seconds
- **Bundle size:** ~313 KB (gzipped)
- **Lighthouse scores:** 90+ on all metrics
- **PWA:** 106 cached entries for offline support

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+





