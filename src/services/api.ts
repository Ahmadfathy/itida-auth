// Fake API Service for Registration Form
// This service provides mock data and endpoints for all registration form functionality

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

// Mock data generators
const generateMockCompanyHead = (): CompanyHead => ({
  name: 'Ahmed Mohamed Hassan',
  position: 'CEO',
  mobile: '+201234567890',
  nationalId: '12345678901234',
  email: 'ahmed.hassan@company.com',
  email2: 'ahmed.hassan.personal@gmail.com'
})

const generateMockContactPerson = (): ContactPerson => ({
  name: 'Sara Ali Mohamed',
  position: 'Operations Manager',
  mobile: '+201987654321',
  nationalId: '98765432109876',
  email: 'sara.ali@company.com'
})

const generateMockProduct = (): Product => ({
  name: 'Enterprise Management System',
  description: 'Comprehensive business management solution for small to medium enterprises'
})

const generateMockService = (): Service => ({
  name: 'IT Consulting',
  description: 'Strategic IT consulting services for digital transformation'
})

const generateMockCustomerReference = (): CustomerReference => ({
  name: 'ABC Corporation',
  country: 'Egypt',
  projectSize: 'Large',
  scope: 'Full-stack development',
  industriesSector: 'Banking',
  description: 'Developed a complete banking management system'
})

const generateMockExportInformation = (): ExportInformation => ({
  year: '2023',
  marketRegion: 'Middle East',
  country: 'Saudi Arabia',
  valueExported: 'Software Solutions',
  totalAmountExported: 500000
})

const generateMockOwner = (): Owner => ({
  name: 'Mohamed Ibrahim',
  mobile: '+201112233445',
  telephone: '+20234567890',
  email: 'mohamed.ibrahim@company.com'
})

const generateMockDomesticSalesDetail = (): DomesticSalesDetail => ({
  year: '2023',
  value: '1000000',
  totalRevenueYear: '1500000'
})

const generateMockCompanyBranch = (): CompanyBranch => ({
  branchName: 'Cairo Branch',
  branchCountry: 'Egypt',
  branchGovernorate: 'Cairo',
  branchCity: 'Cairo',
  branchDistrict: 'Nasr City',
  branchEmail: 'cairo@company.com',
  mobilePhone: '+201234567890'
})

