import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoginTestComponent: React.FC = () => {
  const { login, currentCompany, isAuthenticated } = useAuth()
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const testLogin = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await login(username, password)
      setTestResults({
        success: result.success,
        message: result.message,
        hasCompany: !!result.company,
        companyId: result.company?.id,
        companyName: result.company?.registrationFormData?.ldv_englishname
      })
    } catch (error) {
      setTestResults({
        success: false,
        message: `Error: ${error}`,
        hasCompany: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testCredentials = [
    { username: 'advancedigital', password: 'ads2024!', name: 'Advanced Digital Solutions' },
    { username: 'greenenergy', password: 'get2024!', name: 'Green Energy Technologies' },
    { username: 'startupinnovations', password: 'sih2024!', name: 'Startup Innovations Hub' },
    { username: 'creativedesign', password: 'cds2024!', name: 'Creative Design Studio' }
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Test Component</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Current Status:</p>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>Current Company: {currentCompany?.registrationFormData?.ldv_englishname || 'None'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Test Login with Sample Credentials:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {testCredentials.map((cred, index) => (
            <button
              key={index}
              onClick={() => testLogin(cred.username, cred.password)}
              disabled={isLoading}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
            >
              {isLoading ? 'Testing...' : `Login as ${cred.name}`}
            </button>
          ))}
        </div>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
          <div className={testResults.success ? 'text-green-600' : 'text-red-600'}>
            <p>Success: {testResults.success ? 'Yes' : 'No'}</p>
            <p>Message: {testResults.message}</p>
            {testResults.hasCompany && (
              <div>
                <p>Company ID: {testResults.companyId}</p>
                <p>Company Name: {testResults.companyName}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {currentCompany && (
        <div className="mt-4 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Current Company Data:</h3>
          <div className="text-sm space-y-1">
            <p><strong>ID:</strong> {currentCompany.id}</p>
            <p><strong>Status:</strong> {currentCompany.registrationStatus}</p>
            <p><strong>Completion:</strong> {currentCompany.completionPercentage}%</p>
            <p><strong>English Name:</strong> {currentCompany.registrationFormData?.ldv_englishname || 'N/A'}</p>
            <p><strong>Arabic Name:</strong> {currentCompany.registrationFormData?.ldv_arabicname || 'N/A'}</p>
            <p><strong>Email:</strong> {currentCompany.registrationFormData?.emailaddress1 || 'N/A'}</p>
            <p><strong>Legal Type:</strong> {currentCompany.registrationFormData?.ldv_legaltypecode || 'N/A'}</p>
            <p><strong>Fiscal Capital:</strong> {currentCompany.registrationFormData?.fiscalCapital || 'N/A'}</p>
            <p><strong>Employees:</strong> {currentCompany.registrationFormData?.totalNoOfEmployees || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginTestComponent
