import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { registerServiceWorker } from './utils/pwa'
import { Toaster } from 'sonner'

// Register service worker for PWA
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="starboard-theme">
      <App />
      <Toaster/>
    </ThemeProvider>
  </StrictMode>,
)
