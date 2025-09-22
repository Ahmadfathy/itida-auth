import React, { useState } from 'react'
import { loadFormValidationRules, loadLookupData, loadRegistrationData, loadRegistrationHistory, loadSampleCompanies, loadValidationExamples } from '../utils/loadMockData'

const JsonDataDemo: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('registration')
  const [searchTerm, setSearchTerm] = useState('')

  const sections = [
    { id: 'registration', name: 'Registration Data', data: loadRegistrationData() },
    { id: 'governorates', name: 'Governorates', data: loadLookupData('governorates') },
    { id: 'countries', name: 'Countries', data: loadLookupData('countries') },
    { id: 'legalTypes', name: 'Legal Types', data: loadLookupData('legalTypes') },
    { id: 'companies', name: 'Sample Companies', data: loadSampleCompanies() },
    { id: 'history', name: 'Registration History', data: loadRegistrationHistory() },
    { id: 'validation', name: 'Validation Examples', data: loadValidationExamples() },
    { id: 'rules', name: 'Validation Rules', data: loadFormValidationRules() }
  ]

  const currentSection = sections.find(s => s.id === selectedSection)
  const filteredData = currentSection?.data ?
    (Array.isArray(currentSection.data)
      ? currentSection.data.filter((item: any) =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      )
      : currentSection.data
    ) : null

  const renderData = (data: any, depth = 0) => {
    if (data === null || data === undefined) return <span className="text-gray-500">null</span>
    if (typeof data === 'string') return <span className="text-green-600">"{data}"</span>
    if (typeof data === 'number') return <span className="text-blue-600">{data}</span>
    if (typeof data === 'boolean') return <span className="text-purple-600">{data.toString()}</span>

    if (Array.isArray(data)) {
      return (
        <div className="ml-4">
          <span className="text-gray-600">[</span>
          {data.map((item, index) => (
            <div key={index} className="ml-4">
              <span className="text-gray-500">{index}:</span> {renderData(item, depth + 1)}
              {index < data.length - 1 && <span className="text-gray-600">,</span>}
            </div>
          ))}
          <span className="text-gray-600">]</span>
        </div>
      )
    }

    if (typeof data === 'object') {
      return (
        <div className="ml-4">
          <span className="text-gray-600">{'{'}</span>
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="ml-4">
              <span className="text-yellow-600">"{key}"</span>
              <span className="text-gray-600">: </span>
              {renderData(value, depth + 1)}
              {index < Object.keys(data).length - 1 && <span className="text-gray-600">,</span>}
            </div>
          ))}
          <span className="text-gray-600">{'}'}</span>
        </div>
      )
    }

    return <span className="text-gray-500">{String(data)}</span>
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">JSON Mock Data Explorer</h2>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedSection(section.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${selectedSection === section.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search in data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Data Display */}
      <div className="bg-gray-900 rounded-lg p-6 overflow-auto">
        <div className="text-sm font-mono">
          {filteredData ? (
            <div>
              <div className="text-gray-400 mb-4">
                {selectedSection} ({Array.isArray(filteredData) ? filteredData.length : 'object'} items)
              </div>
              <pre className="whitespace-pre-wrap">
                {renderData(filteredData)}
              </pre>
            </div>
          ) : (
            <div className="text-gray-500">No data available</div>
          )}
        </div>
      </div>

      {/* Data Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total Fields</h3>
          <p className="text-2xl font-bold text-blue-600">
            {Object.keys(loadRegistrationData()).length}
          </p>
          <p className="text-sm text-blue-600">Registration form fields</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Lookup Options</h3>
          <p className="text-2xl font-bold text-green-600">
            {sections.slice(1, 5).reduce((sum, section) =>
              sum + (Array.isArray(section.data) ? section.data.length : 0), 0
            )}
          </p>
          <p className="text-sm text-green-600">Dropdown options</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Sample Records</h3>
          <p className="text-2xl font-bold text-purple-600">
            {loadSampleCompanies().length + loadRegistrationHistory().length}
          </p>
          <p className="text-sm text-purple-600">Companies & registrations</p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Instructions</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• <strong>Registration Data:</strong> Complete form data structure with all fields</p>
          <p>• <strong>Lookup Data:</strong> Dropdown options for governorates, countries, legal types, etc.</p>
          <p>• <strong>Sample Companies:</strong> Mock company records for testing</p>
          <p>• <strong>Registration History:</strong> Sample registration submissions and statuses</p>
          <p>• <strong>Validation Examples:</strong> Valid and invalid data examples for testing</p>
          <p>• <strong>Validation Rules:</strong> Form validation patterns and requirements</p>
        </div>
      </div>
    </div>
  )
}

export default JsonDataDemo
