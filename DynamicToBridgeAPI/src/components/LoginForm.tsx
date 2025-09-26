import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
// (no navigate needed)
import { login, recover, resetPassword, companyByEmail, type CompanyInfo } from '../api/client'

interface LoginFormProps {
  onForgotPassword?: () => void
  onRegister?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onRegister }) => {
  const { language } = useLanguage()
  const t = translations[language]
  // no navigation used; stay on homepage after login
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userRole: 'UserName/E-Mail',
    rememberMe: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Recover form (right panel) state isolated from login fields
  const [recoverValue, setRecoverValue] = useState('')
  const [recoverSubmitting, setRecoverSubmitting] = useState(false)
  const [recoverError, setRecoverError] = useState<string | null>(null)
  const [recoverOk, setRecoverOk] = useState(false)
  const [recoverNotFound, setRecoverNotFound] = useState(false)
  const [recoverEmail, setRecoverEmail] = useState<string | null>(null)
  const [recoverCompleted, setRecoverCompleted] = useState(false)
  const [recoverCompany, setRecoverCompany] = useState<CompanyInfo | null>(null)
  // OTP step
  const [otpStep, setOtpStep] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSubmitting, setOtpSubmitting] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)

  // Recover UI labels based on selected option
  const recoverMethod = formData.userRole === 'crn' ? 'cr' : (formData.userRole === 'license no.' ? 'license' : 'login')
  const recoverLabel = recoverMethod === 'cr' ? t.crn : (recoverMethod === 'license' ? t.licenseNo : t.officialEmail)
  const recoverPlaceholder = recoverLabel

  // Validation function for recovery input
  const validateRecoverValue = (value: string): boolean => {
    if (!value.trim()) return false
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(value)) return true
    
    // For non-email, only digits, dashes, and slashes (no letters)
    const digitsOnlyRegex = /^[0-9\-\/]+$/
    if (!digitsOnlyRegex.test(value)) return false
    
    // Length check
    if (value.trim().length < 2 || value.trim().length > 50) return false
    
    return true
  }

  const [recoverValidationError, setRecoverValidationError] = useState<string | null>(null)

  // Handler for recovery input change with validation
  const handleRecoverValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRecoverValue(value)
    
    // Clear previous error
    setRecoverValidationError(null)
    
    // Validate if value is not empty
    if (value.trim() && !validateRecoverValue(value)) {
      setRecoverValidationError('Please enter a valid email address or digits with dashes/slashes only')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // cache last login for header company lookup
    if (name === 'username') {
      localStorage.setItem('lastLogin', value)
      sessionStorage.setItem('lastLogin', value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await login({ login: formData.username, password: formData.password })
      const token = (res as any).token || (res as any).accessToken
      if (token) {
        if (formData.rememberMe) {
          localStorage.setItem('authToken', token)
        } else {
          sessionStorage.setItem('authToken', token)
        }
        // Trigger header to refresh by updating a timestamp
        localStorage.setItem('authChangedAt', String(Date.now()))
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('authChanged'))
      // Stay on homepage; notify others and focus company card
      try {
        window.dispatchEvent(new CustomEvent('focusCompanyCard'))
      } catch {}
    } else {
        setError('Login succeeded without token')
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t.alreadyMember}
              </h2>
              <p className="text-gray-600">
                {t.accessAccountDesc}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username/Email Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.usernameEmail}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                    placeholder={t.enterUsernameEmail}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                    placeholder={t.enterPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{t.rememberMe}</span>
                </label>
                <button 
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-itida-blue hover:text-itida-dark underline bg-transparent border-none cursor-pointer"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              {/* Login Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary text-lg py-4 disabled:opacity-60"
              >
                {submitting ? 'Signing in…' : t.login}
              </button>
            </form>

          </div>

          {/* Right Side - Visual Content */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 lg:p-12 text-white">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{t.recoverYourAccount}</h3>
                <p className="text-gray-600">
                  {t.secureAccessDesc}
                </p>
              </div>

              {/* User Role Selection */}
              <div className='mb-8'>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.identityTypeLabel}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'UserName/E-Mail', label: t.officialEmail, icon: '👤' },
                    { value: 'crn', label: t.crn, icon: '🏢' },
                    { value: 'license no.', label: t.licenseNo, icon: '🏛️' }
                  ].map((role) => (
                    <label
                      key={role.value}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 text-center text-gray-500 transition-all duration-300 ${
                        formData.userRole === role.value
                          ? 'border-itida-blue bg-blue-50 text-itida-blue'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userRole"
                        value={role.value}
                        checked={formData.userRole === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="text-sm font-medium">{role.label}</div>
                      {formData.userRole === role.value && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-itida-blue rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {!otpStep && !recoverCompleted && (
                <>
              {/* Email/Username Input Field */}
              <div className="mb-8">
                <label htmlFor="rightUsername" className="block text-sm font-medium text-gray-700 mb-2">
                      {recoverLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="rightUsername"
                        value={recoverValue}
                        onChange={handleRecoverValueChange}
                        className={`input-field pr-10 text-gray-900 placeholder-gray-400 ${recoverValidationError ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder={recoverPlaceholder}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {/* Alerts directly under identifier */}
                {recoverValidationError && (
                  <div className="text-red-600 text-sm mt-2">{recoverValidationError}</div>
                )}
                {recoverError && !recoverNotFound && (
                  <div className="text-red-600 text-sm mt-2">{recoverError}</div>
                )}
                {recoverNotFound && (
                  <div className="mt-3">
                    <h3 className="text-red-600 text-lg font-semibold">{language === 'ar' ? 'يبدو أنه لا توجد سجلات قديمة في هيئة تنمية صناعة تكنولوجيا المعلومات تطابق مدخلاتك' : 'It seems that you have no legacy records in ITIDA matching your inputs'}</h3>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={onRegister}
                        className="btn-primary w-full"
                      >
                        {language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={async () => {
                        setRecoverError(null)
                        setRecoverNotFound(false)
                        setRecoverOk(false)
                        const preferred = (formData.userRole === 'crn' ? 'cr' : (formData.userRole === 'license no.' ? 'license' : 'login')) as 'login' | 'cr' | 'license'
                        if (!recoverValue) {
                          setRecoverError('Please enter a value')
                          return
                        }
                        if (!validateRecoverValue(recoverValue)) {
                          setRecoverValidationError('Please enter a valid email address or digits with dashes/slashes only')
                          return
                        }
                        const baseMethods: Array<'login' | 'cr' | 'license'> = ['login','cr','license']
                        const orderedMethods: Array<'login' | 'cr' | 'license'> = [preferred, ...baseMethods.filter(m => m !== preferred)]
                        setRecoverSubmitting(true)
                        try {
                          let successRes: any | null = null
                          for (const m of orderedMethods) {
                            try {
                              const res = await recover({ method: m, value: recoverValue })
                              successRes = res
                              break
                            } catch (e: any) {
                              const emsg = String(e?.message || '')
                              // if not 404, surface immediately and stop
                              if (!(emsg.includes('404') || /not found/i.test(emsg))) {
                                throw e
                              }
                              // else continue to next method
                            }
                          }
                          if (successRes) {
                            setRecoverOk(true)
                            // Clear sensitive fields to avoid browser autofill/stale values
                            setOtpCode('')
                            setNewPassword('')
                            setConfirmNewPassword('')
                            setOtpStep(true)
                            setRecoverEmail(successRes.email || null)

                          } else {
                            setRecoverError(language === 'ar' ? 'يبدو أنه لا توجد سجلات قديمة في هيئة تنمية صناعة تكنولوجيا المعلومات تطابق مدخلاتك' : 'It seems that you have no legacy records in ITIDA matching your inputs')
                            setRecoverNotFound(true)
                          }
                        } catch (err: any) {
                          const msg = String(err?.message || '')
                          setRecoverError(msg || 'Recovery failed')
                          setRecoverNotFound(false)
                        } finally {
                          setRecoverSubmitting(false)
                        }
                      }}
                      disabled={recoverSubmitting}
                      className="btn-secondary w-full disabled:opacity-60"
                    >
                      {recoverSubmitting ? 'Processing…' : t.recoverNow}
                    </button>
                  
                 {otpError && <div className="text-red-600 text-sm">{otpError}</div>}
                  
                  {recoverError && !recoverNotFound && (
                      <div className="text-red-600 text-sm mt-2">{recoverError}</div>
                    )}
                    
                  </div>
                </>
              )}

              {otpStep && !recoverCompleted && (
                <div className="space-y-4">
                  {recoverOk && <div className="text-green-900 text-sm mt-2 text-3xl font-bold">Welcome Back, you have been successfully recovered.</div>}
                  {recoverOk && (
                    <div className="text-gray-600 text-sm">Please check your email <label className="text-green-600 text-sm font-bold">{recoverEmail}</label> for your OTP to reset your password.</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      name="otp_code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="input-field text-gray-900 placeholder-gray-400"
                      placeholder="6-digit code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field text-gray-900 placeholder-gray-400 pr-10"
                        placeholder={t.enterPassword}
                        autoComplete="new-password"
                        name="new_password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="input-field text-gray-900 placeholder-gray-400 pr-10"
                        placeholder={t.enterPassword}
                        autoComplete="new-password"
                        name="confirm_password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {otpError && (
                    <div className="text-red-600 text-sm">{otpError}</div>
                  )}
                  <button
                    type="button"
                    onClick={async () => {
                      setOtpError(null)
                      if (!otpCode || !newPassword || !confirmNewPassword) {
                        setOtpError('Please enter code, new password and confirmation')
                        return
                      }
                      if (newPassword !== confirmNewPassword) {
                        setOtpError('Passwords do not match')
                        return
                      }
                      setOtpSubmitting(true)
                      try {
                        // Use the email returned from recover; fallback to entered value
                        const loginForReset = recoverEmail || recoverValue
                        await resetPassword({ login: loginForReset, code: otpCode, newPassword })
                        // Success: hide recover UI and show confirmation panel
                        setOtpStep(false)
                        setRecoverCompleted(true)
                        if (loginForReset) {
                          try {
                            const res = await companyByEmail(loginForReset)
                            setRecoverCompany(res.value?.[0] || null)
                          } catch (_) {
                            setRecoverCompany(null)
                          }
                        }
                      } catch (err: any) {
                        setOtpError(err?.message || 'Reset failed')
                      } finally {
                        setOtpSubmitting(false)
                      }
                    }}
                    disabled={otpSubmitting}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {otpSubmitting ? 'Saving…' : 'Set New Password'}
                </button>
              </div>
              )}

              {recoverCompleted && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-green-800 font-semibold mb-1">{t.passwordChangedTitle}</h4>
                    <p className="text-green-700 text-sm">{t.signInNowHint}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h5 className="text-gray-900 font-semibold mb-3">{t.accountDetails}</h5>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><span className="font-medium">{t.emailLabel}:</span> {recoverEmail || '-'}</div>
                      <div><span className="font-medium">{t.crnLabel}:</span> {recoverCompany?.commercialRegistrationNumber || '-'}</div>
                      <div><span className="font-medium">{t.licenseLabel}:</span> {recoverCompany && (recoverCompany as any).licenseNumber ? (recoverCompany as any).licenseNumber : '-'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default LoginForm
