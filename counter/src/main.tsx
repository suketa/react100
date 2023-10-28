import React from 'react'
import ReactDOM from 'react-dom/client'
import Counter from './Counter.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
)
