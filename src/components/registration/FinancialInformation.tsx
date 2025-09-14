import React, { useRef } from 'react'
import Select, { MultiValue } from 'react-select'

interface OptionType {
  value: string
  label: string
}

interface FinancialInformationProps {
  formData: {
    ownershipNationality: string
    percentageEgyptianOwnership: string
    percentageNonEgyptianOwnership: string
    partnersNationalities: string
    subClassification: string | number | readonly string[] | undefined
    companyClassification: { companyClassification: string; subClassification: string }[]
    fiscalCapital: string
    domesticSalesDetails: { year: string; value: string; totalRevenueYear: string }[]
    domesticSalesValue: string
    totalRevenueYear: string
    annualRevenue: string
    auditedBalanceSheet: File | null
    export: string
    exportInformation: { year: string; marketRegion: string; country: string; valueExported: string; totalAmountExported: number }[]
    totalNoOfEmployees: string
    yearOfEstablishment: string
    companySize: string
    typeOfOwnership: string
    owners: { name: string; mobile: string; telephone: string; email: string }[]
    companyData: string
    products: { name: string; description: string }[]
    services: { name: string; description: string }[]
    customerReferences: { name: string; country: string; projectSize: string; scope: string; industriesSector: string; description: string }[]
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
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleFileChange: (file: File | null) => void
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
  t: any
  onSubmit: (e: React.FormEvent) => void
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleFileChange,
  handleDynamicInputChange,
  addRow,
  removeRow,
  t,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileChange(file)
  }

  const handleRadioChange = (name: string, value: string) => {
    handleInputChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleCompanySizeChange = (selectedOption: any) => {
    handleInputChange({ target: { name: 'companySize', value: selectedOption ? selectedOption.value : '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  const companySizeOptions = [
    { value: 'small', label: 'Small (1-10 employees)' },
    { value: 'medium', label: 'Medium (11-50 employees)' },
    { value: 'large', label: 'Large (51-200 employees)' },
    { value: 'enterprise', label: 'Enterprise (200+ employees)' }
  ]

  // Options for multi-select fields
  const keyTechnologiesOptions: OptionType[] = [
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

  const affiliationOptions: OptionType[] = [
    { value: 'MENA Innovation 2018', label: 'MENA Innovation 2018' },
    { value: 'Others', label: 'Others' }
  ]

  const membershipsOptions: OptionType[] = [
    { value: 'CIT', label: 'CIT' },
    { value: 'EITISAL', label: 'EITISAL' },
    { value: 'eLABs', label: 'eLABs' },
    { value: 'ITI', label: 'ITI' },
    { value: 'FoCCIT', label: 'FoCCIT' },
    { value: 'ITEC', label: 'ITEC' },
    { value: 'Others', label: 'Others' }
  ]

  const certificatesOptions: OptionType[] = [
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

  const partnershipsOptions: OptionType[] = [
    { value: 'Microsoft Certified Partner', label: 'Microsoft Certified Partner' },
    { value: 'HP Preferred Partner', label: 'HP Preferred Partner' },
    { value: 'Oracle Certified Partner', label: 'Oracle Certified Partner' },
    { value: 'IBM Partner', label: 'IBM Partner' },
    { value: 'Intel Certified Partner', label: 'Intel Certified Partner' },
    { value: 'Cisco Partner', label: 'Cisco Partner' },
    { value: 'Others', label: 'Others' }
  ]

  const nationalitiesOptions: OptionType[] = [
    { value: 'Egyptian', label: 'Egyptian' },
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Nigerian', label: 'Nigerian' },
    { value: 'Russian', label: 'Russian' },
    { value: 'South African', label: 'South African' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Swedish', label: 'Swedish' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Brazilian', label: 'Brazilian' }
  ]

  // Custom Option component for checkbox in react-select
  const CheckboxOption = (props: any) => {
    const { children, isSelected, innerRef, innerProps } = props
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center space-x-2 rtl:space-x-reverse p-2 hover:bg-gray-100 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          className="form-checkbox h-4 w-4 text-itida-blue"
        />
        <label>{children}</label>
      </div>
    )
  }

  // Helper to handle multi-select change
  const handleMultiSelectChange = (fieldName: string, selectedOptions: MultiValue<OptionType>) => {
    const values = selectedOptions ? selectedOptions.map((option: OptionType) => option.value) : []
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: values
    }))
  }

  const handlePartnersNationalitiesChange = (selectedOption: OptionType | null) => {
    setFormData((prev: any) => ({
      ...prev,
      partnersNationalities: selectedOption ? selectedOption.value : ''
    }))
  }

  const companyClassificationOptions: OptionType[] = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Services', label: 'Services' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Others', label: 'Others' }
  ]

