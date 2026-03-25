import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const CARD_COLORS = [
  'bg-amber-300',
  'bg-rose-400',
  'bg-lime-300',
  'bg-purple-300',
  'bg-cyan-400',
  'bg-orange-300',
  'bg-sky-300',
  'bg-pink-300',
];


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App cardColors={CARD_COLORS} />
  </StrictMode>,
)
