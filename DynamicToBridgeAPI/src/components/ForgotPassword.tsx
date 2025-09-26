import React, { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import { recover, resetPassword, companyByEmail } from '../api/client'
// import Logo from './Logo'

interface ForgotPasswordProps {
  onBackToHome?: () => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToHome }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const [email, setEmail] = useState('')
  const [loginFromLink, setLoginFromLink] = useState('')
  const [codeFromLink, setCodeFromLink] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // Detect query params (?login=...&code=...)
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search)
      const loginQ = sp.get('login') || ''
      const codeQ = sp.get('code') || ''
      if (loginQ && codeQ) {
        setLoginFromLink(loginQ)
        setCodeFromLink(codeQ)
      }
    } catch {}
  }, [])

  const isResetMode = useMemo(() => !!loginFromLink && !!codeFromLink, [loginFromLink, codeFromLink])

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!otp || !newPassword || !confirmPassword) {
      setError(language === 'ar' ? 'يرجى إدخال جميع الحقول' : 'Please fill all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      setError(language === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match')
      return
    }
    try {
      setIsLoading(true)
      await resetPassword({ login: loginFromLink, code: otp || codeFromLink, newPassword })
      setIsSubmitted(true)
    } catch (err: any) {
      setError(err?.message || t.somethingWentWrong)
    } finally {
      setIsLoading(false)
    }
  }
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [companyInfo, setCompanyInfo] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError(t.pleaseEnterEmail)
      return
    }

    const trimmed = email.trim()
    
    // Validation function for email or username
    const validateEmailOrUsername = (value: string): boolean => {
      if (!value.trim()) return false
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(value)) return true
      
      // Username validation - alphanumeric, dots, underscores, hyphens, 2-50 characters
      const usernameRegex = /^[a-zA-Z0-9._-]{2,50}$/
      if (usernameRegex.test(value)) return true
      
      return false
    }
    
    if (!validateEmailOrUsername(trimmed)) {
      setError(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح أو اسم مستخدم' : 'Please enter a valid email address or username')
      return
    }

    setIsLoading(true)
    try {
      await recover({ method: 'login', value: trimmed })
      
      // Try to fetch company information if the input looks like an email
      if (trimmed.includes('@')) {
        try {
          const companyResponse = await companyByEmail(trimmed)
          if (companyResponse.value && companyResponse.value.length > 0) {
            setCompanyInfo(companyResponse.value[0])
          }
        } catch (companyError) {
          // Company fetch failed, but don't block the main flow
          console.log('Could not fetch company info:', companyError)
        }
      }
      
      setIsSubmitted(true)
    } catch (err: any) {
      const msg = String(err?.message || '')
      if (msg.includes('404') || /not found/i.test(msg)) {
        setError(language === 'ar' ? 'لا يوجد حساب بهذا البريد الإلكتروني' : 'No account found with that email address')
      } else {
        setError(msg || t.somethingWentWrong)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    // Navigate back to home page
    if (onBackToHome) {
      onBackToHome()
    } else {
      window.history.back()
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.checkYourEmail}
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {loginFromLink ? (
                language === 'ar' ? 'تم تغيير كلمه المرور بنجاح، يمكنك الآن تسجيل الدخول.' : 'Your password has been changed successfully. You can now sign in.'
              ) : (
                companyInfo ? (
                  language === 'ar' ? 
                    `لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى ${email} البريد الإلكتروني الرسمي لـ "${companyInfo.englishName || companyInfo.arabicName || 'الشركة'}"` :
                    `We've sent a password reset link to ${email} the official email for "${companyInfo.englishName || companyInfo.arabicName || 'the company'}"`
                ) : (
                  t.resetInstructions.replace('{email}', email)
                )
              )}
            </p>

            <div className="space-y-4">
              <button
                onClick={handleBackToLogin}
                className="w-full btn-primary py-3"
              >
                {t.backToLogin}
              </button>
              
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail('')
                }}
                className="w-full btn-secondary py-3"
              >
                {t.sendAnotherEmail}
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                {t.didntReceiveEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isResetMode ? (language === 'ar' ? 'تعيين كلمة مرور جديدة' : 'Set New Password') : t.forgotPasswordTitle}
            </h1>
            <p className="text-gray-600">
              {isResetMode ? (language === 'ar' ? 'أدخل رمز التحقق وكلمة المرور الجديدة' : 'Enter the verification code and your new password') : t.forgotPasswordSubtitle}
            </p>
          </div>

          {!isResetMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email Address or Username'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m6.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field w-full pl-10 rtl:pl-0 rtl:pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني أو اسم المستخدم' : 'Enter email address or username'}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.sending}
                  </div>
                ) : (
                  t.sendResetLink
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              {/* Login (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني / اسم المستخدم' : 'Email / Username'}
                </label>
                <input value={loginFromLink} readOnly className="input-field w-full bg-gray-100" />
              </div>

              {/* OTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} className={`input-field w-full ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} placeholder={codeFromLink || '123456'} />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`input-field w-full ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`input-field w-full ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} />
              </div>

              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}

              <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...') : (language === 'ar' ? 'تعيين كلمة المرور' : 'Set Password')}
              </button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-itida-blue hover:text-itida-dark transition-colors duration-300 font-medium"
            >
              ← {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
