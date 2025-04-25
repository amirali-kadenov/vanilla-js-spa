# Test Task Application

Application with main features:
- Timer
- Video Player
- Currency Rates

## Project Structure

```
src/
├── app/           # Main application file and styles
├── features/      # Functional modules (auth, etc)
├── pages/         # Application pages
├── shared/        # Shared components and utilities
└── widgets/       # Widgets and complex components
```

## Technologies

- Vanilla JavaScript
- SCSS
- Lazy Loading
- Protected Routes

## Architecture

This is a Single Page Application (SPA) built with vanilla JavaScript. Key features:
- Client-side routing
- Dynamic content loading
- No page reloads
- Component-based architecture
- Lazy loading for better performance

## Proxy Server

The application uses a proxy server for API requests to handle CORS issues:

Environment variables required:
- `VITE_PROXY_URL`: Proxy server URL
- `VITE_EXCHANGE_RATES_API`: Exchange rates API endpoint

## Getting Started

```bash
npm install
npm run dev
```

## Main Features

- **Timer**: Time countdown with customizable parameters
- **Video Player**: Video playback with basic controls
- **Currency Rates**: Display of current currency exchange rates
  - Real-time exchange rates updates (every 30 seconds)
  - Base currency selection
  - Currency converter
  - Customizable list of favorite currencies
  - Session-based currency selection persistence
  - Error handling with user-friendly notifications
  - Loading states with skeleton screens
  - Protected route (requires authentication)
