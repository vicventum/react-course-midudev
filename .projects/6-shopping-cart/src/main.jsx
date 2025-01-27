import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FiltersProvider } from './context/FiltersContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Paso 3/4 - Usando el Provider */}
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </React.StrictMode>
)
