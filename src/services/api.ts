// Fake API Service for Registration Form
// This service provides mock data and endpoints for all registration form functionality

import { loadLookupData, loadRegistrationData, loadRegistrationHistory } from '../utils/loadMockData'

export interface CompanyHead {
  name: string
  position: string
  mobile: string
  nationalId: string
  email: string
  email2?: string
}

export interface ContactPerson {
  name: string
  position: string
  mobile: string
  nationalId: string
  email: string
}

export interface Product {
  name: string
  description: string
}

export interface Service {
  name: string
  description: string
}

export interface CustomerReference {
  name: string
  country: string
  projectSize: string
  scope: string
  industriesSector: string
  description: string
}

export interface ExportInformation {
  year: string
  marketRegion: string
  country: string
  valueExported: string
  totalAmountExported: number
}

export interface Owner {
  name: string
  mobile: string
  telephone: string
  email: string
}

export interface DomesticSalesDetail {
  year: string
  value: string
  totalRevenueYear: string
}

export interface CompanyBranch {
  branchName: string
  branchCountry: string
  branchGovernorate: string
  branchCity: string
  branchDistrict: string
  branchEmail: string
  mobilePhone: string
}

export interface CompanyClassification {
  companyClassification: string
  subClassification: string
}

export interface RegisterUsing {
  commercialRegistry: boolean
  unifiedCommercialRegistry: boolean
  taxRegistry: boolean
}

export interface Activities {
  softwareDesign: boolean
  itSystems: boolean
  trustServices: boolean
  websitesPlatforms: boolean
  electronicsEmbedded: boolean
  contentDigitization: boolean
  callCenterBusiness: boolean
  consultingResearch: boolean
  trainingLearning: boolean
}

export interface Attachments {
  commercialRegister: File | null
  taxCard: File | null
  nationalId: File | null
  investmentGazette: File | null
  declarationUndertaking: File | null
  representativeAuthorization: File | null
  representativeNationalId: File | null
}

export interface RegistrationFormData {
  // Company Legal Information
  ldv_englishname: string
  ldv_arabicname: string
  ldv_commercialdenomination: string
  ldv_legaltypecode: string
  emailaddress1: string
  ldv_establishmentyear: string
  companyClassification: CompanyClassification[]
  registerUsing: RegisterUsing
  commercialRegistryNumber: string
  commercialRegistryOffice: string
  classCode: string
  unifiedCommercialRegistryNumber: string
  taxRegistryNumber: string

  // Contact Information
  fullName: string
  contact_jobtitle: string
  contact_mobilephone: string
  contact_mail: string
  contact_ldv_nationalid: string
  contact_ldv_nidissuedfrom: string
  contact_ldv_nidissuedate: string
  requestApplicant: string
  representative_fullName: string
  representative_jobtitle: string
  representative_mobilephone: string
  representative_mail: string
  representative_nationalid: string
  representative_nidissuedfrom: string
  representative_nidissuedate: string

  // Address Information
  address: string
  governorate: string
  city: string
  district: string
  Street: string
  companyWebsite: string

  // Branches
  hasBranches: boolean
  branches: CompanyBranch[]

  // Activities and Attachments
  activities: Activities
  attachments: Attachments

  // Financial Information
  fiscalCapital: string
  domesticSalesDetails: DomesticSalesDetail[]
  domesticSalesValue: string
  totalRevenueYear: string
  annualRevenue: string
  auditedBalanceSheet: File | null
  export: string
  exportInformation: ExportInformation[]
  ownershipNationality: string
  percentageEgyptianOwnership: string
  percentageNonEgyptianOwnership: string
  partnersNationalities: string
  totalNoOfEmployees: string
  yearOfEstablishment: string
  companySize: string
  typeOfOwnership: string
  owners: Owner[]
  companyData: string
  products: Product[]
  services: Service[]
  customerReferences: CustomerReference[]
  parent: string
  child: string
  grandChild: string
  industrySectors: string
  keyTechnologies: string[]
  certificates: string[]
  affiliation: string[]
  memberships: string[]
  partnerships: string[]
  companyOverview: string

  // Dynamic arrays for repeatable sections
  companyHeads: CompanyHead[]
  contactPersons: ContactPerson[]

