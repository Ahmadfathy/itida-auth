import React, { useEffect, useState } from 'react'
import { useLookups, useRegistration, useValidation } from '../hooks/useApi'

const ApiDemo: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('lookups')

  // API hooks
  const lookups = useLookups()
  const validation = useValidation()
  const registration = useRegistration()

  // Demo state
  const [companyName, setCompanyName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [email, setEmail] = useState('')
  const [validationResults, setValidationResults] = useState<any>({})

  // Load lookups on component mount
  useEffect(() => {
    lookups.governorates.execute()
    lookups.countries.execute()
    lookups.legalTypes.execute()
    lookups.companyClassifications.execute()
    lookups.keyTechnologies.execute()
    lookups.certificates.execute()
    lookups.memberships.execute()
    lookups.partnerships.execute()
    lookups.affiliations.execute()
    lookups.nationalities.execute()
  }, [])

  const handleValidation = async (type: string, value: string) => {
    let result: any
    switch (type) {
      case 'company':
        result = await validation.validateCompanyName.execute(value, '')
        break
      case 'nationalId':
        result = await validation.validateNationalId.execute(value)
        break
      case 'email':
        result = await validation.validateEmail.execute(value)
        break
    }
    setValidationResults((prev: any) => ({ ...prev, [type]: result.data }))
  }

  const handleSubmitRegistration = async () => {
    const mockFormData = {
      ldv_englishname: 'Demo Company',
      ldv_arabicname: 'شركة تجريبية',
      ldv_legaltypecode: 'Limited Liability Company',
      emailaddress1: 'demo@company.com',
      contact_ldv_nationalid: '12345678901234',
      contact_mobilephone: '+201234567890',
      contact_mail: 'contact@company.com'
    }

    await registration.submitRegistration.execute(mockFormData)
  }

  const renderLookupsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Lookup Data</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Governorates</h4>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {lookups.governorates.loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : lookups.governorates.data ? (
              lookups.governorates.data.map((gov, index) => (
                <div key={index} className="text-sm py-1">
                  {gov.label}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Countries</h4>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {lookups.countries.loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : lookups.countries.data ? (
              lookups.countries.data.slice(0, 10).map((country, index) => (
                <div key={index} className="text-sm py-1">
                  {country.label}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Legal Types</h4>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {lookups.legalTypes.loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : lookups.legalTypes.data ? (
              lookups.legalTypes.data.map((type, index) => (
                <div key={index} className="text-sm py-1">
                  {type.label}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Technologies</h4>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {lookups.keyTechnologies.loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : lookups.keyTechnologies.data ? (
              lookups.keyTechnologies.data.map((tech, index) => (
                <div key={index} className="text-sm py-1">
                  {tech.label}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderValidationTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Validation Testing</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name (English)</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={() => handleValidation('company', companyName)}
            className="input-field"
            placeholder="Enter company name"
          />
          {validationResults.company && (
            <p className={`text-sm mt-1 ${validationResults.company.isValid ? 'text-green-600' : 'text-red-600'}`}>
              {validationResults.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">National ID</label>
          <input
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            onBlur={() => handleValidation('nationalId', nationalId)}
            className="input-field"
            placeholder="Enter 14-digit National ID"
          />
          {validationResults.nationalId && (
            <p className={`text-sm mt-1 ${validationResults.nationalId.isValid ? 'text-green-600' : 'text-red-600'}`}>
              {validationResults.nationalId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleValidation('email', email)}
            className="input-field"
            placeholder="Enter email address"
          />
          {validationResults.email && (
            <p className={`text-sm mt-1 ${validationResults.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
              {validationResults.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  const renderRegistrationTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Registration Testing</h3>

      <div className="space-y-4">
        <button
          onClick={handleSubmitRegistration}
          disabled={registration.submitRegistration.loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {registration.submitRegistration.loading ? 'Submitting...' : 'Submit Demo Registration'}
        </button>

        {registration.submitRegistration.data && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h4 className="font-medium text-green-800">Registration Submitted Successfully!</h4>
            <p className="text-sm text-green-700">
              Registration ID: {registration.submitRegistration.data.registrationId}
            </p>
            <p className="text-sm text-green-700">
              Status: {registration.submitRegistration.data.status}
            </p>
            <p className="text-sm text-green-700">
              Submitted At: {new Date(registration.submitRegistration.data.submittedAt).toLocaleString()}
            </p>
          </div>
        )}

        {registration.submitRegistration.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h4 className="font-medium text-red-800">Registration Failed</h4>
            <p className="text-sm text-red-700">{registration.submitRegistration.error}</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Fake API Service Demo</h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setSelectedTab('lookups')}
          className={`pb-2 px-1 ${selectedTab === 'lookups' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Lookups
        </button>
        <button
          onClick={() => setSelectedTab('validation')}
          className={`pb-2 px-1 ${selectedTab === 'validation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Validation
        </button>
        <button
          onClick={() => setSelectedTab('registration')}
          className={`pb-2 px-1 ${selectedTab === 'registration' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Registration
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'lookups' && renderLookupsTab()}
      {selectedTab === 'validation' && renderValidationTab()}
      {selectedTab === 'registration' && renderRegistrationTab()}

      {/* API Status */}
      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">API Service Status</h3>
        <div className="text-sm text-gray-600">
          <p>✅ All endpoints implemented</p>
          <p>✅ Mock data generated</p>
          <p>✅ Validation working</p>
          <p>✅ Error handling included</p>
          <p>✅ TypeScript types defined</p>
        </div>
      </div>
    </div>
  )
}

export default ApiDemo
