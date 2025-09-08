import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  onForgotPassword?: () => void
  onRegister?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onRegister }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userRole: 'UserName/E-Mail',
    rememberMe: true
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fake login credentials
    const fakeUsername = 'testuser'
    const fakePassword = 'password123'

    if (formData.username === fakeUsername && formData.password === fakePassword) {
      // Redirect to profile page
      navigate('/profile')
    } else {
      // Invalid credentials - could add error handling here
      console.log('Invalid username or password')
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
                Access your ITIDA account and manage your ICT activities
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
                    placeholder="Enter your username or email"
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
                    placeholder="Enter your password"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                {t.login}
              </button>
            </form>

                               {/* Additional Info */}
                   <div className="mt-8 text-center">
                     <p className="text-sm text-gray-600">
                       {t.dontHaveAccount}{' '}
                       <button
                         type="button"
                         onClick={onRegister}
                         className="text-itida-blue hover:text-itida-dark font-medium underline bg-transparent border-none cursor-pointer"
                       >
                         {t.registerHere}
                       </button>
                     </p>
                   </div>
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
                  {t.userRole}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'UserName/E-Mail', label: t.username, icon: '👤' },
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

              {/* Email/Username Input Field */}
              <div className="mb-8">
                <label htmlFor="rightUsername" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.usernameEmail}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="rightUsername"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                    placeholder="Enter your username or email"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <button className="btn-secondary w-full">
                  Recover Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
