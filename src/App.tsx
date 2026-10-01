import { Login } from './components/Login/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Dashboard } from './components/Dashboard'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
