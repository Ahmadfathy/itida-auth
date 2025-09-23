import React, { useEffect, useState } from 'react'
import { useLookups, useRegistrationForm } from '../hooks/useApi'
import { useTranslation } from '../hooks/useTranslation'

import CompanyHeadInformation from '../components/registration/CompanyHeadInformation'
import FinancialInformation from '../components/registration/FinancialInformation'
import RegistrationCompany from '../components/registration/RegistrationCompany'

interface RegistrationPageWithApiProps {
  onBackToHome?: () => void
}

const RegistrationPageWithApi: React.FC<RegistrationPageWithApiProps> = ({ onBackToHome }) => {
  const t = useTranslation()
  const [activeSidebarTab, setActiveSidebarTab] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)

  // API hooks
  const {
    formData,
    isDirty,
    isSaving,
    lastSaved,
    errors,
    updateField,
    updateNestedField,
    updateArrayField,
    addArrayItem,
    removeArrayItem,
    validateField,
    saveDraftManually,
    loadDraftData,
    submitForm
  } = useRegistrationForm()

  const lookups = useLookups()

  // Load lookup data on component mount
  useEffect(() => {
    lookups.governorates.execute()
    lookups.countries.execute()
    lookups.legalTypes.execute()
    lookups.companyClassifications.execute()
    lookups.keyTechnologies.execute()
    lookups.certificates.execute()
    lookups.memberships.execute()
    lookups.partnerships.execute()
    lookups.affiliations.execute()
    lookups.nationalities.execute()
  }, [])

  // Auto-save indicator
  useEffect(() => {
    if (isSaving) {
      console.log('Auto-saving form data...')
    }
  }, [isSaving])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      updateNestedField(parent, child, type === 'checkbox' ? checked : value)
    } else {
      updateField(name, type === 'checkbox' ? checked : value)
    }

    // Adjust companyHeads based on legal type
    if (name === 'ldv_legaltypecode') {
      const isMultiple = multipleTypes.includes(value)
      const minRows = isMultiple ? 2 : 1
      let newCompanyHeads = [...(formData.companyHeads || [])]

      while (newCompanyHeads.length < minRows) {
        newCompanyHeads.push({ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' })
      }
      while (newCompanyHeads.length > minRows) {
        newCompanyHeads.pop()
      }
      updateField('companyHeads', newCompanyHeads)
    }

    // Validate field in real-time
    if (['ldv_englishname', 'ldv_arabicname', 'contact_ldv_nationalid', 'representative_nationalid', 'emailaddress1', 'contact_mail', 'representative_mail'].includes(name)) {
      validateField(name, value)
    }
  }

  const handleDateChange = (name: string, value: string) => {
    // Validate MM/YYYY format and year >= currentYear - 15
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(value)) {
      return
    }
    const [_month, year] = value.split('/').map(Number)
    const currentYear = new Date().getFullYear()
    if (year > currentYear - 15) {
      return
    }
    updateField(name, value)
  }

  // Handle input change for dynamic array fields
  const handleDynamicInputChange = (section: string, index: number, field: string, value: string) => {
    updateArrayField(section, index, field, value)
  }

  // Add a new row to a dynamic section
  const addRow = (section: string, emptyRow: any) => {
    addArrayItem(section, emptyRow)
  }

  // Remove a row from a dynamic section
  const removeRow = (section: string, index: number) => {
    const isMultiple = multipleTypes.includes(formData.ldv_legaltypecode || '')
    const minRows = isMultiple ? 2 : 1

    // Enforce minRows=1 for all sections except companyHeads and contactPersons
    const minRowsForSection = (section === 'companyHeads' || section === 'contactPersons') ? minRows : 1

    if ((formData[section as keyof typeof formData] as any[])?.length <= minRowsForSection) {
      // Don't remove below minimum, just clear the row
      const emptyRow = Object.keys((formData[section as keyof typeof formData] as any[])[0] || {}).reduce((acc, key) => {
        acc[key] = ''
        return acc
      }, {} as any)

      const sectionArray = [...(formData[section as keyof typeof formData] as any[])]
      sectionArray[index] = emptyRow
      updateField(section, sectionArray)
    } else {
      removeArrayItem(section, index)
    }
  }

  const handleFileChange = (fieldName: string, file: File | null) => {
    updateNestedField('attachments', fieldName, file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await submitForm()
      setSubmissionResult(result)
      setShowSuccessMessage(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  const handleSaveDraft = async () => {
    try {
      await saveDraftManually()
      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Failed to save draft:', error)
      alert('Failed to save draft. Please try again.')
    }
  }

  const handleLoadDraft = async (draftId: string) => {
    try {
      await loadDraftData(draftId)
      alert('Draft loaded successfully!')
    } catch (error) {
      console.error('Failed to load draft:', error)
      alert('Failed to load draft. Please try again.')
    }
  }

  const isTabValid = (tabNumber: number): boolean => {
    switch (tabNumber) {
      case 1:
        return !!(formData.ldv_englishname && formData.ldv_arabicname && formData.ldv_legaltypecode)
      case 2:
        return !!(formData.governorate && formData.district && formData.fullName &&
          formData.contact_jobtitle && formData.contact_mobilephone &&
          formData.contact_ldv_nationalid && formData.contact_mail)
      case 3:
        return !!formData.declarationAgreement
      case 4:
        return !!formData.declarationAgreement
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
        const hasValidCompanyHeads = (formData.companyHeads || []).every((head: any) =>
          head.name && head.position && head.mobile && head.nationalId && head.email
        )
        const hasValidContactPersons = (formData.contactPersons || []).every((person: any) =>
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
        const hasSelectedActivity = formData.activities ? Object.values(formData.activities).some((activity: any) => activity) : false
        const hasRequiredAttachments = formData.attachments?.commercialRegister && formData.attachments?.taxCard
        return !!(hasSelectedActivity && hasRequiredAttachments)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Success Message */}
      {showSuccessMessage && submissionResult && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Registration Submitted Successfully!</p>
              <p className="text-sm">ID: {submissionResult.registrationId}</p>
            </div>
          </div>
        </div>
      )}

      {/* Auto-save indicator */}
      {isSaving && (
        <div className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm">Auto-saving...</span>
          </div>
        </div>
      )}

      {/* Last saved indicator */}
      {lastSaved && !isSaving && (
        <div className="fixed top-4 left-4 bg-gray-500 text-white p-2 rounded shadow-lg z-50">
          <span className="text-sm">Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
        </div>
      )}

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

          {/* Form Actions */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handleSaveDraft}
                disabled={!isDirty}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleLoadDraft('draft_123')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Load Draft
              </button>
            </div>

            {isDirty && (
              <div className="text-sm text-orange-600">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Unsaved changes
              </div>
            )}
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
                  <RegistrationCompany
                    formData={formData}
                    onInputChange={handleInputChange}
                    onDateChange={handleDateChange}
                    setFormData={(newData) => {
                      Object.keys(newData).forEach(key => {
                        updateField(key, newData[key])
                      })
                    }}
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
                    formData={{
                      ownershipNationality: formData.ownershipNationality || '',
                      percentageEgyptianOwnership: formData.percentageEgyptianOwnership || '',
                      percentageNonEgyptianOwnership: formData.percentageNonEgyptianOwnership || '',
                      partnersNationalities: formData.partnersNationalities || '',
                      subClassification: '',
                      companyClassification: formData.companyClassification || [],
                      fiscalCapital: formData.fiscalCapital || '',
                      domesticSalesDetails: formData.domesticSalesDetails || [],
                      domesticSalesValue: formData.domesticSalesValue || '',
                      totalRevenueYear: formData.totalRevenueYear || '',
                      annualRevenue: formData.annualRevenue || '',
                      auditedBalanceSheet: formData.auditedBalanceSheet || null,
                      export: formData.export || '',
                      exportInformation: formData.exportInformation || [],
                      totalNoOfEmployees: formData.totalNoOfEmployees || '',
                      yearOfEstablishment: formData.yearOfEstablishment || '',
                      companySize: formData.companySize || '',
                      typeOfOwnership: formData.typeOfOwnership || '',
                      owners: formData.owners || [],
                      companyData: formData.companyData || '',
                      products: formData.products || [],
                      services: formData.services || [],
                      customerReferences: formData.customerReferences || [],
                      parent: formData.parent || '',
                      child: formData.child || '',
                      grandChild: formData.grandChild || '',
                      industrySectors: formData.industrySectors || '',
                      keyTechnologies: formData.keyTechnologies || [],
                      certificates: formData.certificates || [],
                      affiliation: formData.affiliation || [],
                      memberships: formData.memberships || [],
                      partnerships: formData.partnerships || [],
                      companyOverview: formData.companyOverview || ''
                    }}
                    setFormData={(newData) => {
                      Object.keys(newData).forEach(key => {
                        updateField(key, newData[key])
                      })
                    }}
                    handleInputChange={handleInputChange}
                    handleDynamicInputChange={handleDynamicInputChange}
                    addRow={addRow}
                    removeRow={removeRow}
                    t={t}
                    onSubmit={handleSubmit}
                    handleFileChange={(file: File | null) => handleFileChange('auditedBalanceSheet', file)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Form Validation Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {field}: {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default RegistrationPageWithApi
