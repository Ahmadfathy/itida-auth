import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/LanguageContext';

interface FinancialInformationProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({ formData, onInputChange }) => {
  const { language: currentLanguage } = useLanguage();
  
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {currentLanguage === 'ar' ? 'المعلومات المالية' : 'Financial Information'}
        </h2>
        <p className="text-gray-600 text-sm">
          {currentLanguage === 'ar' ? 'يرجى تقديم المعلومات المالية للشركة' : 'Please provide the company\'s financial information'}
        </p>
      </div>

      {/* Capital Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'رأس المال' : 'Capital Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رأس المال المرخص (جنيه مصري)' : 'Authorized Capital (EGP)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="authorizedCapital"
              value={formData.authorizedCapital || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'أدخل رأس المال المرخص' : 'Enter authorized capital'}
              required
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رأس المال المصدر (جنيه مصري)' : 'Issued Capital (EGP)'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              name="issuedCapital"
              value={formData.issuedCapital || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'أدخل رأس المال المصدر' : 'Enter issued capital'}
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLanguage === 'ar' ? 'رأس المال المدفوع (جنيه مصري)' : 'Paid-up Capital (EGP)'}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            name="paidUpCapital"
            value={formData.paidUpCapital || ''}
            onChange={onInputChange}
            className="input-field"
            placeholder={currentLanguage === 'ar' ? 'أدخل رأس المال المدفوع' : 'Enter paid-up capital'}
            required
            min="0"
          />
        </div>
      </div>

      {/* Banking Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'المعلومات المصرفية' : 'Banking Information'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'اسم البنك' : 'Bank Name'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'اسم البنك' : 'Bank Name'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'فرع البنك' : 'Bank Branch'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="bankBranch"
              value={formData.bankBranch || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'فرع البنك' : 'Bank Branch'}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رقم الحساب' : 'Account Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'رقم الحساب' : 'Account Number'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'رقم IBAN' : 'IBAN Number'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="ibanNumber"
              value={formData.ibanNumber || ''}
              onChange={onInputChange}
              className="input-field"
              placeholder={currentLanguage === 'ar' ? 'رقم IBAN' : 'IBAN Number'}
              required
            />
          </div>
        </div>
      </div>

      {/* Financial Year Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          {currentLanguage === 'ar' ? 'السنة المالية' : 'Financial Year'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'بداية السنة المالية' : 'Financial Year Start'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="financialYearStart"
              value={formData.financialYearStart || ''}
              onChange={onInputChange}
              className="input-field"
              required
            >
              <option value="">{currentLanguage === 'ar' ? 'اختر الشهر' : 'Select Month'}</option>
              <option value="1">{currentLanguage === 'ar' ? 'يناير' : 'January'}</option>
              <option value="2">{currentLanguage === 'ar' ? 'فبراير' : 'February'}</option>
              <option value="3">{currentLanguage === 'ar' ? 'مارس' : 'March'}</option>
              <option value="4">{currentLanguage === 'ar' ? 'أبريل' : 'April'}</option>
              <option value="5">{currentLanguage === 'ar' ? 'مايو' : 'May'}</option>
              <option value="6">{currentLanguage === 'ar' ? 'يونيو' : 'June'}</option>
              <option value="7">{currentLanguage === 'ar' ? 'يوليو' : 'July'}</option>
              <option value="8">{currentLanguage === 'ar' ? 'أغسطس' : 'August'}</option>
              <option value="9">{currentLanguage === 'ar' ? 'سبتمبر' : 'September'}</option>
              <option value="10">{currentLanguage === 'ar' ? 'أكتوبر' : 'October'}</option>
              <option value="11">{currentLanguage === 'ar' ? 'نوفمبر' : 'November'}</option>
              <option value="12">{currentLanguage === 'ar' ? 'ديسمبر' : 'December'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLanguage === 'ar' ? 'نهاية السنة المالية' : 'Financial Year End'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="financialYearEnd"
              value={formData.financialYearEnd || ''}
              onChange={onInputChange}
              className="input-field"
              required
            >
              <option value="">{currentLanguage === 'ar' ? 'اختر الشهر' : 'Select Month'}</option>
              <option value="1">{currentLanguage === 'ar' ? 'يناير' : 'January'}</option>
              <option value="2">{currentLanguage === 'ar' ? 'فبراير' : 'February'}</option>
              <option value="3">{currentLanguage === 'ar' ? 'مارس' : 'March'}</option>
              <option value="4">{currentLanguage === 'ar' ? 'أبريل' : 'April'}</option>
              <option value="5">{currentLanguage === 'ar' ? 'مايو' : 'May'}</option>
              <option value="6">{currentLanguage === 'ar' ? 'يونيو' : 'June'}</option>
              <option value="7">{currentLanguage === 'ar' ? 'يوليو' : 'July'}</option>
              <option value="8">{currentLanguage === 'ar' ? 'أغسطس' : 'August'}</option>
              <option value="9">{currentLanguage === 'ar' ? 'سبتمبر' : 'September'}</option>
              <option value="10">{currentLanguage === 'ar' ? 'أكتوبر' : 'October'}</option>
              <option value="11">{currentLanguage === 'ar' ? 'نوفمبر' : 'November'}</option>
              <option value="12">{currentLanguage === 'ar' ? 'ديسمبر' : 'December'}</option>
            </select>
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

export default FinancialInformation;
