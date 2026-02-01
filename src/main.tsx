import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

// Only load Vercel Analytics when deployed to Vercel (not GitHub Pages)
const isVercel = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   import.meta.env.VITE_VERCEL === 'true')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {isVercel && <Analytics />}
    {isVercel && <SpeedInsights />}
  </StrictMode>,
)
