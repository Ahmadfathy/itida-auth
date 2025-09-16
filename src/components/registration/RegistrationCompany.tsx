import React, { useState } from 'react'
import Select from 'react-select'
import { useLanguage } from '../../contexts/LanguageContext'
import Tab1CompanyLegal from './registrationCompany/Tab1CompanyLegal'
import Tab2ContactInfo from './registrationCompany/Tab2ContactInfo'
import Tab3CompanyBranches from './registrationCompany/Tab3CompanyBranches'
import Tab4ActivitiesAttachments from './registrationCompany/Tab4ActivitiesAttachments'

interface RegistrationCompanyProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onDateChange: (name: string, value: string) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
  onFileChange: (fieldName: string, file: File | null) => void
  t: any
  onSubmit: (e: React.FormEvent) => void
}

const RegistrationCompany: React.FC<RegistrationCompanyProps> = ({
  formData,
  onInputChange,
  onDateChange,
  setFormData,
  handleDynamicInputChange,
  addRow,
  removeRow,
  onFileChange,
  t,
  onSubmit
}) => {
  const { language } = useLanguage()
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({ 1: true, 2: false, 3: false, 4: false })

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

  return (
    <form onSubmit={onSubmit}>
      {/* Accordion Sections */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((section) => {
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
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-itida-blue rounded-lg"
                aria-expanded={isOpen}
                aria-controls={`accordion-section-${section}`}
              >
                <span className="font-semibold text-lg">
                  {section === 1 && t.companyLegalInformation}
                  {section === 2 && t.contactInformation}
                  {section === 3 && t.companyBranchesTitle}
                  {section === 4 && t.activitiesAttachments}
                </span>
                {arrowIcon}
              </button>
              {isOpen && (
                <div id={`accordion-section-${section}`} className="p-6 bg-white rounded-b-lg">
                  {section === 1 && (
                    <Tab1CompanyLegal formData={formData} onInputChange={onInputChange} setFormData={setFormData} />
                  )}
                  {section === 2 && (
                    <Tab2ContactInfo formData={formData} onInputChange={onInputChange} onDateChange={onDateChange} />
                  )}
                  {section === 3 && (
                    <Tab3CompanyBranches formData={formData} setFormData={setFormData} handleDynamicInputChange={handleDynamicInputChange} addRow={addRow} removeRow={removeRow} />
                  )}
                  {section === 4 && (
                    <Tab4ActivitiesAttachments formData={formData} onInputChange={onInputChange} onFileChange={onFileChange} />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Company OverView */}
      <div className='mt-6'>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.companyOverView}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          name="companyOverView"
          id="companyOverView"
          className="input-field"
          placeholder={t.companyOverviewPlaceholder}
          value={formData.companyOverView}
          onChange={onInputChange}
        />
      </div>

      {/* License Receipt Method */}
      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.methodOfLicenseReceipt}
          </label>
          <Select
            name="licenseReceiptMethod"
            value={
              [
                { value: '', label: t.selectReceiptMethod },
                { value: 'email', label: language === 'ar' ? 'بريد إلكتروني' : 'Email' },
                { value: 'postal', label: t.postalMail },
                { value: 'pickup', label: t.personalPickup },
                { value: 'courier', label: t.courier }
              ].find(option => option.value === formData.licenseReceiptMethod) || null
            }
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : '';
              onInputChange({
                target: {
                  name: 'licenseReceiptMethod',
                  value: value
                }
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            options={[
              { value: '', label: t.selectReceiptMethod },
              { value: 'email', label: language === 'ar' ? 'بريد إلكتروني' : 'Email' },
              { value: 'postal', label: t.postalMail },
              { value: 'pickup', label: t.personalPickup },
              { value: 'courier', label: t.courier }
            ]}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (provided) => ({
                ...provided,
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                padding: '0.25rem',
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: '#9ca3af'
                }
              })
            }}
            isClearable
          />
        </div>
      </div>

      {/* Declaration Agreement */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.declarationAgreement}
        </h3>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {t.declarationText}
          </p>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="declarationAgreement"
              checked={formData.declarationAgreement}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
              required
            />
            <span className="text-sm text-gray-700">
              {t.iAgree}
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={!isTabValid(1) || !isTabValid(2) || !isTabValid(3) || !isTabValid(4)}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${isTabValid(1) && isTabValid(2) && isTabValid(3) && isTabValid(4)
            ? 'bg-itida-blue hover:bg-itida-dark text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {t.submitRegistration}
        </button>
      </div>
    </form>
  )
}

export default RegistrationCompany
