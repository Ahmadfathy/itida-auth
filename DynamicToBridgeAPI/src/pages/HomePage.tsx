import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// import Header from '../components/Header';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import Services from '../components/Services';
import AdditionalBenefits from '../components/AdditionalBenefits';
import CompanyCard from '../components/CompanyCard';
import FinancialInformation from '../components/registration/FinancialInformation';
import Tab4ActivitiesAttachments from '../components/registration/registrationCompany/Tab4ActivitiesAttachments';
import { companyByEmail, CompanyInfo } from '../api/client';
import { useLanguage, translations } from '../contexts/LanguageContext';
// import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const loginRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loadingCompany, setLoadingCompany] = useState(false);
  
  // Form data for the additional sections
  const [formData, setFormData] = useState({
    licenseReceiptMethod: '',
    declarationAgreement: false,
    activities: {
      softwareDesign: false,
      itSystems: false,
      trustServices: false,
      websitesPlatforms: false,
      electronicsEmbedded: false,
      contentDigitization: false,
      callCenterBusiness: false,
      consultingResearch: false,
      trainingLearning: false
    }
  });

  // Separate state for Company Financial & Market Highlights
  const [financialFormData, setFinancialFormData] = useState<any>({
    ownershipNationality: '',
    percentageEgyptianOwnership: '',
    percentageNonEgyptianOwnership: '',
    partnersNationalities: '',
    subClassification: '',
    companyClassification: [],
    fiscalCapital: '',
    domesticSalesDetails: [],
    domesticSalesValue: '',
    totalRevenueYear: '',
    annualRevenue: '',
    auditedBalanceSheet: null,
    export: '',
    exportInformation: [],
    totalNoOfEmployees: '',
    yearOfEstablishment: '',
    companySize: '',
    typeOfOwnership: '',
    owners: [],
    companyData: '',
    products: [],
    services: [],
    customerReferences: [],
    parent: '',
    child: '',
    grandChild: '',
    industrySectors: '',
    keyTechnologies: [],
    certificates: [],
    affiliation: [],
    memberships: [],
    partnerships: [],
    companyOverview: ''
  });
  const [financialOpen, setFinancialOpen] = useState(true)

  const handleFinancialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFinancialFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFinancialFileChange = (file: File | null) => {
    setFinancialFormData((prev: any) => ({ ...prev, auditedBalanceSheet: file }));
  };

  const handleFinancialDynamicInputChange = (section: string, index: number, field: string, value: string) => {
    setFinancialFormData((prev: any) => {
      const list = Array.isArray(prev[section]) ? [...prev[section]] : [];
      list[index] = { ...(list[index] || {}), [field]: value };
      return { ...prev, [section]: list };
    });
  };

  const addFinancialRow = (section: string, emptyRow: any) => {
    setFinancialFormData((prev: any) => {
      const list = Array.isArray(prev[section]) ? [...prev[section]] : [];
      list.push(emptyRow);
      return { ...prev, [section]: list };
    });
  };

  const removeFinancialRow = (section: string, index: number) => {
    setFinancialFormData((prev: any) => {
      const list = Array.isArray(prev[section]) ? [...prev[section]] : [];
      list.splice(index, 1);
      return { ...prev, [section]: list };
    });
  };

  const handleSubmitFinancial = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend endpoint if available
    console.log('Submitting Company Financial & Market Highlights:', financialFormData);
    alert(language === 'ar' ? 'تم إرسال المعلومات المالية والتسويقية' : 'Financial & Market Highlights submitted');
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const lastLogin = localStorage.getItem('lastLogin') || sessionStorage.getItem('lastLogin');
      setIsLoggedIn(!!token);
      
      // Fetch company info if logged in
      if (token && lastLogin) {
        // After successful login, scroll to top instead of focusing company card
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        fetchCompanyInfo(lastLogin);
      } else {
        setCompanyInfo(null);
      }
    };

    checkAuthStatus();
    
    // Listen for auth changes (login/logout)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom auth change events
    window.addEventListener('authChanged', handleStorageChange);

    // Removed auto-focus on company card after login

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleStorageChange);
      // no-op
    };
  }, []);

  const fetchCompanyInfo = async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setLoadingCompany(true);
    try {
      const response = await companyByEmail(email);
      if (response.value && response.value.length > 0) {
        // Prefer the company record that has the most contacts populated
        const best = [...response.value].sort((a: any, b: any) => {
          const alen = Array.isArray(a.contacts) ? a.contacts.length : 0;
          const blen = Array.isArray(b.contacts) ? b.contacts.length : 0;
          return blen - alen;
        })[0];
        setCompanyInfo(best as CompanyInfo);
      } else {
        setCompanyInfo(null);
      }
    } catch (error) {
      console.error('Failed to fetch company info:', error);
      setCompanyInfo(null);
    } finally {
      setLoadingCompany(false);
    }
  };

  const scrollToLogin = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = () => {
    navigate('/registration')
  }

  const handleCompanyUpdated = (updatedCompany: CompanyInfo) => {
    setCompanyInfo(updatedCompany)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle nested activities checkboxes
    if (name.startsWith('activities.')) {
      const activityName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        activities: {
          ...prev.activities,
          [activityName]: (e.target as HTMLInputElement).checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmitRegistration = async () => {
    try {
      // Here you would typically send the registration data to your backend
      console.log('Submitting registration data:', {
        companyInfo,
        formData,
        activities: {
          softwareDesign: false,
          itSystems: false,
          trustServices: false,
          websitesPlatforms: false,
          electronicsEmbedded: false,
          contentDigitization: false,
          callCenterBusiness: false,
          consultingResearch: false,
          trainingLearning: false
        },
        attachments: {
          commercialRegister: null,
          taxCard: null,
          nationalId: null,
          investmentGazette: null,
          declarationUndertaking: null,
          representativeAuthorization: null,
          representativeNationalId: null
        }
      });

      // Show success message
      alert(language === 'ar' ? 'تم إرسال طلب التسجيل بنجاح' : 'Registration submitted successfully');
      
      // Reset form
      setFormData({
        licenseReceiptMethod: '',
        declarationAgreement: false,
        activities: {
          softwareDesign: false,
          itSystems: false,
          trustServices: false,
          websitesPlatforms: false,
          electronicsEmbedded: false,
          contentDigitization: false,
          callCenterBusiness: false,
          consultingResearch: false,
          trainingLearning: false
        }
      });

    } catch (error) {
      console.error('Registration submission error:', error);
      alert(language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'An error occurred while submitting the request');
    }
  };

  return (
    <>
      {/* <Header onLogoClick={() => navigate('/')} /> */}
      <main>
        <Hero onRegister={() => navigate('/registration')} onLogin={scrollToLogin} isLoggedIn={isLoggedIn} companyInfo={companyInfo} />
        
        {!isLoggedIn && (
        <div ref={loginRef}>
          <LoginForm 
            onForgotPassword={() => navigate('/forgot-password')}
            onRegister={() => navigate('/registration')}
          />
        </div>
        )}
        {isLoggedIn && (
          <section className="py-16 bg-gray-50" ref={companyRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {loadingCompany ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-itida-blue"></div>
                </div>
              ) : companyInfo ? (
                <CompanyCard company={companyInfo} onCompanyUpdated={handleCompanyUpdated} />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">No Company Information Found</p>
                    <p className="text-gray-600">Unable to retrieve company details for your account.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Activities & Attachments for non-licensed logged-in users */}
        {isLoggedIn && companyInfo && !companyInfo.ldv_IPRLicenseNumber && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-[#0174a4] px-6 py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'ar' ? 'طلب الترخيص' : 'License Application'}
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      {language === 'ar' ? 'أكمل المعلومات المطلوبة للحصول على ترخيص ITIDA' : 'Complete the required information to obtain ITIDA license'}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Tab4ActivitiesAttachments 
                    formData={{
                      activities: formData.activities,
                      attachments: {
                        commercialRegister: null,
                        taxCard: null,
                        nationalId: null,
                        investmentGazette: null,
                        declarationUndertaking: null,
                        representativeAuthorization: null,
                        representativeNationalId: null
                      },
                      requestApplicant: 'company'
                    }}
                    onInputChange={handleInputChange}
                    onFileChange={() => {}} // No-op for file uploads in this context
                  />

                  {/* Additional Registration Sections */}
                  <div className="mt-12 space-y-8">
                    {/* License Receipt Method */}
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.methodOfLicenseReceipt}
                        </label>
                        <Select
                          name="licenseReceiptMethod"
                          value={
                            [
                              { value: '', label: t.selectReceiptMethod },
                              { value: 'email', label: language === 'ar' ? 'بريد إلكتروني' : 'Email' },
                              { value: 'postal', label: t.postalMail },
                              { value: 'pickup', label: t.personalPickup },
                              { value: 'courier', label: t.courier }
                            ].find(option => option.value === formData.licenseReceiptMethod) || null
                          }
                          onChange={(selectedOption) => {
                            const value = selectedOption ? selectedOption.value : '';
                            handleInputChange({
                              target: {
                                name: 'licenseReceiptMethod',
                                value: value
                              }
                            } as React.ChangeEvent<HTMLInputElement>);
                          }}
                          options={[
                            { value: '', label: t.selectReceiptMethod },
                            { value: 'email', label: language === 'ar' ? 'بريد إلكتروني' : 'Email' },
                            { value: 'postal', label: t.postalMail },
                            { value: 'pickup', label: t.personalPickup },
                            { value: 'courier', label: t.courier }
                          ]}
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

                    {/* Declaration Agreement */}
                    <div className="space-y-4 mt-6">
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
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
                            required
                          />
                          <span className="text-sm text-gray-700">
                            {t.iAgree}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={handleSubmitRegistration}
                        disabled={!formData.licenseReceiptMethod || !formData.declarationAgreement}
                        className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                          formData.licenseReceiptMethod && formData.declarationAgreement
                            ? 'bg-itida-blue hover:bg-itida-dark text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {t.submitRegistration}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Company Financial & Market Highlights */}
        {isLoggedIn && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#0b7a9f] px-6 py-4 cursor-pointer select-none" onClick={() => setFinancialOpen(!financialOpen)}>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <svg className={`w-6 h-6 mr-3 transition-transform duration-300 ease-in-out ${financialOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {language === 'ar' ? 'البيانات المالية وملخص السوق للشركة' : 'Company Financial & Market Highlights'}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {language === 'ar' ? 'قدّم بياناتك المالية وملخص السوق بشكل منفصل' : 'Submit your financial and market highlights separately'}
                  </p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${financialOpen ? 'max-h-[4000px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'}`}>
                  <div className="p-6">
                    <FinancialInformation
                      formData={financialFormData}
                      setFormData={setFinancialFormData}
                      handleInputChange={handleFinancialInputChange}
                      handleFileChange={handleFinancialFileChange}
                      handleDynamicInputChange={handleFinancialDynamicInputChange}
                      addRow={addFinancialRow}
                      removeRow={removeFinancialRow}
                      t={translations[language]}
                      onSubmit={handleSubmitFinancial}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {!(isLoggedIn && companyInfo && companyInfo.ldv_IPRLicenseNumber) && <AdditionalBenefits onRegister={handleRegister} />}
        {!isLoggedIn && <Services />}
      </main>
      {/* <Footer onLogoClick={() => navigate('/')} /> */}
    </>
  );
};

export default HomePage;
