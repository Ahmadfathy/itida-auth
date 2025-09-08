import React from 'react'

interface CompanyHeadInformationProps {
  formData: any
  handleDynamicInputChange: (section: string, index: number, field: string, value: string) => void
  addRow: (section: string, emptyRow: any) => void
  removeRow: (section: string, index: number) => void
  t: any
  onSubmit: (e: React.FormEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onDynamicInputChange: (section: string, index: number, field: string, value: string) => void
}

const CompanyHeadInformation: React.FC<CompanyHeadInformationProps> = ({
  formData,
  handleDynamicInputChange,
  addRow,
  removeRow,
  t,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="py-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.companyHeadContacts}</h2>

      {/* Company's Head & Contact Persons Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-center mb-6">{t.companyHeadContacts}</h3>

        {/* Company's Head Section */}
        <div className="mb-8">
          <h4 className="font-medium mb-4">Company's Head</h4>
          {formData.companyHeads.map((head: any, index: number) => (
            <div key={`company-head-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={head.name}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="اسمك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={head.position}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'position', e.target.value)}
                    className="input-field"
                    placeholder="المنصب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={head.mobile}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'mobile', e.target.value)}
                    className="input-field"
                    placeholder="رقم المحمول"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">National ID <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={head.nationalId}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'nationalId', e.target.value)}
                    className="input-field"
                    placeholder="الرقم القومي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={head.email}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'email', e.target.value)}
                    className="input-field"
                    placeholder="البريد الإلكتروني"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email 2</label>
                  <input
                    type="email"
                    value={head.email2}
                    onChange={(e) => handleDynamicInputChange('companyHeads', index, 'email2', e.target.value)}
                    className="input-field"
                    placeholder="البريد الإلكتروني 2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('companyHeads', index)}
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
              onClick={() => addRow('companyHeads', { name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contact Persons Section */}
        <div className="mb-8">
          <h4 className="font-medium mb-4">Contact Persons</h4>
          {formData.contactPersons.map((person: { name: string; position: string; mobile: string; nationalId: string; email: string; }, index: number) => (
            <div key={`contact-person-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => handleDynamicInputChange('contactPersons', index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="اسمك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={person.position}
                    onChange={(e) => handleDynamicInputChange('contactPersons', index, 'position', e.target.value)}
                    className="input-field"
                    placeholder="المنصب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={person.mobile}
                    onChange={(e) => handleDynamicInputChange('contactPersons', index, 'mobile', e.target.value)}
                    className="input-field"
                    placeholder="رقم المحمول"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">National ID <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={person.nationalId}
                    onChange={(e) => handleDynamicInputChange('contactPersons', index, 'nationalId', e.target.value)}
                    className="input-field"
                    placeholder="الرقم القومي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={person.email}
                    onChange={(e) => handleDynamicInputChange('contactPersons', index, 'email', e.target.value)}
                    className="input-field"
                    placeholder="البريد الإلكتروني"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => removeRow('contactPersons', index)}
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
              onClick={() => addRow('contactPersons', { name: '', position: '', mobile: '', nationalId: '', email: '' })}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
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
            <div key={`reference-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
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

export default CompanyHeadInformation
