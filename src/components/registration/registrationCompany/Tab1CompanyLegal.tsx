import React from 'react'
import Select from 'react-select'
import { useLanguage, translations } from '../../../contexts/LanguageContext'

interface Tab1CompanyLegalProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

const Tab1CompanyLegal: React.FC<Tab1CompanyLegalProps> = ({ formData, onInputChange, setFormData }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]

  const classificationOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ]

  const selectedClassifications = classificationOptions.filter(option =>
    formData.companyClassification.some((item: any) => item.companyClassification === option.value)
  )

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      padding: '0.25rem',
      fontSize: '0.875rem',
      '&:hover': {
        borderColor: '#9ca3af'
      }
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#e5e7eb'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#374151'
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#d1d5db',
        color: '#374151'
      }
    })
  }

  const currentYear = new Date().getFullYear()
  const establishmentYearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = (currentYear - i).toString()
    return { value: year, label: year }
  })

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
            name="ldv_englishname"
            value={formData.ldv_englishname}
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
            name="ldv_arabicname"
            value={formData.ldv_arabicname}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.name}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Commercial Denomination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.commercialDenomination}
          </label>
          {/* Validation: slash-dash-numbers */}
          <input
            type="text"
            name="ldv_commercialdenomination"
            value={formData.ldv_commercialdenomination}
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
          {/* Legal Type using React Select */}
          <Select
            name="ldv_legaltypecode"
            options={[
              { value: '', label: t.selectLegalType },
              { value: 'Sole proprietorship Co', label: 'Sole proprietorship Co - شركة شخص واحد' },
              { value: 'Sole Corporation', label: 'Sole Corporation - فردي' },
              { value: 'General Partnership', label: 'General Partnership - شركات مساهمة' },
              { value: 'Limited Liability Company', label: 'Limited Liability Company - ذات مسئولية محدودة' },
              { value: 'Joint', label: 'Joint - شركة تضامن' },
              { value: 'Special Limited Partnership', label: 'Special Limited Partnership – توصية بسيطة' },
              { value: 'Inherited Company', label: 'Inherited Company - واقع موروثة' },
              { value: 'Limited Partnership by Shares', label: 'Limited Partnership by Shares - توصية بالاسهم' },
              { value: 'Cooperative Associations', label: 'Cooperative Associations - جمعيات تعاونية' },
              { value: 'De Facto Company', label: 'De Facto Company - شركه واقع' },
              { value: 'Branch of Foreign Company', label: 'Branch of Foreign Company - فرع شركه اجنبيه' },
              { value: 'Non-Profit Entities', label: 'Non-Profit Entities - جهات غير هادفة' }
            ]}
            value={
              [
                { value: '', label: t.selectLegalType },
                { value: 'Sole proprietorship Co', label: 'Sole proprietorship Co - شركة شخص واحد' },
                { value: 'Sole Corporation', label: 'Sole Corporation - فردي' },
                { value: 'General Partnership', label: 'General Partnership - شركات مساهمة' },
                { value: 'Limited Liability Company', label: 'Limited Liability Company - ذات مسئولية محدودة' },
                { value: 'Joint', label: 'Joint - شركة تضامن' },
                { value: 'Special Limited Partnership', label: 'Special Limited Partnership – توصية بسيطة' },
                { value: 'Inherited Company', label: 'Inherited Company - واقع موروثة' },
                { value: 'Limited Partnership by Shares', label: 'Limited Partnership by Shares - توصية بالاسهم' },
                { value: 'Cooperative Associations', label: 'Cooperative Associations - جمعيات تعاونية' },
                { value: 'De Facto Company', label: 'De Facto Company - شركه واقع' },
                { value: 'Branch of Foreign Company', label: 'Branch of Foreign Company - فرع شركه اجنبيه' },
                { value: 'Non-Profit Entities', label: 'Non-Profit Entities - جهات غير هادفة' }
              ].find(option => option.value === formData.ldv_legaltypecode) || null
            }
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : '';
              onInputChange({
                target: {
                  name: 'ldv_legaltypecode',
                  value: value
                }
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (provided) => ({
                ...provided,
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                padding: '0.25rem',
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: '#9ca3af'
                }
              })
            }}
            isClearable
          />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Official Company's Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.officialCompanyEmail}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="mail"
            name="emailaddress1"
            value={formData.emailaddress1}
            onChange={onInputChange}
            className="input-field"
            placeholder={t.officialCompanyEmail}
            required
          />
        </div>
        {/* Commercial Registration Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Establishment
          </label>
          <Select
            options={establishmentYearOptions}
            value={establishmentYearOptions.find(option => option.value === formData.ldv_establishmentyear) || null}
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : '';
              onInputChange({
                target: {
                  name: 'ldv_establishmentyear',
                  value: value
                }
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            styles={customStyles}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select year"
            isClearable
          />
        </div>
      </div>

      {/* Company classification */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company classification
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          name="companyClassification"
          options={classificationOptions}
          value={selectedClassifications}
          onChange={(selectedOptions) => {
            const values = selectedOptions ? selectedOptions.map(option => ({ companyClassification: option.value, subClassification: '' })) : []
            setFormData((prev: any) => ({
              ...prev,
              companyClassification: values
            }))
          }}
          styles={customStyles}
          className="basic-multi-select"
          classNamePrefix="select"
          components={{
            Option: (props) => {
              const { children, isSelected, innerRef, innerProps } = props;
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
              );
            }
          }}
        />
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
              checked
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.commercialRegistryNumber}
              </label>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <input
                    type="text"
                    name="commercialRegistryNumber"
                    value={formData.commercialRegistryNumber}
                    onChange={onInputChange}
                    className="input-field"
                    placeholder={t.commercialRegistryNumber}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="commercialRegistryOffice"
                    value={formData.commercialRegistryOffice}
                    onChange={onInputChange}
                    className="input-field"
                    placeholder="CR Office"
                  />
                </div>

                <div>
                  <select
                    name="classCode"
                    value={formData.classCode}
                    onChange={onInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Class Code</option>
                    <option value="">كود الفئة</option>
                    <option value="محل رئيسى">محل رئيسى</option>
                    <option value="رئيسى آخر">رئيسى آخر</option>
                    <option value="محل فرعى">محل فرعى</option>
                    <option value="فرعى">فرعى</option>
                    <option value="مركز عام">مركز عام</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Unified Commercial Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.unifiedCommercialRegistry"
              checked
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
              />
            </div>
          </div>

          {/* Tax Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.taxRegistry"
              checked
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
              />
            </div>
          </div>
        </div>
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
