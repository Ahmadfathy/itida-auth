import React, { useState } from 'react'
import { translations, useLanguage } from '../contexts/LanguageContext'
import { getValidationMessage, validateForgotPasswordForm } from '../utils/validation'
import Alert from './Alert'
// import Logo from './Logo'

interface ForgotPasswordProps {
  onBackToHome?: () => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToHome }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShowAlert(false)

    // Validate form data
    const validation = validateForgotPasswordForm({ email })

    if (!validation.isValid) {
      setAlertMessage(getValidationMessage(validation, t))
      setShowAlert(true)
      return
    }

    // Additional email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.pleaseEnterValidEmail)
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (err) {
      setError(t.somethingWentWrong)
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
              {t.resetInstructions.replace('{email}', email)}
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


        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.forgotPasswordTitle}
            </h1>
            <p className="text-gray-600">
              {t.forgotPasswordSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.emailAddress}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m6.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field w-full pl-10 rtl:pl-0 rtl:pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={t.enterEmail}
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

              {/* Validation Alert */}
              {showAlert && (
                <div className="mt-4">
                  <Alert
                    type="error"
                    title={t.alertTitle}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                  />
                </div>
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

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBackToLogin}
              className="text-itida-blue hover:text-itida-dark transition-colors duration-300 font-medium"
            >
              ← {t.backToLogin}
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">
                {t.needHelp}
              </p>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <a href="#" className="text-sm text-itida-blue hover:text-itida-dark transition-colors duration-300">
                  {t.contactSupport}
                </a>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-sm text-itida-blue hover:text-itida-dark transition-colors duration-300">
                  {t.helpCenter}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
