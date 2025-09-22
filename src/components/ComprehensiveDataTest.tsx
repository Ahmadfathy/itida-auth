import React, { useEffect, useState } from 'react'
import { loadFakeCompaniesData, loadLookupData, loadRegistrationData } from '../utils/loadMockData'

const ComprehensiveDataTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({})

  useEffect(() => {
    const runTests = async () => {
      const results: any = {}

      // Test 1: Load fake companies data
      try {
        const companiesData = loadFakeCompaniesData()
        results.fakeCompanies = {
          success: true,
          companiesCount: companiesData.companies?.length || 0,
          hasMetadata: !!companiesData.metadata,
          firstCompanyId: companiesData.companies?.[0]?.id || 'N/A',
          firstCompanyName: companiesData.companies?.[0]?.registrationFormData?.ldv_englishname || 'N/A'
        }
      } catch (error) {
        results.fakeCompanies = { success: false, error: error instanceof Error ? error.message : String(error) }
      }

      // Test 2: Load lookup data
      try {
        const governorates = loadLookupData('governorates')
        const countries = loadLookupData('countries')
        const legalTypes = loadLookupData('legalTypes')

        results.lookupData = {
          success: true,
          governoratesCount: governorates?.length || 0,
          countriesCount: countries?.length || 0,
          legalTypesCount: legalTypes?.length || 0
        }
      } catch (error) {
        results.lookupData = { success: false, error: error instanceof Error ? error.message : String(error) }
      }

      // Test 3: Load registration data
      try {
        const registrationData = loadRegistrationData()
        results.registrationData = {
          success: true,
          hasEnglishName: !!registrationData.ldv_englishname,
          hasArabicName: !!registrationData.ldv_arabicname,
          hasEmail: !!registrationData.emailaddress1
        }
      } catch (error) {
        results.registrationData = { success: false, error: error instanceof Error ? error.message : String(error) }
      }

      // Test 4: Test specific company credentials
      try {
        const companiesData = loadFakeCompaniesData()
        const testCredentials = companiesData.companies?.map(company => ({
          id: company.id,
          username: company.credentials?.username,
          password: company.credentials?.password,
          email: company.credentials?.email,
          companyName: company.registrationFormData?.ldv_englishname
        })) || []

        results.credentials = {
          success: true,
          credentials: testCredentials
        }
      } catch (error) {
        results.credentials = { success: false, error: error instanceof Error ? error.message : String(error) }
      }

      setTestResults(results)
    }

    runTests()
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Comprehensive Data Loading Test</h2>

      <div className="space-y-4">
        {/* Fake Companies Test */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Fake Companies Data</h3>
          {testResults.fakeCompanies ? (
            <div className={testResults.fakeCompanies.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.fakeCompanies.success ? (
                <div>
                  <p>✅ Loaded successfully</p>
                  <p>Companies: {testResults.fakeCompanies.companiesCount}</p>
                  <p>First Company: {testResults.fakeCompanies.firstCompanyName} ({testResults.fakeCompanies.firstCompanyId})</p>
                </div>
              ) : (
                <p>❌ Error: {testResults.fakeCompanies.error}</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Lookup Data Test */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Lookup Data</h3>
          {testResults.lookupData ? (
            <div className={testResults.lookupData.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.lookupData.success ? (
                <div>
                  <p>✅ Loaded successfully</p>
                  <p>Governorates: {testResults.lookupData.governoratesCount}</p>
                  <p>Countries: {testResults.lookupData.countriesCount}</p>
                  <p>Legal Types: {testResults.lookupData.legalTypesCount}</p>
                </div>
              ) : (
                <p>❌ Error: {testResults.lookupData.error}</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Registration Data Test */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Registration Data</h3>
          {testResults.registrationData ? (
            <div className={testResults.registrationData.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.registrationData.success ? (
                <div>
                  <p>✅ Loaded successfully</p>
                  <p>Has English Name: {testResults.registrationData.hasEnglishName ? 'Yes' : 'No'}</p>
                  <p>Has Arabic Name: {testResults.registrationData.hasArabicName ? 'Yes' : 'No'}</p>
                  <p>Has Email: {testResults.registrationData.hasEmail ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                <p>❌ Error: {testResults.registrationData.error}</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Credentials Test */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Company Credentials</h3>
          {testResults.credentials ? (
            <div className={testResults.credentials.success ? 'text-green-600' : 'text-red-600'}>
              {testResults.credentials.success ? (
                <div>
                  <p>✅ Loaded successfully</p>
                  <div className="mt-2">
                    <p className="font-semibold">Available Login Credentials:</p>
                    <div className="mt-2 space-y-2">
                      {testResults.credentials.credentials.map((cred: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          <p><strong>Company:</strong> {cred.companyName} ({cred.id})</p>
                          <p><strong>Username:</strong> {cred.username}</p>
                          <p><strong>Password:</strong> {cred.password}</p>
                          <p><strong>Email:</strong> {cred.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p>❌ Error: {testResults.credentials.error}</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveDataTest
