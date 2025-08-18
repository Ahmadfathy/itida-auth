import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LoginForm from './components/LoginForm'
import Features from './components/Features'
import Footer from './components/Footer'
import ForgotPassword from './components/ForgotPassword'
import RegistrationPage from './pages/RegistrationPage'
import { LanguageContext, getInitialLanguage, saveLanguageToStorage } from './contexts/LanguageContext'

export type Language = 'en' | 'ar'

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const getInitialPage = (): 'home' | 'forgot-password' | 'registration' => {
    const path = window.location.pathname
    if (path === '/forgot-password') return 'forgot-password'
    if (path === '/registration') return 'registration'
    return 'home'
  }

  const [currentPage, setCurrentPage] = useState<'home' | 'forgot-password' | 'registration'>(getInitialPage())

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
    saveLanguageToStorage(newLanguage)
    document.documentElement.dir = newLanguage === 'en' ? 'ltr' : 'rtl'
    document.documentElement.lang = newLanguage === 'en' ? 'en' : 'ar'
  }

  // Set initial HTML attributes based on saved language
  useEffect(() => {
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl'
    document.documentElement.lang = language === 'en' ? 'en' : 'ar'
  }, [language])

  const navigateToPage = (page: 'home' | 'forgot-password' | 'registration') => {
    setCurrentPage(page)
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Update URL when page changes
  React.useEffect(() => {
    const currentPath = window.location.pathname
    let newPath = '/'
    
    if (currentPage === 'forgot-password') {
      newPath = '/forgot-password'
    } else if (currentPage === 'registration') {
      newPath = '/registration'
    }
    
    // Only update URL if it's different from current path
    if (currentPath !== newPath) {
      window.history.pushState({}, '', newPath)
    }
  }, [currentPage])

  // Handle browser back/forward buttons and refresh
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/forgot-password') {
        setCurrentPage('forgot-password')
      } else if (path === '/registration') {
        setCurrentPage('registration')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header onLogoClick={() => navigateToPage('home')} />
        
        {currentPage === 'home' ? (
          <>
            <main>
              <Hero onRegister={() => navigateToPage('registration')} />
              <LoginForm 
                onForgotPassword={() => navigateToPage('forgot-password')}
                onRegister={() => navigateToPage('registration')}
              />
              <Features />
            </main>
            <Footer onLogoClick={() => navigateToPage('home')} />
          </>
        ) : currentPage === 'forgot-password' ? (
          <ForgotPassword onBackToHome={() => navigateToPage('home')} />
        ) : (
          <RegistrationPage onBackToHome={() => navigateToPage('home')} />
        )}
      </div>
    </LanguageContext.Provider>
  )
}

export default App
