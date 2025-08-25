import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import Tab1CompanyLegal from '../components/registration/Tab1CompanyLegal'

const CompanyLegalPage: React.FC = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState<any>({
    companyNameEn: '',
    companyNameAr: '',
    commercialDenomination: '',
    legalType: '',
    registerUsing: {
      commercialRegistry: false,
      unifiedCommercialRegistry: false,
      taxRegistry: false
    },
    commercialRegistryNumber: '',
    unifiedCommercialRegistryNumber: '',
    taxRegistryNumber: '',
    commercialRegistrationDate: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev: typeof formData) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData((prev: typeof formData) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="py-8">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-itida-blue hover:text-itida-dark transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t.backToHome}</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.activityLicenseRequestTitle}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-8">
            <Tab1CompanyLegal 
              formData={formData}
              onInputChange={handleInputChange}
            />

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/registration/details')}
                className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CompanyLegalPage

