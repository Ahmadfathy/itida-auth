import React, { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

interface Tab3CompanyBranchesProps {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
}

const Tab3CompanyBranches: React.FC<Tab3CompanyBranchesProps> = ({ formData, setFormData, handleDynamicInputChange, addRow, removeRow }) => {
  const t = useTranslation()
  const [_isAccordionOpen, _setIsAccordionOpen] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setFormData((prev: any) => ({
      ...prev,
      hasBranches: checked
    }))
  }

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
            <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">{t.branchNumber} {index + 1}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchName} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={branch.branchName || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchName', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchName}
                    required={formData.hasBranches}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchCountry} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={branch.branchCountry || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchCountry', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                    required={formData.hasBranches}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.branchGovernorate} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={branch.branchGovernorate || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchGovernorate', e.target.value)}
                    className="input-field"
                    placeholder={t.enterBranchLocation}
                    required={formData.hasBranches}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.city} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={branch.branchCity || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchCity', e.target.value)}
                    className="input-field"
                    placeholder={t.city}
                    required={formData.hasBranches}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.mobilePhone} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={branch.mobilePhone || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'mobilePhone', e.target.value)}
                    className="input-field"
                    placeholder={t.mobilePhone}
                    required={formData.hasBranches}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.emailPlaceholder} {formData.hasBranches && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    value={branch.branchEmail || ''}
                    onChange={(e) => handleDynamicInputChange('branches', index, 'branchEmail', e.target.value)}
                    className="input-field"
                    placeholder={t.emailPlaceholder}
                    required={formData.hasBranches}
                  />
                </div>
              </div>
              {formData.branches.length > 1 && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => removeRow('branches', index)}
                    className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className='flex justify-end mt-2'>

            <button
              onClick={() => addRow('branches', { branchName: '', branchCountry: '', branchGovernorate: '', branchCity: '', branchEmail: '', mobilePhone: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tab3CompanyBranches
