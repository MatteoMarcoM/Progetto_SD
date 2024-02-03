import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PrivateRoutes from './PrivateRoutes'
import AdminPage from './pages/AdminPage'
import SignInPage from './pages/SignInPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
