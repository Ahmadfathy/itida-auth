import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'
import AdditionalBenefits from './AdditionalBenefits'

const Features: React.FC = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const features = [
    {
      icon: '📋',
      title: t.licensing,
      description: t.licensingDesc,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: '🚀',
      title: t.innovation,
      description: t.innovationDesc,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: '🌐',
      title: t.ecosystem,
      description: t.ecosystemDesc,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ]

  return (
    <>
      <AdditionalBenefits />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.discoverBenefits}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold ${feature.textColor} mb-4`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Button */}
                <button className={`mt-6 px-6 py-3 rounded-lg border-2 border-current ${feature.textColor} hover:bg-current hover:text-white transition-all duration-300 font-medium`}>
                  {t.learnMore}
                </button>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
        </div>
      </section>
      
    </>
  )
}

export default Features