  const subClassificationMapping: { [key: string]: OptionType[] } = {
    Technology: [
      { value: 'Software Development', label: 'Software Development' },
      { value: 'Hardware', label: 'Hardware' },
      { value: 'Consulting', label: 'Consulting' },
      { value: 'Others', label: 'Others' }
    ],
    Manufacturing: [
      { value: 'Production', label: 'Production' },
      { value: 'Assembly', label: 'Assembly' },
      { value: 'Others', label: 'Others' }
    ],
    Services: [
      { value: 'Consulting', label: 'Consulting' },
      { value: 'Outsourcing', label: 'Outsourcing' },
      { value: 'Others', label: 'Others' }
    ],
    Retail: [
      { value: 'E-commerce', label: 'E-commerce' },
      { value: 'Physical Stores', label: 'Physical Stores' },
      { value: 'Others', label: 'Others' }
    ],
    Others: [
      { value: 'Others', label: 'Others' }
    ]
  }

  const industrySectorsOptions: OptionType[] = [
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Others', label: 'Others' }
  ]

  const handleCompanyClassificationChange = (index: number, selectedOption: any) => {
    const newValue = selectedOption ? selectedOption.value : ''
    setFormData((prev: any) => {
      const newClassifications = [...prev.companyClassification]
      newClassifications[index] = { ...newClassifications[index], companyClassification: newValue, subClassification: '' }
      return { ...prev, companyClassification: newClassifications }
    })
  }

  const handleSubClassificationChange = (index: number, selectedOption: any) => {
    const newValue = selectedOption ? selectedOption.value : ''
    setFormData((prev: any) => {
      const newClassifications = [...prev.companyClassification]
      newClassifications[index] = { ...newClassifications[index], subClassification: newValue }
      return { ...prev, companyClassification: newClassifications }
    })
  }