// Mock data
const mockRegistrationData: RegistrationFormData = {
  // Company Legal Information
  ldv_englishname: 'Tech Solutions Egypt',
  ldv_arabicname: 'حلول التكنولوجيا مصر',
  ldv_commercialdenomination: 'TECH-2024-001',
  ldv_legaltypecode: 'Limited Liability Company',
  emailaddress1: 'info@techsolutions-egypt.com',
  ldv_establishmentyear: '2020',
  companyClassification: [
    { companyClassification: 'Technology', subClassification: 'Software Development' },
    { companyClassification: 'Services', subClassification: 'Consulting' }
  ],
  registerUsing: {
    commercialRegistry: true,
    unifiedCommercialRegistry: true,
    taxRegistry: true
  },
  commercialRegistryNumber: 'CR-12345-2024',
  commercialRegistryOffice: 'Cairo Commercial Registry',
  classCode: 'Main Branch',
  unifiedCommercialRegistryNumber: 'UCR-67890-2024',
  taxRegistryNumber: 'TR-11111-2024',

  // Contact Information
  fullName: 'Ahmed Mohamed Hassan',
  contact_jobtitle: 'partner',
  contact_mobilephone: '+201234567890',
  contact_mail: 'ahmed.hassan@techsolutions-egypt.com',
  contact_ldv_nationalid: '12345678901234',
  contact_ldv_nidissuedfrom: 'Cairo',
  contact_ldv_nidissuedate: '01/2020',
  requestApplicant: 'company-in-charge',
  representative_fullName: '',
  representative_jobtitle: '',
  representative_mobilephone: '',
  representative_mail: '',
  representative_nationalid: '',
  representative_nidissuedfrom: '',
  representative_nidissuedate: '',

  // Address Information
  address: '123 Technology Street, Smart City',
  governorate: 'cairo',
  city: 'Cairo',
  district: 'Nasr City',
  Street: 'Technology Street',
  companyWebsite: 'https://www.techsolutions-egypt.com',

  // Branches
  hasBranches: true,
  branches: [generateMockCompanyBranch()],

  // Activities and Attachments
  activities: {
    softwareDesign: true,
    itSystems: true,
    trustServices: false,
    websitesPlatforms: true,
    electronicsEmbedded: false,
    contentDigitization: true,
    callCenterBusiness: false,
    consultingResearch: true,
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

  // Financial Information
  fiscalCapital: '1000000',
  domesticSalesDetails: [generateMockDomesticSalesDetail()],
  domesticSalesValue: '1000000',
  totalRevenueYear: '1500000',
  annualRevenue: '1500000',
  auditedBalanceSheet: null,
  export: 'yes',
  exportInformation: [generateMockExportInformation()],
  ownershipNationality: 'yes',
  percentageEgyptianOwnership: '100',
  percentageNonEgyptianOwnership: '0',
  partnersNationalities: 'Egyptian',
  totalNoOfEmployees: '25',
  yearOfEstablishment: '2020',
  companySize: 'medium',
  typeOfOwnership: 'Private',
  owners: [generateMockOwner()],
  companyData: 'Leading technology solutions provider',
  products: [generateMockProduct()],
  services: [generateMockService()],
  customerReferences: [generateMockCustomerReference()],
  parent: '',
  child: '',
  grandChild: '',
  industrySectors: 'IT',
  keyTechnologies: ['Microsoft', 'Java', 'Open Source'],
  certificates: ['ISO 9001 Quality', 'CMMI-DEV'],
  affiliation: ['MENA Innovation 2018'],
  memberships: ['CIT', 'EITISAL'],
  partnerships: ['Microsoft Certified Partner', 'Oracle Certified Partner'],
  companyOverview: 'We are a leading technology company specializing in software development and IT consulting services.',

  // Dynamic arrays
  companyHeads: [generateMockCompanyHead()],
  contactPersons: [generateMockContactPerson()],

  // Additional fields
  licenseReceiptMethod: 'email',
  declarationAgreement: true,
  companyOverView: 'We are a leading technology company specializing in software development and IT consulting services.'
}

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

    const governorates = [
      { value: 'cairo', label: 'Cairo' },
      { value: 'giza', label: 'Giza' },
      { value: 'alexandria', label: 'Alexandria' },
      { value: 'sharqia', label: 'Sharqia' },
      { value: 'gharbia', label: 'Gharbia' },
      { value: 'menoufia', label: 'Menoufia' },
      { value: 'qalyubia', label: 'Qalyubia' },
      { value: 'port-said', label: 'Port Said' },
      { value: 'suez', label: 'Suez' },
      { value: 'ismailia', label: 'Ismailia' },
      { value: 'kafr-el-sheikh', label: 'Kafr El Sheikh' },
      { value: 'beheira', label: 'Beheira' },
      { value: 'assiut', label: 'Assiut' },
      { value: 'sohag', label: 'Sohag' },
      { value: 'qena', label: 'Qena' },
      { value: 'luxor', label: 'Luxor' },
      { value: 'aswan', label: 'Aswan' },
      { value: 'red-sea', label: 'Red Sea' },
      { value: 'new-valley', label: 'New Valley' },
      { value: 'matruh', label: 'Matruh' },
      { value: 'north-sinai', label: 'North Sinai' },
      { value: 'south-sinai', label: 'South Sinai' },
      { value: 'beni-suef', label: 'Beni Suef' },
      { value: 'fayoum', label: 'Fayoum' },
      { value: 'minya', label: 'Minya' },
      { value: 'dakahlia', label: 'Dakahlia' },
      { value: 'damietta', label: 'Damietta' }
    ]

    return {
      success: true,
      data: governorates
    }
  }

  async getCountries(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const countries = [
      { value: 'Egypt', label: 'Egypt' },
      { value: 'United States', label: 'United States' },
      { value: 'United Kingdom', label: 'United Kingdom' },
      { value: 'Canada', label: 'Canada' },
      { value: 'France', label: 'France' },
      { value: 'Germany', label: 'Germany' },
      { value: 'India', label: 'India' },
      { value: 'Italy', label: 'Italy' },
      { value: 'Japan', label: 'Japan' },
      { value: 'Saudi Arabia', label: 'Saudi Arabia' },
      { value: 'UAE', label: 'UAE' },
      { value: 'Kuwait', label: 'Kuwait' },
      { value: 'Qatar', label: 'Qatar' },
      { value: 'Jordan', label: 'Jordan' },
      { value: 'Lebanon', label: 'Lebanon' },
      { value: 'Morocco', label: 'Morocco' },
      { value: 'Tunisia', label: 'Tunisia' },
      { value: 'Algeria', label: 'Algeria' }
    ]

    return {
      success: true,
      data: countries
    }
  }

  async getLegalTypes(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const legalTypes = [
      { value: 'Sole proprietorship Co', label: 'Sole Proprietorship Company' },
      { value: 'Sole Corporation', label: 'Sole Corporation' },
      { value: 'General Partnership', label: 'General Partnership' },
      { value: 'Limited Liability Company', label: 'Limited Liability Company' },
      { value: 'Joint', label: 'Joint' },
      { value: 'Special Limited Partnership', label: 'Special Limited Partnership' },
      { value: 'Inherited Company', label: 'Inherited Company' },
      { value: 'Limited Partnership by Shares', label: 'Limited Partnership by Shares' },
      { value: 'Cooperative Associations', label: 'Cooperative Associations' },
      { value: 'De Facto Company', label: 'De Facto Company' },
      { value: 'Branch of Foreign Company', label: 'Branch of Foreign Company' },
      { value: 'Non-Profit Entities', label: 'Non-Profit Entities' }
    ]

    return {
      success: true,
      data: legalTypes
    }
  }

  async getCompanyClassifications(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const classifications = [
      { value: 'technology', label: 'Technology' },
      { value: 'consulting', label: 'Consulting' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'retail', label: 'Retail' },
      { value: 'finance', label: 'Finance' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' }
    ]

    return {
      success: true,
      data: classifications
    }
  }

  async getKeyTechnologies(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const technologies = [
      { value: 'IBM', label: 'IBM' },
      { value: 'Microsoft', label: 'Microsoft' },
      { value: 'Oracle', label: 'Oracle' },
      { value: 'SUN', label: 'SUN' },
      { value: 'Java', label: 'Java' },
      { value: 'Open Source', label: 'Open Source' },
      { value: 'SAP', label: 'SAP' },
      { value: 'Sybase', label: 'Sybase' },
      { value: 'Others', label: 'Others' }
    ]

    return {
      success: true,
      data: technologies
    }
  }

  async getCertificates(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const certificates = [
      { value: 'BS 15000', label: 'BS 15000' },
      { value: 'ISO 20K', label: 'ISO 20K' },
      { value: 'CMMI-DEV', label: 'CMMI-DEV' },
      { value: 'ISO 27001 (BS 7799 merged)', label: 'ISO 27001 (BS 7799 merged)' },
      { value: 'CMMI-SVC', label: 'CMMI-SVC' },
      { value: 'ISO 9001 Quality', label: 'ISO 9001 Quality' },
      { value: 'COBIT', label: 'COBIT' },
      { value: 'PCMM', label: 'PCMM' },
      { value: 'COPC 2000', label: 'COPC 2000' },
      { value: 'Six Sigma Businesses', label: 'Six Sigma Businesses' },
      { value: 'eSCM Establishing', label: 'eSCM Establishing' },
      { value: 'Others', label: 'Others' }
    ]

    return {
      success: true,
      data: certificates
    }
  }

  async getMemberships(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const memberships = [
      { value: 'CIT', label: 'CIT' },
      { value: 'EITISAL', label: 'EITISAL' },
      { value: 'eLABs', label: 'eLABs' },
      { value: 'ITI', label: 'ITI' },
      { value: 'FoCCIT', label: 'FoCCIT' },
      { value: 'ITEC', label: 'ITEC' },
      { value: 'Others', label: 'Others' }
    ]

    return {
      success: true,
      data: memberships
    }
  }

  async getPartnerships(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const partnerships = [
      { value: 'Microsoft Certified Partner', label: 'Microsoft Certified Partner' },
      { value: 'HP Preferred Partner', label: 'HP Preferred Partner' },
      { value: 'Oracle Certified Partner', label: 'Oracle Certified Partner' },
      { value: 'IBM Partner', label: 'IBM Partner' },
      { value: 'Intel Certified Partner', label: 'Intel Certified Partner' },
      { value: 'Cisco Partner', label: 'Cisco Partner' },
      { value: 'Others', label: 'Others' }
    ]

    return {
      success: true,
      data: partnerships
    }
  }

  async getAffiliations(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const affiliations = [
      { value: 'MENA Innovation 2018', label: 'MENA Innovation 2018' },
      { value: 'Others', label: 'Others' }
    ]

    return {
      success: true,
      data: affiliations
    }
  }

  async getNationalities(): Promise<ApiResponse<{ value: string; label: string }[]>> {
    await this.delayResponse(null)

    const nationalities = [
      { value: 'Egyptian', label: 'Egyptian' },
      { value: 'American', label: 'American' },
      { value: 'British', label: 'British' },
      { value: 'Canadian', label: 'Canadian' },
      { value: 'French', label: 'French' },
      { value: 'German', label: 'German' },
      { value: 'Indian', label: 'Indian' },
      { value: 'Italian', label: 'Italian' },
      { value: 'Japanese', label: 'Japanese' },
      { value: 'Chinese', label: 'Chinese' },
      { value: 'Brazilian', label: 'Brazilian' }
    ]

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

    const history = [
      {
        id: 'REG_001',
        companyName: 'Tech Solutions Egypt',
        status: 'approved',
        submittedAt: '2024-01-15T10:30:00Z',
        lastUpdated: '2024-01-20T14:45:00Z'
      },
      {
        id: 'REG_002',
        companyName: 'Digital Innovations Ltd',
        status: 'under_review',
        submittedAt: '2024-02-01T09:15:00Z',
        lastUpdated: '2024-02-05T11:20:00Z'
      }
    ]

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

