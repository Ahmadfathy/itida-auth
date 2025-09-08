import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../contexts/LanguageContext'

import Tab1CompanyLegal from '../components/registration/registrationCompany/Tab1CompanyLegal'
import Tab2ContactInfo from '../components/registration/registrationCompany/Tab2ContactInfo'
import Tab3ActivitiesAttachments from '../components/registration/registrationCompany/Tab3ActivitiesAttachments'
import CompanyHeadInformation from '../components/registration/CompanyHeadInformation'
// import CompanyHeadInformation from '../components/registration/registrationCompany/CompanyHeadInformation'
import FinancialInformation from '../components/registration/FinancialInformation'

interface RegistrationPageProps {
  onBackToHome?: () => void
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBackToHome }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeSidebarTab, setActiveSidebarTab] = useState(1)
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({1: true, 2: false, 3: false})
  const [formData, setFormData] = useState<any>({
    // Dynamic arrays for repeatable sections
    companyHeads: [{ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' }],
    contactPersons: [{ name: '', position: '', mobile: '', nationalId: '', email: '' }],
    products: [{ name: '', description: '' }],
    services: [{ name: '', description: '' }],
    customerReferences: [{ name: '', country: '', projectSize: '', scope: '', description: '' }],
    exportInformation: [{ year: '', marketRegion: '', country: '', valueExported: '' }],
    owners: [{ name: '', mobile: '', telephone: '', email: '' }],
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
    declarationAgreement: false,

    // Financial Information
    fiscalCapital: '',
    domesticSalesDetails: '',
    domesticSalesValue: '',
    totalRevenueYear: '',
    annualRevenue: '',
    auditedBalanceSheet: null,
    export: '',
    totalNoOfEmployees: '',
    yearOfEstablishment: '',
    typeOfOwnership: '',
    companyData: ''
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

  // Handle input change for dynamic array fields
  const handleDynamicInputChange = (section: string, index: number, field: string, value: string) => {
    setFormData((prev: typeof formData) => {
      const sectionArray = [...prev[section]]
      sectionArray[index] = { ...sectionArray[index], [field]: value }
      return { ...prev, [section]: sectionArray }
    })
  }

  // Add a new row to a dynamic section
  const addRow = (section: string, emptyRow: any) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [section]: [...prev[section], emptyRow]
    }))
  }

  // Remove a row from a dynamic section
  const removeRow = (section: string, index: number) => {
    if (index === 0 && formData[section].length === 1) {
      // Don't remove the last row, just clear it
      const emptyRow = Object.keys(formData[section][0]).reduce((acc, key) => {
        acc[key] = ''
        return acc
      }, {} as any)
      
      setFormData((prev: typeof formData) => ({
        ...prev,
        [section]: [emptyRow]
      }))
    } else {
      setFormData((prev: typeof formData) => ({
        ...prev,
        [section]: prev[section].filter((_: any, i: number) => i !== index)
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

  const isSidebarTabComplete = (tabNumber: number): boolean => {
    switch (tabNumber) {
      case 1:
        // Check if all 3 sub-tabs are complete
        return isTabValid(1) && isTabValid(2) && isTabValid(3)
      case 2:
        // Check if company heads and contact persons have required fields
        const hasValidCompanyHeads = formData.companyHeads.every((head: any) => 
          head.name && head.position && head.mobile && head.nationalId && head.email
        )
        const hasValidContactPersons = formData.contactPersons.every((person: any) => 
          person.name && person.position && person.mobile && person.nationalId && person.email
        )
        return hasValidCompanyHeads && hasValidContactPersons
      case 3:
        // Check financial information completeness
        return !!(formData.fiscalCapital && formData.domesticSalesDetails && 
                 formData.domesticSalesValue && formData.totalRevenueYear && 
                 formData.annualRevenue && formData.auditedBalanceSheet)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Main Content */}
      <main className="py-8">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 flex flex-col md:flex-row items-stretch">
            {/* Sidebar */}
            <div className="self-stretch w-full md:w-80 bg-gray-50 rounded-s-2xl border-gray-200 md:sticky md:top-8 md:self-stretch">
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t.companiesRegistrationForm}</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(1)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${activeSidebarTab === 1 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">1.</span>
                        <span>{t.registrationCompany}</span>
                      </div>
                      {!isSidebarTabComplete(1) && (
                        <span className="text-red-500 font-bold text-lg">*</span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(2)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${activeSidebarTab === 2 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">2.</span>
                        <span>{t.companyHeadContacts}</span>
                      </div>
                      {!isSidebarTabComplete(2) && (
                        <span className="text-red-500 font-bold text-lg">*</span>
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveSidebarTab(3)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${activeSidebarTab === 3 ? 'bg-itida-blue text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">3.</span>
                        <span>{t.financialInformation}</span>
                      </div>
                      {!isSidebarTabComplete(3) && (
                        <span className="text-red-500 font-bold text-lg">*</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="p-8">
                {/* Only show the wizard form in the first sidebar tab */}
                {activeSidebarTab === 1 && (
                  <form onSubmit={handleSubmit}>
                    {/* Accordion Sections */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((section) => {
                        const isOpen = openAccordions[section]
                        const arrowIcon = isOpen ? (
                          <svg className="w-5 h-5 transform rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )
                        return (
                          <div key={section} className="border border-gray-300 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }))}
                              className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-itida-blue"
                              aria-expanded={isOpen}
                              aria-controls={`accordion-section-${section}`}
                            >
                              <span className="font-semibold text-lg">
                                {section === 1 && t.companyLegalInformation}
                                {section === 2 && t.contactInformation}
                                {section === 3 && t.activitiesAttachments}
                              </span>
                              {arrowIcon}
                            </button>
                            {isOpen && (
                              <div id={`accordion-section-${section}`} className="p-6 bg-white">
                                {section === 1 && (
                                  <Tab1CompanyLegal formData={formData} onInputChange={handleInputChange} />
                                )}
                                {section === 2 && (
                                  <Tab2ContactInfo formData={formData} onInputChange={handleInputChange} />
                                )}
                                {section === 3 && (
                                  <Tab3ActivitiesAttachments formData={formData} onInputChange={handleInputChange} onFileChange={handleFileChange} />
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={!isTabValid(1) || !isTabValid(2) || !isTabValid(3)}
                        className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isTabValid(1) && isTabValid(2) && isTabValid(3)
                            ? 'bg-itida-blue hover:bg-itida-dark text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {t.submitRegistration}
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Company's Head & Contacts Tab Content */}
                {activeSidebarTab === 2 && (
                  <CompanyHeadInformation
                    formData={formData}
                    onInputChange={handleInputChange}
                    onDynamicInputChange={handleDynamicInputChange}
                    handleDynamicInputChange={handleDynamicInputChange}
                    addRow={addRow}
                    removeRow={removeRow}
                    t={t}
                    onSubmit={handleSubmit}
                  /> 
                )}
                
                {/* Financial Information Tab Content */}
                {activeSidebarTab === 3 && (
                  <FinancialInformation
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleDynamicInputChange={handleDynamicInputChange}
                    addRow={addRow}
                    removeRow={removeRow}
                    t={t}
                    onSubmit={handleSubmit} />
                )}
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm text-gray-400">ITIDA DB</span>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">{t.poweredBy}</span>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default RegistrationPage
