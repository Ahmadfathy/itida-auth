import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/LanguageContext';

interface CompanyHeadInformationProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const CompanyHeadInformation: React.FC<CompanyHeadInformationProps> = ({ formData, onInputChange }) => {
  const { language: currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {currentLanguage === 'ar' ? 'معلومات رئيس الشركة' : 'Company Head Information'}
        </h2>
        <p className="text-gray-600 text-sm">
          {currentLanguage === 'ar' ? 'يرجى تقديم تفاصيل عن رئيس الشركة/المدير التنفيذي' : 'Please provide details about the company head/CEO'}
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="headFullName"
              value={formData.headFullName || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'المنصب' : 'Position'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="headPosition"
              value={formData.headPosition || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'المنصب' : 'Position'}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'الجنسية' : 'Nationality'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="headNationality"
              value={formData.headNationality || ''}
              onChange={onInputChange}
              className="input-field"
              required
            >
              <option value="">{currentLanguage === 'ar' ? 'اختر الجنسية' : 'Select Nationality'}</option>
              <option value="egyptian">{currentLanguage === 'ar' ? 'مصري' : 'Egyptian'}</option>
              <option value="other">{currentLanguage === 'ar' ? 'أجنبي' : 'Foreign'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رقم البطاقة/جواز السفر' : 'ID/Passport Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="headIdNumber"
              value={formData.headIdNumber || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'رقم البطاقة/جواز السفر' : 'ID/Passport Number'}
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="headEmail"
              value={formData.headEmail || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="headPhone"
              value={formData.headPhone || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Number'}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            name="headMobile"
            value={formData.headMobile || ''}
            onChange={onInputChange}
            className="input-field"
            placeholder={currentLanguage === 'ar' ? 'رقم الهاتف المحمول' : 'Mobile Number'}
            required
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'المعلومات المهنية' : 'Professional Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'تاريخ التعيين' : 'Appointment Date'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              name="headAppointmentDate"
              value={formData.headAppointmentDate || ''}
              onChange={onInputChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'نسبة التملك (%)' : 'Ownership Percentage (%)'}
            </label>
            <input
              type="number"
              name="headOwnershipPercentage"
              value={formData.headOwnershipPercentage || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'نسبة التملك' : 'Ownership Percentage'}
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {currentLanguage === 'ar' ? 'يرجى التأكد من صحة جميع البيانات المدخلة' : 'Please ensure all entered data is accurate'}
        </p>
      </div>
    </div>
  );
};

export default CompanyHeadInformation;
