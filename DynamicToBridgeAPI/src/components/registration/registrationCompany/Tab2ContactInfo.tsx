import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLanguage, translations } from '../../../contexts/LanguageContext'

interface Tab2ContactInfoProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onDateChange?: (name: string, value: string) => void
}

const Tab2ContactInfo: React.FC<Tab2ContactInfoProps> = ({ formData, onInputChange, onDateChange }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]

  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const [month, year] = dateStr.split('/').map(Number)
    return new Date(year, month - 1, 1)
  }

  const [contactError, setContactError] = useState<string>('')
  const [representativeError, setRepresentativeError] = useState<string>('')
  const [contactNationalIdError, setContactNationalIdError] = useState<string>('')
  const [representativeNationalIdError, setRepresentativeNationalIdError] = useState<string>('')

  const [selectedDate, setSelectedDate] = useState<Date | null>(parseDate(formData.contact_ldv_nidissuedate))
  const [selectedDateRepresentative, setSelectedDateRepresentative] = useState<Date | null>(parseDate(formData.representative_nidissuedate))

  useEffect(() => {
    setSelectedDate(parseDate(formData.contact_ldv_nidissuedate))
  }, [formData.contact_ldv_nidissuedate])

  useEffect(() => {
    setSelectedDateRepresentative(parseDate(formData.representative_nidissuedate))
  }, [formData.representative_nidissuedate])

  const validateDate = (value: string): string => {
    if (!value) {
      return t.dateIsRequired
    }
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(value)) {
      return t.invalidFormatUseMMYYYY
    }
    const [month, year] = value.split('/').map(Number)
    const currentDate = new Date()
    const minDate = new Date(currentDate.getFullYear() - 7, currentDate.getMonth(), currentDate.getDate())
    const inputDate = new Date(year, month - 1, 1)
    if (inputDate < minDate || inputDate > currentDate) {
      return `Date must be between ${minDate.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })} and today`
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

  const handleDateChange = (date: Date | null, fieldName: string) => {
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear().toString()
      const value = `${month}/${year}`
      const validationError = validateDate(value)
      if (fieldName === 'contact_ldv_nidissuedate') {
        setContactError(validationError)
      } else if (fieldName === 'representative_nidissuedate') {
        setRepresentativeError(validationError)
      }
      if (onDateChange) {
        onDateChange(fieldName, value)
      }
    } else {
      // Clear error if date is cleared
      if (fieldName === 'contact_ldv_nidissuedate') {
        setContactError('')
      } else if (fieldName === 'representative_nidissuedate') {
        setRepresentativeError('')
      }
      if (onDateChange) {
        onDateChange(fieldName, '')
      }
    }
  }





  // Job title options for React Select
  const jobTitleOptions = [
    { value: 'partner', label: t.jobTitlePartner },
    { value: 'responsible_manager', label: t.jobTitleResponsibleManager },
    { value: 'manager_and_partner', label: t.jobTitleManagerAndPartner }
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
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date)
                handleDateChange(date, 'contact_ldv_nidissuedate')
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              minDate={new Date(new Date().getFullYear() - 7, new Date().getMonth(), new Date().getDate())}
              maxDate={new Date()}
              className={`input-field ${contactError ? 'border-red-500' : ''}`}
              placeholderText="MM/YYYY"
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
            <DatePicker
              selected={selectedDateRepresentative}
              onChange={(date) => {
                setSelectedDateRepresentative(date)
                handleDateChange(date, 'representative_nidissuedate')
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              minDate={new Date(new Date().getFullYear() - 7, new Date().getMonth(), new Date().getDate())}
              maxDate={new Date()}
              className={`input-field ${representativeError ? 'border-red-500' : ''}`}
              placeholderText="MM/YYYY"
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
