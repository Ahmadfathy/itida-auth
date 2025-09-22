import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loadFakeCompaniesData } from '../utils/loadMockData'

export interface CompanyCredentials {
  username: string
  password: string
  email: string
}

export interface Company {
  id: string
  registrationStatus: string
  completionPercentage: number
  credentials: CompanyCredentials
  registrationFormData: any
}

export interface AuthContextType {
  isAuthenticated: boolean
  currentCompany: Company | null
  login: (username: string, password: string) => Promise<{ success: boolean; message: string; company?: Company }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedCompany = localStorage.getItem('currentCompany')
        if (savedCompany) {
          const company = JSON.parse(savedCompany)
          setCurrentCompany(company)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error loading saved company:', error)
        localStorage.removeItem('currentCompany')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string; company?: Company }> => {
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const companiesData = loadFakeCompaniesData()
      console.log('Available companies:', companiesData.companies.map(c => ({ username: c.credentials.username, password: c.credentials.password })))
      console.log('Login attempt:', { username, password })
      
      const company = companiesData.companies.find(
        comp => comp.credentials.username === username && comp.credentials.password === password
      )

      console.log('Found company:', company)

      if (company) {
        setCurrentCompany(company)
        setIsAuthenticated(true)
        localStorage.setItem('currentCompany', JSON.stringify(company))
        
        return {
          success: true,
          message: `Welcome back, ${company.registrationFormData.ldv_englishname}!`,
          company
        }
      } else {
        return {
          success: false,
          message: 'Invalid username or password. Please try again.'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'An error occurred during login. Please try again.'
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setCurrentCompany(null)
    setIsAuthenticated(false)
    localStorage.removeItem('currentCompany')
  }

  const value: AuthContextType = {
    isAuthenticated,
    currentCompany,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
