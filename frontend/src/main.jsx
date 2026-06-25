import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// AOS is loaded from CDN in index.html — initialize it here
if (typeof window !== 'undefined' && window.AOS) {
  window.AOS.init({ duration: 600, once: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
