import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../contexts/LanguageContext'

interface Tab1CompanyLegalProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  language: 'en' | 'ar'
}

const Tab1CompanyLegal: React.FC<Tab1CompanyLegalProps> = ({ formData, onInputChange }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]
  
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t.companyLegalInfoTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {t.companyLegalInfoSubtitle}
        </p>
      </div>

      {/* Company Names */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.companyNameEnglish}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="companyNameEn"
            value={formData.companyNameEn}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.name}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.companyNameArabic}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="companyNameAr"
            value={formData.companyNameAr}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.name}
            required
          />
        </div>
      </div>

      {/* Commercial Denomination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.commercialDenomination}
        </label>
        <input
          type="text"
          name="commercialDenomination"
          value={formData.commercialDenomination}
          onChange={onInputChange}
          className="input-field"
          placeholder={t.commercialDenomination}
        />
      </div>

      {/* Legal Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.legalType}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          name="legalType"
          value={formData.legalType}
          onChange={onInputChange}
          className="input-field"
          required
        >
          <option value="">{t.selectLegalType}</option>
          <option value="sole-proprietorship">{t.soleProprietorship}</option>
          <option value="partnership">{t.partnership}</option>
          <option value="limited-liability">{t.limitedLiabilityCompany}</option>
          <option value="joint-stock">{t.jointStockCompany}</option>
          <option value="branch">{t.branch}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      {/* Register Using Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t.registerUsing}
        </h3>
        
        <div className="space-y-4">
          {/* Commercial Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.commercialRegistry"
              checked={formData.registerUsing.commercialRegistry}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.commercialRegistryNumber}
              </label>
              <input
                type="text"
                name="commercialRegistryNumber"
                value={formData.commercialRegistryNumber}
                onChange={onInputChange}
                className="input-field"
                placeholder={t.commercialRegistryNumber}
                disabled={!formData.registerUsing.commercialRegistry}
              />
            </div>
          </div>

          {/* Unified Commercial Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.unifiedCommercialRegistry"
              checked={formData.registerUsing.unifiedCommercialRegistry}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.unifiedCommercialRegistryNumber}
              </label>
              <input
                type="text"
                name="unifiedCommercialRegistryNumber"
                value={formData.unifiedCommercialRegistryNumber}
                onChange={onInputChange}
                className="input-field"
                placeholder={t.unifiedCommercialRegistryNumber}
                disabled={!formData.registerUsing.unifiedCommercialRegistry}
              />
            </div>
          </div>

          {/* Tax Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.taxRegistry"
              checked={formData.registerUsing.taxRegistry}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.taxRegistryNumber}
              </label>
              <input
                type="text"
                name="taxRegistryNumber"
                value={formData.taxRegistryNumber}
                onChange={onInputChange}
                className="input-field"
                placeholder={t.taxRegistryNumber}
                disabled={!formData.registerUsing.taxRegistry}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Registration Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.commercialRegistrationDate}
        </label>
        <input
          type="date"
          name="commercialRegistrationDate"
          value={formData.commercialRegistrationDate}
          onChange={onInputChange}
          className="input-field"
        />
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {t.noteRegistrationOptions}
        </p>
      </div>
    </div>
  )
}

export default Tab1CompanyLegal
