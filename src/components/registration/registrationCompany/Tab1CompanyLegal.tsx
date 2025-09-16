import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useLanguage, translations } from '../../../contexts/LanguageContext'
import customReactSelectStyles from '../../../styles/customReactSelectStyles'
import * as yup from 'yup'

interface Tab1CompanyLegalProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

const Tab1CompanyLegal: React.FC<Tab1CompanyLegalProps> = ({ formData, onInputChange, setFormData }) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validationSchema = yup.object().shape({
    ldv_englishname: yup
      .string()
      .required(t.thisFieldIsRequired)
      .matches(/^[A-Za-z\s]+$/, t.onlyEnglishLettersAllowed),
    ldv_arabicname: yup
      .string()
      .required(t.thisFieldIsRequired)
      .matches(/^[\u0600-\u06FF\s]+$/, t.onlyArabicLettersAllowed),
    ldv_commercialdenomination: yup.string().required(t.thisFieldIsRequired),
    ldv_legaltypecode: yup.string().required(t.thisFieldIsRequired),
    emailaddress1: yup.string().required(t.thisFieldIsRequired).email(t.invalidEmailAddress),
    companyClassification: yup.array().min(1, t.atLeastOneCompanyClassificationRequired),
    registerUsing: yup.object().shape({
      commercialRegistry: yup.boolean(),
      unifiedCommercialRegistry: yup.boolean(),
      taxRegistry: yup.boolean()
    }).test('at-least-one', t.atLeastOneRegistrationMethodSelected, (value) => {
      return value.commercialRegistry || value.unifiedCommercialRegistry || value.taxRegistry
    }),
    commercialRegistryNumber: yup.string().when('registerUsing.commercialRegistry', (value) => {
      return value ? yup.string().required(t.commercialRegistryNumberRequired) : yup.string()
    }),
    unifiedCommercialRegistryNumber: yup.string().when('registerUsing.unifiedCommercialRegistry', (value) => {
      return value ? yup.string().required(t.unifiedCommercialRegistryNumberRequired) : yup.string()
    }),
    taxRegistryNumber: yup.string().when('registerUsing.taxRegistry', (value) => {
      return value ? yup.string().required(t.taxRegistryNumberRequired) : yup.string()
    })
  })

  const validateField = async (fieldName: string, value: any) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value })
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [fieldName]: error.message }))
    }
  }

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onInputChange(e)
    validateField(e.target.name, e.target.value)
  }

  const classificationOptions = [
    { value: 'technology', label: t.technology },
    { value: 'consulting', label: t.consulting },
    { value: 'manufacturing', label: t.manufacturing },
    { value: 'retail', label: t.retail },
    { value: 'finance', label: t.finance },
    { value: 'healthcare', label: t.healthcare },
    { value: 'education', label: t.education }
  ]

  const selectedClassifications = classificationOptions.filter(option =>
    formData.companyClassification.some((item: any) => item.companyClassification === option.value)
  )

  const currentYear = new Date().getFullYear()
  const establishmentYearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = (currentYear - i).toString()
    return { value: year, label: year }
  })

  const classCodeOptions = [
    { value: '', label: t.selectClassCode },
    { value: '', label: t.classCodeArabic },
    { value: t.mainBranch, label: t.mainBranch },
    { value: t.otherMain, label: t.otherMain },
    { value: t.branchOffice, label: t.branchOffice },
    { value: t.branchOther, label: t.branchOther },
    { value: t.generalCenter, label: t.generalCenter }
  ]

  useEffect(() => {
    // Set default checked for the 3 checkboxes if undefined
    setFormData((prev: any) => ({
      ...prev,
      registerUsing: {
        commercialRegistry: prev.registerUsing?.commercialRegistry !== undefined ? prev.registerUsing.commercialRegistry : true,
        unifiedCommercialRegistry: prev.registerUsing?.unifiedCommercialRegistry !== undefined ? prev.registerUsing.unifiedCommercialRegistry : true,
        taxRegistry: prev.registerUsing?.taxRegistry !== undefined ? prev.registerUsing.taxRegistry : true
      }
    }))
  }, [])

  useEffect(() => {
    // Validate registerUsing checkboxes on change
    validateField('registerUsing', formData.registerUsing)
  }, [formData.registerUsing])

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
            onChange={handleInputChangeWithValidation}
            className="input-field"
            placeholder={t.name}
            required
          />
          {errors.ldv_englishname && <p className="text-red-500 text-xs mt-1">{errors.ldv_englishname}</p>}
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
            onChange={handleInputChangeWithValidation}
            className="input-field"
            placeholder={t.name}
            required
          />
          {errors.ldv_arabicname && <p className="text-red-500 text-xs mt-1">{errors.ldv_arabicname}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Commercial Denomination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.commercialDenomination}
            <span className="text-red-500 ml-1">*</span>
          </label>
          {/* Validation: slash-dash-numbers */}
          <input
            type="text"
            name="ldv_commercialdenomination"
            value={formData.ldv_commercialdenomination}
            onChange={handleInputChangeWithValidation}
            className="input-field"
            placeholder={t.commercialDenomination}
            required
          />
          {errors.ldv_commercialdenomination && <p className="text-red-500 text-xs mt-1">{errors.ldv_commercialdenomination}</p>}
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
              { value: 'Sole proprietorship Co', label: t.legalTypeSole },
              { value: 'Sole Corporation', label: t.legalTypeSoleCorporation },
              { value: 'General Partnership', label: t.legalTypeGeneralPartnership },
              { value: 'Limited Liability Company', label: t.legalTypeLimitedLiability },
              { value: 'Joint', label: t.legalTypeJoint },
              { value: 'Special Limited Partnership', label: t.legalTypeSpecialLimited },
              { value: 'Inherited Company', label: t.legalTypeInherited },
              { value: 'Limited Partnership by Shares', label: t.legalTypeLimitedShares },
              { value: 'Cooperative Associations', label: t.legalTypeCooperative },
              { value: 'De Facto Company', label: t.legalTypeDeFacto },
              { value: 'Branch of Foreign Company', label: t.legalTypeBranchForeign },
              { value: 'Non-Profit Entities', label: t.legalTypeNonProfit }
            ]}
            value={
              [
                { value: '', label: t.selectLegalType },
                { value: 'Sole proprietorship Co', label: t.legalTypeSole },
                { value: 'Sole Corporation', label: t.legalTypeSoleCorporation },
                { value: 'General Partnership', label: t.legalTypeGeneralPartnership },
                { value: 'Limited Liability Company', label: t.legalTypeLimitedLiability },
                { value: 'Joint', label: t.legalTypeJoint },
                { value: 'Special Limited Partnership', label: t.legalTypeSpecialLimited },
                { value: 'Inherited Company', label: t.legalTypeInherited },
                { value: 'Limited Partnership by Shares', label: t.legalTypeLimitedShares },
                { value: 'Cooperative Associations', label: t.legalTypeCooperative },
                { value: 'De Facto Company', label: t.legalTypeDeFacto },
                { value: 'Branch of Foreign Company', label: t.legalTypeBranchForeign },
                { value: 'Non-Profit Entities', label: t.legalTypeNonProfit }
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
              validateField('ldv_legaltypecode', value)
            }}
            className="basic-single"
            classNamePrefix="select"
            styles={customReactSelectStyles}
            isClearable
          />
          {errors.ldv_legaltypecode && <p className="text-red-500 text-xs mt-1">{errors.ldv_legaltypecode}</p>}
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
            type="email"
            name="emailaddress1"
            value={formData.emailaddress1}
            onChange={handleInputChangeWithValidation}
            className="input-field"
            placeholder={t.officialCompanyEmail}
            required
          />
          {errors.emailaddress1 && <p className="text-red-500 text-xs mt-1">{errors.emailaddress1}</p>}
        </div>
        {/* Commercial Registration Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.yearOfEstablishment}
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
            styles={customReactSelectStyles}
            className="basic-single"
            classNamePrefix="select"
            placeholder={t.selectYear}
            isClearable
          />
        </div>
      </div>

      {/* Company classification */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.companyClassification}
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
            validateField('companyClassification', values)
          }}
          styles={customReactSelectStyles}
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
              checked={formData.registerUsing?.commercialRegistry}
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
                    onChange={handleInputChangeWithValidation}
                    className="input-field"
                    placeholder={t.commercialRegistryNumber}
                    required={formData.registerUsing?.commercialRegistry}
                    disabled={!formData.registerUsing?.commercialRegistry}
                  />
                  {errors.commercialRegistryNumber && <p className="text-red-500 text-xs mt-1">{errors.commercialRegistryNumber}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="commercialRegistryOffice"
                    value={formData.commercialRegistryOffice}
                    onChange={onInputChange}
                    className="input-field"
                    placeholder={t.crOffice}
                    disabled={!formData.registerUsing?.commercialRegistry}
                  />
                </div>

                <div>
                  <Select
                    name="classCode"
                    options={classCodeOptions}
                    value={classCodeOptions.find(option => option.value === formData.classCode) || null}
                    onChange={(selectedOption) => {
                      const value = selectedOption ? selectedOption.value : '';
                      onInputChange({
                        target: {
                          name: 'classCode',
                          value: value
                        }
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    styles={customReactSelectStyles}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder={t.selectClassCode}
                    isClearable
                    isDisabled={!formData.registerUsing?.commercialRegistry}
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Unified Commercial Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.unifiedCommercialRegistry"
              checked={formData.registerUsing?.unifiedCommercialRegistry}
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
                onChange={handleInputChangeWithValidation}
                className="input-field"
                placeholder={t.unifiedCommercialRegistryNumber}
                required={formData.registerUsing?.unifiedCommercialRegistry}
                disabled={!formData.registerUsing?.unifiedCommercialRegistry}
              />
              {errors.unifiedCommercialRegistryNumber && <p className="text-red-500 text-xs mt-1">{errors.unifiedCommercialRegistryNumber}</p>}
            </div>
          </div>

          {/* Tax Registry */}
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="registerUsing.taxRegistry"
              checked={formData.registerUsing?.taxRegistry}
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
                onChange={handleInputChangeWithValidation}
                className="input-field"
                placeholder={t.taxRegistryNumber}
                required={formData.registerUsing?.taxRegistry}
                disabled={!formData.registerUsing?.taxRegistry}
              />
              {errors.taxRegistryNumber && <p className="text-red-500 text-xs mt-1">{errors.taxRegistryNumber}</p>}
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
