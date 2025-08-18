import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import { useCounter } from '../hooks/useCounter'

interface HeroProps {
  onRegister?: () => void
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  const { language } = useLanguage()
  const t = translations[language]
  
  // Counter hooks for statistics
  const companiesCount = useCounter(500, 2000)
  const licensesCount = useCounter(1000, 2000)
  const partnersCount = useCounter(50, 2000)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-itida-blue via-blue-600 to-itida-dark text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-left rtl:text-right">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                {t.heroSubtitle}
              </p>
              <p className="text-lg text-blue-200 leading-relaxed max-w-2xl">
                {t.heroDescription}
              </p>
            </div>

                               {/* CTA Buttons */}
                   <div className="flex flex-col sm:flex-row gap-4">
                     <button 
                       onClick={onRegister}
                       className="btn-primary text-lg px-8 py-4"
                     >
                       {t.joinNow}
                     </button>
                     <button className="btn-secondary text-lg px-8 py-4">
                       {t.learnMore}
                     </button>
                   </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-yellow-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-yellow-300">{companiesCount}+</div>
                <div className="text-sm text-blue-200">Companies</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-green-300">{licensesCount}+</div>
                <div className="text-sm text-blue-200">Licenses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-purple-300">{partnersCount}+</div>
                <div className="text-sm text-blue-200">Partners</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Building Illustration */}
              <div className="relative mx-auto max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-6">
                    {/* Building */}
                    <div className="relative">
                      <div className="w-32 h-40 mx-auto bg-gradient-to-b from-white/20 to-white/10 rounded-t-3xl border border-white/30">
                        {/* Windows */}
                        <div className="grid grid-cols-3 gap-2 p-4">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                          ))}
                        </div>
                        {/* Flag */}
                        <div className="absolute -top-2 -right-2 w-6 h-4 bg-red-500 rounded-sm"></div>
                      </div>
                    </div>

                    {/* Digital Elements */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-400/20 rounded-full border-2 border-blue-300 flex items-center justify-center animate-glow">
                          <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M20 80 Q50 20 80 80"
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-4 h-4 bg-blue-300 rounded-full animate-float"></div>
            <div className="absolute bottom-20 left-10 w-3 h-3 bg-green-300 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-5 w-2 h-2 bg-purple-300 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
