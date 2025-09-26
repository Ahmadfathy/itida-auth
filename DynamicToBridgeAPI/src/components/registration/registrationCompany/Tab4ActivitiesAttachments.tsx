import React, { useState, useEffect } from 'react'
import { useLanguage, translations } from '../../../contexts/LanguageContext'
import SortableActivitiesList from './SortableActivitiesList'

interface Tab3ActivitiesAttachmentsProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onFileChange: (fieldName: string, file: File | null) => void
}

interface ActivityItem {
  id: string
  name: string
  priority: number
  selected: boolean
}

const Tab3ActivitiesAttachments: React.FC<Tab3ActivitiesAttachmentsProps> = ({ 
  formData, 
  onInputChange, 
  onFileChange 
}) => {
  const { language: currentLanguage } = useLanguage()
  const t = translations[currentLanguage]

  // Initialize activities with current form data
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 'softwareDesign', name: 'Software Design', priority: 1, selected: formData.activities.softwareDesign || false },
    { id: 'itSystems', name: 'IT Systems', priority: 2, selected: formData.activities.itSystems || false },
    { id: 'trustServices', name: 'Trust Services', priority: 3, selected: formData.activities.trustServices || false },
    { id: 'websitesPlatforms', name: 'Websites & Platforms', priority: 4, selected: formData.activities.websitesPlatforms || false },
    { id: 'electronicsEmbedded', name: 'Electronics & Embedded', priority: 5, selected: formData.activities.electronicsEmbedded || false },
    { id: 'contentDigitization', name: 'Content Digitization', priority: 6, selected: formData.activities.contentDigitization || false },
    { id: 'callCenterBusiness', name: 'Call Center Business', priority: 7, selected: formData.activities.callCenterBusiness || false },
    { id: 'consultingResearch', name: 'Consulting & Research', priority: 8, selected: formData.activities.consultingResearch || false },
    { id: 'trainingLearning', name: 'Training & Learning', priority: 9, selected: formData.activities.trainingLearning || false },
  ])

  // Update form data when activities change
  useEffect(() => {
    const updatedActivities = {
      softwareDesign: activities.find(a => a.id === 'softwareDesign')?.selected || false,
      itSystems: activities.find(a => a.id === 'itSystems')?.selected || false,
      trustServices: activities.find(a => a.id === 'trustServices')?.selected || false,
      websitesPlatforms: activities.find(a => a.id === 'websitesPlatforms')?.selected || false,
      electronicsEmbedded: activities.find(a => a.id === 'electronicsEmbedded')?.selected || false,
      contentDigitization: activities.find(a => a.id === 'contentDigitization')?.selected || false,
      callCenterBusiness: activities.find(a => a.id === 'callCenterBusiness')?.selected || false,
      consultingResearch: activities.find(a => a.id === 'consultingResearch')?.selected || false,
      trainingLearning: activities.find(a => a.id === 'trainingLearning')?.selected || false,
    }

    // Trigger form data update for each activity
    Object.entries(updatedActivities).forEach(([key, value]) => {
      const event = {
        target: {
          name: `activities.${key}`,
          type: 'checkbox',
          checked: value
        }
      } as React.ChangeEvent<HTMLInputElement>
      onInputChange(event)
    })
  }, [activities, onInputChange])

  const handleActivitiesChange = (newActivities: ActivityItem[]) => {
    setActivities(newActivities)
  }
  
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
        
        <SortableActivitiesList
          activities={activities}
          onActivitiesChange={handleActivitiesChange}
          language={currentLanguage}
          translations={t}
        />
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
          <div className="grid md:grid-cols-2 gap-4">

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

            {/* Representative Authorization */}
            {formData.requestApplicant === 'representative' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.representativeAuthorizationImage}
                </label>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileInputChange(e, 'representativeAuthorization')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
                  />
                  {formData.attachments.representativeAuthorization && (
                    <span className={`text-sm ${isFileValid(formData.attachments.representativeAuthorization) ? 'text-green-600' : 'text-red-600'}`}>
                      {getFileSize(formData.attachments.representativeAuthorization)}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Representative National ID */}
            {formData.requestApplicant === 'representative' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.representativeNationalIdImage}
                </label>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileInputChange(e, 'representativeNationalId')}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-itida-blue file:text-white hover:file:bg-itida-dark"
                  />
                  {formData.attachments.representativeNationalId && (
                    <span className={`text-sm ${isFileValid(formData.attachments.representativeNationalId) ? 'text-green-600' : 'text-red-600'}`}>
                      {getFileSize(formData.attachments.representativeNationalId)}
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>

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
