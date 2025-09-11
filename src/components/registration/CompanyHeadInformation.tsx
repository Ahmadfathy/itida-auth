import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

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
  const { language: currentLanguage } = useLanguage()

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
              <select
                name="governorate"
                value={formData.governorate}
                onChange={onInputChange}
                className="input-field"
                required
              >
                <option value="">{t.selectGovernorate}</option>
                <option value="cairo">{currentLanguage === 'ar' ? 'القاهرة' : 'Cairo'}</option>
                <option value="giza">{currentLanguage === 'ar' ? 'الجيزة' : 'Giza'}</option>
                <option value="alexandria">{currentLanguage === 'ar' ? 'الإسكندرية' : 'Alexandria'}</option>
                <option value="sharqia">{currentLanguage === 'ar' ? 'الشرقية' : 'Sharqia'}</option>
                <option value="gharbia">{currentLanguage === 'ar' ? 'الغربية' : 'Gharbia'}</option>
                <option value="menoufia">{currentLanguage === 'ar' ? 'المنوفية' : 'Menoufia'}</option>
                <option value="qalyubia">{currentLanguage === 'ar' ? 'القليوبية' : 'Qalyubia'}</option>
                <option value="port-said">{currentLanguage === 'ar' ? 'بورسعيد' : 'Port Said'}</option>
                <option value="suez">{currentLanguage === 'ar' ? 'السويس' : 'Suez'}</option>
                <option value="ismailia">{currentLanguage === 'ar' ? 'الإسماعيلية' : 'Ismailia'}</option>
                <option value="kafr-el-sheikh">{currentLanguage === 'ar' ? 'كفر الشيخ' : 'Kafr El Sheikh'}</option>
                <option value="beheira">{currentLanguage === 'ar' ? 'البحيرة' : 'Beheira'}</option>
                <option value="assiut">{currentLanguage === 'ar' ? 'أسيوط' : 'Assiut'}</option>
                <option value="sohag">{currentLanguage === 'ar' ? 'سوهاج' : 'Sohag'}</option>
                <option value="qena">{currentLanguage === 'ar' ? 'قنا' : 'Qena'}</option>
                <option value="luxor">{currentLanguage === 'ar' ? 'الأقصر' : 'Luxor'}</option>
                <option value="aswan">{currentLanguage === 'ar' ? 'أسوان' : 'Aswan'}</option>
                <option value="red-sea">{currentLanguage === 'ar' ? 'البحر الأحمر' : 'Red Sea'}</option>
                <option value="new-valley">{currentLanguage === 'ar' ? 'الوادي الجديد' : 'New Valley'}</option>
                <option value="matruh">{currentLanguage === 'ar' ? 'مطروح' : 'Matruh'}</option>
                <option value="north-sinai">{currentLanguage === 'ar' ? 'شمال سيناء' : 'North Sinai'}</option>
                <option value="south-sinai">{currentLanguage === 'ar' ? 'جنوب سيناء' : 'South Sinai'}</option>
                <option value="beni-suef">{currentLanguage === 'ar' ? 'بني سويف' : 'Beni Suef'}</option>
                <option value="fayoum">{currentLanguage === 'ar' ? 'الفيوم' : 'Fayoum'}</option>
                <option value="minya">{currentLanguage === 'ar' ? 'المنيا' : 'Minya'}</option>
                <option value="dakahlia">{currentLanguage === 'ar' ? 'الدقهلية' : 'Dakahlia'}</option>
                <option value="damietta">{currentLanguage === 'ar' ? 'دمياط' : 'Damietta'}</option>
                <option value="other">{currentLanguage === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
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
              <div key={`company-head-${index}`} className="mb-4 border border-gray-200 rounded-lg p-4">
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
