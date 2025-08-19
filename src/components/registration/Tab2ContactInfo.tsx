import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../contexts/LanguageContext'

interface Tab2ContactInfoProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const Tab2ContactInfo: React.FC<Tab2ContactInfoProps> = ({ formData, onInputChange }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]
  
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t.contactInfoTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {t.contactInfoSubtitle}
        </p>
      </div>

      {/* Company Address Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.companyAddress}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
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
              {t.districtCity}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.districtCity}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.streetAddress}
          </label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.streetAddress}
          />
        </div>
      </div>

      {/* Company Contact Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.companyContactInfo}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
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
              placeholder="http://companywebsite.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.officialEmail}
            </label>
            <input
              type="email"
              name="officialEmail"
              value={formData.officialEmail}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.email}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.phoneMobile}
          </label>
          <input
            type="tel"
            name="phoneMobile"
            value={formData.phoneMobile}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.mobile}
          />
        </div>

        {/* Company Branches */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <input
            type="checkbox"
            name="hasBranches"
            checked={formData.hasBranches}
            onChange={onInputChange}
            className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            {t.companyHasBranches}
          </label>
        </div>
      </div>

      {/* Company Representative Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.companyRepresentative}
        </h3>
        <p className="text-sm text-gray-600">
          {t.representativeSubtitle}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.name}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representativeName"
              value={formData.representativeName}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.name}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.title}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representativeTitle"
              value={formData.representativeTitle}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.title}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.mobile}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="representativeMobile"
              value={formData.representativeMobile}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.mobile}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nationalId}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="representativeNationalId"
              value={formData.representativeNationalId}
              onChange={onInputChange}
              className="input-field"
              placeholder={t.nationalId}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.email}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            name="representativeEmail"
            value={formData.representativeEmail}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.email}
            required
          />
        </div>
      </div>

      {/* Request Applicant Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.requestApplicant}
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="radio"
              name="requestApplicant"
              value="company-in-charge"
              checked={formData.requestApplicant === 'company-in-charge'}
              onChange={onInputChange}
              className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300"
            />
            <span className="text-sm text-gray-700">
              {t.companyInCharge}
            </span>
          </label>
          
          <label className="flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="radio"
              name="requestApplicant"
              value="representative"
              checked={formData.requestApplicant === 'representative'}
              onChange={onInputChange}
              className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300"
            />
            <span className="text-sm text-gray-700">
              {t.representative}
            </span>
          </label>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {t.noteRequiredFields}
        </p>
      </div>
    </div>
  )
}

export default Tab2ContactInfo
