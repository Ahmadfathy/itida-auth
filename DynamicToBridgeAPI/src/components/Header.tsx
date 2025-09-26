import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { companyByEmail } from '../api/client'

interface HeaderProps {
  onLogoClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]
  const [companyName, setCompanyName] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Heuristic: try to decode email from token or use last login field cached
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    const lastLogin = localStorage.getItem('lastLogin') || sessionStorage.getItem('lastLogin')
    const candidateEmail = lastLogin && /@/.test(lastLogin) ? lastLogin : null

    async function load() {
      try {
        if (candidateEmail) {
          const res = await companyByEmail(candidateEmail)
          const first = res.value && res.value[0]
          if (first) {
            setCompanyName(first.englishName || first.arabicName || first.commercialDenomination || first.email || null)
          }
        }
      } catch (_) {
        // ignore
      }
    }
    // Only attempt when logged in
    if (token) {
      load()
    } else {
      setCompanyName(null)
    }

    const onAuthChanged = () => {
      const tkn = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
      const loginVal = localStorage.getItem('lastLogin') || sessionStorage.getItem('lastLogin')
      if (tkn && loginVal && /@/.test(loginVal)) {
        companyByEmail(loginVal).then(res => {
          const first = res.value && res.value[0]
          if (first) {
            setCompanyName(first.englishName || first.arabicName || first.commercialDenomination || first.email || null)
          } else {
            setCompanyName(loginVal)
          }
        }).catch(() => setCompanyName(loginVal))
      } else {
        setCompanyName(null)
      }
    }

    window.addEventListener('authChanged', onAuthChanged)
    window.addEventListener('storage', onAuthChanged)
    return () => {
      window.removeEventListener('authChanged', onAuthChanged)
      window.removeEventListener('storage', onAuthChanged)
    }
    // react to changes from other components (login writes these)
  }, [language])

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken')
      sessionStorage.removeItem('authToken')
      localStorage.removeItem('lastLogin')
      sessionStorage.removeItem('lastLogin')
      localStorage.removeItem('authChangedAt')
    } catch {}
    setCompanyName(null)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('authChanged'))
    navigate('/')
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Logo 
            onClick={onLogoClick}
          />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-itida-blue transition-colors duration-300">
              {t.home}
            </Link>
            <a href="#" className="text-gray-700 hover:text-itida-blue transition-colors duration-300">
              {t.benefits}
            </a>
            <a href="#" className="text-gray-700 hover:text-itida-blue transition-colors duration-300">
              {t.contact}
            </a>
            {companyName && (
              <Link to="/profile" className="text-gray-700 hover:text-itida-blue transition-colors duration-300">
                {t.myProfile}
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {companyName && (
              <div className="hidden md:inline-flex items-center space-x-2 rtl:space-x-reverse">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-itida-blue text-sm font-medium">
                  {companyName}
                </span>
                <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Logout
                </button>
              </div>
            )}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center justify-center"
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              {language === 'en' ? (
                // Egyptian Flag (when current language is English, show Egypt flag to switch to Arabic)
                <img 
                  src="/images/ar.png" 
                  alt="العربية" 
                  className="w-6 h-4 object-cover rounded-sm cursor-pointer"
                />
              ) : (
                // English Flag (when current language is Arabic, show English flag to switch to English)
                <img 
                  src="/images/en.png" 
                  alt="English" 
                  className="w-6 h-4 object-cover rounded-sm cursor-pointer"
                />
              )}
            </button>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{t.callUs}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