  // Additional fields
  licenseReceiptMethod: string
  declarationAgreement: boolean
  companyOverView: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface ValidationError {
  field: string
  message: string
}


// Mock data loaded from JSON
const mockRegistrationData: RegistrationFormData = loadRegistrationData()

// API Service Class
class FakeApiService {
  private delay = 1000 // Simulate network delay

  private async delayResponse<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), this.delay)
    })
  }

  // Validation endpoints
  async validateCompanyName(englishName: string, arabicName: string): Promise<ApiResponse<{ isValid: boolean; suggestions?: string[] }>> {
    await this.delayResponse(null)

    const isEnglishValid = /^[A-Za-z\s]+$/.test(englishName)
    const isArabicValid = /^[\u0600-\u06FF\s]+$/.test(arabicName)

    return {
      success: true,
      data: {
        isValid: isEnglishValid && isArabicValid,
        suggestions: !isEnglishValid ? ['Tech Solutions Inc', 'Digital Solutions Ltd'] : undefined
      }
    }
  }

  async validateNationalId(nationalId: string): Promise<ApiResponse<{ isValid: boolean; message?: string }>> {
    await this.delayResponse(null)

    const isValid = /^\d{14}$/.test(nationalId)

    return {
      success: true,
      data: {
        isValid,
        message: isValid ? 'Valid National ID' : 'National ID must be exactly 14 digits'
      }
    }
  }

  async validateEmail(email: string): Promise<ApiResponse<{ isValid: boolean; message?: string }>> {
    await this.delayResponse(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(email)

    return {
      success: true,
      data: {
        isValid,
        message: isValid ? 'Valid email address' : 'Please enter a valid email address'
      }
    }
  }

  // Lookup endpoints
  async getGovernorates(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const governorates = loadLookupData('governorates')

    return {
      success: true,
      data: governorates
    }
  }

  async getCountries(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const countries = loadLookupData('countries')

    return {
      success: true,
      data: countries
    }
  }

  async getLegalTypes(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const legalTypes = loadLookupData('legalTypes')

    return {
      success: true,
      data: legalTypes
    }
  }

  async getCompanyClassifications(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const classifications = loadLookupData('companyClassifications')

    return {
      success: true,
      data: classifications
    }
  }

  async getKeyTechnologies(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const technologies = loadLookupData('keyTechnologies')

    return {
      success: true,
      data: technologies
    }
  }

  async getCertificates(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const certificates = loadLookupData('certificates')

    return {
      success: true,
      data: certificates
    }
  }

  async getMemberships(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const memberships = loadLookupData('memberships')

    return {
      success: true,
      data: memberships
    }
  }

  async getPartnerships(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const partnerships = loadLookupData('partnerships')

    return {
      success: true,
      data: partnerships
    }
  }

  async getAffiliations(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const affiliations = loadLookupData('affiliations')

    return {
      success: true,
      data: affiliations
    }
  }

  async getNationalities(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const nationalities = loadLookupData('nationalities')

    return {
      success: true,
      data: nationalities
    }
  }

  // Form submission endpoints
  async saveDraft(formData: Partial<RegistrationFormData>): Promise<ApiResponse<{ draftId: string; savedAt: string }>> {
    await this.delayResponse(null)

    const draftId = `draft_${Date.now()}`
    const savedAt = new Date().toISOString()

    // In a real app, this would save to localStorage or send to server
    localStorage.setItem(`registration_draft_${draftId}`, JSON.stringify(formData))

    return {
      success: true,
      data: { draftId, savedAt },
      message: 'Draft saved successfully'
    }
  }

  async loadDraft(draftId: string): Promise<ApiResponse<RegistrationFormData>> {
    await this.delayResponse(null)

    const draftData = localStorage.getItem(`registration_draft_${draftId}`)

    if (!draftData) {
      return {
        success: false,
        data: mockRegistrationData,
        message: 'Draft not found'
      }
    }

    return {
      success: true,
      data: JSON.parse(draftData)
    }
  }

  async submitRegistration(formData: RegistrationFormData): Promise<ApiResponse<{ registrationId: string; status: string; submittedAt: string }>> {
    await this.delayResponse(null)

    // Simulate validation
    const errors: ValidationError[] = []

    if (!formData.ldv_englishname) {
      errors.push({ field: 'ldv_englishname', message: 'English company name is required' })
    }

    if (!formData.ldv_arabicname) {
      errors.push({ field: 'ldv_arabicname', message: 'Arabic company name is required' })
    }

    if (!formData.ldv_legaltypecode) {
      errors.push({ field: 'ldv_legaltypecode', message: 'Legal type is required' })
    }

    if (!formData.emailaddress1) {
      errors.push({ field: 'emailaddress1', message: 'Email is required' })
    }

    if (errors.length > 0) {
      return {
        success: false,
        data: { registrationId: '', status: 'validation_failed', submittedAt: '' },
        errors: errors.map(e => e.message)
      }
    }

    const registrationId = `REG_${Date.now()}`
    const submittedAt = new Date().toISOString()

    // In a real app, this would send to server
    console.log('Registration submitted:', formData)

    return {
      success: true,
      data: {
        registrationId,
        status: 'submitted',
        submittedAt
      },
      message: 'Registration submitted successfully'
    }
  }

  async getRegistrationStatus(_registrationId: string): Promise<ApiResponse<{ status: string; lastUpdated: string; notes?: string }>> {
    await this.delayResponse(null)

    // Simulate different statuses
    const statuses = ['submitted', 'under_review', 'approved', 'rejected', 'requires_additional_info']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      success: true,
      data: {
        status: randomStatus,
        lastUpdated: new Date().toISOString(),
        notes: randomStatus === 'requires_additional_info' ? 'Please provide additional documentation' : undefined
      }
    }
  }

  // File upload endpoints
  async uploadFile(file: File, _fieldName: string): Promise<ApiResponse<{ fileId: string; fileName: string; fileSize: number; uploadedAt: string }>> {
    await this.delayResponse(null)

    // Simulate file validation
    const maxSize = 3 * 1024 * 1024 // 3 MB
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']

    if (file.size > maxSize) {
      return {
        success: false,
        data: { fileId: '', fileName: '', fileSize: 0, uploadedAt: '' },
        message: 'File size must be less than 3 MB'
      }
    }

    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        data: { fileId: '', fileName: '', fileSize: 0, uploadedAt: '' },
        message: 'File type must be PDF, JPG, or PNG'
      }
    }

    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const uploadedAt = new Date().toISOString()

    return {
      success: true,
      data: {
        fileId,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt
      },
      message: 'File uploaded successfully'
    }
  }

  // Search and autocomplete endpoints
  async searchCompanies(query: string): Promise<ApiResponse<{ name: string; id: string; status: string }[]>> {
    await this.delayResponse(null)

    const mockCompanies = [
      { name: 'Tech Solutions Egypt', id: 'comp_1', status: 'active' },
      { name: 'Digital Innovations Ltd', id: 'comp_2', status: 'active' },
      { name: 'Software House Cairo', id: 'comp_3', status: 'inactive' },
      { name: 'IT Services Company', id: 'comp_4', status: 'active' }
    ]

    const filtered = mockCompanies.filter(company =>
      company.name.toLowerCase().includes(query.toLowerCase())
    )

    return {
      success: true,
      data: filtered
    }
  }

  async getRegistrationHistory(): Promise<ApiResponse<{ id: string; companyName: string; status: string; submittedAt: string; lastUpdated: string }[]>> {
    await this.delayResponse(null)

    const history = loadRegistrationHistory()

    return {
      success: true,
      data: history
    }
  }

  // Utility methods
  async getFormSchema(): Promise<ApiResponse<any>> {
    await this.delayResponse(null)

    // Return form validation schema
    return {
      success: true,
      data: {
        requiredFields: [
          'ldv_englishname',
          'ldv_arabicname',
          'ldv_legaltypecode',
          'emailaddress1',
          'contact_ldv_nationalid',
          'contact_mobilephone',
          'contact_mail'
        ],
        optionalFields: [
          'companyWebsite',
          'representative_fullName',
          'representative_mobilephone',
          'representative_mail'
        ]
      }
    }
  }

  async getRegistrationStats(): Promise<ApiResponse<{ totalRegistrations: number; pendingReview: number; approved: number; rejected: number }>> {
    await this.delayResponse(null)

    return {
      success: true,
      data: {
        totalRegistrations: 1250,
        pendingReview: 45,
        approved: 1100,
        rejected: 105
      }
    }
  }
}

// Export singleton instance
export const apiService = new FakeApiService()

// Types are already exported above as interfaces