  const handleIndustrySectorsChange = (selectedOption: any) => {
    handleInputChange({ target: { name: 'industrySectors', value: selectedOption ? selectedOption.value : '' } } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <form onSubmit={onSubmit} className="py-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{t.financialInformation}</h2>

      {/* Financial Information */}
      <div className="space-y-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Financial Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Audited Balance Sheet */}
          <div className="mb-6 md:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audited Balance Sheet/P&L/Tax return + Certificate of Chartered Accountant <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChangeInternal}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paid Capital
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Paid capital"
              value={formData.fiscalCapital}
              onChange={handleInputChange}
              name="fiscalCapital"
            />
          </div>

        </div>

        {/* Domestic Sales Details */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-800 pb-2">
            Domestic Sales Details
          </h4>
          <div className="space-y-4">
            {formData.domesticSalesDetails.map((detail, index) => (
              <div key={`domesticSales-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domestic Sales Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter domestic sales Year"
                    value={detail.year}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'year', e.target.value)}
                    name={`domesticSalesDetails.${index}.year`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Sales Value <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter domestic sales value"
                    value={detail.value}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'value', e.target.value)}
                    name={`domesticSalesDetails.${index}.value`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Revenue Year <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter total revenue year"
                    value={detail.totalRevenueYear}
                    onChange={(e) => handleDynamicInputChange('domesticSalesDetails', index, 'totalRevenueYear', e.target.value)}
                    name={`domesticSalesDetails.${index}.totalRevenueYear`}
                  />
                </div>
                <div className="flex justify-end col-span-3">
                  <button
                    type="button"
                    onClick={() => removeRow('domesticSalesDetails', index)}
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addRow('domesticSalesDetails', { year: '', value: '', totalRevenueYear: '' })}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
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
              readOnly
            />
          </div>
        </div>

        {/* Total No of Employees and Company Size */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <Select
              options={companySizeOptions}
              value={companySizeOptions.find(option => option.value === formData.companySize)}
              onChange={handleCompanySizeChange}
              placeholder="Select company size"
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
        </div>

      </div>

      {/* Market Information */}
      <div className="space-y-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Market Information
        </h3>

        {/* Key Technologies, Affiliations, Memberships */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Technologies</label>
            <Select
              isMulti
              options={keyTechnologiesOptions}
              value={keyTechnologiesOptions.filter(option => formData.keyTechnologies.includes(option.value))}
              onChange={(selectedOptions) => handleMultiSelectChange('keyTechnologies', selectedOptions)}
              placeholder="Select Key Technologies"
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
            <Select
              isMulti
              options={affiliationOptions}
              value={affiliationOptions.filter(option => formData.affiliation.includes(option.value))}
              onChange={(selectedOptions) => handleMultiSelectChange('affiliation', selectedOptions)}
              placeholder="Select Affiliations"
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Memberships</label>
            <Select
              isMulti
              options={membershipsOptions}
              value={membershipsOptions.filter(option => formData.memberships.includes(option.value))}
              onChange={(selectedOptions) => handleMultiSelectChange('memberships', selectedOptions)}
              placeholder="Select Memberships"
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
          </div>
        </div>

        {/* Certificates, Partnerships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificates</label>
            <Select
              isMulti
              options={certificatesOptions}
              value={certificatesOptions.filter(option => formData.certificates.includes(option.value))}
              onChange={(selectedOptions) => handleMultiSelectChange('certificates', selectedOptions)}
              placeholder="Select Certificates"
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partnerships</label>
            <Select
              isMulti
              options={partnershipsOptions}
              value={partnershipsOptions.filter(option => formData.partnerships.includes(option.value))}
              onChange={(selectedOptions) => handleMultiSelectChange('partnerships', selectedOptions)}
              placeholder="Select Partnerships"
              className="basic-multi-select"
              classNamePrefix="select"
              components={{ Option: CheckboxOption }}
              closeMenuOnSelect={false}
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Products</h4>
          {formData.products.map((product: { name: string; description: string }, index: number) => (
            <div key={`product-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
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
            <div key={`service-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
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

        {/* Customer Reference */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Customer Reference</h4>
          {formData.customerReferences.map((reference: { name: string; country: string; projectSize: string; scope: string; industriesSector: string; description: string }, index: number) => (
            <div key={`reference-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industries Sector</label>
                  <input
                    type="text"
                    value={reference.industriesSector}
                    onChange={(e) => handleDynamicInputChange('customerReferences', index, 'industriesSector', e.target.value)}
                    className="input-field"
                    placeholder="Industries Sector"
                  />
                </div>
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
              onClick={() => addRow('customerReferences', { name: '', country: '', projectSize: '', scope: '', industriesSector: '',  description: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Company Classifications */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Company Classifications</h4>
          {formData.companyClassification.map((classification, index) => (
            <div key={`classification-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Classifications <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={companyClassificationOptions}
                    value={companyClassificationOptions.find(option => option.value === classification.companyClassification)}
                    onChange={(selectedOption) => handleCompanyClassificationChange(index, selectedOption)}
                    placeholder="Select Company Classification"
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company's Sub Classification <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={subClassificationMapping[classification.companyClassification] || []}
                    value={(subClassificationMapping[classification.companyClassification] || []).find(option => option.value === classification.subClassification)}
                    onChange={(selectedOption) => handleSubClassificationChange(index, selectedOption)}
                    placeholder="Select Sub Classification"
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Sectors
                  </label>
                  <Select
                    options={industrySectorsOptions}
                    value={industrySectorsOptions.find(option => option.value === formData.industrySectors)}
                    onChange={handleIndustrySectorsChange}
                    placeholder="Select Industry Sector"
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('companyClassification', index)}
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
              disabled={formData.companyClassification.length >= 3}
              onClick={() => addRow('companyClassification', { companyClassification: '', subClassification: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </div>






      {/* Fiscal Capital Section */}
      <div className="mb-8">

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
                onChange={(e) => handleRadioChange('export', e.target.value)}
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
                onChange={(e) => handleRadioChange('export', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        {formData.export === 'yes' && (
          <>
            {/* Export Information */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Export Information</h4>
              {formData.exportInformation.map((exportInfo, index) => (
                <div key={`export-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Types products / Services Exported</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exportInfo.valueExported}
                          onChange={(e) => handleDynamicInputChange('exportInformation', index, 'valueExported', e.target.value)}
                          className="input-field"
                          placeholder="Types products / Services Exported"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total amount of exports / Year in USD</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exportInfo.totalAmountExported}
                          onChange={(e) => handleDynamicInputChange('exportInformation', index, 'totalAmountExported', e.target.value)}
                          className="input-field"
                          placeholder="Total amount of exports / Year in USD"
                        />
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
                  onClick={() => addRow('exportInformation', { year: '', marketRegion: '', country: '', valueExported: '', totalAmountExported: '' })}
                  className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Type of Ownership */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Ownership (selected (100% Egyptian))? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ownershipNationality"
                value="yes"
                checked={formData.ownershipNationality === 'yes'}
                onChange={(e) => handleRadioChange('ownershipNationality', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="ownershipNationality"
                value="no"
                checked={formData.ownershipNationality === 'no'}
                onChange={(e) => handleRadioChange('ownershipNationality', e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        {formData.ownershipNationality === 'no' && (
          <>
            {/* Ownership Details */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage Of Egyptian OwnerShip</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field pr-8"
                      placeholder="Percentage Of Egyptian OwnerShip"
                      value={formData.percentageEgyptianOwnership}
                      onChange={handleInputChange}
                      name="percentageEgyptianOwnership"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage Of NonEgyptian OwnerShip</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field pr-8"
                      placeholder="Percentage Of NonEgyptian OwnerShip"
                      value={formData.percentageNonEgyptianOwnership}
                      onChange={handleInputChange}
                      name="percentageNonEgyptianOwnership"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partners Or Shareholders Nationalities</label>
                  <Select
                    options={nationalitiesOptions}
                    value={nationalitiesOptions.find(option => option.value === formData.partnersNationalities)}
                    onChange={handlePartnersNationalitiesChange}
                    placeholder="Select nationality"
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                  />
                </div>
              </div>
            </div>
          </>
        )}

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
