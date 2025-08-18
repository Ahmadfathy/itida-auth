import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../contexts/LanguageContext'

interface Tab3ActivitiesAttachmentsProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onFileChange: (fieldName: string, file: File | null) => void
  language: 'en' | 'ar'
}

const Tab3ActivitiesAttachments: React.FC<Tab3ActivitiesAttachmentsProps> = ({ 
  formData, 
  onInputChange, 
  onFileChange, 
  language 
}) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null
    onFileChange(fieldName, file)
  }

  const getFileSize = (file: File | null): string => {
    if (!file) return '0 MB'
    return `${(file.size / (1024 * 1024)).toFixed(2)} MB`
  }

  const isFileValid = (file: File | null): boolean => {
    if (!file) return false
    const maxSize = 3 * 1024 * 1024 // 3 MB
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    return file.size <= maxSize && validTypes.includes(file.type)
  }
  
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t.activitiesAttachmentsTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {t.activitiesAttachmentsSubtitle}
        </p>
      </div>

      {/* Activities Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.activitiesRequiredForLicensing}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.softwareDesign"
              checked={formData.activities.softwareDesign}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.softwareDesignServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.itSystems"
              checked={formData.activities.itSystems}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.itSystemsServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.trustServices"
              checked={formData.activities.trustServices}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.trustServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.websitesPlatforms"
              checked={formData.activities.websitesPlatforms}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.websitesPlatformsServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.electronicsEmbedded"
              checked={formData.activities.electronicsEmbedded}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.electronicsEmbeddedServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.contentDigitization"
              checked={formData.activities.contentDigitization}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.contentDigitizationServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.callCenterBusiness"
              checked={formData.activities.callCenterBusiness}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.callCenterBusinessServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.consultingResearch"
              checked={formData.activities.consultingResearch}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.consultingResearchServices}
            </span>
          </label>

          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="activities.trainingLearning"
              checked={formData.activities.trainingLearning}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              {t.trainingLearningServices}
            </span>
          </label>
        </div>
      </div>

      {/* Attachments Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.attachments}
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            {t.attachmentsNote}
          </p>
        </div>

        <div className="space-y-4">
          {/* Commercial Register */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.commercialRegisterImage}
            </label>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInputChange(e, 'commercialRegister')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
              />
              {formData.attachments.commercialRegister && (
                <span className={`text-sm ${isFileValid(formData.attachments.commercialRegister) ? 'text-green-600' : 'text-red-600'}`}>
                  {getFileSize(formData.attachments.commercialRegister)}
                </span>
              )}
            </div>
          </div>

          {/* Tax Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.taxCardImage}
            </label>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInputChange(e, 'taxCard')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
              />
              {formData.attachments.taxCard && (
                <span className={`text-sm ${isFileValid(formData.attachments.taxCard) ? 'text-green-600' : 'text-red-600'}`}>
                  {getFileSize(formData.attachments.taxCard)}
                </span>
              )}
            </div>
          </div>

          {/* National ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.nationalIdImage}
            </label>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInputChange(e, 'nationalId')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
              />
              {formData.attachments.nationalId && (
                <span className={`text-sm ${isFileValid(formData.attachments.nationalId) ? 'text-green-600' : 'text-red-600'}`}>
                  {getFileSize(formData.attachments.nationalId)}
                </span>
              )}
            </div>
          </div>

          {/* Investment Gazette */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.investmentGazetteImage}
            </label>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInputChange(e, 'investmentGazette')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
              />
              {formData.attachments.investmentGazette && (
                <span className={`text-sm ${isFileValid(formData.attachments.investmentGazette) ? 'text-green-600' : 'text-red-600'}`}>
                  {getFileSize(formData.attachments.investmentGazette)}
                </span>
              )}
            </div>
          </div>

          {/* Declaration Undertaking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.declarationUndertakingImage}
            </label>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileInputChange(e, 'declarationUndertaking')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
              />
              {formData.attachments.declarationUndertaking && (
                <span className={`text-sm ${isFileValid(formData.attachments.declarationUndertaking) ? 'text-green-600' : 'text-red-600'}`}>
                  {getFileSize(formData.attachments.declarationUndertaking)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* License Receipt Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.licenseReceipt}
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.methodOfLicenseReceipt}
          </label>
          <select
            name="licenseReceiptMethod"
            value={formData.licenseReceiptMethod}
            onChange={onInputChange}
            className="input-field"
          >
            <option value="">{t.selectReceiptMethod}</option>
            <option value="email">{currentLanguage === 'ar' ? 'بريد إلكتروني' : 'Email'}</option>
            <option value="postal">{t.postalMail}</option>
            <option value="pickup">{t.personalPickup}</option>
            <option value="courier">{t.courier}</option>
          </select>
        </div>
      </div>

      {/* Declaration Agreement */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {t.declarationAgreement}
        </h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {t.declarationText}
          </p>
          
          <label className="flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              name="declarationAgreement"
              checked={formData.declarationAgreement}
              onChange={onInputChange}
              className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
              required
            />
            <span className="text-sm text-gray-700">
              {t.iAgree}
            </span>
          </label>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {t.noteDeclarationAgreement}
        </p>
      </div>
    </div>
  )
}

export default Tab3ActivitiesAttachments
