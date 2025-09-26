import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'

interface AdditionalBenefitsProps {
  onRegister: () => void
}

const AdditionalBenefits: React.FC<AdditionalBenefitsProps> = ({ onRegister }) => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-itida-blue to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">
                {t.additionalBenefitsTitle}
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                {t.additionalBenefitsDesc}
              </p>
              <h4 className="text-3xl font-bold mt-10">
                {t.activitiesEligible}
              </h4>
              {/* Benefits List */}
              <div className="space-y-4">
                {t.eligibleActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>

              <button onClick={onRegister} className="btn-secondary text-lg px-8 py-4">
                Request License
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdditionalBenefits
