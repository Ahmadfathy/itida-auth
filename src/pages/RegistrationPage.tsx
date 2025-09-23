import React, { useState } from 'react'
import Alert from '../components/Alert'
import { useTranslation } from '../hooks/useTranslation'
import {
  getValidationMessage,
  validateActivities,
  validateAttachments,
  validateCompanyHeads,
  validateContactPersons,
  validateRegistrationForm,
  ValidationResult
} from '../utils/validation'

import CompanyHeadInformation from '../components/registration/CompanyHeadInformation'
// import CompanyHeadInformation from '../components/registration/registrationCompany/CompanyHeadInformation'
import FinancialInformation from '../components/registration/FinancialInformation'
import RegistrationCompany from '../components/registration/RegistrationCompany'

interface RegistrationPageProps {
  onBackToHome?: () => void
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBackToHome }) => {
  const t = useTranslation()
  const [activeSidebarTab, setActiveSidebarTab] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const multipleTypes = [
    'Sole Corporation',
    'General Partnership',
    'Limited Liability Company',
    'Joint',
    'Special Limited Partnership',
    'Inherited Company',
    'Limited Partnership by Shares',
    'Cooperative Associations',
    'De Facto Company',
    'Branch of Foreign Company'
  ]

  const [formData, setFormData] = useState<any>({
    // Dynamic arrays for repeatable sections
    companyHeads: [{ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' }],
    contactPersons: [{ name: '', position: '', mobile: '', nationalId: '', email: '' }],
    products: [{ name: '', description: '' }],
    services: [{ name: '', description: '' }],
    customerReferences: [{ name: '', country: '', projectSize: '', scope: '', industriesSector: '', description: '' }],
    exportInformation: [{ year: '', marketRegion: '', country: '', valueExported: '' }],
    owners: [{ name: '', mobile: '', telephone: '', email: '' }],
    domesticSalesDetails: [{ year: '', value: '', totalRevenueYear: '' }],
    // Tab 1: Company Legal Information
    companyNameEn: '',
    companyNameAr: '',
    commercialDenomination: '',
    legalType: '',
    companyClassification: [{ companyClassification: '', subClassification: '' }],
    registerUsing: {
      commercialRegistry: true,
      unifiedCommercialRegistry: true,
      taxRegistry: true
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
    branches: [{ branchName: '', branchCountry: '', branchGovernorate: '', branchCity: '', branchDistrict: '', branchEmail: '', mobilePhone: '' }],
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
      declarationUndertaking: null,
      representativeAuthorization: null,
      representativeNationalId: null
    },
    licenseReceiptMethod: '',
    declarationAgreement: false,

    // Financial Information
    fiscalCapital: '',
    domesticSalesValue: '',
    totalRevenueYear: '',
    annualRevenue: '',
    auditedBalanceSheet: null,
    export: '',
    ownershipNationality: '',
    percentageEgyptianOwnership: '',
    percentageNonEgyptianOwnership: '',
    partnersNationalities: '',
    totalNoOfEmployees: '',
    yearOfEstablishment: '',
    companySize: '',
    typeOfOwnership: '',
    companyOverView: '',

    // Updated fields to arrays for multi-select
    keyTechnologies: [],
    certificates: [],
    affiliation: [],
    memberships: [],
    partnerships: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    let newFormData: any

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      newFormData = {
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: type === 'checkbox' ? checked : value
        }
      }
    } else {
      newFormData = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      }
    }

    // Adjust companyHeads based on legal type
    if (name === 'ldv_legaltypecode') {
      const isMultiple = multipleTypes.includes(value)
      const minRows = isMultiple ? 2 : 1
      let newCompanyHeads = [...newFormData.companyHeads]
      while (newCompanyHeads.length < minRows) {
        newCompanyHeads.push({ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' })
      }
      while (newCompanyHeads.length > minRows) {
        newCompanyHeads.pop()
      }
      newFormData.companyHeads = newCompanyHeads
    }

    setFormData(newFormData)
  }

  const handleDateChange = (name: string, value: string) => {
    // Validate MM/YYYY format and year >= currentYear - 15
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(value)) {
      // Invalid format, do not update formData
      return
    }
    const [_month, year] = value.split('/').map(Number)
    const currentYear = new Date().getFullYear()
    if (year > currentYear - 15) {
      // Year too recent, do not update formData
      return
    }
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value
    }))
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
    const isMultiple = multipleTypes.includes(formData.ldv_legaltypecode)
    const minRows = isMultiple ? 2 : 1

    // Enforce minRows=1 for all sections except companyHeads and contactPersons
    const minRowsForSection = (section === 'companyHeads' || section === 'contactPersons') ? minRows : 1

    if (formData[section].length <= minRowsForSection) {
      // Don't remove below minimum, just clear the row
      const emptyRow = Object.keys(formData[section][0]).reduce((acc, key) => {
        acc[key] = ''
        return acc
      }, {} as any)

      setFormData((prev: typeof formData) => ({
        ...prev,
        [section]: formData[section].map((row: any, i: number) => i === index ? emptyRow : row)
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

    // Validate the form based on active tab
    let validation: ValidationResult

    switch (activeSidebarTab) {
      case 1:
        validation = validateRegistrationForm(formData)
        break
      case 2:
        const companyHeadsValidation = validateCompanyHeads(formData.companyHeads)
        const contactPersonsValidation = validateContactPersons(formData.contactPersons)
        validation = {
          isValid: companyHeadsValidation.isValid && contactPersonsValidation.isValid,
          errors: [...companyHeadsValidation.errors, ...contactPersonsValidation.errors],
          emptyFields: [...companyHeadsValidation.emptyFields, ...contactPersonsValidation.emptyFields]
        }
        break
      case 3:
        const activitiesValidation = validateActivities(formData.activities)
        const attachmentsValidation = validateAttachments(formData.attachments)
        validation = {
          isValid: activitiesValidation.isValid && attachmentsValidation.isValid,
          errors: [...activitiesValidation.errors, ...attachmentsValidation.errors],
          emptyFields: [...activitiesValidation.emptyFields, ...attachmentsValidation.emptyFields]
        }
        break
      default:
        validation = { isValid: true, errors: [], emptyFields: [] }
    }

    // Validation result stored in validation variable

    if (!validation.isValid) {
      setAlertMessage(getValidationMessage(validation, t))
      setShowAlert(true)
      return
    }

    // If validation passes, proceed with submission
    console.log('Form submitted:', formData)
    setShowAlert(false)
    // Handle form submission here
  }

  const handleTabChange = (tabNumber: number) => {
    // Validate current tab before switching
    if (activeSidebarTab !== tabNumber) {
      let validation: ValidationResult

      switch (activeSidebarTab) {
        case 1:
          validation = validateRegistrationForm(formData)
          break
        case 2:
          const companyHeadsValidation = validateCompanyHeads(formData.companyHeads)
          const contactPersonsValidation = validateContactPersons(formData.contactPersons)
          validation = {
            isValid: companyHeadsValidation.isValid && contactPersonsValidation.isValid,
            errors: [...companyHeadsValidation.errors, ...contactPersonsValidation.errors],
            emptyFields: [...companyHeadsValidation.emptyFields, ...contactPersonsValidation.emptyFields]
          }
          break
        case 3:
          const activitiesValidation = validateActivities(formData.activities)
          const attachmentsValidation = validateAttachments(formData.attachments)
          validation = {
            isValid: activitiesValidation.isValid && attachmentsValidation.isValid,
            errors: [...activitiesValidation.errors, ...attachmentsValidation.errors],
            emptyFields: [...activitiesValidation.emptyFields, ...attachmentsValidation.emptyFields]
          }
          break
        default:
          validation = { isValid: true, errors: [], emptyFields: [] }
      }

      if (!validation.isValid) {
        // Validation result stored in validation variable
        setAlertMessage(getValidationMessage(validation, t))
        setShowAlert(true)
        return
      }
    }

    setActiveSidebarTab(tabNumber)
    setShowAlert(false)
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
      case 4:
        return formData.declarationAgreement
      default:
        return false
    }
  }

  const isSidebarTabComplete = (tabNumber: number): boolean => {
    switch (tabNumber) {
      case 1:
        // Check if all 4 sub-tabs are complete
        return isTabValid(1) && isTabValid(2) && isTabValid(3) && isTabValid(4)
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
      case 4:
        // Check if at least one activity is selected and required attachments are uploaded
        const hasSelectedActivity = Object.values(formData.activities).some((activity: any) => activity)
        const hasRequiredAttachments = formData.attachments.commercialRegister && formData.attachments.taxCard
        return hasSelectedActivity && hasRequiredAttachments
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
                      onClick={() => handleTabChange(1)}
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
                      onClick={() => handleTabChange(2)}
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
                      onClick={() => handleTabChange(3)}
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
                {/* Alert for validation errors */}
                {showAlert && (
                  <div className="mb-6">
                    <Alert
                      type="error"
                      title={t.alertTitle}
                      message={alertMessage}
                      onClose={() => setShowAlert(false)}
                      show={showAlert}
                    />
                  </div>
                )}
                {/* Only show the wizard form in the first sidebar tab */}
                {activeSidebarTab === 1 && (
                  <RegistrationCompany
                    formData={formData}
                    onInputChange={handleInputChange}
                    onDateChange={handleDateChange}
                    setFormData={setFormData}
                    handleDynamicInputChange={handleDynamicInputChange}
                    addRow={addRow}
                    removeRow={removeRow}
                    onFileChange={handleFileChange}
                    t={t}
                    onSubmit={handleSubmit}
                  />
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
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    handleDynamicInputChange={handleDynamicInputChange}
                    addRow={addRow}
                    removeRow={removeRow}
                    t={t}
                    onSubmit={handleSubmit}
                    handleFileChange={function (_file: File | null): void {
                      throw new Error('Function not implemented.')
                    }}
                  />
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
