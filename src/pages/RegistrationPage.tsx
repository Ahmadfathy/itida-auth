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
        </div>
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
              <div className="p-8">
                {/* Only show the wizard form in the first sidebar tab */}
                {activeSidebarTab === 1 && (
                  <form onSubmit={handleSubmit}>
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
                  </form>
                )}
                
                {/* Company's Head & Contacts Tab Content */}
                {activeSidebarTab === 2 && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Company Head & Contacts form submitted');
                  }} className="py-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.companyHeadContacts}</h2>
                    
                    {/* Company's Head & Contact Persons Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-center mb-6">{t.companyHeadContacts}</h3>
                      
                      {/* Company's Head Section */}
                      <div className="mb-8">
                        <h4 className="font-medium mb-4">Company's Head</h4>
                        {formData.companyHeads.map((head: any, index: number) => (
                          <div key={`company-head-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={head.name}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="اسمك"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={head.position}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'position', e.target.value)}
                                  className="input-field" 
                                  placeholder="المنصب"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={head.mobile}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'mobile', e.target.value)}
                                  className="input-field" 
                                  placeholder="رقم المحمول"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">National ID <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={head.nationalId}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'nationalId', e.target.value)}
                                  className="input-field" 
                                  placeholder="الرقم القومي"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                                <input 
                                  type="email" 
                                  value={head.email}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'email', e.target.value)}
                                  className="input-field" 
                                  placeholder="البريد الإلكتروني"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email 2</label>
                                <input 
                                  type="email" 
                                  value={head.email2}
                                  onChange={(e) => handleDynamicInputChange('companyHeads', index, 'email2', e.target.value)}
                                  className="input-field" 
                                  placeholder="البريد الإلكتروني 2"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('companyHeads', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('companyHeads', { name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Contact Persons Section */}
                      <div className="mb-8">
                        <h4 className="font-medium mb-4">Contact Persons</h4>
                        {formData.contactPersons.map((person: { name: string; position: string; mobile: string; nationalId: string; email: string; }, index: number) => (
                          <div key={`contact-person-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={person.name}
                                  onChange={(e) => handleDynamicInputChange('contactPersons', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="اسمك"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={person.position}
                                  onChange={(e) => handleDynamicInputChange('contactPersons', index, 'position', e.target.value)}
                                  className="input-field" 
                                  placeholder="المنصب"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={person.mobile}
                                  onChange={(e) => handleDynamicInputChange('contactPersons', index, 'mobile', e.target.value)}
                                  className="input-field" 
                                  placeholder="رقم المحمول"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">National ID <span className="text-red-500">*</span></label>
                                <input 
                                  type="text" 
                                  value={person.nationalId}
                                  onChange={(e) => handleDynamicInputChange('contactPersons', index, 'nationalId', e.target.value)}
                                  className="input-field" 
                                  placeholder="الرقم القومي"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                                <input 
                                  type="email" 
                                  value={person.email}
                                  onChange={(e) => handleDynamicInputChange('contactPersons', index, 'email', e.target.value)}
                                  className="input-field" 
                                  placeholder="البريد الإلكتروني"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('contactPersons', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('contactPersons', { name: '', position: '', mobile: '', nationalId: '', email: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Company Market Information Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Company Market Information</h3>
                      <p className="text-gray-600 mb-4">Some description about this section</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Parent <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Parent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Child <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Child"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Grand Child <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Grand Child"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Industry Sectors</label>
                          <select className="input-field">
                            <option value="">Select Industry Sector</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Products Section */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Products</h4>
                        {formData.products.map((product: { name: string; description: string }, index: number) => (
                          <div key={`product-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input 
                                  type="text" 
                                  value={product.name}
                                  onChange={(e) => handleDynamicInputChange('products', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="Product Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                                <input 
                                  type="text" 
                                  value={product.description}
                                  onChange={(e) => handleDynamicInputChange('products', index, 'description', e.target.value)}
                                  className="input-field" 
                                  placeholder="Product Description"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('products', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('products', { name: '', description: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Services Section */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Services</h4>
                        {formData.services.map((service: { name: string; description: string }, index: number) => (
                          <div key={`service-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                <input 
                                  type="text" 
                                  value={service.name}
                                  onChange={(e) => handleDynamicInputChange('services', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="Service Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                                <input 
                                  type="text" 
                                  value={service.description}
                                  onChange={(e) => handleDynamicInputChange('services', index, 'description', e.target.value)}
                                  className="input-field" 
                                  placeholder="Service Description"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('services', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('services', { name: '', description: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Key Technologies, Certificates, Affiliations */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Key Technologies</label>
                          <select className="input-field">
                            <option value="">Select Technology</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certificates</label>
                          <select className="input-field">
                            <option value="">Select Certificate</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Affiliations, Memberships, Partnerships */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                          <select className="input-field">
                            <option value="">Select Affiliation</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Memberships</label>
                          <select className="input-field">
                            <option value="">Select Membership</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Partnerships</label>
                          <select className="input-field">
                            <option value="">Select Partnership</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Customer Reference */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Customer Reference</h4>
                        {formData.customerReferences.map((reference: { name: string; country: string; projectSize: string; scope: string; description: string }, index: number) => (
                          <div key={`reference-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input 
                                  type="text" 
                                  value={reference.name}
                                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="Customer Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <select 
                                  value={reference.country}
                                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'country', e.target.value)}
                                  className="input-field"
                                >
                                  <option value="">Select Country</option>
                                  <option value="option1">Option 1</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Size</label>
                                <input 
                                  type="text" 
                                  value={reference.projectSize}
                                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'projectSize', e.target.value)}
                                  className="input-field" 
                                  placeholder="Project Size"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                                <input 
                                  type="text" 
                                  value={reference.scope}
                                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'scope', e.target.value)}
                                  className="input-field" 
                                  placeholder="Scope"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                                <input 
                                  type="text" 
                                  value={reference.description}
                                  onChange={(e) => handleDynamicInputChange('customerReferences', index, 'description', e.target.value)}
                                  className="input-field" 
                                  placeholder="Project Description"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('customerReferences', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('customerReferences', { name: '', country: '', projectSize: '', scope: '', description: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Company Overview */}
                      <div>
                        <h4 className="font-medium mb-3">Company overview</h4>
                        <div className="border border-gray-300 rounded-md overflow-hidden">
                          <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center space-x-2">
                            <select className="text-sm border border-gray-300 rounded p-1">
                              <option>Paragraph</option>
                            </select>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                            <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                            <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <textarea className="w-full p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company overview..."></textarea>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Financial Information Tab Content */}
                {activeSidebarTab === 3 && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Financial Information form submitted');
                  }} className="py-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.financialInformation}</h2>
                    
                    <h3 className="text-xl font-semibold text-center mb-6">{t.financialInformation}</h3>
                    
                    {/* Fiscal Capital Section */}
                    <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Capital <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter fiscal capital"
                          />
                        </div>
                      </div>
                      
                      {/* Domestic Sales Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Sales Details <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter domestic sales details"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Sales Value <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input 
                              type="text" 
                              className="input-field" 
                              placeholder="Enter domestic sales value"
                            />
                            <div className="absolute right-2 top-2">
                              <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Total Revenue and Annual Revenue */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total Revenue Year <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter total revenue year"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter annual revenue"
                          />
                        </div>
                      </div>
                      
                      {/* Audited Balance Sheet */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Audited Balance Sheet/P&L/Tax return + Certificate of Chartered Accountant <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button" 
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
                          >
                            Choose File
                          </button>
                          <span className="text-sm text-gray-500">No file chosen</span>
                        </div>
                      </div>
                      
                      {/* Do You Export Section */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Do You Export? <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-4">
                          <label className="inline-flex items-center">
                            <input type="radio" name="export" className="form-radio h-4 w-4 text-blue-600" />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input type="radio" name="export" className="form-radio h-4 w-4 text-blue-600" />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* Export Information */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Export Information</h4>
                        {formData.exportInformation.map((exportInfo: { year: string; marketRegion: string; country: string; valueExported: string }, index: number) => (
                          <div key={`export-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <input 
                                  type="text" 
                                  value={exportInfo.year}
                                  onChange={(e) => handleDynamicInputChange('exportInformation', index, 'year', e.target.value)}
                                  className="input-field" 
                                  placeholder="Year"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Market (Region)</label>
                                <input 
                                  type="text" 
                                  value={exportInfo.marketRegion}
                                  onChange={(e) => handleDynamicInputChange('exportInformation', index, 'marketRegion', e.target.value)}
                                  className="input-field" 
                                  placeholder="Market region"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input 
                                  type="text" 
                                  value={exportInfo.country}
                                  onChange={(e) => handleDynamicInputChange('exportInformation', index, 'country', e.target.value)}
                                  className="input-field" 
                                  placeholder="Country"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Value Exported</label>
                                <div className="relative">
                                  <input 
                                    type="text" 
                                    value={exportInfo.valueExported}
                                    onChange={(e) => handleDynamicInputChange('exportInformation', index, 'valueExported', e.target.value)}
                                    className="input-field" 
                                    placeholder="Value exported"
                                  />
                                  <div className="absolute right-2 top-2">
                                    <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('exportInformation', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('exportInformation', { year: '', marketRegion: '', country: '', valueExported: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Total No of Employees and Year of Establishment */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total No of Employees</label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter total number of employees"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
                          <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Enter year of establishment"
                          />
                        </div>
                      </div>
                      
                      {/* Type of Ownership */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Ownership</label>
                        <select className="input-field">
                          <option value="">Select type of ownership</option>
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                          <option value="government">Government</option>
                        </select>
                      </div>
                      
                      {/* Name (Owner(s) / Shareholder(s)) */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Name (Owner(s) / Shareholder(s)) <span className="text-gray-500 text-sm">يرجى كتابة الاسم باللغة العربية</span></h4>
                        {formData.owners.map((owner: { name: string; mobile: string; telephone: string; email: string }, index: number) => (
                          <div key={`owner-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input 
                                  type="text" 
                                  value={owner.name}
                                  onChange={(e) => handleDynamicInputChange('owners', index, 'name', e.target.value)}
                                  className="input-field" 
                                  placeholder="Owner name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                <input 
                                  type="text" 
                                  value={owner.mobile}
                                  onChange={(e) => handleDynamicInputChange('owners', index, 'mobile', e.target.value)}
                                  className="input-field" 
                                  placeholder="Mobile number"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                                <input 
                                  type="text" 
                                  value={owner.telephone}
                                  onChange={(e) => handleDynamicInputChange('owners', index, 'telephone', e.target.value)}
                                  className="input-field" 
                                  placeholder="Telephone number"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                <div className="relative">
                                  <input 
                                    type="email" 
                                    value={owner.email}
                                    onChange={(e) => handleDynamicInputChange('owners', index, 'email', e.target.value)}
                                    className="input-field" 
                                    placeholder="Email address"
                                  />
                                  <div className="absolute right-2 top-2">
                                    <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button 
                                type="button" 
                                onClick={() => removeRow('owners', index)}
                                className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            onClick={() => addRow('owners', { name: '', mobile: '', telephone: '', email: '' })}
                            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Company Data */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Company Data</h4>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Enter company data..."
                        ></textarea>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
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
