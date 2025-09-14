import React, { useState } from 'react'
import Select from 'react-select'
import { useLanguage, translations } from '../../../contexts/LanguageContext'
import * as yup from 'yup'

interface Tab2ContactInfoProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onDateChange?: (name: string, value: string) => void
}

const Tab2ContactInfo: React.FC<Tab2ContactInfoProps> = ({ formData, onInputChange, onDateChange }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]

  const [contactError, setContactError] = useState<string>('')
  const [representativeError, setRepresentativeError] = useState<string>('')
  const [contactNationalIdError, setContactNationalIdError] = useState<string>('')
  const [representativeNationalIdError, setRepresentativeNationalIdError] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateDate = (value: string): string => {
    if (!value) {
      return t.dateIsRequired
    }
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(value)) {
      return t.invalidFormatUseMMYYYY
    }
    const [_month, year] = value.split('/').map(Number)
    const currentYear = new Date().getFullYear()
    if (year < currentYear - 15) {
      return `Year must be within the last 15 years (from ${currentYear - 15} onwards)`
    }
    return ''
  }

  const validateNationalId = (value: string): string => {
    if (!value) {
      return 'National ID is required'
    }
    if (!/^\d{14}$/.test(value)) {
      return 'National ID must be exactly 14 digits'
    }
    return ''
  }

  const validationSchema = yup.object().shape({
    representative_fullName: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('Representative full name is required') : yup.string()
    }),
    representative_jobtitle: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('Representative job title is required') : yup.string()
    }),
    representative_mobilephone: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('Representative mobile phone is required') : yup.string()
    }),
    representative_mail: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('Representative email is required').email('Invalid email address') : yup.string()
    }),
    representative_nationalid: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('Representative national ID is required').matches(/^\d{14}$/, 'National ID must be exactly 14 digits') : yup.string()
    }),
    representative_nidissuedfrom: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('NID issued from is required') : yup.string()
    }),
    representative_nidissuedate: yup.string().when('requestApplicant', (requestApplicant: any) => {
      return requestApplicant === 'representative' ? yup.string().required('NID issue date is required').matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date format, use MM/YYYY') : yup.string()
    })
  })

  const validateField = async (fieldName: string, value: any) => {
    try {
      await validationSchema.validateAt(fieldName, { ...formData, [fieldName]: value })
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [fieldName]: error.message }))
    }
  }

  // Job title options for React Select
  const jobTitleOptions = [
    { value: 'ceo', label: 'Chief Executive Officer (CEO)' },
    { value: 'cfo', label: 'Chief Financial Officer (CFO)' },
    { value: 'coo', label: 'Chief Operating Officer (COO)' },
    { value: 'cto', label: 'Chief Technology Officer (CTO)' },
    { value: 'cmo', label: 'Chief Marketing Officer (CMO)' },
    { value: 'chro', label: 'Chief Human Resources Officer (CHRO)' },
    { value: 'cio', label: 'Chief Information Officer (CIO)' },
    { value: 'cso', label: 'Chief Security Officer (CSO)' },
    { value: 'president', label: 'President' },
    { value: 'vice_president', label: 'Vice President' },
    { value: 'director', label: 'Director' },
    { value: 'manager', label: 'Manager' },
    { value: 'senior_manager', label: 'Senior Manager' },
    { value: 'assistant_manager', label: 'Assistant Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'specialist', label: 'Specialist' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'executive', label: 'Executive' },
    { value: 'partner', label: 'Partner' },
    { value: 'owner', label: 'Owner' },
    { value: 'founder', label: 'Founder' },
    { value: 'chairman', label: 'Chairman' },
    { value: 'board_member', label: 'Board Member' },
    { value: 'general_manager', label: 'General Manager' },
    { value: 'operations_manager', label: 'Operations Manager' },
    { value: 'sales_manager', label: 'Sales Manager' },
    { value: 'marketing_manager', label: 'Marketing Manager' },
    { value: 'hr_manager', label: 'HR Manager' },
    { value: 'finance_manager', label: 'Finance Manager' },
    { value: 'it_manager', label: 'IT Manager' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'business_development_manager', label: 'Business Development Manager' },
    { value: 'account_manager', label: 'Account Manager' },
    { value: 'team_lead', label: 'Team Lead' },
    { value: 'senior_developer', label: 'Senior Developer' },
    { value: 'developer', label: 'Developer' },
    { value: 'junior_developer', label: 'Junior Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'ui_ux_designer', label: 'UI/UX Designer' },
    { value: 'graphic_designer', label: 'Graphic Designer' },
    { value: 'other', label: 'Other' }
  ]

  // Custom handler for React Select
  const handleSelectChange = (selectedOption: any, fieldName: string) => {
    const syntheticEvent = {
      target: {
        name: fieldName,
        value: selectedOption ? selectedOption.value : ''
      }
    } as React.ChangeEvent<HTMLInputElement>
    onInputChange(syntheticEvent)
    validateField(fieldName, selectedOption ? selectedOption.value : '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target

    // Remove any non-numeric characters
    value = value.replace(/[^0-9]/g, '')

    // Auto-format: add leading zero for month if needed
    if (value.length === 1 && parseInt(value) >= 1 && parseInt(value) <= 9) {
      value = '0' + value
    }

    // Insert slash after month if not present
    if (value.length >= 2 && !value.includes('/')) {
      value = value.slice(0, 2) + '/' + value.slice(2)
    }

    // Limit to MM/YYYY format (7 characters: MM/YYYY)
    if (value.length > 7) {
      value = value.substring(0, 7)
    }

    // Validate the formatted value
    const validationError = validateDate(value)
    if (name === 'contact_ldv_nidissuedate') {
      setContactError(validationError)
    } else if (name === 'representative_nidissuedate') {
      setRepresentativeError(validationError)
    }

    if (onDateChange) {
      onDateChange(name, value)
    }
    validateField(name, value)
  }

  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target

    // Remove any non-numeric characters
    value = value.replace(/[^0-9]/g, '')

    // Limit to 14 digits
    if (value.length > 14) {
      value = value.substring(0, 14)
    }

    // Validate
    const validationError = validateNationalId(value)
    if (name === 'contact_ldv_nationalid') {
      setContactNationalIdError(validationError)
    } else if (name === 'representative_nationalid') {
      setRepresentativeNationalIdError(validationError)
    }

    // Create synthetic event
    const syntheticEvent = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLInputElement>
    onInputChange(syntheticEvent)
    validateField(name, value)
  }
  
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t.contactInfoTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {t.contactInfoSubtitle}
        </p>
      </div>

      {/* Company's Head Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.companyHead}
        </h3>
        <p className="text-sm text-gray-600">
          {t.representativeSubtitle}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.name}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.name}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.title}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              options={jobTitleOptions}
              value={jobTitleOptions.find(option => option.value === formData.contact_jobtitle) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'contact_jobtitle')}
              placeholder={t.title}
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.mobile}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="contact_mobilephone"
              value={formData.contact_mobilephone}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.mobile}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.email}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="contact_mail"
              value={formData.contact_mail}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.email}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nationalId}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="contact_ldv_nationalid"
              value={formData.contact_ldv_nationalid}
              onChange={handleNationalIdChange}
              className={`input-field ${contactNationalIdError ? 'border-red-500' : ''}`}
              placeholder={t.nationalId}
              required
            />
            {contactNationalIdError && <p className="text-red-500 text-sm mt-1">{contactNationalIdError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nidIssuedFrom}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="contact_ldv_nidissuedfrom"
              value={formData.contact_ldv_nidissuedfrom}
              onChange={onInputChange}
              className="input-field"
              placeholder="e.g., Cairo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nidIssueDate}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="contact_ldv_nidissuedate"
              value={formData.contact_ldv_nidissuedate}
              onChange={handleInputChange}
              onBlur={() => {
                const validationError = validateDate(formData.contact_ldv_nidissuedate)
                setContactError(validationError)
              }}
              className={`input-field ${contactError ? 'border-red-500' : ''}`}
              placeholder="MM/YYYY"
              required
            />
            {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
          </div>

        </div>

        
      </div>

      {/* Request Applicant Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.requestApplicant}
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="radio"
              name="requestApplicant"
              value="company-in-charge"
              checked={formData.requestApplicant === 'company-in-charge'}
              onChange={onInputChange}
              className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300"
            />
            <span className="text-sm text-gray-700">
              {t.companyInCharge}
            </span>
          </label>
          
          <label className="flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="radio"
              name="requestApplicant"
              value="representative"
              checked={formData.requestApplicant === 'representative'}
              onChange={onInputChange}
              className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300"
            />
            <span className="text-sm text-gray-700">
              {t.representative}
            </span>
          </label>
        </div>
      </div>

      {/* Company Representative */}
      {formData.requestApplicant === 'representative' && (
        <div className="space-y-6 representative_section">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Representative Informations
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.name}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representative_fullName"
              value={formData.representative_fullName}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.name}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.title}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              options={jobTitleOptions}
              value={jobTitleOptions.find(option => option.value === formData.representative_jobtitle) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'representative_jobtitle')}
              placeholder={t.title}
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.mobile}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="representative_mobilephone"
              value={formData.representative_mobilephone}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.mobile}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.email}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="representative_mail"
              value={formData.representative_mail}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.email}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nationalId}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representative_nationalid"
              value={formData.representative_nationalid}
              onChange={handleNationalIdChange}
              className={`input-field ${representativeNationalIdError ? 'border-red-500' : ''}`}
              placeholder={t.nationalId}
              required
            />
            {representativeNationalIdError && <p className="text-red-500 text-sm mt-1">{representativeNationalIdError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NID Issued from
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representative_nidissuedfrom"
              value={formData.representative_nidissuedfrom}
              onChange={onInputChange}
              className="input-field"
              placeholder="e.g., Cairo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NID Issue Date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representative_nidissuedate"
              value={formData.representative_nidissuedate}
              onChange={handleInputChange}
              onBlur={() => {
                const validationError = validateDate(formData.representative_nidissuedate)
                setRepresentativeError(validationError)
              }}
              className={`input-field ${representativeError ? 'border-red-500' : ''}`}
              placeholder="MM/YYYY"
              required
            />
            {representativeError && <p className="text-red-500 text-sm mt-1">{representativeError}</p>}
          </div>

        </div>

        
      </div>
      )}

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {t.noteRequiredFields}
        </p>
      </div>
    </div>
  )
}

export default Tab2ContactInfo
