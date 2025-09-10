import React, { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

interface Tab3CompanyBranchesProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
}

const Tab3CompanyBranches: React.FC<Tab3CompanyBranchesProps> = ({ formData, onInputChange, setFormData, handleDynamicInputChange, addRow, removeRow }) => {
  const t = useTranslation()
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setFormData((prev: any) => ({
      ...prev,
      hasBranches: checked
    }))
  }

  const arrowIcon = isAccordionOpen ? (
    <svg className="w-5 h-5 transform rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t.companyBranchesTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {t.companyBranchesSubtitle}
        </p>
      </div>

      {/* Company Has Branches Checkbox */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <input
          type="checkbox"
          name="hasBranches"
          checked={formData.hasBranches}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
        />
        <label className="text-sm font-medium text-gray-700">
          {t.hasBranches}
        </label>
      </div>

      {/* Branches Section - Only show if checkbox is checked */}
      {formData.hasBranches && (
        <div className="space-y-4">
          {formData.branches.map((branch: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">{t.branchNumber} {index + 1}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchName}
                  </label>
                  <input
                    type="text"
                    value={branch.branchName || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchName', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchCountry}
                  </label>
                  <input
                    type="text"
                    value={branch.branchCountry || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchCountry', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchGovernorate}
                  </label>
                  <input
                    type="text"
                    value={branch.branchGovernorate || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchGovernorate', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={branch.branchCity || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchCity', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="text"
                    value={branch.mobilePhone || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'mobilePhone', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={branch.branchEmail || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchEmail', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                  />
                </div>
              </div>
              {formData.branches.length > 1 && (
                <button
                  onClick={() => removeRow('branches', index)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove Branch
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addRow('branches', { branchName: '', branchCountry: '', branchGovernorate: '', branchCity: '', branchEmail: '', mobilePhone: '' })}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Branch
          </button>
        </div>
      )}
    </div>
  )
}

export default Tab3CompanyBranches
