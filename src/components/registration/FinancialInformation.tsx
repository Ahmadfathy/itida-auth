import React, { useRef } from 'react'

interface FinancialInformationProps {
  formData: {
    fiscalCapital: string
    domesticSalesDetails: string
    domesticSalesValue: string
    totalRevenueYear: string
    annualRevenue: string
    auditedBalanceSheet: File | null
    export: string
    exportInformation: { year: string; marketRegion: string; country: string; valueExported: string }[]
    totalNoOfEmployees: string
    yearOfEstablishment: string
    typeOfOwnership: string
    owners: { name: string; mobile: string; telephone: string; email: string }[]
    companyData: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
  t: any
  onSubmit: (e: React.FormEvent) => void
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  formData,
  handleInputChange,
  handleDynamicInputChange,
  addRow,
  removeRow,
  t,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    // Handle file upload logic here
    console.log('File selected:', file)
  }

  const handleRadioChange = (value: string) => {
    // Handle radio change
    console.log('Export selected:', value)
  }

  return (
    <form onSubmit={onSubmit} className="py-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.financialInformation}</h2>

      <h3 className="text-xl font-semibold text-center mb-6">{t.financialInformation}</h3>

      {/* Fiscal Capital Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Capital <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter fiscal capital"
              value={formData.fiscalCapital}
              onChange={handleInputChange}
              name="fiscalCapital"
            />
          </div>
        </div>

        {/* Domestic Sales Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Sales Details <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter domestic sales details"
              value={formData.domesticSalesDetails}
              onChange={handleInputChange}
              name="domesticSalesDetails"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Sales Value <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="text"
                className="input-field"
                placeholder="Enter domestic sales value"
                value={formData.domesticSalesValue}
                onChange={handleInputChange}
                name="domesticSalesValue"
              />
              <div className="absolute right-2 top-2">
                <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue and Annual Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Revenue Year <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter total revenue year"
              value={formData.totalRevenueYear}
              onChange={handleInputChange}
              name="totalRevenueYear"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter annual revenue"
              value={formData.annualRevenue}
              onChange={handleInputChange}
              name="annualRevenue"
            />
          </div>
        </div>

        {/* Audited Balance Sheet */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Audited Balance Sheet/P&L/Tax return + Certificate of Chartered Accountant <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
            >
              Choose File
            </button>
            <span className="text-sm text-gray-500">{formData.auditedBalanceSheet ? formData.auditedBalanceSheet.name : 'No file chosen'}</span>
          </div>
        </div>

        {/* Do You Export Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Do You Export? <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="export"
                value="yes"
                checked={formData.export === 'yes'}
                onChange={(e) => handleRadioChange(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="export"
                value="no"
                checked={formData.export === 'no'}
                onChange={(e) => handleRadioChange(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        {/* Export Information */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Export Information</h4>
          {formData.exportInformation.map((exportInfo, index) => (
            <div key={`export-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={exportInfo.year}
                    onChange={(e) => handleDynamicInputChange('exportInformation', index, 'year', e.target.value)}
                    className="input-field"
                    placeholder="Year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market (Region)</label>
                  <input
                    type="text"
                    value={exportInfo.marketRegion}
                    onChange={(e) => handleDynamicInputChange('exportInformation', index, 'marketRegion', e.target.value)}
                    className="input-field"
                    placeholder="Market region"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={exportInfo.country}
                    onChange={(e) => handleDynamicInputChange('exportInformation', index, 'country', e.target.value)}
                    className="input-field"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value Exported</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={exportInfo.valueExported}
                      onChange={(e) => handleDynamicInputChange('exportInformation', index, 'valueExported', e.target.value)}
                      className="input-field"
                      placeholder="Value exported"
                    />
                    <div className="absolute right-2 top-2">
                      <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('exportInformation', index)}
                  className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => addRow('exportInformation', { year: '', marketRegion: '', country: '', valueExported: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Total No of Employees and Year of Establishment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total No of Employees</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter total number of employees"
              value={formData.totalNoOfEmployees}
              onChange={handleInputChange}
              name="totalNoOfEmployees"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter year of establishment"
              value={formData.yearOfEstablishment}
              onChange={handleInputChange}
              name="yearOfEstablishment"
            />
          </div>
        </div>

        {/* Type of Ownership */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Ownership</label>
          <select
            className="input-field"
            value={formData.typeOfOwnership}
            onChange={handleInputChange}
            name="typeOfOwnership"
          >
            <option value="">Select type of ownership</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="government">Government</option>
          </select>
        </div>

        {/* Name (Owner(s) / Shareholder(s)) */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Name (Owner(s) / Shareholder(s)) <span className="text-gray-500 text-sm">يرجى كتابة الاسم باللغة العربية</span></h4>
          {formData.owners.map((owner, index) => (
            <div key={`owner-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={owner.name}
                    onChange={(e) => handleDynamicInputChange('owners', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="Owner name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    value={owner.mobile}
                    onChange={(e) => handleDynamicInputChange('owners', index, 'mobile', e.target.value)}
                    className="input-field"
                    placeholder="Mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                  <input
                    type="text"
                    value={owner.telephone}
                    onChange={(e) => handleDynamicInputChange('owners', index, 'telephone', e.target.value)}
                    className="input-field"
                    placeholder="Telephone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={owner.email}
                      onChange={(e) => handleDynamicInputChange('owners', index, 'email', e.target.value)}
                      className="input-field"
                      placeholder="Email address"
                    />
                    <div className="absolute right-2 top-2">
                      <button type="button" className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('owners', index)}
                  className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => addRow('owners', { name: '', mobile: '', telephone: '', email: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Company Data */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Company Data</h4>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company data..."
            value={formData.companyData}
            onChange={handleInputChange}
            name="companyData"
          />
        </div>



        {/* Company Market Information Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Company Market Information</h3>
          <p className="text-gray-600 mb-4">Some description about this section</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Parent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Child <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Child"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grand Child <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="input-field"
                placeholder="Grand Child"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry Sectors</label>
              <select className="input-field">
                <option value="">Select Industry Sector</option>
              </select>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Products</h4>
            {formData.products.map((product: { name: string; description: string }, index: number) => (
              <div key={`product-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleDynamicInputChange('products', index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Product Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => handleDynamicInputChange('products', index, 'description', e.target.value)}
                      className="input-field"
                      placeholder="Product Description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => removeRow('products', index)}
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => addRow('products', { name: '', description: '' })}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Services</h4>
            {formData.services.map((service: { name: string; description: string }, index: number) => (
              <div key={`service-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleDynamicInputChange('services', index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Service Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => handleDynamicInputChange('services', index, 'description', e.target.value)}
                      className="input-field"
                      placeholder="Service Description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => removeRow('services', index)}
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => addRow('services', { name: '', description: '' })}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Key Technologies, Certificates, Affiliations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Key Technologies</label>
              <select className="input-field">
                <option value="">Select Technology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificates</label>
              <select className="input-field">
                <option value="">Select Certificate</option>
              </select>
            </div>
          </div>

          {/* Affiliations, Memberships, Partnerships */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
              <select className="input-field">
                <option value="">Select Affiliation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Memberships</label>
              <select className="input-field">
                <option value="">Select Membership</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partnerships</label>
              <select className="input-field">
                <option value="">Select Partnership</option>
              </select>
            </div>
          </div>

          {/* Customer Reference */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Customer Reference</h4>
            {formData.customerReferences.map((reference: { name: string; country: string; projectSize: string; scope: string; description: string }, index: number) => (
              <div key={`reference-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={reference.name}
                      onChange={(e) => handleDynamicInputChange('customerReferences', index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Customer Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      value={reference.country}
                      onChange={(e) => handleDynamicInputChange('customerReferences', index, 'country', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select Country</option>
                      <option value="option1">Option 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Size</label>
                    <input
                      type="text"
                      value={reference.projectSize}
                      onChange={(e) => handleDynamicInputChange('customerReferences', index, 'projectSize', e.target.value)}
                      className="input-field"
                      placeholder="Project Size"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                    <input
                      type="text"
                      value={reference.scope}
                      onChange={(e) => handleDynamicInputChange('customerReferences', index, 'scope', e.target.value)}
                      className="input-field"
                      placeholder="Scope"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                    <input
                      type="text"
                      value={reference.description}
                      onChange={(e) => handleDynamicInputChange('customerReferences', index, 'description', e.target.value)}
                      className="input-field"
                      placeholder="Project Description"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => removeRow('customerReferences', index)}
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => addRow('customerReferences', { name: '', country: '', projectSize: '', scope: '', description: '' })}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Company Overview */}
          <div>
            <h4 className="font-medium mb-3">Company overview</h4>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded p-1">
                  <option>Paragraph</option>
                </select>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <textarea className="w-full p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter company overview..."></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-itida-blue hover:bg-itida-dark text-white"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default FinancialInformation
