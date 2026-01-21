import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthState from './context/AuthState.jsx'
import ThemeState from './context/ThemeState.jsx'
import NoteState from './context/NoteState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeState>
        <AuthState>
          <NoteState>
            <App />
          </NoteState>
        </AuthState>
      </ThemeState>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </BrowserRouter>
  </StrictMode>,
)
