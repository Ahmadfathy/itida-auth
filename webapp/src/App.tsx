import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { applyDir } from './i18n'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  const { i18n, t } = useTranslation()
  function toggleLang() {
    const lang = i18n.language.startsWith('ar') ? 'en-US' : 'ar-EG'
    localStorage.setItem('locale', lang)
    i18n.changeLanguage(lang)
    applyDir(lang)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <header style={{ display: 'flex', gap: 8, padding: 12, borderBottom: '1px solid #eee' }}>
          <Link to="/login">{t('common.login')}</Link>
          <Link to="/register">{t('common.register')}</Link>
          <button onClick={toggleLang} style={{ marginInlineStart: 'auto' }}>
            {i18n.language.startsWith('ar') ? 'EN' : 'AR'}
          </button>
        </header>
        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/register" element={<div>Register</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
