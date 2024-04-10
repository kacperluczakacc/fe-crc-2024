import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { convert } from './test'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <App text={convert(56)}/>
  </React.StrictMode>,
)
