import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter: URL berbentuk /#/stats sehingga refresh tidak 404 di server statis (Live Server) */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
