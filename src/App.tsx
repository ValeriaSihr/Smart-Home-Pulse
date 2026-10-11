import { Login } from './components/Login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Dashboard } from './components/Dashboard/Dashboard'
import './App.css'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from './components/Api/Api'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(false)

  useEffect(() => onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
    setLoading(false)
  }, () => {
    setAuthError(true)
    setLoading(false)
  }), [])

  if (loading) return <p role="status">Loading your session…</p>
  if (authError) return <p role="alert">Unable to load your session. Please reload the page.</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
