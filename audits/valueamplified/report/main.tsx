import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../../../src/report/report.css'
import './theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
