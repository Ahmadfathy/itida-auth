import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'

import Tab1CompanyLegal from '../components/registration/Tab1CompanyLegal'
import Tab2ContactInfo from '../components/registration/Tab2ContactInfo'
import Tab3ActivitiesAttachments from '../components/registration/Tab3ActivitiesAttachments'

interface RegistrationPageProps {
  onBackToHome?: () => void
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBackToHome }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState(1)
  const [activeSidebarTab, setActiveSidebarTab] = useState(1)
  const [formData, setFormData] = useState<any>({
    // Tab 1: Company Legal Information
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
    commercialRegistrationDate: '',
    
    // Tab 2: Contact Information & Company Representative
    governorate: '',
    district: '',
    streetAddress: '',
    companyWebsite: '',
    officialEmail: '',
    phoneMobile: '',
    hasBranches: false,
    representativeName: '',
    representativeTitle: '',
    representativeMobile: '',
    representativeNationalId: '',
    representativeEmail: '',
    requestApplicant: 'company-in-charge',
    
    // Tab 3: Activities, Attachments & Declaration
    activities: {
      softwareDesign: false,
      itSystems: false,
      trustServices: false,
      websitesPlatforms: false,
      electronicsEmbedded: false,
      contentDigitization: false,
      callCenterBusiness: false,
      consultingResearch: false,
      trainingLearning: false
    },
    attachments: {
      commercialRegister: null,
      taxCard: null,
      nationalId: null,
      investmentGazette: null,
      declarationUndertaking: null
    },
    licenseReceiptMethod: '',
    declarationAgreement: false
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

  const handleFileChange = (fieldName: string, file: File | null) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        [fieldName]: file
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  const nextTab = () => {
    if (activeTab < 3) {
      setActiveTab(activeTab + 1)
    }
  }

  const previousTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1)
    }
  }

  const isTabValid = (tabNumber: number): boolean => {
    switch (tabNumber) {
      case 1:
        return !!(formData.companyNameEn && formData.companyNameAr && formData.legalType)
      case 2:
        return !!(formData.governorate && formData.district && formData.representativeName && 
                 formData.representativeTitle && formData.representativeMobile && 
                 formData.representativeNationalId && formData.representativeEmail)
      case 3:
        return formData.declarationAgreement
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 rtl:space-x-reverse text-itida-blue hover:text-itida-dark transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t.backToHome}</span>
            </button>
          </div>
          
          {/* Page Title */}
          <div className="text-center mb-8">
             <h1 className="text-4xl font-bold text-gray-900 mb-4">
               {t.companiesRegistrationForm}
             </h1>
             <p className="text-lg text-gray-600">
               {t.completeCompanyRegistration}
             </p>
           </div>

          {/* Form Container with Sidebar */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 md:sticky md:top-8 md:self-start">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.companiesRegistrationForm}</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(1)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${activeSidebarTab === 1 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <span className="mr-2">1.</span>
                      <span>{t.registrationCompany}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(2)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${activeSidebarTab === 2 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <span className="mr-2">2.</span>
                      <span>{t.companyHeadContacts}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(3)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${activeSidebarTab === 3 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <span className="mr-2">3.</span>
                      <span>{t.financialInformation}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="p-8">
                {/* Only show the wizard form in the first sidebar tab */}
                {activeSidebarTab === 1 && (
                  <>
                    {/* Progress Tabs */}
                    <div className="mb-8">
                      <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                        {[1, 2, 3].map((tabNumber) => (
                          <div key={tabNumber} className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                                activeTab === tabNumber
                                  ? 'bg-itida-blue text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {tabNumber}
                            </div>
                            {tabNumber < 3 && (
                              <div className={`w-16 h-1 mx-2 ${
                                activeTab > tabNumber ? 'bg-itida-blue' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Tab Labels */}
                      <div className="flex justify-center mt-4 space-x-8 rtl:space-x-reverse">
                        <span className={`text-sm font-medium ${
                          activeTab === 1 ? 'text-itida-blue' : 'text-gray-500'
                        }`}>
                          {t.companyLegalInformation}
                        </span>
                        <span className={`text-sm font-medium ${
                          activeTab === 2 ? 'text-itida-blue' : 'text-gray-500'
                        }`}>
                          {t.contactInformation}
                        </span>
                        <span className={`text-sm font-medium ${
                          activeTab === 3 ? 'text-itida-blue' : 'text-gray-500'
                        }`}>
                          {t.activitiesAttachments}
                        </span>
                      </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 1 && (
                      <Tab1CompanyLegal 
                        formData={formData} 
                        onInputChange={handleInputChange}
                        language={language}
                      />
                    )}
                    
                    {activeTab === 2 && (
                      <Tab2ContactInfo 
                        formData={formData} 
                        onInputChange={handleInputChange}
                        language={language}
                      />
                    )}
                    
                    {activeTab === 3 && (
                      <Tab3ActivitiesAttachments 
                        formData={formData} 
                        onInputChange={handleInputChange}
                        onFileChange={handleFileChange}
                        language={language}
                      />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={previousTab}
                        disabled={activeTab === 1}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeTab === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {t.previous}
                      </button>

                      {activeTab < 3 ? (
                        <button
                          type="button"
                          onClick={nextTab}
                          disabled={!isTabValid(activeTab)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isTabValid(activeTab)
                              ? 'bg-itida-blue hover:bg-itida-dark text-white'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {t.next}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!isTabValid(activeTab)}
                          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isTabValid(activeTab)
                              ? 'bg-itida-blue hover:bg-itida-dark text-white'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {t.submitRegistration}
                        </button>
                      )}
                    </div>
                  </>
                )}
                
                {/* Company's Head & Contacts Tab Content */}
                {activeSidebarTab === 2 && (
                  <div className="py-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.companyHeadContacts}</h2>
                    <p className="text-gray-600 mb-8">This section will contain the company's head and contacts information.</p>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <p className="text-blue-700">Content for the Company's Head & Contacts tab will be implemented here.</p>
                    </div>
                    
                    {/* Navigation Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
                      >
                        {t.next}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Financial Information Tab Content */}
                {activeSidebarTab === 3 && (
                  <div className="py-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.financialInformation}</h2>
                    <p className="text-gray-600 mb-8">This section will contain the company's financial information.</p>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <p className="text-blue-700">Content for the Financial Information tab will be implemented here.</p>
                    </div>
                    
                    {/* Navigation Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
                      >
                        {t.next}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm text-gray-400">ITIDA DB</span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">{t.poweredBy}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RegistrationPage
