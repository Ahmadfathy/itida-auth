import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'

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
    <section className="py-20 bg-white">
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
        <div className="mt-20 bg-gradient-to-r from-itida-blue to-blue-600 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">
                Regulation of Information Technology Activity Licenses
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                The Information Technology Industry Development Agency (ITIDA) issues licenses for practicing specialized activities within the information and communication technology sector to regulate the IT sector and encourage investment in this vital field. This initiative aims to support market growth and foster a vibrant digital business environment.
              </p>
              <h4 className="text-3xl font-bold mt-10">
                Activities Eligible for Licensing:
              </h4>
              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Software design, production, and development services.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Information technology systems design, development, production, supply, and operation services.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Website, platform, and e-transaction services utilizing the internet.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Electronics and embedded systems design and development, and electronics manufacturing in the ICT field.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Traditional content digitization services using information technology.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Call center and business process management services using information and communication technology.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Consultancy, research and development, and entrepreneurship services in information and communication technology.</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Training and education services in information and communication technology.</span>
                </div>
              </div>

              <button className="btn-secondary text-lg px-8 py-4">
                {t.exploreAllServices}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
