import React, { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { CompanyInfo, ContactInfo, updateCompany, updateContact, UpdateCompanyRequest, UpdateContactRequest, createContact, CreateContactRequest, deleteContact } from '../api/client'
import { draftManager } from '../utils/draftManager'

interface CompanyCardProps {
  company: CompanyInfo
  onCompanyUpdated?: (updatedCompany: CompanyInfo) => void
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onCompanyUpdated }) => {
  const { language } = useLanguage()
  
  // Saving state
  const [isSaving, setIsSaving] = useState(false)
  
  // Section-specific messages
  const [companyError, setCompanyError] = useState<string | null>(null)
  const [companySuccess, setCompanySuccess] = useState<string | null>(null)
  const [contactError, setContactError] = useState<string | null>(null)
  const [contactSuccess, setContactSuccess] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<Partial<CompanyInfo>>({})
  const [originalData, setOriginalData] = useState<CompanyInfo>(company)
  
  // Contact edit states
  const [editingContacts, setEditingContacts] = useState<{ [contactId: string]: boolean }>({})
  const [savingContacts, setSavingContacts] = useState<{ [contactId: string]: boolean }>({})
  const [submitDebounce, setSubmitDebounce] = useState<{ [contactId: string]: boolean }>({})
  const [contactFormData, setContactFormData] = useState<{ [contactId: string]: Partial<ContactInfo> }>({})
  const [originalContacts, setOriginalContacts] = useState<ContactInfo[]>(company.contacts || [])
  const [isOwnersExpanded, setIsOwnersExpanded] = useState(true)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState<Partial<ContactInfo> & { role?: 'regular'|'head'|'rep'|'primary' }>({})
  const [creating, setCreating] = useState(false)

  // Helpers to normalize IDs and compute unique counts/roles even if the same contact appears in multiple roles
  const normalizeId = (id?: string) => (id || '').trim().toLowerCase()

  // Unique contacts count (dedup by normalized id)
  // Note: count removed from header; keep helper if needed in future

  const contactRolesById = useMemo(() => {
    const map = new Map<string, string[]>()
    const add = (id?: string, role?: string) => {
      const key = normalizeId(id)
      if (!key || !role) return
      const arr = map.get(key) || []
      if (!arr.includes(role)) arr.push(role)
      map.set(key, arr)
    }
    add(company.companyHead?.id, language === 'ar' ? 'رئيس' : 'Head')
    add(company.companyRepresentative?.id, language === 'ar' ? 'ممثل' : 'Representative')
    add(company.primaryContact?.id, language === 'ar' ? 'أساسي' : 'Primary')
    if (Array.isArray(originalContacts)) {
      for (const c of originalContacts) add(c.id, language === 'ar' ? 'عادي' : 'Regular')
    }
    return map
  }, [company.companyHead, company.companyRepresentative, company.primaryContact, originalContacts, language])

  // Localized role labels and helper to avoid duplicating the main role badge
  const roleLabels = useMemo(() => ({
    head: language === 'ar' ? 'رئيس' : 'Head',
    rep: language === 'ar' ? 'ممثل' : 'Representative',
    primary: language === 'ar' ? 'أساسي' : 'Primary',
    regular: language === 'ar' ? 'عادي' : 'Regular'
  }), [language])

  const getAdditionalRolesFor = (contactId: string, baseRoleLabel: string): string[] => {
    const roles = contactRolesById.get(normalizeId(contactId)) || []
    return roles.filter(r => r !== baseRoleLabel)
  }
  
  // Check if any contact is being saved
  const isAnyContactSaving = Object.values(savingContacts).some(saving => saving)
  
  // Contacts section collapse/expand state
  const [isContactsExpanded, setIsContactsExpanded] = useState(true)
  
  // Last modified tracking
  const [lastModified, setLastModified] = useState<{
    company?: Date
    contacts?: { [contactId: string]: Date }
  }>({})

  // Initialize form data
  useEffect(() => {
    setFormData(company)
    setOriginalData(company)
    setOriginalContacts(company.contacts || [])
    
    // Initialize last modified dates (will be updated on actual saves)
    setLastModified({
      company: new Date(), // Show current time as initial "last modified"
      contacts: {}
    })
    
    // Check for existing draft
    const draft = draftManager.loadDraft(company.accountId)
    if (draft) {
      if (draft.company) {
        setFormData({ ...company, ...draft.company })
      }
      if (draft.contacts) {
        setContactFormData(draft.contacts)
      }
    }
  }, [company])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
    } catch {
      return dateString // Fallback if date is invalid
    }
  }

  // Function to get Class Code display name
  const getClassCodeDisplayName = (classCode: number | null | undefined): string => {
    if (!classCode) return '-'
    
    const classCodeMap: { [key: number]: string } = {
      1: 'رئيسى',
      2: 'فرعى',
      3: 'فردى رئيسى',
      4: 'فردى فرعى',
      5: 'فردى رئيسى أخر'
    }
    
    return classCodeMap[classCode] || classCode.toString()
  }

  // Function to get Legal Type display name
  const getLegalTypeDisplayName = (legalTypeCode: number | null | undefined, displayName: string | null | undefined): string => {
    if (!legalTypeCode) return '-'
    
    // Use the display name from CRM if available, otherwise fall back to numeric value
    return displayName || legalTypeCode.toString()
  }



  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const isLettersAndSpaces = (value: string): boolean => /^[A-Za-z\u0600-\u06FF ]+$/.test(String(value).trim())
  const isTenDigitPhone = (value: string): boolean => /^\d{11}$/.test(String(value).trim())
  const isValidNationalId = (value: string): boolean => /^(2|3)\d{13}$/.test(String(value).trim())

  const validateCompanyData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    // Check mandatory fields from whitelist only (englishName, arabicName, commercialDenomination)
    if (!formData.englishName && !formData.arabicName && !formData.commercialDenomination) {
      errors.push(language === 'ar' ? 'يجب إدخال اسم الشركة (إنجليزي أو عربي أو تجاري)' : 'Company name is required (English, Arabic, or Commercial)')
    }
    
    // Validate establishment year if provided (must be a valid year)
    if (formData.establishmentYear && (formData.establishmentYear < 1900 || formData.establishmentYear > new Date().getFullYear())) {
      errors.push(language === 'ar' ? 'سنة التأسيس يجب أن تكون بين 1900 و ' + new Date().getFullYear() : 'Establishment year must be between 1900 and ' + new Date().getFullYear())
    }
    
    return { isValid: errors.length === 0, errors }
  }

  const validateContactData = (contactId: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    const contactData = contactFormData[contactId] || {}

    const base: any = (company.companyHead && company.companyHead.id === contactId)
      ? company.companyHead
      : (company.companyRepresentative && company.companyRepresentative.id === contactId)
        ? company.companyRepresentative
        : originalContacts.find(c => c.id === contactId)

    // Full Name (required, letters/spaces)
    const fullName = (contactData as any).fullName ?? base?.fullName ?? base?.name
    if (!fullName || String(fullName).trim() === '') {
      errors.push(language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full Name is required')
    } else if (!isLettersAndSpaces(String(fullName))) {
      errors.push(language === 'ar' ? 'الاسم يجب أن يحتوي على حروف ومسافات فقط' : 'Full Name must contain only letters and spaces')
    }

    // Job Title (required, letters/spaces)
    const jobTitle = (contactData as any).jobTitle ?? base?.jobTitle
    if (!jobTitle || String(jobTitle).trim() === '') {
      errors.push(language === 'ar' ? 'المسمى الوظيفي مطلوب' : 'Job Title is required')
    } else if (!isLettersAndSpaces(String(jobTitle))) {
      errors.push(language === 'ar' ? 'المسمى الوظيفي يجب أن يحتوي على حروف ومسافات فقط' : 'Job Title must contain only letters and spaces')
    }

    // Email (required) and Secondary Email (optional)
    const emailAddress1 = (contactData as any).emailAddress1 ?? base?.emailAddress1
    const ldv_Email2 = (contactData as any).ldv_Email2 ?? base?.ldv_Email2
    if (!emailAddress1 || String(emailAddress1).trim() === '') {
      errors.push(language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required')
    } else if (!validateEmail(String(emailAddress1))) {
      errors.push(language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format')
    }
    if (ldv_Email2 && !validateEmail(String(ldv_Email2))) {
      errors.push(language === 'ar' ? 'البريد الإلكتروني الثانوي غير صحيح' : 'Invalid secondary email format')
    }

    // Mobile (required, exactly 10 digits)
    const mobilePhone = (contactData as any).mobilePhone ?? base?.mobilePhone
    if (!mobilePhone || String(mobilePhone).trim() === '') {
      errors.push(language === 'ar' ? 'رقم الهاتف المحمول مطلوب' : 'Mobile Phone is required')
    } else if (!isTenDigitPhone(String(mobilePhone))) {
      errors.push(language === 'ar' ? 'رقم الهاتف يجب أن يكون 11 رقمًا' : 'Mobile phone must be 11 digits')
    }

    // National ID (required, 14 digits starting 2 or 3)
    const nationalID = (contactData as any).ldv_NationalID ?? base?.ldv_NationalID
    if (!nationalID || String(nationalID).trim() === '') {
      errors.push(language === 'ar' ? 'الرقم القومي مطلوب' : 'National ID is required')
    } else if (!isValidNationalId(String(nationalID))) {
      errors.push(language === 'ar' ? 'الرقم القومي يجب أن يكون 14 رقمًا ويبدأ بــ 2 أو 3' : 'National ID must be 14 digits and start with 2 or 3')
    }

    // NID Issue Date (required, within last 7 years)
    const nidIssueDate = (contactData as any).ldv_NIDIssueDate ?? base?.ldv_NIDIssueDate
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 7
    if (!nidIssueDate) {
      errors.push(language === 'ar' ? 'تاريخ إصدار الهوية مطلوب' : 'NID Issue Date is required')
    } else {
      const issueYear = parseInt(String(nidIssueDate), 10)
      if (isNaN(issueYear) || issueYear > currentYear || issueYear < minYear) {
        errors.push(language === 'ar' ? `سنة إصدار الهوية يجب أن تكون بين ${minYear} و ${currentYear}` : `NID issue year must be between ${minYear} and ${currentYear}`)
      }
    }

    return { isValid: errors.length === 0, errors }
  }

  // Company update handlers
  const handleCompanyFieldChange = (field: keyof CompanyInfo, value: string | number | null) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    
    // Auto-save draft
    draftManager.scheduleAutoSave(company.accountId, newFormData, contactFormData)
  }

  const handleSaveCompany = async () => {
    setIsSaving(true)
    setCompanyError(null)
    setCompanySuccess(null)

    try {
      // Validate data
      const validation = validateCompanyData()
      if (!validation.isValid) {
        setCompanyError(validation.errors.join(', '))
        setIsSaving(false)
        return
      }

      // Calculate changes - only whitelisted fields
      const changes: UpdateCompanyRequest = {}
      const whitelistedFields: (keyof CompanyInfo)[] = [
        'englishName', 'arabicName', 'establishmentYear', 'ldv_IPRLicenseNumber'
      ]

      whitelistedFields.forEach(field => {
        const originalValue = originalData[field]
        const newValue = formData[field]
        if (originalValue !== newValue) {
          (changes as any)[field] = newValue
        }
      })

      if (Object.keys(changes).length === 0) {
        setCompanySuccess(language === 'ar' ? 'لا توجد تغييرات لحفظها' : 'No changes to save')
        setIsSaving(false)
        setTimeout(() => setCompanySuccess(null), 3000)
        return
      }

      // Update company
      const updatedCompany = await updateCompany(company.accountId, changes)
      
      // Update state
      setFormData(updatedCompany)
      setOriginalData(updatedCompany)
      setCompanySuccess(language === 'ar' ? 'تم حفظ معلومات الشركة بنجاح' : 'Company information saved successfully')
      
      // Update last modified
      setLastModified(prev => ({ ...prev, company: new Date() }))
      
      // Notify parent component
      if (onCompanyUpdated) {
        onCompanyUpdated(updatedCompany)
      }
      
      // Clear draft
      draftManager.clearDraft(company.accountId)
      
      // Clear success message after 3 seconds
      setTimeout(() => setCompanySuccess(null), 3000)
      
    } catch (err: any) {
      setCompanyError(err?.message || (language === 'ar' ? 'فشل في حفظ معلومات الشركة' : 'Failed to save company information'))
      // Add to retry queue
      draftManager.addToRetryQueue({
        type: 'company',
        accountId: company.accountId,
        data: formData
      })
    } finally {
      setIsSaving(false)
    }
  }


  const handleSaveDraftCompany = () => {
    // Validate data before saving draft
    const validation = validateCompanyData()
    if (!validation.isValid) {
      setCompanyError(validation.errors.join(', '))
      return
    }

    // Calculate changes - only whitelisted fields
    const changes: UpdateCompanyRequest = {}
    const whitelistedFields: (keyof CompanyInfo)[] = [
      'englishName', 'arabicName', 'establishmentYear', 'ldv_IPRLicenseNumber'
    ]

    whitelistedFields.forEach(field => {
      const originalValue = originalData[field]
      const newValue = formData[field]
      if (originalValue !== newValue) {
        (changes as any)[field] = newValue
      }
    })

    if (Object.keys(changes).length === 0) {
      setCompanySuccess(language === 'ar' ? 'لا توجد تغييرات لحفظها' : 'No changes to save')
      setTimeout(() => setCompanySuccess(null), 3000)
      return
    }

    // Save current form data as draft
    draftManager.saveDraft(company.accountId, formData, contactFormData)
    
    // Close edit mode
    
    // Show 24-hour alert
    setCompanySuccess(language === 'ar' ? 'تم حفظ المسودة بنجاح - صالحة لمدة 24 ساعة' : 'Draft saved successfully - valid for 24 hours')
    setTimeout(() => setCompanySuccess(null), 5000)
  }

  // Contact update handlers
  const handleContactFieldChange = (contactId: string, field: keyof ContactInfo, value: string | null) => {
    const newContactData = { ...contactFormData[contactId], [field]: value }
    const newContactFormData = { ...contactFormData, [contactId]: newContactData }
    setContactFormData(newContactFormData)
    
    // Auto-save draft
    draftManager.scheduleAutoSave(company.accountId, formData, newContactFormData)
  }

  const handleSaveContact = async (contactId: string) => {
    // Prevent rapid clicks
    if (submitDebounce[contactId]) return
    setSubmitDebounce(prev => ({ ...prev, [contactId]: true }))
    
    setContactError(null)
    setContactSuccess(null)

    try {
      // Validate data
      const validation = validateContactData(contactId)
      if (!validation.isValid) {
        setContactError(validation.errors.join(', '))
        return
      }

      const originalContact = originalContacts.find(c => c.id === contactId)
      const currentContactData = contactFormData[contactId] || {}
      
      if (!originalContact) {
        throw new Error('Contact not found')
      }

      // Calculate changes - only whitelisted fields
      const changes: UpdateContactRequest = {}
      const whitelistedFields: (keyof ContactInfo)[] = [
        'fullName', 'jobTitle', 'mobilePhone', 'emailAddress1', 'ldv_Email2', 'ldv_NationalID', 'ldv_NIDIssueDate', 'ldv_NIDIssuedFrom'
      ]

      whitelistedFields.forEach(field => {
        const originalValue = originalContact[field]
        const newValue = currentContactData[field]
        if (originalValue !== newValue) {
          (changes as any)[field] = newValue
        }
      })

      if (Object.keys(changes).length === 0) {
        setContactSuccess(language === 'ar' ? 'لا توجد تغييرات لحفظها' : 'No changes to save')
        setEditingContacts(prev => ({ ...prev, [contactId]: false }))
        // Clear role-based edit keys too
        const primaryKey = getEditKeyForPrimary(contactId)
        const headKey = getEditKeyForHead(contactId)
        const repKey = getEditKeyForRep(contactId)
        setEditingContacts(prev => ({ ...prev, [primaryKey]: false, [headKey]: false, [repKey]: false }))
        setTimeout(() => setContactSuccess(null), 3000)
        setSubmitDebounce(prev => ({ ...prev, [contactId]: false }))
        return
      }

      // Set saving state only when there are actual changes
      setSavingContacts(prev => ({ ...prev, [contactId]: true }))

      // Update contact
      const updatedContact = await updateContact(company.accountId, contactId, changes)
      
      // Update state
      const newContacts = originalContacts.map(c => c.id === contactId ? updatedContact : c)
      setOriginalContacts(newContacts)

      // Reflect updates for special cards shown outside the contacts list
      setFormData(prev => {
        const next = { ...prev }
        if (prev.companyHead && prev.companyHead.id === contactId) {
          (next as any).companyHead = { ...(prev.companyHead as any), ...updatedContact }
        }
        if (prev.companyRepresentative && prev.companyRepresentative.id === contactId) {
          (next as any).companyRepresentative = { ...(prev.companyRepresentative as any), ...updatedContact }
        }
        if (prev.primaryContact && prev.primaryContact.id === contactId) {
          (next as any).primaryContact = { ...(prev.primaryContact as any), ...updatedContact }
        }
        return next
      })

      setContactFormData(prev => {
        const newData = { ...prev }
        const primaryId = company.primaryContact?.id
        if (contactId !== primaryId) {
          delete newData[contactId]
        } else {
          // keep primary contact data to reflect immediate UI updates
          newData[contactId] = { ...newData[contactId], ...updatedContact }
        }
        return newData
      })
      setEditingContacts(prev => ({ ...prev, [contactId]: false }))
      // Clear role-based edit keys as well (primary/head/rep) for this contactId
      const primaryKey2 = getEditKeyForPrimary(contactId)
      const headKey2 = getEditKeyForHead(contactId)
      const repKey2 = getEditKeyForRep(contactId)
      setEditingContacts(prev => ({ ...prev, [primaryKey2]: false, [headKey2]: false, [repKey2]: false }))
      
      // Update last modified
      setLastModified(prev => ({
        ...prev,
        contacts: { ...prev.contacts, [contactId]: new Date() }
      }))
      
      // Clear draft
      draftManager.clearDraft(company.accountId)
      
      // Show success message
      setContactSuccess(language === 'ar' ? 'تم حفظ معلومات جهة الاتصال بنجاح' : 'Contact information saved successfully')
      setTimeout(() => setContactSuccess(null), 3000)
      
    } catch (err: any) {
      setContactError(err?.message || (language === 'ar' ? 'فشل في حفظ معلومات جهة الاتصال' : 'Failed to save contact information'))
      // Add to retry queue
      draftManager.addToRetryQueue({
        type: 'contact',
        accountId: company.accountId,
        contactId,
        data: contactFormData[contactId]
      })
    } finally {
      setSavingContacts(prev => ({ ...prev, [contactId]: false }))
      setSubmitDebounce(prev => ({ ...prev, [contactId]: false }))
    }
  }

  const handleCancelContact = (contactId: string) => {
    setContactFormData(prev => {
      const newData = { ...prev }
      delete newData[contactId]
      return newData
    })
    setEditingContacts(prev => ({ ...prev, [contactId]: false }))
    
    // Also clear role-based edit keys in case any are active for this ID
    const primaryKey = getEditKeyForPrimary(contactId)
    const headKey = getEditKeyForHead(contactId)
    const repKey = getEditKeyForRep(contactId)
    setEditingContacts(prev => ({ ...prev, [primaryKey]: false, [headKey]: false, [repKey]: false }))

    draftManager.cancelAutoSave(company.accountId)
  }

  const toggleContactEdit = (contactId: string) => {
    setEditingContacts(prev => ({ ...prev, [contactId]: !prev[contactId] }))
  }

  const handleSaveDraftContact = (contactId: string) => {
    // Prevent rapid clicks
    if (submitDebounce[contactId]) return
    setSubmitDebounce(prev => ({ ...prev, [contactId]: true }))
    
    setContactError(null)
    setContactSuccess(null)
    
    // Validate data before saving draft
    const validation = validateContactData(contactId)
    if (!validation.isValid) {
      setContactError(validation.errors.join(', '))
      setSubmitDebounce(prev => ({ ...prev, [contactId]: false }))
      return
    }

    const originalContact = originalContacts.find(c => c.id === contactId)
    const currentContactData = contactFormData[contactId] || {}
    
    if (!originalContact) {
      setContactError('Contact not found')
      return
    }

    // Calculate changes - only whitelisted fields
    const changes: UpdateContactRequest = {}
    const whitelistedFields: (keyof ContactInfo)[] = [
      'fullName', 'jobTitle', 'mobilePhone', 'emailAddress1', 'ldv_Email2', 'ldv_NationalID', 'ldv_NIDIssueDate', 'ldv_NIDIssuedFrom'
    ]

    whitelistedFields.forEach(field => {
      const originalValue = originalContact[field]
      const newValue = currentContactData[field]
      if (originalValue !== newValue) {
        (changes as any)[field] = newValue
      }
    })

    if (Object.keys(changes).length === 0) {
      setContactSuccess(language === 'ar' ? 'لا توجد تغييرات لحفظها' : 'No changes to save')
      setEditingContacts(prev => ({ ...prev, [contactId]: false }))
      setTimeout(() => setContactSuccess(null), 3000)
      setSubmitDebounce(prev => ({ ...prev, [contactId]: false }))
      return
    }

    // Save current contact form data as draft
    const newContactFormData = { ...contactFormData, [contactId]: currentContactData }
    
    draftManager.saveDraft(company.accountId, formData, newContactFormData)
    
    // Close edit mode
    setEditingContacts(prev => ({ ...prev, [contactId]: false }))
    
    // Show 24-hour alert
    setContactSuccess(language === 'ar' ? 'تم حفظ مسودة جهة الاتصال بنجاح - صالحة لمدة 24 ساعة' : 'Contact draft saved successfully - valid for 24 hours')
    setTimeout(() => setContactSuccess(null), 5000)
    
    // Reset debounce
    setSubmitDebounce(prev => ({ ...prev, [contactId]: false }))
  }

  // Editing state helpers to avoid collisions when roles share the same contact ID
  const getEditKeyForPrimary = (contactId: string) => `primary:${contactId}`
  const getEditKeyForHead = (contactId: string) => `head:${contactId}`
  const getEditKeyForRep = (contactId: string) => `rep:${contactId}`

  const toggleContactEditKey = (editKey: string) => {
    setEditingContacts(prev => ({ ...prev, [editKey]: !prev[editKey] }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0174a4] px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            {language === 'ar' ? 'المعلومات القانونية للشركة' : 'Company Legal Information'}
            {isSaving && (
              <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </h2>
          {lastModified.company && (
            <p className="text-blue-100 text-sm mt-1">
              {language === 'ar' ? 'آخر تعديل: ' : 'Last modified: '}
              {lastModified.company.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
            </p>
          )}
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleSaveCompany}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isSaving ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال' : 'Submit')}
          </button>
          <button
            onClick={handleSaveDraftCompany}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
          </button>
        </div>
      </div>

      {/* Company Messages */}
      {(companyError || companySuccess) && (
        <div className="px-6 py-3">
          {companyError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {companyError}
            </div>
          )}
          {companySuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {companySuccess}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`p-6 transition-colors duration-500 ${isSaving ? 'bg-blue-50' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Company Name */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${((formData.englishName || company.englishName) && (formData.arabicName || company.arabicName)) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {language === 'ar' ? 'اسم الشركة' : 'Company Name'}
            </label>
            <div className="space-y-2">
              {/* English Name */}
              {(!formData.englishName && !company.englishName) ? (
                <input
                  type="text"
                  value={formData.englishName || ''}
                  onChange={(e) => handleCompanyFieldChange('englishName', e.target.value || null)}
                  placeholder={language === 'ar' ? 'الاسم الإنجليزي' : 'English Name'}
                  className="input-field"
                />
              ) : (
                <p className={`text-lg font-semibold ${(formData.englishName || company.englishName) ? 'text-gray-900' : 'text-red-500'}`}>
                  {formData.englishName || company.englishName || '-'}
                </p>
              )}
              
              {/* Arabic Name */}
              {(!formData.arabicName && !company.arabicName) ? (
                <input
                  type="text"
                  value={formData.arabicName || ''}
                  onChange={(e) => handleCompanyFieldChange('arabicName', e.target.value || null)}
                  placeholder={language === 'ar' ? 'الاسم العربي' : 'Arabic Name'}
                  className="input-field"
                />
              ) : (
                <p className={`text-lg font-semibold ${(formData.arabicName || company.arabicName) ? 'text-gray-900' : 'text-red-500'}`}>
                  {formData.arabicName || company.arabicName || '-'}
                </p>
              )}
            </div>
          </div>

          {/* Commercial Registration Number */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${(formData.commercialRegistrationNumber || company.commercialRegistrationNumber) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {language === 'ar' ? 'رقم السجل التجاري' : 'Commercial Registration Number'}
            </label>
            {(!formData.commercialRegistrationNumber && !company.commercialRegistrationNumber) ? (
              <input
                type="text"
                value={formData.commercialRegistrationNumber || ''}
                onChange={(e) => handleCompanyFieldChange('commercialRegistrationNumber', e.target.value || null)}
                placeholder={language === 'ar' ? 'رقم السجل التجاري' : 'Commercial Registration Number'}
                className="input-field"
              />
            ) : (
              <p className={`${(formData.commercialRegistrationNumber || company.commercialRegistrationNumber) ? 'text-gray-900' : 'text-red-500'}`}>
                {formData.commercialRegistrationNumber || company.commercialRegistrationNumber || '-'}
              </p>
            )}
          </div>

          {/* UCR */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.ucr ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              {language === 'ar' ? 'رقم السجل التجاري الموحد' : 'UCR Number'}
            </label>
            {!company.ucr ? (
              <input
                type="text"
                value={formData.ucr || ''}
                onChange={(e) => handleCompanyFieldChange('ucr', e.target.value || null)}
                placeholder={language === 'ar' ? 'رقم السجل التجاري الموحد' : 'UCR Number'}
                className="input-field"
              />
            ) : (
              <p className={`${company.ucr ? 'text-gray-900' : 'text-red-500'}`}>
                {company.ucr || '-'}
              </p>
            )}
          </div>

          {/* Tax File Number */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.taxFileNumber ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {language === 'ar' ? 'رقم الملف الضريبي' : 'Tax File Number'}
            </label>
            {!company.taxFileNumber ? (
              <input
                type="text"
                value={formData.taxFileNumber || ''}
                onChange={(e) => handleCompanyFieldChange('taxFileNumber', e.target.value || null)}
                placeholder={language === 'ar' ? 'رقم الملف الضريبي' : 'Tax File Number'}
                className="input-field"
              />
            ) : (
              <p className={`${company.taxFileNumber ? 'text-gray-900' : 'text-red-500'}`}>
                {company.taxFileNumber || '-'}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.email ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            {!company.email ? (
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleCompanyFieldChange('email', e.target.value || null)}
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                className="input-field"
              />
            ) : (
              <p className={`${company.email ? 'text-gray-900' : 'text-red-500'}`}>
                {company.email || '-'}
              </p>
            )}
          </div>

          {/* Establishment Year */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${(formData.establishmentYear || company.establishmentYear) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {language === 'ar' ? 'سنة التأسيس' : 'Establishment Year'}
            </label>
            {(!formData.establishmentYear && !company.establishmentYear) ? (
              <input
                type="number"
                value={formData.establishmentYear || ''}
                onChange={(e) => handleCompanyFieldChange('establishmentYear', e.target.value ? parseInt(e.target.value) : null)}
                placeholder={language === 'ar' ? 'سنة التأسيس' : 'Establishment Year'}
                className="input-field"
              />
            ) : (
              <p className={`${(formData.establishmentYear || company.establishmentYear) ? 'text-gray-900' : 'text-red-500'}`}>
                {formData.establishmentYear || company.establishmentYear || '-'}
              </p>
            )}
          </div>

          {/* CR Date */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.crDate ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {language === 'ar' ? 'تاريخ السجل التجاري' : 'CR Date'}
            </label>
            {!company.crDate ? (
              <input
                type="date"
                value={formData.crDate || ''}
                onChange={(e) => handleCompanyFieldChange('crDate', e.target.value || null)}
                placeholder={language === 'ar' ? 'تاريخ السجل التجاري' : 'CR Date'}
                className="input-field"
              />
            ) : (
              <p className={`${company.crDate ? 'text-gray-900' : 'text-red-500'}`}>
                {company.crDate ? formatDate(company.crDate) : '-'}
              </p>
            )}
          </div>

          {/* Office */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.office ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {language === 'ar' ? 'المكتب' : 'Office'}
            </label>
            {!company.office ? (
              <input
                type="text"
                value={formData.office || ''}
                onChange={(e) => handleCompanyFieldChange('office', e.target.value || null)}
                placeholder={language === 'ar' ? 'المكتب' : 'Office'}
                className="input-field"
              />
            ) : (
              <p className={`${company.office ? 'text-gray-900' : 'text-red-500'}`}>
                {company.office || '-'}
              </p>
            )}
          </div>

          {/* Class Code */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.classCode ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {language === 'ar' ? 'رمز الفئة' : 'Class Code'}
            </label>
            {!company.classCode ? (
              <select
                value={formData.classCode ?? ''}
                onChange={(e) => handleCompanyFieldChange('classCode', e.target.value ? parseInt(e.target.value) : null)}
                className="input-field"
              >
                <option value="">{language === 'ar' ? 'اختر الرمز' : 'Select class'}</option>
                <option value="1">رئيسى</option>
                <option value="2">فرعى</option>
                <option value="3">فردى رئيسى</option>
                <option value="4">فردى فرعى</option>
                <option value="5">فردى رئيسى أخر</option>
              </select>
            ) : (
              <p className={`${company.classCode ? 'text-gray-900' : 'text-red-500'}`}>
                {getClassCodeDisplayName(company.classCode)}
              </p>
            )}
          </div>

          {/* Legal Type */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${company.ldv_legaltypecode ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === 'ar' ? 'الشكل القانوني' : 'Legal Type'}
            </label>
            {!company.ldv_legaltypecode ? (
              <select
                value={formData.ldv_legaltypecode ?? ''}
                onChange={(e) => handleCompanyFieldChange('ldv_legaltypecode', e.target.value ? parseInt(e.target.value) : null)}
                className="input-field"
              >
                <option value="">{language === 'ar' ? 'اختر الشكل القانوني' : 'Select legal type'}</option>
                <option value="1">فردي</option>
                <option value="2">شركة تضامن</option>
                <option value="3">واقع موروثة</option>
                <option value="4">توصية بسيطة</option>
                <option value="5">توصية بالاسهم</option>
                <option value="6">ذات مسئولية محدودة</option>
                <option value="7">شركات مساهمة</option>
                <option value="8">جمعيات تعاونية</option>
                <option value="9">شركه واقع</option>
                <option value="10">شركة شخص واحد</option>
                <option value="11">فرع شركه اجنبيه</option>
                <option value="12">جهات غير هادفة للربح</option>
              </select>
            ) : (
              <p className={`${company.ldv_legaltypecode ? 'text-gray-900' : 'text-red-500'}`}>
                {getLegalTypeDisplayName(company.ldv_legaltypecode, company.ldv_legaltypecode_displayname)}
              </p>
            )}
          </div>

          {/* License Number */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${(formData.ldv_IPRLicenseNumber || company.ldv_IPRLicenseNumber) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {language === 'ar' ? 'رقم الترخيص' : 'License Number'}
            </label>
            <p className={`${(formData.ldv_IPRLicenseNumber || company.ldv_IPRLicenseNumber) ? 'text-gray-900' : 'text-red-500'}`}>
              {formData.ldv_IPRLicenseNumber || company.ldv_IPRLicenseNumber || '-'}
            </p>
          </div>

          {/* ITIDA Customer Number */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${(formData.ldv_itidacustomernumber || company.ldv_itidacustomernumber) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {language === 'ar' ? 'رقم عميل ITIDA' : 'ITIDA Customer Number'}
            </label>
            {(!formData.ldv_itidacustomernumber && !company.ldv_itidacustomernumber) ? (
              <input
                type="text"
                value={formData.ldv_itidacustomernumber || ''}
                onChange={(e) => handleCompanyFieldChange('ldv_itidacustomernumber', e.target.value || null)}
                placeholder={language === 'ar' ? 'رقم عميل ITIDA' : 'ITIDA Customer Number'}
                className="input-field"
              />
            ) : (
              <p className={`${(formData.ldv_itidacustomernumber || company.ldv_itidacustomernumber) ? 'text-gray-900' : 'text-red-500'}`}>
                {formData.ldv_itidacustomernumber || company.ldv_itidacustomernumber || '-'}
              </p>
            )}
          </div>

          {/* Company Overview */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className={`block text-sm font-medium mb-1 ${(formData.ldv_companyoverview || company.ldv_companyoverview) ? 'text-gray-600' : 'text-red-500'} flex items-center`}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {language === 'ar' ? 'نظرة عامة على الشركة' : 'Company Overview'}
            </label>
            <textarea
              value={formData.ldv_companyoverview || company.ldv_companyoverview || ''}
              onChange={(e) => handleCompanyFieldChange('ldv_companyoverview', e.target.value || null)}
              placeholder={language === 'ar' ? 'نظرة عامة على الشركة' : 'Company Overview'}
              className="input-field min-h-[100px] resize-vertical"
              rows={4}
            />
          </div>

        </div>

        {/* Contacts Section */}
        {((originalContacts && originalContacts.length > 0) || company.primaryContact || company.companyHead || company.companyRepresentative) && (
          <div className={`mt-6 pt-6 border-t border-gray-200 transition-colors duration-500 ${isAnyContactSaving ? 'bg-blue-50' : 'bg-white'}`}>
            <div className="mb-4 p-4 rounded-lg bg-[#1b92b8]">
              <h3
                className="text-lg font-semibold text-white flex items-center cursor-pointer hover:bg-blue-600/20 rounded p-2 -m-2 transition-colors duration-200"
                onClick={() => setIsContactsExpanded(!isContactsExpanded)}
              >
                <svg
                  className={`w-5 h-5 mr-2 transition-transform duration-300 ease-in-out ${isContactsExpanded ? 'rotate-90' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {language === 'ar' ? 'أشخاص الاتصال' : 'Contact Persons'}
                {isAnyContactSaving && (
                  <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
              <button
                onClick={(e) => { e.stopPropagation(); setIsAddingContact(true); setNewContact({ role: 'regular' }) }}
                className="ml-auto bg-[#63d074] hover:brightness-95 text-white px-3 py-1 rounded text-sm"
              >
                {language === 'ar' ? 'إضافة جهة اتصال' : 'Add Contact'}
              </button>
              </h3>
            </div>
            {/* Contact Messages */}
            {(contactError || contactSuccess) && (
              <div className="mb-4">
                {contactError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {contactError}
                  </div>
                )}
                {contactSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                    {contactSuccess}
                  </div>
                )}
              </div>
            )}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isContactsExpanded ? 'max-h-[2000px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}
            >
              <div className="space-y-6">
                {isAddingContact && (
                  <div className="rounded-lg p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-semibold text-gray-800">{language === 'ar' ? 'جهة اتصال جديدة' : 'New Contact'}</h4>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button onClick={() => { setIsAddingContact(false); setNewContact({}) }} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                          {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              setCreating(true)
                              setContactError(null)
                              setContactSuccess(null)

                              const errors: string[] = []
                              const name = (newContact.fullName || '').trim()
                              const job = (newContact.jobTitle || '').trim()
                              const mobile = (newContact.mobilePhone || '').trim()
                              const email = (newContact.emailAddress1 || '').trim()
                              const email2 = (newContact.ldv_Email2 || '').trim()
                              const nid = (newContact.ldv_NationalID || '').trim()
                              const issueYear = String((newContact as any).ldv_NIDIssueDate || '').trim()
                              const role = newContact.role

                              if (!name) errors.push(language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full Name is required')
                              else if (!isLettersAndSpaces(name)) errors.push(language === 'ar' ? 'الاسم يجب أن يحتوي على حروف ومسافات فقط' : 'Full Name must contain only letters and spaces')

                              if (!job) errors.push(language === 'ar' ? 'المسمى الوظيفي مطلوب' : 'Job Title is required')
                              else if (!isLettersAndSpaces(job)) errors.push(language === 'ar' ? 'المسمى الوظيفي يجب أن يحتوي على حروف ومسافات فقط' : 'Job Title must contain only letters and spaces')

                              if (!mobile) errors.push(language === 'ar' ? 'رقم الهاتف المحمول مطلوب' : 'Mobile Phone is required')
                              else if (!/^\d{11}$/.test(mobile)) errors.push(language === 'ar' ? 'رقم الهاتف يجب أن يكون 11 رقمًا' : 'Mobile phone must be 11 digits')

                              if (!email) errors.push(language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required')
                              else if (!validateEmail(email)) errors.push(language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format')

                              if (email2 && !validateEmail(email2)) errors.push(language === 'ar' ? 'البريد الإلكتروني الثانوي غير صحيح' : 'Invalid secondary email format')

                              if (!nid) errors.push(language === 'ar' ? 'الرقم القومي مطلوب' : 'National ID is required')
                              else if (!/^(2|3)\d{13}$/.test(nid)) errors.push(language === 'ar' ? 'الرقم القومي يجب أن يكون 14 رقمًا ويبدأ بــ 2 أو 3' : 'National ID must be 14 digits and start with 2 or 3')

                              const currentYear = new Date().getFullYear()
                              const minYear = currentYear - 7
                              if (!issueYear) errors.push(language === 'ar' ? 'تاريخ إصدار الهوية مطلوب' : 'NID Issue Date is required')
                              else if (isNaN(parseInt(issueYear, 10)) || parseInt(issueYear, 10) < minYear || parseInt(issueYear, 10) > currentYear) {
                                errors.push(language === 'ar' ? `سنة إصدار الهوية يجب أن تكون بين ${minYear} و ${currentYear}` : `NID issue year must be between ${minYear} and ${currentYear}`)
                              }

                              if (!role) errors.push(language === 'ar' ? 'اختيار الدور مطلوب' : 'Role is required')

                              if (errors.length > 0) {
                                setContactError(errors.join(' • '))
                                setCreating(false)
                                return
                              }

                              const payload: CreateContactRequest = {
                                fullName: name,
                                jobTitle: job,
                                mobilePhone: mobile,
                                emailAddress1: email,
                                ldv_Email2: email2 || null,
                                ldv_NationalID: nid,
                                ldv_NIDIssueDate: issueYear,
                                setAsPrimary: role === 'primary',
                                setAsCompanyHead: role === 'head',
                                setAsRepresentative: role === 'rep'
                              }
                              console.log('Creating contact with payload:', payload)
                              const created = await createContact(company.accountId, payload)
                              setOriginalContacts(prev => [created as any, ...prev])
                              if (payload.setAsPrimary) setFormData(prev => ({ ...prev, primaryContact: created as any }))
                              if (payload.setAsCompanyHead) setFormData(prev => ({ ...prev, companyHead: created as any }))
                              if (payload.setAsRepresentative) setFormData(prev => ({ ...prev, companyRepresentative: created as any }))
                              setContactSuccess(language === 'ar' ? 'تمت إضافة جهة الاتصال بنجاح' : 'Contact added successfully')
                              setIsAddingContact(false)
                              setNewContact({})
                            } catch (e:any) {
                              console.error('Create contact error:', e)
                              setContactError(e?.message || (language === 'ar' ? 'فشل إضافة جهة الاتصال' : 'Failed to add contact'))
                            } finally {
                              setCreating(false)
                            }
                          }}
                          disabled={creating}
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          {creating ? (language === 'ar' ? 'جارٍ الإضافة...' : 'Adding...') : (language === 'ar' ? 'إضافة' : 'Add')}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span></label>
                        <input className="input-field" value={newContact.fullName || ''} onChange={e=>setNewContact({...newContact, fullName: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span></label>
                        <input className="input-field" value={newContact.jobTitle || ''} onChange={e=>setNewContact({...newContact, jobTitle: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'الهاتف المحمول' : 'Mobile Phone'} <span className="text-red-500">*</span></label>
                        <input className="input-field" value={newContact.mobilePhone || ''} onChange={e=>setNewContact({...newContact, mobilePhone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'} <span className="text-red-500">*</span></label>
                        <input className="input-field" value={newContact.emailAddress1 || ''} onChange={e=>setNewContact({...newContact, emailAddress1: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}</label>
                        <input className="input-field" value={newContact.ldv_Email2 || ''} onChange={e=>setNewContact({...newContact, ldv_Email2: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'رقم الهوية' : 'National ID'} <span className="text-red-500">*</span></label>
                        <input className="input-field" value={newContact.ldv_NationalID || ''} onChange={e=>setNewContact({...newContact, ldv_NationalID: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'} <span className="text-red-500">*</span></label>
                        <select className="input-field" value={(newContact as any).ldv_NIDIssueDate || ''} onChange={e=>setNewContact({...newContact, ldv_NIDIssueDate: e.target.value} as any)}>
                          <option value="">{language === 'ar' ? 'اختر السنة' : 'Select Year'}</option>
                          {Array.from({ length: 7 }, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{language === 'ar' ? 'الدور' : 'Role'} <span className="text-red-500">*</span></label>
                        <select className="input-field" value={newContact.role || 'regular'} onChange={e=>setNewContact({...newContact, role: e.target.value as any})}>
                          <option value="regular">{language === 'ar' ? 'عادي' : 'Regular'}</option>
                          <option value="head">{language === 'ar' ? 'رئيس' : 'Head'}</option>
                          <option value="rep">{language === 'ar' ? 'ممثل' : 'Representative'}</option>
                          <option value="primary">{language === 'ar' ? 'أساسي' : 'Primary'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                {/* Company Head Contact */}
                {company.companyHead && (
                  <div className="rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    {/* Company Head Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <h4 className="text-md font-semibold text-gray-800 mr-3">
                          {company.companyHead.name || 'Company Head'}
                        </h4>
                        {(() => {
                          const extras = getAdditionalRolesFor(company.companyHead!.id, roleLabels.head)
                          return extras.length > 0 ? (
                            <span className="ml-2 bg-green-100 text-green-700 text-2xs px-2 py-0.5 rounded-full">{extras.join(' / ')}</span>
                          ) : null
                        })()}
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {language === 'ar' ? 'رئيس الشركة' : 'Company Head'}
                        </span>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        {!(editingContacts[getEditKeyForHead(company.companyHead!.id)]) ? (
                          <button
                            onClick={() => toggleContactEditKey(getEditKeyForHead(company.companyHead!.id))}
                            className="bg-itida-blue hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSaveContact(company.companyHead!.id)}
                              disabled={savingContacts[company.companyHead!.id] || submitDebounce[company.companyHead!.id]}
                              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {savingContacts[company.companyHead!.id] ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال' : 'Submit')}
                            </button>
                            <button
                              onClick={() => handleSaveDraftContact(company.companyHead!.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                            </button>
                            <button
                              onClick={() => handleCancelContact(company.companyHead!.id)}
                              disabled={savingContacts[company.companyHead!.id] || submitDebounce[company.companyHead!.id]}
                              className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Company Head Info - Display as read-only / editable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyHead!.id]?.fullName ?? company.companyHead!.fullName ?? company.companyHead!.name) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'fullName', e.target.value || null)}
                            placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.fullName ?? company.companyHead!.fullName ?? company.companyHead!.name) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyHead!.id]?.jobTitle ?? company.companyHead!.jobTitle) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'jobTitle', e.target.value || null)}
                            placeholder={language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.jobTitle ?? company.companyHead!.jobTitle) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyHead!.id]?.mobilePhone ?? company.companyHead!.mobilePhone) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'mobilePhone', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.mobilePhone ?? company.companyHead!.mobilePhone) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.companyHead!.id]?.emailAddress1 ?? company.companyHead!.emailAddress1) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'emailAddress1', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.emailAddress1 ?? company.companyHead!.emailAddress1) || '-'}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Second Row - Additional Company Head Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.companyHead!.id]?.ldv_Email2 ?? company.companyHead!.ldv_Email2) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'ldv_Email2', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.ldv_Email2 ?? company.companyHead!.ldv_Email2) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          {language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyHead!.id]?.ldv_NationalID ?? company.companyHead!.ldv_NationalID) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'ldv_NationalID', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.ldv_NationalID ?? company.companyHead!.ldv_NationalID) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                        </label>
                        {editingContacts[getEditKeyForHead(company.companyHead!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyHead!.id]?.ldv_NIDIssueDate ?? company.companyHead!.ldv_NIDIssueDate) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyHead!.id, 'ldv_NIDIssueDate', e.target.value || null)}
                            placeholder={language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyHead!.id]?.ldv_NIDIssueDate ?? company.companyHead!.ldv_NIDIssueDate) || '-'}</p>
                        )}
                      </div>
                      
                      
                    </div>
                  </div>
                )}

                {/* Company Representative Contact */}
                {company.companyRepresentative && (
                  <div className="rounded-lg p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200">
                    {/* Company Representative Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <h4 className="text-md font-semibold text-gray-800 mr-3">
                          {company.companyRepresentative!.name || 'Company Representative'}
                        </h4>
                        {(() => {
                          const extras = getAdditionalRolesFor(company.companyRepresentative!.id, roleLabels.rep)
                          return extras.length > 0 ? (
                            <span className="ml-2 bg-purple-100 text-purple-700 text-2xs px-2 py-0.5 rounded-full">{extras.join(' / ')}</span>
                          ) : null
                        })()}
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {language === 'ar' ? 'ممثل الشركة' : 'Company Representative'}
                        </span>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        {!(editingContacts[company.companyRepresentative!.id]) ? (
                          <button
                            onClick={() => toggleContactEdit(company.companyRepresentative!.id)}
                            className="bg-itida-blue hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSaveContact(company.companyRepresentative!.id)}
                              disabled={savingContacts[company.companyRepresentative!.id] || submitDebounce[company.companyRepresentative!.id]}
                              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {savingContacts[company.companyRepresentative!.id] ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال' : 'Submit')}
                            </button>
                            <button
                              onClick={() => handleSaveDraftContact(company.companyRepresentative!.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                            </button>
                            <button
                              onClick={() => handleCancelContact(company.companyRepresentative!.id)}
                              disabled={savingContacts[company.companyRepresentative!.id] || submitDebounce[company.companyRepresentative!.id]}
                              className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Company Representative Info - Display as read-only */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyRepresentative!.id]?.fullName ?? company.companyRepresentative!.fullName ?? company.companyRepresentative!.name) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'fullName', e.target.value || null)}
                            placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.fullName ?? company.companyRepresentative!.fullName ?? company.companyRepresentative!.name) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyRepresentative!.id]?.jobTitle ?? company.companyRepresentative!.jobTitle) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'jobTitle', e.target.value || null)}
                            placeholder={language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.jobTitle ?? company.companyRepresentative!.jobTitle) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684ل1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyRepresentative!.id]?.mobilePhone ?? company.companyRepresentative!.mobilePhone) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'mobilePhone', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.mobilePhone ?? company.companyRepresentative!.mobilePhone) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.companyRepresentative!.id]?.emailAddress1 ?? company.companyRepresentative!.emailAddress1) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'emailAddress1', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.emailAddress1 ?? company.companyRepresentative!.emailAddress1) || '-'}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Second Row - Additional Company Representative Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.companyRepresentative!.id]?.ldv_Email2 ?? company.companyRepresentative!.ldv_Email2) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'ldv_Email2', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.ldv_Email2 ?? company.companyRepresentative!.ldv_Email2) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          {language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyRepresentative!.id]?.ldv_NationalID ?? company.companyRepresentative!.ldv_NationalID) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'ldv_NationalID', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.ldv_NationalID ?? company.companyRepresentative!.ldv_NationalID) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                        </label>
                        {editingContacts[company.companyRepresentative!.id] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.companyRepresentative!.id]?.ldv_NIDIssueDate ?? company.companyRepresentative!.ldv_NIDIssueDate) || ''}
                            onChange={(e) => handleContactFieldChange(company.companyRepresentative!.id, 'ldv_NIDIssueDate', e.target.value || null)}
                            placeholder={language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.companyRepresentative!.id]?.ldv_NIDIssueDate ?? company.companyRepresentative!.ldv_NIDIssueDate) || '-'}</p>
                        )}
                      </div>
                      
                      
                    </div>
                  </div>
                )}

                {/* Primary Contact */}
                {company.primaryContact && (
                  <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                    {/* Primary Contact Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <h4 className="text-md font-semibold text-gray-800 mr-3">
                          {company.primaryContact!.name || 'Primary Contact'}
                        </h4>
                        {(() => {
                          const extras = getAdditionalRolesFor(company.primaryContact!.id, roleLabels.primary)
                          return extras.length > 0 ? (
                            <span className="ml-2 bg-blue-100 text-blue-700 text-2xs px-2 py-0.5 rounded-full">{extras.join(' / ')}</span>
                          ) : null
                        })()}
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {language === 'ar' ? 'أساسي' : 'Primary'}
                        </span>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        {!(editingContacts[getEditKeyForPrimary(company.primaryContact!.id)]) ? (
                          <button
                            onClick={() => toggleContactEditKey(getEditKeyForPrimary(company.primaryContact!.id))}
                            className="bg-itida-blue hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSaveContact(company.primaryContact!.id)}
                              disabled={savingContacts[company.primaryContact!.id] || submitDebounce[company.primaryContact!.id]}
                              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {savingContacts[company.primaryContact!.id] ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال' : 'Submit')}
                            </button>
                            <button
                              onClick={() => handleSaveDraftContact(company.primaryContact!.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                            </button>
                            <button
                              onClick={() => handleCancelContact(company.primaryContact!.id)}
                              disabled={savingContacts[company.primaryContact!.id] || submitDebounce[company.primaryContact!.id]}
                              className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              {language === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Primary Contact Info - Display as read-only / editable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.primaryContact!.id]?.fullName ?? company.primaryContact!.fullName ?? company.primaryContact!.name) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'fullName', e.target.value || null)}
                            placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.fullName ?? company.primaryContact!.fullName ?? company.primaryContact!.name) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                          {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.primaryContact!.id]?.jobTitle ?? company.primaryContact!.jobTitle) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'jobTitle', e.target.value || null)}
                            placeholder={language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.jobTitle ?? company.primaryContact!.jobTitle) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.primaryContact!.id]?.mobilePhone ?? company.primaryContact!.mobilePhone) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'mobilePhone', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.mobilePhone ?? company.primaryContact!.mobilePhone) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-red-500">*</span>
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.primaryContact!.id]?.emailAddress1 ?? company.primaryContact!.emailAddress1) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'emailAddress1', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.emailAddress1 ?? company.primaryContact!.emailAddress1) || '-'}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Second Row - Additional Contact Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="email"
                            value={(contactFormData[company.primaryContact!.id]?.ldv_Email2 ?? company.primaryContact!.ldv_Email2) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'ldv_Email2', e.target.value || null)}
                            placeholder={language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.ldv_Email2 ?? company.primaryContact!.ldv_Email2) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          {language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.primaryContact!.id]?.ldv_NationalID ?? company.primaryContact!.ldv_NationalID) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'ldv_NationalID', e.target.value || null)}
                            placeholder={language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.ldv_NationalID ?? company.primaryContact!.ldv_NationalID) || '-'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                        </label>
                        {editingContacts[getEditKeyForPrimary(company.primaryContact!.id)] ? (
                          <input
                            type="text"
                            value={(contactFormData[company.primaryContact!.id]?.ldv_NIDIssueDate ?? company.primaryContact!.ldv_NIDIssueDate) || ''}
                            onChange={(e) => handleContactFieldChange(company.primaryContact!.id, 'ldv_NIDIssueDate', e.target.value || null)}
                            placeholder={language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                            className="input-field"
                          />
                        ) : (
                          <p className="text-gray-900">{(contactFormData[company.primaryContact!.id]?.ldv_NIDIssueDate ?? company.primaryContact!.ldv_NIDIssueDate) || '-'}</p>
                        )}
                      </div>
                      
                      
                    </div>
                  </div>
                )}

                {/* Regular Contacts */}
                {Array.isArray(originalContacts) && originalContacts
                  .filter(c => !company.primaryContact || c.id !== company.primaryContact.id)
                  .map((contact) => {
                const isEditingContact = editingContacts[contact.id]
                const currentContactData = contactFormData[contact.id] || {}
                const isSavingContact = savingContacts[contact.id]
                const isSubmitDisabled = isSavingContact || submitDebounce[contact.id]
                
                return (
                <div key={contact.id} className={`rounded-lg p-4 transition-colors duration-500 ${isSavingContact ? 'bg-blue-100' : 'bg-gray-50'}`}>
                  {/* Contact Header with Edit Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-semibold text-gray-800">
                      {currentContactData.fullName || contact.fullName || `${currentContactData.firstName || contact.firstName || ''} ${currentContactData.lastName || contact.lastName || ''}`.trim() || 'Contact'}
                    </h4>
                    {(() => {
                      const extras = getAdditionalRolesFor(contact.id, roleLabels.regular)
                      return extras.length > 0 ? (
                        <span className="ml-2 bg-blue-100 text-blue-700 text-2xs px-2 py-0.5 rounded-full">{extras.join(' / ')}</span>
                      ) : null
                    })()}
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={async () => {
                          const confirmMsg = language === 'ar' ? 'هل تريد حذف جهة الاتصال هذه؟' : 'Delete this contact?'
                          if (!window.confirm(confirmMsg)) return
                          try {
                            setSavingContacts(prev => ({ ...prev, [contact.id]: true }))
                            setContactError(null)
                            setContactSuccess(null)
                            await deleteContact(company.accountId, contact.id)
                            setOriginalContacts(prev => prev.filter(c => c.id !== contact.id))
                            setContactSuccess(language === 'ar' ? 'تم حذف جهة الاتصال' : 'Contact deleted')
                          } catch (e:any) {
                            setContactError(e?.message || (language === 'ar' ? 'فشل حذف جهة الاتصال' : 'Failed to delete contact'))
                          } finally {
                            setSavingContacts(prev => ({ ...prev, [contact.id]: false }))
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        {language === 'ar' ? 'حذف' : 'Delete'}
                      </button>
                      {!isEditingContact ? (
                        <button
                          onClick={() => toggleContactEdit(contact.id)}
                          className="bg-itida-blue hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          {language === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSaveContact(contact.id)}
                            disabled={isSubmitDisabled}
                            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                              {isSavingContact ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : (language === 'ar' ? 'إرسال' : 'Submit')}
                          </button>
                          <button
                            onClick={() => handleSaveDraftContact(contact.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                          </button>
                          <button
                            onClick={() => handleCancelContact(contact.id)}
                            disabled={isSubmitDisabled}
                            className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            {language === 'ar' ? 'إلغاء' : 'Cancel'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-red-500">*</span>
                      </label>
                      {isEditingContact ? (
                        <input
                          type="text"
                          value={currentContactData.fullName || contact.fullName || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'fullName', e.target.value || null)}
                          placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{currentContactData.fullName || contact.fullName || '-'}</p>
                      )}
                    </div>

                    {/* Job Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                        {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                      </label>
                      {isEditingContact ? (
                        <input
                          type="text"
                          value={currentContactData.jobTitle || contact.jobTitle || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'jobTitle', e.target.value || null)}
                          placeholder={language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-gray-900">{currentContactData.jobTitle || contact.jobTitle || '-'}</p>
                      )}
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'} <span className="text-red-500">*</span>
                      </label>
                      {isEditingContact ? (
                        <input
                          type="tel"
                          value={currentContactData.mobilePhone || contact.mobilePhone || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'mobilePhone', e.target.value || null)}
                          placeholder={language === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Phone'}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-gray-900">{currentContactData.mobilePhone || contact.mobilePhone || '-'}</p>
                      )}
                    </div>

                    {/* Primary Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {language === 'ar' ? 'البريد الإلكتروني الرئيسي' : 'Primary Email'} <span className="text-red-500">*</span>
                      </label>
                      {isEditingContact ? (
                        <input
                          type="email"
                          value={currentContactData.emailAddress1 || contact.emailAddress1 || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'emailAddress1', e.target.value || null)}
                          placeholder={language === 'ar' ? 'البريد الإلكتروني الرئيسي' : 'Primary Email'}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-gray-900">{currentContactData.emailAddress1 || contact.emailAddress1 || '-'}</p>
                      )}
                    </div>

                    {/* Secondary Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                      </label>
                      {isEditingContact ? (
                        <input
                          type="email"
                          value={currentContactData.ldv_Email2 || contact.ldv_Email2 || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'ldv_Email2', e.target.value || null)}
                          placeholder={language === 'ar' ? 'البريد الإلكتروني الثانوي' : 'Secondary Email'}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-gray-900">{currentContactData.ldv_Email2 || contact.ldv_Email2 || '-'}</p>
                      )}
                    </div>

                    {/* National ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        {language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                      </label>
                      {isEditingContact ? (
                        <input
                          type="text"
                          value={currentContactData.ldv_NationalID || contact.ldv_NationalID || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'ldv_NationalID', e.target.value || null)}
                          placeholder={language === 'ar' ? 'رقم الهوية الوطنية' : 'National ID'}
                          className="input-field"
                          maxLength={14}
                        />
                      ) : (
                        <p className="text-gray-900">{currentContactData.ldv_NationalID || contact.ldv_NationalID || '-'}</p>
                      )}
                    </div>

                    {/* NID Issue Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="#94c045" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {language === 'ar' ? 'تاريخ إصدار الهوية' : 'NID Issue Date'}
                      </label>
                      {isEditingContact ? (
                        <select
                          value={currentContactData.ldv_NIDIssueDate || contact.ldv_NIDIssueDate || ''}
                          onChange={(e) => handleContactFieldChange(contact.id, 'ldv_NIDIssueDate', e.target.value || null)}
                          className="input-field"
                        >
                          <option value="">{language === 'ar' ? 'اختر السنة' : 'Select Year'}</option>
                          {Array.from({ length: 8 }, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          })}
                        </select>
                      ) : (
                        <p className="text-gray-900">{currentContactData.ldv_NIDIssueDate || contact.ldv_NIDIssueDate || '-'}</p>
                      )}
                    </div>

                    
                  </div>
                </div>
                )
              })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Owners / Stakeholders - Readonly */}
      {Array.isArray(company.ownersStakeholders) && company.ownersStakeholders.length > 0 && (
        <div className="mt-6">
          <div className="bg-[#2d8a5b] px-6 py-4 cursor-pointer select-none" onClick={() => setIsOwnersExpanded(!isOwnersExpanded)}>
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg className={`w-5 h-5 mr-2 transition-transform duration-300 ease-in-out ${isOwnersExpanded ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {language === 'ar' ? 'المالكون / أصحاب المصلحة' : 'Owners / Stakeholders'}
            </h3>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOwnersExpanded ? 'max-h-[2000px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'}`}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.ownersStakeholders!.map((o, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">{language === 'ar' ? 'الاسم' : 'Name'}</span>
                      <p className="text-gray-900 font-medium">{o.ldv_name || '-'}</p>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">{language === 'ar' ? 'نسبة الملكية' : 'Equity %'}</span>
                      <p className="text-gray-900">{o.ldv_Equitypercentage != null ? `${o.ldv_Equitypercentage}%` : '-'}</p>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">{language === 'ar' ? 'الرقم القومي' : 'National ID'}</span>
                      <p className="text-gray-900">{o.ldv_nationalid || '-'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">{language === 'ar' ? 'الوظيفة' : 'Position'}</span>
                      <p className="text-gray-900">{o.ldv_position || '-'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* removed old modal implementation */}
    </div>
  )
}

export default CompanyCard
