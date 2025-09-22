import React, { useCallback, useState } from 'react'
import { ApiResponse, apiService, RegistrationFormData } from '../services/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>
  reset: () => void
}

// Generic hook for API calls
function useApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiFunction(...args)

      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null
        })
      } else {
        setState({
          data: null,
          loading: false,
          error: response.message || 'An error occurred'
        })
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      })
    }
  }, [apiFunction])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    })
  }, [])

  return {
    ...state,
    execute,
    reset
  }
}

// Specific hooks for different API operations
export const useValidation = () => {
  const validateCompanyName = useApi(apiService.validateCompanyName)
  const validateNationalId = useApi(apiService.validateNationalId)
  const validateEmail = useApi(apiService.validateEmail)

  return {
    validateCompanyName,
    validateNationalId,
    validateEmail
  }
}

export const useLookups = () => {
  const governorates = useApi(apiService.getGovernorates)
  const countries = useApi(apiService.getCountries)
  const legalTypes = useApi(apiService.getLegalTypes)
  const companyClassifications = useApi(apiService.getCompanyClassifications)
  const keyTechnologies = useApi(apiService.getKeyTechnologies)
  const certificates = useApi(apiService.getCertificates)
  const memberships = useApi(apiService.getMemberships)
  const partnerships = useApi(apiService.getPartnerships)
  const affiliations = useApi(apiService.getAffiliations)
  const nationalities = useApi(apiService.getNationalities)

  return {
    governorates,
    countries,
    legalTypes,
    companyClassifications,
    keyTechnologies,
    certificates,
    memberships,
    partnerships,
    affiliations,
    nationalities
  }
}

export const useRegistration = () => {
  const saveDraft = useApi(apiService.saveDraft)
  const loadDraft = useApi(apiService.loadDraft)
  const submitRegistration = useApi(apiService.submitRegistration)
  const getRegistrationStatus = useApi(apiService.getRegistrationStatus)
  const getRegistrationHistory = useApi(apiService.getRegistrationHistory)

  return {
    saveDraft,
    loadDraft,
    submitRegistration,
    getRegistrationStatus,
    getRegistrationHistory
  }
}

export const useFileUpload = () => {
  const uploadFile = useApi(apiService.uploadFile)

  return {
    uploadFile
  }
}

export const useSearch = () => {
  const searchCompanies = useApi(apiService.searchCompanies)

  return {
    searchCompanies
  }
}

export const useStats = () => {
  const getRegistrationStats = useApi(apiService.getRegistrationStats)

  return {
    getRegistrationStats
  }
}

// Hook for form auto-save functionality
export const useAutoSave = (formData: Partial<RegistrationFormData>, interval: number = 30000) => {
  const { saveDraft } = useRegistration()
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const save = useCallback(async () => {
    if (isSaving) return

    setIsSaving(true)
    try {
      await saveDraft.execute(formData)
      setLastSaved(new Date().toISOString())
    } catch (error) {
      console.error('Auto-save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }, [formData, saveDraft, isSaving])

  // Auto-save effect
  React.useEffect(() => {
    const timer = setInterval(save, interval)
    return () => clearInterval(timer)
  }, [save, interval])

  return {
    lastSaved,
    isSaving,
    save
  }
}

// Hook for form validation with real-time feedback
export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [validating, setValidating] = useState<Record<string, boolean>>({})

  const { validateCompanyName, validateNationalId, validateEmail } = useValidation()

  const validateField = useCallback(async (fieldName: string, value: any) => {
    setValidating(prev => ({ ...prev, [fieldName]: true }))

    try {
      let isValid = true
      let message = ''

      switch (fieldName) {
        case 'ldv_englishname':
        case 'ldv_arabicname':
          await validateCompanyName.execute(value, '')
          if (validateCompanyName.data) {
            isValid = validateCompanyName.data.isValid
            message = validateCompanyName.data.suggestions ? 'Invalid company name' : ''
          }
          break
        case 'contact_ldv_nationalid':
        case 'representative_nationalid':
          await validateNationalId.execute(value)
          if (validateNationalId.data) {
            isValid = validateNationalId.data.isValid
            message = validateNationalId.data.message || ''
          }
          break
        case 'emailaddress1':
        case 'contact_mail':
        case 'representative_mail':
          await validateEmail.execute(value)
          if (validateEmail.data) {
            isValid = validateEmail.data.isValid
            message = validateEmail.data.message || ''
          }
          break
        default:
          setValidating(prev => ({ ...prev, [fieldName]: false }))
          return
      }

      if (isValid) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[fieldName]
          return newErrors
        })
      } else {
        setErrors(prev => ({
          ...prev,
          [fieldName]: message || 'Invalid value'
        }))
      }
    } catch (error) {
      console.error('Validation error:', error)
    } finally {
      setValidating(prev => ({ ...prev, [fieldName]: false }))
    }
  }, [validateCompanyName, validateNationalId, validateEmail])

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    errors,
    validating,
    validateField,
    clearError,
    clearAllErrors
  }
}

// Hook for managing form state with API integration
export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { saveDraft, loadDraft, submitRegistration } = useRegistration()
  const { validateField, errors, clearError } = useFormValidation()
  const { lastSaved, isSaving } = useAutoSave(formData)

  const updateField = useCallback((fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
    setIsDirty(true)
    clearError(fieldName)
  }, [clearError])

  const updateNestedField = useCallback((parentField: string, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField as keyof typeof prev] as object || {}),
        [childField]: value
      }
    }))
    setIsDirty(true)
  }, [])

  const updateArrayField = useCallback((fieldName: string, index: number, childField: string, value: any) => {
    setFormData(prev => {
      const array = prev[fieldName as keyof typeof prev] as any[]
      const newArray = [...array]
      newArray[index] = {
        ...newArray[index],
        [childField]: value
      }
      return {
        ...prev,
        [fieldName]: newArray
      }
    })
    setIsDirty(true)
  }, [])

  const addArrayItem = useCallback((fieldName: string, emptyItem: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [
        ...(prev[fieldName as keyof typeof prev] as any[] || []),
        emptyItem
      ]
    }))
    setIsDirty(true)
  }, [])

  const removeArrayItem = useCallback((fieldName: string, index: number) => {
    setFormData(prev => {
      const array = prev[fieldName as keyof typeof prev] as any[]
      const newArray = array.filter((_, i) => i !== index)
      return {
        ...prev,
        [fieldName]: newArray
      }
    })
    setIsDirty(true)
  }, [])

  const saveDraftManually = useCallback(async () => {
    try {
      await saveDraft.execute(formData)
      setIsDirty(false)
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }, [formData, saveDraft])

  const loadDraftData = useCallback(async (draftId: string) => {
    try {
      await loadDraft.execute(draftId)
      if (loadDraft.data) {
        setFormData(loadDraft.data)
        setIsDirty(false)
      }
    } catch (error) {
      console.error('Failed to load draft:', error)
    }
  }, [loadDraft])

  const submitForm = useCallback(async () => {
    setIsSubmitting(true)
    try {
      await submitRegistration.execute(formData as RegistrationFormData)
      if (submitRegistration.data) {
        setIsDirty(false)
        return submitRegistration.data
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, submitRegistration])

  const resetForm = useCallback(() => {
    setFormData({})
    setIsDirty(false)
  }, [])

  return {
    formData,
    isDirty,
    isSubmitting,
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
    submitForm,
    resetForm
  }
}

export default useApi
