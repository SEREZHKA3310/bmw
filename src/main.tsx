import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@gravity-ui/uikit'

import '@gravity-ui/uikit/styles/styles.css';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('Root element not found')
  }

  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <ThemeProvider><App /></ThemeProvider>
    </StrictMode>,
  )
})