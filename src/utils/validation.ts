/**
 * Validation utility functions for form data checking
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  emptyFields: string[]
}

export interface FieldValidation {
  field: string
  value: any
  required: boolean
  label: string
}

/**
 * Check if a value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Validate a single field
 */
export const validateField = (field: FieldValidation): string | null => {
  if (field.required && isEmpty(field.value)) {
    return field.label
  }
  return null
}

/**
 * Validate multiple fields and return validation result
 */
export const validateFields = (fields: FieldValidation[]): ValidationResult => {
  const errors: string[] = []
  const emptyFields: string[] = []

  fields.forEach(field => {
    if (field.required && isEmpty(field.value)) {
      emptyFields.push(field.label)
      errors.push(`${field.label} is required`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    emptyFields
  }
}

/**
 * Validate registration form data
 */
export const validateRegistrationForm = (formData: any): ValidationResult => {
  const fields: FieldValidation[] = [
    // Basic company information
    { field: 'companyNameEn', value: formData.companyNameEn, required: true, label: 'Company Name (English)' },
    { field: 'companyNameAr', value: formData.companyNameAr, required: true, label: 'Company Name (Arabic)' },
    { field: 'legalType', value: formData.legalType, required: true, label: 'Legal Type' },

    // Contact information
    { field: 'governorate', value: formData.governorate, required: true, label: 'Governorate' },
    { field: 'district', value: formData.district, required: true, label: 'District' },
    { field: 'streetAddress', value: formData.streetAddress, required: true, label: 'Street Address' },
    { field: 'officialEmail', value: formData.officialEmail, required: true, label: 'Official Email' },
    { field: 'phoneMobile', value: formData.phoneMobile, required: true, label: 'Phone/Mobile' },

    // Representative information
    { field: 'representativeName', value: formData.representativeName, required: true, label: 'Representative Name' },
    { field: 'representativeTitle', value: formData.representativeTitle, required: true, label: 'Representative Title' },
    { field: 'representativeMobile', value: formData.representativeMobile, required: true, label: 'Representative Mobile' },
    { field: 'representativeNationalId', value: formData.representativeNationalId, required: true, label: 'Representative National ID' },
    { field: 'representativeEmail', value: formData.representativeEmail, required: true, label: 'Representative Email' },

    // Registration numbers
    { field: 'commercialRegistryNumber', value: formData.commercialRegistryNumber, required: true, label: 'Commercial Registry Number' },
    { field: 'unifiedCommercialRegistryNumber', value: formData.unifiedCommercialRegistryNumber, required: true, label: 'Unified Commercial Registry Number' },
    { field: 'taxRegistryNumber', value: formData.taxRegistryNumber, required: true, label: 'Tax Registry Number' },

    // Financial information
    { field: 'fiscalCapital', value: formData.fiscalCapital, required: true, label: 'Fiscal Capital' },
    { field: 'annualRevenue', value: formData.annualRevenue, required: true, label: 'Annual Revenue' },
    { field: 'totalNoOfEmployees', value: formData.totalNoOfEmployees, required: true, label: 'Total Number of Employees' },
    { field: 'yearOfEstablishment', value: formData.yearOfEstablishment, required: true, label: 'Year of Establishment' },
  ]

  return validateFields(fields)
}

/**
 * Validate company heads array
 */
export const validateCompanyHeads = (companyHeads: any[]): ValidationResult => {
  const errors: string[] = []
  const emptyFields: string[] = []

  companyHeads.forEach((head, index) => {
    const headNumber = index + 1
    const headFields: FieldValidation[] = [
      { field: 'name', value: head.name, required: true, label: `Company Head ${headNumber} - Name` },
      { field: 'position', value: head.position, required: true, label: `Company Head ${headNumber} - Position` },
      { field: 'mobile', value: head.mobile, required: true, label: `Company Head ${headNumber} - Mobile` },
      { field: 'nationalId', value: head.nationalId, required: true, label: `Company Head ${headNumber} - National ID` },
      { field: 'email', value: head.email, required: true, label: `Company Head ${headNumber} - Email` },
    ]

    headFields.forEach(field => {
      if (field.required && isEmpty(field.value)) {
        emptyFields.push(field.label)
        errors.push(`${field.label} is required`)
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
    emptyFields
  }
}

/**
 * Validate contact persons array
 */
export const validateContactPersons = (contactPersons: any[]): ValidationResult => {
  const errors: string[] = []
  const emptyFields: string[] = []

  contactPersons.forEach((person, index) => {
    const personNumber = index + 1
    const personFields: FieldValidation[] = [
      { field: 'name', value: person.name, required: true, label: `Contact Person ${personNumber} - Name` },
      { field: 'position', value: person.position, required: true, label: `Contact Person ${personNumber} - Position` },
      { field: 'mobile', value: person.mobile, required: true, label: `Contact Person ${personNumber} - Mobile` },
      { field: 'nationalId', value: person.nationalId, required: true, label: `Contact Person ${personNumber} - National ID` },
      { field: 'email', value: person.email, required: true, label: `Contact Person ${personNumber} - Email` },
    ]

    personFields.forEach(field => {
      if (field.required && isEmpty(field.value)) {
        emptyFields.push(field.label)
        errors.push(`${field.label} is required`)
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
    emptyFields
  }
}

/**
 * Validate login form data
 */
export const validateLoginForm = (formData: any): ValidationResult => {
  const fields: FieldValidation[] = [
    { field: 'username', value: formData.username, required: true, label: 'Username or Email' },
    { field: 'password', value: formData.password, required: true, label: 'Password' },
  ]

  return validateFields(fields)
}

/**
 * Validate forgot password form data
 */
export const validateForgotPasswordForm = (formData: any): ValidationResult => {
  const fields: FieldValidation[] = [
    { field: 'email', value: formData.email, required: true, label: 'Email Address' },
  ]

  return validateFields(fields)
}

/**
 * Check if at least one activity is selected
 */
export const validateActivities = (activities: any): ValidationResult => {
  const hasSelectedActivity = Object.values(activities).some((activity: any) => activity === true)

  if (!hasSelectedActivity) {
    return {
      isValid: false,
      errors: ['At least one activity must be selected'],
      emptyFields: ['Activities']
    }
  }

  return {
    isValid: true,
    errors: [],
    emptyFields: []
  }
}

/**
 * Check if required attachments are uploaded
 */
export const validateAttachments = (attachments: any): ValidationResult => {
  const requiredAttachments = ['commercialRegister', 'taxCard']
  const missingAttachments: string[] = []

  requiredAttachments.forEach(attachment => {
    if (!attachments[attachment]) {
      missingAttachments.push(attachment)
    }
  })

  if (missingAttachments.length > 0) {
    return {
      isValid: false,
      errors: [`Required attachments missing: ${missingAttachments.join(', ')}`],
      emptyFields: missingAttachments
    }
  }

  return {
    isValid: true,
    errors: [],
    emptyFields: []
  }
}

/**
 * Get validation message for display
 */
export const getValidationMessage = (result: ValidationResult, translations: any): string => {
  if (result.isValid) return ''

  if (result.emptyFields.length === 1) {
    return `${translations.pleaseCompleteEmptyFields} ${result.emptyFields[0]}`
  } else if (result.emptyFields.length > 1) {
    return `${translations.pleaseCompleteEmptyFields} ${result.emptyFields.join(', ')}`
  }

  return translations.pleaseCompleteAllRequiredFields
}
