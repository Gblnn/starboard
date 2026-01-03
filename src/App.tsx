import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RoleBasedRedirect } from './components/RoleBasedRedirect'
import { UpdateNotification } from './components/UpdateNotification'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from './components/ui/theme-provider'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

// Pages
import { AdminPanel } from './pages/AdminPanel'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import { Unauthorized } from './pages/Unauthorized'
import QRCodeGenerator from './pages/qr-code'
import Users from './pages/Users'
import QuickLinks from './pages/quick-links'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="starboard-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/users" element={<Users/>} />
              <Route path="/quick-links" element={<QuickLinks/>} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<RoleBasedRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <UpdateNotification />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
