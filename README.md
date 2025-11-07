# Voice2Music - AI-Powered Music Generation

Transform your voice into professional multi-track music with AI. Record, generate, and download complete compositions in seconds.

![Voice2Music Hero](public/images/hero-reference.png)

## 🎵 Features

- **Voice Recording**: Record your voice or humming directly in the browser
- **Audio Upload**: Upload existing audio files for processing
- **AI Generation**: Transform audio into multi-track arrangements (melody, chords, bass, drums)
- **Real-time Playback**: Listen to generated tracks with individual volume controls
- **Export Options**: Download as MIDI, MP3, or individual stems
- **Beautiful UI**: Dark, glossy interface with neon accents and smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Authentication**: Firebase Auth (configurable)
- **Backend**: REST API (MongoDB integration ready)
- **Animations**: CSS keyframes + Framer Motion ready

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm installed ([Install with nvm](https://github.com/nvm-sh/nvm))
- Firebase project (optional, for authentication)
- Backend API (optional, for music generation)

### Steps

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd voice2music-frontend

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.example .env

# 4. Configure your environment variables (see below)
# Edit .env file with your Firebase and API credentials

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration (get from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Backend API
VITE_API_BASE_URL=http://localhost:3000/api

# Supabase (optional)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### Setting up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication → Email/Password provider
4. Go to Project Settings → General → Your apps
5. Copy configuration values to your `.env` file

**Important**: Never commit real API keys to version control!

## 🎨 Design System

### Color Palette

```css
--primary: hsl(166, 100%, 48%)        /* Neon Teal */
--secondary: hsl(186, 100%, 56%)      /* Aqua */
--background: hsl(202, 95%, 6%)       /* Deep Navy */
--foreground: hsl(190, 15%, 93%)      /* Light Text */
```

### Key Design Tokens

- **Glass Effect**: `backdrop-filter: blur(12px)` with semi-transparent backgrounds
- **Glow Effects**: CSS box-shadows with primary/secondary colors at low opacity
- **Animations**: Float, slide-in, and smooth transitions
- **Typography**: Inter font family with responsive sizing

### Customizing Design

Edit `src/index.css` to modify:
- CSS variables (colors, spacing, shadows)
- Global styles and utilities
- Animation keyframes

Edit `tailwind.config.ts` to modify:
- Tailwind theme extensions
- Custom animations
- Breakpoints

## 📁 Project Structure

```
voice2music-frontend/
├── public/
│   ├── images/              # Static images
│   └── favicon.svg
├── src/
│   ├── assets/              # Asset files
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Site footer
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── AuthSplit.tsx    # Login/Signup page
│   │   ├── Home.tsx         # Recording interface
│   │   ├── Result.tsx       # Playback & downloads
│   │   └── About.tsx        # About page
│   ├── lib/
│   │   ├── firebase.ts      # Firebase auth setup
│   │   └── api.ts           # Backend API client
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript types
│   ├── index.css            # Global styles & design system
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── .env.example             # Environment template
├── index.html               # HTML template
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

## 🛠️ Available Scripts

```sh
# Development
npm run dev          # Start dev server at localhost:8080

# Build
npm run build        # Create production build in dist/
npm run preview      # Preview production build locally

# Linting
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Set environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy

### Environment Variables for Production

Make sure to add all `VITE_*` environment variables in your hosting platform's dashboard.

## 🔌 Backend Integration

The frontend expects a REST API with the following endpoints:

### POST `/api/generate`
Generate music from audio input
- **Body**: FormData with `audio` blob and `options` JSON
- **Response**: `{ jobId: string, status: string, estimatedTime?: number }`

### GET `/api/result/:jobId`
Get generation result
- **Response**: `{ jobId, status, tracks, midi, mp3, error? }`

### POST `/api/tracks`
Save user track metadata
- **Body**: `{ userId, title, genre?, duration?, createdAt }`
- **Response**: `{ id: string }`

### GET `/api/tracks/user/:userId`
Get user's tracks
- **Response**: Array of track metadata

See `src/lib/api.ts` for TypeScript interfaces and implementation details.

## 🎯 Key Features Explained

### Animated Split Authentication
- Desktop: Side-by-side login/signup with animated transitions
- Mobile: Stacked panels with smooth sliding
- Toggle button switches active form
- Full form validation with error handling

### Audio Recording
- Uses MediaRecorder API (browser native)
- Real-time waveform visualization (placeholder)
- Upload or record options
- Genre/mood selection

### Multi-Track Playback
- Individual track controls (mute/solo)
- Per-track volume sliders
- Synchronized playback
- Download individual stems or full mix

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads with animations
- [ ] Navigation works between all pages
- [ ] Login/signup forms validate input
- [ ] Auth panel toggle animation works
- [ ] Recording interface is interactive
- [ ] Waveform reacts to recording state
- [ ] Result page displays tracks
- [ ] Volume controls work
- [ ] Download buttons trigger correctly
- [ ] Responsive on mobile/tablet

### Unit Testing (To be implemented)

```sh
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## ♿ Accessibility

- Semantic HTML (`<main>`, `<nav>`, `<section>`, etc.)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible styles
- Color contrast meets WCAG AA standards
- `prefers-reduced-motion` media query support

## 🎨 Customization Guide

### Changing Colors

Edit `src/index.css`:
```css
:root {
  --primary: 166 100% 48%;      /* Change HSL values */
  --secondary: 186 100% 56%;
  /* ... other colors ... */
}
```

### Adding New Pages

1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`:
```tsx
<Route path="/your-page" element={<YourPage />} />
```

### Modifying Animations

Edit `src/index.css` keyframes or `tailwind.config.ts` animations.

## 🐛 Troubleshooting

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Firebase Auth Not Working
- Check environment variables are set correctly
- Verify Firebase project configuration
- Check Authentication is enabled in Firebase Console
- Add authorized domains in Firebase Console

### Styling Issues
- Clear browser cache
- Check Tailwind classes are correct
- Verify CSS variables are defined

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@voice2music.com
- Documentation: [Link to docs]

---

**Built with ❤️ using React, TypeScript, and Vite**

**Deployed on Lovable** - [Visit Lovable](https://lovable.dev)
