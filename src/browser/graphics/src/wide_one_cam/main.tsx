import React from 'react'
import ReactDOM from 'react-dom/client'
import { GraphicsGlobalStyle } from '../../../global_style.js'
import App from './App.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GraphicsGlobalStyle />
    <App />
  </React.StrictMode>
)
