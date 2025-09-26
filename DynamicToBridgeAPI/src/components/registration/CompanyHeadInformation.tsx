import React from 'react'
import Select from 'react-select'

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
  onSubmit,
  onInputChange
}) => {


  const multipleTypes = [
    'Sole Corporation',
    'General Partnership',
    'Limited Liability Company',
    'Joint',
    'Special Limited Partnership',
    'Inherited Company',
    'Limited Partnership by Shares',
    'Cooperative Associations',
    'De Facto Company',
    'Branch of Foreign Company'
  ]

  const isSingleHeadType = !multipleTypes.includes(formData.ldv_legaltypecode)

  const governorateOptions = [
    { value: '', label: t.selectGovernorate },
    { value: 'cairo', label: t.cairo },
    { value: 'giza', label: t.giza },
    { value: 'alexandria', label: t.alexandria },
    { value: 'sharqia', label: t.sharqia },
    { value: 'gharbia', label: t.gharbia },
    { value: 'menoufia', label: t.menoufia },
    { value: 'qalyubia', label: t.qalyubia },
    { value: 'port-said', label: t.portSaid },
    { value: 'suez', label: t.suez },
    { value: 'ismailia', label: t.ismailia },
    { value: 'kafr-el-sheikh', label: t.kafrElSheikh },
    { value: 'beheira', label: t.beheira },
    { value: 'assiut', label: t.assiut },
    { value: 'sohag', label: t.sohag },
    { value: 'qena', label: t.qena },
    { value: 'luxor', label: t.luxor },
    { value: 'aswan', label: t.aswan },
    { value: 'red-sea', label: t.redSea },
    { value: 'new-valley', label: t.newValley },
    { value: 'matruh', label: t.matruh },
    { value: 'north-sinai', label: t.northSinai },
    { value: 'south-sinai', label: t.southSinai },
    { value: 'beni-suef', label: t.beniSuef },
    { value: 'fayoum', label: t.fayoum },
    { value: 'minya', label: t.minya },
    { value: 'dakahlia', label: t.dakahlia },
    { value: 'damietta', label: t.damietta },
    { value: 'other', label: t.otherGovernorate }
  ]

  return (
    <form onSubmit={onSubmit} className="py-4">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">{t.companyHeadContacts}</h2>

      {/* Company's Head & Contact Persons Section */}
      <div className="mb-8">
        {/* <h3 className="text-xl font-semibold text-center mb-6">{t.companyHeadContacts}</h3> */}

        {/* Company Address Information */}
        <div className="space-y-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {t.companyAddress}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العنوان (كما هو موضح في السجل التجاري أو بالبطاقة الضريبية)
            </label>
            <input
              type="text"
              name="address"
              value={formData.streetAddress}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.streetAddress}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.governorate}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                name="governorate"
                options={governorateOptions}
                value={governorateOptions.find(option => option.value === formData.governorate)}
                onChange={(selectedOption: any) => {
                  onInputChange({
                    target: {
                      name: 'governorate',
                      value: selectedOption ? selectedOption.value : ''
                    }
                  } as React.ChangeEvent<HTMLInputElement>)
                }}
                classNamePrefix="select"
                className="basic-single"
                isClearable
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onInputChange}
                className="input-field"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                district
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={onInputChange}
                className="input-field"
                placeholder="district"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="Street"
                value={formData.Street}
                onChange={onInputChange}
                className="input-field"
                placeholder="Street"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.companyWebsiteUrl}
            </label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={onInputChange}
              className="input-field"
              placeholder="Website/social media platform (linkin,instgram,..)"
            />
          </div>
        </div>

        {/* Company's Head Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Company's Head
          </h3>
          {/* <h4 className="font-medium mb-4">Company's Head</h4> */}

          {formData.companyHeads.map((head: any, index: number) => {
            // For single head types, show only one form without add/remove buttons
            if (isSingleHeadType && index > 0) {
              return null
            }
            return (
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
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeRow('companyHeads', index)}
                      className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          {!isSingleHeadType && (
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
          )}
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
