// Utility function to load mock data from JSON file
import mockData from '../data/mockRegistrationData.json'
import fakeCompaniesData from '../data/fakeCompaniesData.json'

export interface MockDataLoader {
  loadRegistrationData: () => any
  loadLookupData: (type: string) => any[]
  loadSampleCompanies: () => any[]
  loadRegistrationHistory: () => any[]
  loadValidationExamples: () => any
  loadFormValidationRules: () => any
  loadFakeCompaniesData: () => any
}

class MockDataLoaderService implements MockDataLoader {
  private data = mockData

  loadRegistrationData() {
    return this.data.registrationFormData
  }

  loadLookupData(type: string) {
    const lookupData = this.data.lookupData as any
    return lookupData[type] || []
  }

  loadSampleCompanies() {
    return this.data.sampleCompanies
  }

  loadRegistrationHistory() {
    return this.data.registrationHistory
  }

  loadValidationExamples() {
    return this.data.validationExamples
  }

  loadFormValidationRules() {
    return this.data.formValidationRules
  }

  loadFakeCompaniesData() {
    return fakeCompaniesData
  }

  // Helper method to get all lookup data
  getAllLookupData() {
    return this.data.lookupData
  }

  // Helper method to get metadata
  getMetadata() {
    return this.data.metadata
  }

  // Helper method to get API endpoints
  getApiEndpoints() {
    return this.data.apiEndpoints
  }

  // Helper method to generate random data based on patterns
  generateRandomData(type: 'company' | 'person' | 'contact' | 'financial') {
    const generators = {
      company: () => ({
        name: this.generateRandomCompanyName(),
        industry: this.getRandomFromArray(['Technology', 'Manufacturing', 'Services', 'Retail', 'Finance']),
        employees: Math.floor(Math.random() * 100) + 10,
        established: Math.floor(Math.random() * 10) + 2015
      }),
      person: () => ({
        name: this.generateRandomPersonName(),
        position: this.getRandomFromArray(['CEO', 'CTO', 'Manager', 'Director', 'Coordinator']),
        mobile: this.generateRandomPhoneNumber(),
        email: this.generateRandomEmail(),
        nationalId: this.generateRandomNationalId()
      }),
      contact: () => ({
        address: this.generateRandomAddress(),
        city: this.getRandomFromArray(['Cairo', 'Giza', 'Alexandria', 'Sharm El Sheikh']),
        governorate: this.getRandomFromArray(['cairo', 'giza', 'alexandria', 'red-sea']),
        website: this.generateRandomWebsite()
      }),
      financial: () => ({
        fiscalCapital: (Math.floor(Math.random() * 10000000) + 100000).toString(),
        annualRevenue: (Math.floor(Math.random() * 20000000) + 500000).toString(),
        employees: Math.floor(Math.random() * 200) + 5,
        exportValue: (Math.floor(Math.random() * 5000000) + 100000).toString()
      })
    }

    return generators[type]()
  }

  private generateRandomCompanyName(): string {
    const prefixes = ['Tech', 'Digital', 'Smart', 'Advanced', 'Innovative', 'Global', 'Elite']
    const suffixes = ['Solutions', 'Systems', 'Technologies', 'Services', 'Group', 'Corp', 'Ltd']
    const prefix = this.getRandomFromArray(prefixes)
    const suffix = this.getRandomFromArray(suffixes)
    return `${prefix} ${suffix} ${this.getRandomFromArray(['Egypt', 'Cairo', 'International'])}`
  }

  private generateRandomPersonName(): string {
    const firstNames = ['Ahmed', 'Mohamed', 'Sara', 'Fatma', 'Omar', 'Hassan', 'Ali', 'Nour', 'Youssef', 'Mona']
    const lastNames = ['Hassan', 'Ibrahim', 'Ali', 'Mohamed', 'Ahmed', 'Hassan', 'Omar', 'Sara', 'Fatma', 'Youssef']
    return `${this.getRandomFromArray(firstNames)} ${this.getRandomFromArray(lastNames)}`
  }

  private generateRandomPhoneNumber(): string {
    const prefixes = ['+2010', '+2011', '+2012', '+2015']
    const prefix = this.getRandomFromArray(prefixes)
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
    return `${prefix}${number}`
  }

  private generateRandomEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'company.com', 'business.org', 'tech.net']
    const name = this.generateRandomPersonName().toLowerCase().replace(' ', '.')
    const domain = this.getRandomFromArray(domains)
    return `${name}@${domain}`
  }

  private generateRandomNationalId(): string {
    return Math.floor(Math.random() * 100000000000000).toString().padStart(14, '0')
  }

  private generateRandomAddress(): string {
    const streets = ['Technology Street', 'Innovation Avenue', 'Digital Road', 'Smart Boulevard', 'IT Plaza']
    const numbers = Math.floor(Math.random() * 999) + 1
    const street = this.getRandomFromArray(streets)
    return `${numbers} ${street}`
  }

  private generateRandomWebsite(): string {
    const domains = ['techsolutions.com', 'digitalinnovations.net', 'smartservices.org', 'advancedtech.co']
    const domain = this.getRandomFromArray(domains)
    return `https://www.${domain}`
  }

  private getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}

// Export singleton instance
export const mockDataLoader = new MockDataLoaderService()

// Export individual functions for convenience
export const loadRegistrationData = () => mockDataLoader.loadRegistrationData()
export const loadLookupData = (type: string) => mockDataLoader.loadLookupData(type)
export const loadSampleCompanies = () => mockDataLoader.loadSampleCompanies()
export const loadRegistrationHistory = () => mockDataLoader.loadRegistrationHistory()
export const loadValidationExamples = () => mockDataLoader.loadValidationExamples()
export const loadFormValidationRules = () => mockDataLoader.loadFormValidationRules()
export const loadFakeCompaniesData = () => mockDataLoader.loadFakeCompaniesData()
export const generateRandomData = (type: 'company' | 'person' | 'contact' | 'financial') =>
  mockDataLoader.generateRandomData(type)

export default mockDataLoader
