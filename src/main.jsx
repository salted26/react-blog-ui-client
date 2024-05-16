import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ContextPrivider } from './context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextPrivider>
      <App />
    </ContextPrivider>
  </React.StrictMode>,
)
