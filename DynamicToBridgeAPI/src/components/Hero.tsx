import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import { useCounter } from '../hooks/useCounter'
// import LoginForm from './LoginForm' // Removed to avoid duplication

interface HeroProps {
  onRegister?: () => void,
  onLogin?: () => void,
  isLoggedIn?: boolean,
  companyInfo?: {
    ldv_IPRLicenseNumber?: string | null,
    englishName?: string | null,
    arabicName?: string | null,
    commercialDenomination?: string | null,
    commercialRegistrationNumber?: string | null,
    crDate?: string | null,
    office?: string | null,
    classCode?: number | null,
    ucr?: string | null,
    establishmentYear?: number | null,
    taxFileNumber?: string | null,
    email?: string | null,
    ldv_itidacustomernumber?: string | null,
    ldv_companyoverview?: string | null,
    ldv_legaltypecode?: number | null,
    ldv_legaltypecode_displayname?: string | null,
    primaryContact?: {
      id: string,
      name: string
    } | null
  } | null
}

const Hero: React.FC<HeroProps> = ({ onRegister, onLogin, isLoggedIn = false, companyInfo = null }) => {
  // Props are available but CTA buttons are commented out
  // Suppress unused variable warnings
  void onRegister;
  void onLogin;
  const { language } = useLanguage()
  const t = translations[language]
  
  // Counter hooks for statistics
  const companiesCount = useCounter(500, 2000)
  const licensesCount = useCounter(1000, 2000)
  const partnersCount = useCounter(50, 2000)

  // Check if company profile is complete
  const isProfileComplete = (company: any): boolean => {
    if (!company) return false;
    
    const requiredFields = [
      'englishName', 'arabicName', 'commercialDenomination', 'commercialRegistrationNumber',
      'crDate', 'office', 'classCode', 'ucr', 'establishmentYear', 
      'taxFileNumber', 'email', 'ldv_itidacustomernumber', 'ldv_companyoverview', 'ldv_legaltypecode', 'primaryContact'
    ];
    
    return requiredFields.every(field => {
      if (field === 'primaryContact') {
        return company[field] && company[field].name && company[field].name.trim() !== '';
      }
      return company[field] && company[field].toString().trim() !== '';
    });
  };

  return (
    <>
      <style>
        {`
          #hero-building {
            background-color: #d4dadf !important;
            background: #d4dadf !important;
          }
        `}
      </style>
      <section className="relative overflow-hidden text-white" style={{
        background: `
          linear-gradient(135deg, #1b92b8 10%, #0174a4 30%, #63d074 50%, #1b92b8 75%, #1b92b8 100%),
          radial-gradient(circle at 20% 80%, #0174a4 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #63d074 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, #1b92b8 0%, transparent 80%)
        `
      }}>
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
                {isLoggedIn && companyInfo ? (
                  companyInfo.englishName || companyInfo.arabicName || t.heroTitle
                ) : (
                  t.heroTitle
                )}
              </h1>
              {!isLoggedIn ? (
                <>
                  <p className="text-xl md:text-2xl text-blue-100 font-medium">
                    {t.heroSubtitle}
                  </p>
                  <p className="text-lg text-blue-200 leading-relaxed max-w-2xl">
                    {t.heroDescription}
                  </p>
                </>
              ) : (
                <p className="text-xl md:text-2xl text-blue-100 font-medium">
                  {language === 'ar' ? 'معرف الشركة: ' : 'Company ID: '}
                  {companyInfo?.ldv_itidacustomernumber || '-'}
                </p>
              )}
            </div>

                               {/* CTA Buttons - Hide for logged in users */}
                   {/* {!isLoggedIn && (
                      
                   )} */}

            {/* Stats - Hide for logged in users */}
            {!isLoggedIn && (
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-yellow-300">{companiesCount}+</div>
                  <div className="text-sm text-blue-200">{t.companies}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-green-300">{licensesCount}+</div>
                  <div className="text-sm text-blue-200">{t.licenses}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-purple-300">{partnersCount}+</div>
                  <div className="text-sm text-blue-200">{t.partners}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Building Illustration */}
              <div className="relative mx-auto max-w-md">
                {/* Company Status Boxes for logged in users */}
                {isLoggedIn && companyInfo && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* License Status Box */}
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-gray-200 relative z-20" style={{ minHeight: '150px', minWidth: '200px' }}>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
                             style={{ 
                               backgroundColor: companyInfo.ldv_IPRLicenseNumber ? '#10B981' : '#EF4444'
                             }}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {companyInfo.ldv_IPRLicenseNumber ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                          </svg>
                        </div>
                        
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          {language === 'ar' ? 'الترخيص' : 'License'}
                        </h4>
                        
                        {companyInfo.ldv_IPRLicenseNumber ? (
                          <div>
                            <p className="text-green-600 font-medium text-sm mb-1">
                              {language === 'ar' ? 'مرخصة' : 'Licensed'}
                            </p>
                            <p className="text-xs text-gray-600">
                              {companyInfo.ldv_IPRLicenseNumber}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-red-600 font-medium text-sm mb-1">
                              {language === 'ar' ? 'غير مرخصة' : 'Not Licensed'}
                            </p>
                            <p className="text-xs text-gray-600">
                              {language === 'ar' ? 'يتطلب ترخيص' : 'License Required'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Profile Status Box */}
                    <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-gray-200 relative z-20" style={{ minHeight: '150px', minWidth: '200px' }}>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center"
                             style={{ 
                               backgroundColor: isProfileComplete(companyInfo) ? '#10B981' : '#F59E0B'
                             }}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isProfileComplete(companyInfo) ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            )}
                          </svg>
                        </div>
                        
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                        </h4>
                        
                        {isProfileComplete(companyInfo) ? (
                          <div>
                            <p className="text-green-600 font-medium text-sm mb-1">
                              {language === 'ar' ? 'مكتمل' : 'Complete'}
                            </p>
                            <p className="text-xs text-gray-600">
                              {language === 'ar' ? 'جميع البيانات متوفرة' : 'All data available'}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-amber-600 font-medium text-sm mb-1">
                              {language === 'ar' ? 'غير مكتمل' : 'Incomplete'}
                            </p>
                            <p className="text-xs text-gray-600">
                              {language === 'ar' ? 'يتطلب تحديث البيانات' : 'Data update required'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Animated pulse Logo will be added here for non-logged in users */}
                {!isLoggedIn && (
                  <div className="relative mx-auto max-w-md">
                    <img src="/images/itida-logo-w.png" alt="Logo" />
                  </div>
                )}
              </div>
            </div>

            {/* Floating Tech Elements */}
            <div className="absolute top-10 right-10 w-6 h-6 bg-blue-500 rounded-lg animate-float flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-10 w-5 h-5 bg-green-500 rounded-lg animate-float flex items-center justify-center" style={{ animationDelay: '1s' }}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-5 w-4 h-4 bg-purple-500 rounded-lg animate-float flex items-center justify-center" style={{ animationDelay: '2s' }}>
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero
