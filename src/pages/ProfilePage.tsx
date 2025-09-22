import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { translations, useLanguage } from '../contexts/LanguageContext';

interface FinancialData {
  fiscalCapital: string;
  domesticSalesDetails: { year: string; value: string; totalRevenueYear: string }[];
  annualRevenue: string;
  auditedBalanceSheet: File | null;
  export: string;
  exportInformation: { year: string; marketRegion: string; country: string; valueExported: string; totalAmountExported: number }[];
  ownershipNationality: string;
  percentageEgyptianOwnership: string;
  percentageNonEgyptianOwnership: string;
  partnersNationalities: string;
  totalNoOfEmployees: string;
  yearOfEstablishment: string;
  companySize: string;
  typeOfOwnership: string;
  companyData: string;
  keyTechnologies: string[];
  affiliation: string[];
  memberships: string[];
  certificates: string[];
  partnerships: string[];
  products: { name: string; description: string }[];
  services: { name: string; description: string }[];
  customerReferences: { name: string; country: string; projectSize: string; scope: string; industriesSector: string; description: string }[];
  companyClassification: { companyClassification: string; subClassification: string }[];
  owners: { name: string; mobile: string; telephone: string; email: string }[];
  branches: { branchName: string; branchCountry: string; branchGovernorate: string; branchCity: string; branchDistrict: string; branchEmail: string; mobilePhone: string }[];
}

const ProfilePage: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated, currentCompany, logout } = useAuth();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [financialData, setFinancialData] = useState<FinancialData>({
    fiscalCapital: '',
    domesticSalesDetails: [],
    annualRevenue: '',
    auditedBalanceSheet: null,
    export: '',
    exportInformation: [],
    ownershipNationality: '',
    percentageEgyptianOwnership: '',
    percentageNonEgyptianOwnership: '',
    partnersNationalities: '',
    totalNoOfEmployees: '',
    yearOfEstablishment: '',
    companySize: '',
    typeOfOwnership: '',
    companyData: '',
    keyTechnologies: [],
    affiliation: [],
    memberships: [],
    certificates: [],
    partnerships: [],
    products: [],
    services: [],
    customerReferences: [],
    companyClassification: [],
    owners: [],
    branches: []
  });

  // Update financial data when company changes
  useEffect(() => {
    if (currentCompany) {
      const companyData = currentCompany.registrationFormData;
      setFinancialData({
        fiscalCapital: companyData.fiscalCapital ? `${companyData.fiscalCapital} EGP` : 'N/A',
        domesticSalesDetails: companyData.domesticSalesDetails || [],
        annualRevenue: companyData.annualRevenue ? `${companyData.annualRevenue} EGP` : 'N/A',
        auditedBalanceSheet: companyData.auditedBalanceSheet,
        export: companyData.export || 'No',
        exportInformation: companyData.exportInformation || [],
        ownershipNationality: companyData.ownershipNationality || 'N/A',
        percentageEgyptianOwnership: companyData.percentageEgyptianOwnership ? `${companyData.percentageEgyptianOwnership}%` : 'N/A',
        percentageNonEgyptianOwnership: companyData.percentageNonEgyptianOwnership ? `${companyData.percentageNonEgyptianOwnership}%` : 'N/A',
        partnersNationalities: companyData.partnersNationalities || 'N/A',
        totalNoOfEmployees: companyData.totalNoOfEmployees || 'N/A',
        yearOfEstablishment: companyData.yearOfEstablishment || 'N/A',
        companySize: companyData.companySize || 'N/A',
        typeOfOwnership: companyData.typeOfOwnership || 'N/A',
        companyData: companyData.companyData || 'N/A',
        keyTechnologies: companyData.keyTechnologies || [],
        affiliation: companyData.affiliation || [],
        memberships: companyData.memberships || [],
        certificates: companyData.certificates || [],
        partnerships: companyData.partnerships || [],
        products: companyData.products || [],
        services: companyData.services || [],
        customerReferences: companyData.customerReferences || [],
        companyClassification: companyData.companyClassification || [],
        owners: companyData.owners || [],
        branches: companyData.branches || []
      });
    }
  }, [currentCompany]);

  // Update form data when company changes
  useEffect(() => {
    if (currentCompany) {
      const companyData = currentCompany.registrationFormData;
      setFormData({
        // Dynamic arrays for repeatable sections
        companyHeads: companyData.companyHeads || [{ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' }],
        contactPersons: companyData.contactPersons || [{ name: '', position: '', mobile: '', nationalId: '', email: '' }],
        products: companyData.products || [{ name: '', description: '' }],
        services: companyData.services || [{ name: '', description: '' }],
        customerReferences: companyData.customerReferences || [{ name: '', country: '', projectSize: '', scope: '', industriesSector: '', description: '' }],
        exportInformation: companyData.exportInformation || [{ year: '', marketRegion: '', country: '', valueExported: '' }],
        owners: companyData.owners || [{ name: '', mobile: '', telephone: '', email: '' }],
        domesticSalesDetails: companyData.domesticSalesDetails || [{ year: '', value: '', totalRevenueYear: '' }],
        // Tab 1: Company Legal Information
        companyNameEn: companyData.ldv_englishname || 'N/A',
        companyNameAr: companyData.ldv_arabicname || 'غير متوفر',
        commercialDenomination: companyData.ldv_commercialdenomination || 'N/A',
        legalType: companyData.ldv_legaltypecode || 'N/A',
        companyClassification: companyData.companyClassification || [{ companyClassification: 'N/A', subClassification: 'N/A' }],
        registerUsing: companyData.registerUsing || {
          commercialRegistry: false,
          unifiedCommercialRegistry: false,
          taxRegistry: false
        },
        commercialRegistryNumber: companyData.commercialRegistryNumber || 'N/A',
        unifiedCommercialRegistryNumber: companyData.unifiedCommercialRegistryNumber || 'N/A',
        taxRegistryNumber: companyData.taxRegistryNumber || 'N/A',
        commercialRegistrationDate: companyData.ldv_establishmentyear || 'N/A',

        // Tab 2: Contact Information & Company Representative
        governorate: companyData.governorate || 'N/A',
        city: companyData.city || 'N/A',
        district: companyData.district || 'N/A',
        street: companyData.Street || 'N/A',
        address: companyData.address || 'N/A',
        companyWebsite: companyData.companyWebsite || 'N/A',
        fullName: companyData.fullName || 'N/A',
        contactJobTitle: companyData.contact_jobtitle || 'N/A',
        contactMobilePhone: companyData.contact_mobilephone || 'N/A',
        contactMail: companyData.contact_mail || 'N/A',
        contactNationalId: companyData.contact_ldv_nationalid || 'N/A',
        contactNationalIdIssuedFrom: companyData.contact_ldv_nidissuedfrom || 'N/A',
        contactNationalIdIssueDate: companyData.contact_ldv_nidissuedate || 'N/A',
        requestApplicant: companyData.requestApplicant || 'N/A',
        representativeFullName: companyData.representative_fullName || 'N/A',
        representativeJobTitle: companyData.representative_jobtitle || 'N/A',
        representativeMobilePhone: companyData.representative_mobilephone || 'N/A',
        representativeMail: companyData.representative_mail || 'N/A',
        representativeNationalId: companyData.representative_nationalid || 'N/A',
        representativeNationalIdIssuedFrom: companyData.representative_nidissuedfrom || 'N/A',
        representativeNationalIdIssueDate: companyData.representative_nidissuedate || 'N/A',
        hasBranches: companyData.hasBranches || false,
        branches: companyData.branches || [],

        // Tab 3: Activities and Attachments
        activities: companyData.activities || {
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
        attachments: companyData.attachments || {
          commercialRegister: null,
          taxCard: null,
          nationalId: null,
          investmentGazette: null,
          declarationUndertaking: null,
          representativeAuthorization: null,
          representativeNationalId: null
        },

        // Tab 4: Financial Information
        fiscalCapital: companyData.fiscalCapital || 'N/A',
        domesticSalesValue: companyData.domesticSalesValue || 'N/A',
        totalRevenueYear: companyData.totalRevenueYear || 'N/A',
        annualRevenue: companyData.annualRevenue || 'N/A',
        auditedBalanceSheet: companyData.auditedBalanceSheet || null,
        export: companyData.export || 'No',
        ownershipNationality: companyData.ownershipNationality || 'N/A',
        percentageEgyptianOwnership: companyData.percentageEgyptianOwnership || 'N/A',
        percentageNonEgyptianOwnership: companyData.percentageNonEgyptianOwnership || 'N/A',
        partnersNationalities: companyData.partnersNationalities || 'N/A',
        totalNoOfEmployees: companyData.totalNoOfEmployees || 'N/A',
        yearOfEstablishment: companyData.yearOfEstablishment || 'N/A',
        companySize: companyData.companySize || 'N/A',
        typeOfOwnership: companyData.typeOfOwnership || 'N/A',
        companyData: companyData.companyData || 'N/A',
        parent: companyData.parent || '',
        child: companyData.child || '',
        grandChild: companyData.grandChild || '',
        industrySectors: companyData.industrySectors || 'N/A',
        keyTechnologies: companyData.keyTechnologies || [],
        certificates: companyData.certificates || [],
        affiliation: companyData.affiliation || [],
        memberships: companyData.memberships || [],
        partnerships: companyData.partnerships || [],
        companyOverview: companyData.companyOverview || 'N/A',
        licenseReceiptMethod: companyData.licenseReceiptMethod || 'N/A',
        declarationAgreement: companyData.declarationAgreement || false,
        companyOverView: companyData.companyOverView || 'N/A'
      });
    }
  }, [currentCompany]);

  const [formData, setFormData] = useState<any>({
    // Dynamic arrays for repeatable sections
    companyHeads: [{ name: '', position: '', mobile: '', nationalId: '', email: '', email2: '' }],
    contactPersons: [{ name: '', position: '', mobile: '', nationalId: '', email: '' }],
    products: [{ name: '', description: '' }],
    services: [{ name: '', description: '' }],
    customerReferences: [{ name: '', country: '', projectSize: '', scope: '', industriesSector: '', description: '' }],
    exportInformation: [{ year: '', marketRegion: '', country: '', valueExported: '' }],
    owners: [{ name: '', mobile: '', telephone: '', email: '' }],
    domesticSalesDetails: [{ year: '', value: '', totalRevenueYear: '' }],
    // Tab 1: Company Legal Information
    companyNameEn: '',
    companyNameAr: '',
    commercialDenomination: '',
    legalType: '',
    companyClassification: [],
    registerUsing: {
      commercialRegistry: false,
      unifiedCommercialRegistry: false,
      taxRegistry: false
    },
    commercialRegistryNumber: '',
    unifiedCommercialRegistryNumber: '',
    taxRegistryNumber: '',
    commercialRegistrationDate: '',

    // Tab 2: Contact Information & Company Representative
    governorate: '',
    district: '',
    streetAddress: '',
    companyWebsite: '',
    officialEmail: '',
    phoneMobile: '',
    branches: [],
    representativeName: '',
    representativeTitle: '',
    representativeMobile: '',
    representativeNationalId: '',
    representativeEmail: '',
    requestApplicant: '',

    // Tab 3: Activities, Attachments & Declaration
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
    },
    licenseReceiptMethod: '',
    declarationAgreement: false,

    // Company Head Information
    companyHeadName: '',
    companyHeadTitle: '',
    companyHeadMobile: '',
    companyHeadNationalId: '',
    companyHeadEmail: '',
    companyHeadEmail2: '',

    // Contact Persons
    contactPersonName: '',
    contactPersonTitle: '',
    contactPersonMobile: '',
    contactPersonNationalId: '',
    contactPersonEmail: '',

    // Financial Information
    fiscalCapital: '',
    domesticSalesValue: '',
    totalRevenueYear: '',
    annualRevenue: '',
    auditedBalanceSheet: null,
    export: '',
    ownershipNationality: '',
    percentageEgyptianOwnership: '',
    percentageNonEgyptianOwnership: '',
    partnersNationalities: '',
    totalNoOfEmployees: '',
    yearOfEstablishment: '',
    companySize: '',
    typeOfOwnership: '',
    companyData: '',

    // Updated fields to arrays for multi-select
    keyTechnologies: [],
    certificates: [],
    affiliation: [],
    memberships: [],
    partnerships: []
  });

  // Handlers for editing functionality
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // Update financialData with formData values
    setFinancialData((prev: FinancialData) => ({
      ...prev,
      fiscalCapital: formData.fiscalCapital || prev.fiscalCapital,
      annualRevenue: formData.annualRevenue || prev.annualRevenue,
      export: formData.export || prev.export,
      ownershipNationality: formData.ownershipNationality || prev.ownershipNationality,
      percentageEgyptianOwnership: formData.percentageEgyptianOwnership || prev.percentageEgyptianOwnership,
      percentageNonEgyptianOwnership: formData.percentageNonEgyptianOwnership || prev.percentageNonEgyptianOwnership,
      partnersNationalities: formData.partnersNationalities || prev.partnersNationalities,
      totalNoOfEmployees: formData.totalNoOfEmployees || prev.totalNoOfEmployees,
      yearOfEstablishment: formData.yearOfEstablishment || prev.yearOfEstablishment,
      companySize: formData.companySize || prev.companySize,
      typeOfOwnership: formData.typeOfOwnership || prev.typeOfOwnership,
      companyData: formData.companyData || prev.companyData,
      keyTechnologies: formData.keyTechnologies || prev.keyTechnologies,
      affiliation: formData.affiliation || prev.affiliation,
      memberships: formData.memberships || prev.memberships,
      certificates: formData.certificates || prev.certificates,
      partnerships: formData.partnerships || prev.partnerships,
      products: formData.products || prev.products,
      services: formData.services || prev.services,
      customerReferences: formData.customerReferences || prev.customerReferences,
      owners: formData.owners || prev.owners,
      domesticSalesDetails: formData.domesticSalesDetails || prev.domesticSalesDetails,
      exportInformation: formData.exportInformation || prev.exportInformation,
      companyClassification: formData.companyClassification || prev.companyClassification,
      branches: formData.branches || prev.branches
    }));

    // Update formData with new company head and contact person data
    setFormData((prev: any) => ({
      ...prev,
      companyHeadName: formData.companyHeadName || prev.companyHeadName,
      companyHeadTitle: formData.companyHeadTitle || prev.companyHeadTitle,
      companyHeadMobile: formData.companyHeadMobile || prev.companyHeadMobile,
      companyHeadNationalId: formData.companyHeadNationalId || prev.companyHeadNationalId,
      companyHeadEmail: formData.companyHeadEmail || prev.companyHeadEmail,
      companyHeadEmail2: formData.companyHeadEmail2 || prev.companyHeadEmail2,
      contactPersonName: formData.contactPersonName || prev.contactPersonName,
      contactPersonTitle: formData.contactPersonTitle || prev.contactPersonTitle,
      contactPersonMobile: formData.contactPersonMobile || prev.contactPersonMobile,
      contactPersonNationalId: formData.contactPersonNationalId || prev.contactPersonNationalId,
      contactPersonEmail: formData.contactPersonEmail || prev.contactPersonEmail,
      activities: formData.activities || prev.activities
    }));

    setIsEditMode(false);
  };

  const handleCancel = () => {
    // Reset formData to current financialData values
    setFormData((prev: any) => ({
      ...prev,
      fiscalCapital: financialData.fiscalCapital,
      annualRevenue: financialData.annualRevenue,
      export: financialData.export,
      ownershipNationality: financialData.ownershipNationality,
      percentageEgyptianOwnership: financialData.percentageEgyptianOwnership,
      percentageNonEgyptianOwnership: financialData.percentageNonEgyptianOwnership,
      partnersNationalities: financialData.partnersNationalities,
      totalNoOfEmployees: financialData.totalNoOfEmployees,
      yearOfEstablishment: financialData.yearOfEstablishment,
      companySize: financialData.companySize,
      typeOfOwnership: financialData.typeOfOwnership,
      companyData: financialData.companyData,
      keyTechnologies: financialData.keyTechnologies,
      affiliation: financialData.affiliation,
      memberships: financialData.memberships,
      certificates: financialData.certificates,
      partnerships: financialData.partnerships,
      products: financialData.products,
      services: financialData.services,
      customerReferences: financialData.customerReferences,
      owners: financialData.owners,
      domesticSalesDetails: financialData.domesticSalesDetails,
      exportInformation: financialData.exportInformation,
      companyClassification: financialData.companyClassification,
      activities: formData.activities // Keep current activities state
    }));
    setIsEditMode(false);
  };



  const exportPDF = () => {
    const input = document.getElementById('profile-details-section');
    if (!input) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });

    // Use html2canvas to convert the section to canvas
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: input.scrollHeight,
      height: input.scrollHeight,
      backgroundColor: '#ffffff',
      // Set direction based on language
      onclone: (clonedDoc) => {
        clonedDoc.body.style.direction = language === 'ar' ? 'rtl' : 'ltr';
      }
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, Math.min(heightLeft, pageHeight));
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        position -= pageHeight;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, Math.min(heightLeft, pageHeight));
        heightLeft -= pageHeight;
      }

      pdf.save('profile-details.pdf');
    });
  };

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="/images/itida-logo.png"
                alt={translations[language].companyLogo}
                className="border w-24 h-24 rounded-xl object-cover"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2 mb-6">
                <span>{currentCompany ? currentCompany.registrationFormData.ldv_englishname : ''}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </h1>
              {currentCompany && (
                <div className="text-sm text-gray-600 mb-2">
                  <div className="font-medium">{currentCompany.registrationFormData.ldv_arabicname}</div>
                  <div className="text-xs text-gray-500">Status: {currentCompany.registrationStatus} ({currentCompany.completionPercentage}%)</div>
                </div>
              )}
              <div className="text-gray-500 flex space-x-4 mt-1 text-sm">
                <div className='grid grid-cols-2 gap-3'>

                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                    <span>{currentCompany ? currentCompany.registrationFormData.commercialRegistryNumber : '123456789'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c4.418 0 8 3.582 8 8 0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3 0-4.418 3.582-8 8-8z"
                      />
                    </svg>
                    <span>{currentCompany ? `${currentCompany.registrationFormData.city}, ${currentCompany.registrationFormData.governorate}` : 'Cairo, Egypt'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9 6 9-6" />
                    </svg>
                    <span>{currentCompany ? currentCompany.registrationFormData.emailaddress1 : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.58 6.58l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68a2 2 0 011.72 2z"
                      />
                    </svg>
                    <span>{currentCompany ? currentCompany.registrationFormData.contact_mobilephone : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-400 mb-1">{translations[language].profileCompletion}</p>
              <div className="w-48 bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${currentCompany ? currentCompany.completionPercentage : 50}%` }}>
                  <p className="text-xs text-white px-3 text-end">{currentCompany ? currentCompany.completionPercentage : 50}%</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">{translations[language].error} </strong>
            <span className="block sm:inline">
              {translations[language].errorProcessingProfile}{' '}
              <a href="#" className="underline font-semibold text-red-700 hover:text-red-900">
                {translations[language].completeIt}
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-red-500"
              onClick={() => setShowError(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>{translations[language].close}</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}
        {showWarning && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">{translations[language].warning} </strong>
            <span className="block sm:inline">
              {translations[language].profileFiftyPercentComplete}{' '}
              <a href="#" className="underline font-semibold text-yellow-700 hover:text-yellow-900">
                {translations[language].completeIt}
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-yellow-500"
              onClick={() => setShowWarning(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>{translations[language].close}</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}
        {showInfo && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">{translations[language].info} </strong>
            <span className="block sm:inline">
              {translations[language].keepProfileUpdated}{' '}
              <a href="#" className="underline font-semibold text-blue-700 hover:text-blue-900">
                {translations[language].completeIt}
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-blue-500"
              onClick={() => setShowInfo(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>{translations[language].close}</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow mt-6">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{translations[language].profileDetails}</h2>
            <div className='flex gap-3'>
              {!isEditMode ? (
                <>
                  <button className="btn-primary px-4 py-2" onClick={handleEditToggle}>{translations[language].editProfile}</button>
                  <button className="btn-primary px-6 py-2" onClick={exportPDF}>{translations[language].exportPDF}</button>
                </>
              ) : (
                <>
                  <button className="btn-secondary px-4 py-2" onClick={handleCancel}>{translations[language].cancel}</button>
                  <button className="btn-primary px-6 py-2" onClick={handleSave}>{translations[language].saveChanges}</button>
                </>
              )}
            </div>
          </div>
          <div id="profile-details-section" className="space-y-8 text-gray-600  p-6">
            {/* Company Legal Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyLegalInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companyNameEnglish}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyNameEn"
                      value={formData.companyNameEn || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyNameEn || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companyNameArabic}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyNameAr"
                      value={formData.companyNameAr || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyNameAr || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].commercialDenomination}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="commercialDenomination"
                      value={formData.commercialDenomination || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.commercialDenomination || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].legalType}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="legalType"
                      value={formData.legalType || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.legalType || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companyClassification}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyClassification"
                      value={formData.companyClassification[0]?.companyClassification || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyClassification[0]?.companyClassification || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].commercialRegistryNumber}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="commercialRegistryNumber"
                      value={formData.commercialRegistryNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.commercialRegistryNumber || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].unifiedCommercialRegistryNumber}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="unifiedCommercialRegistryNumber"
                      value={formData.unifiedCommercialRegistryNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.unifiedCommercialRegistryNumber || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].taxRegistryNumber}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="taxRegistryNumber"
                      value={formData.taxRegistryNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.taxRegistryNumber || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].commercialRegistrationDate}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="commercialRegistrationDate"
                      value={formData.commercialRegistrationDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.commercialRegistrationDate || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].officialCompanyEmail}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="officialEmail"
                      value={formData.officialEmail || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.officialEmail || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].yearOfEstablishment}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.yearOfEstablishment || '-'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].contactInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].governorate}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="governorate"
                      value={formData.governorate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.governorate || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].districtCity}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="district"
                      value={formData.district || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.district || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].streetAddress}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.streetAddress || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companyWebsiteUrl}</p>
                  {isEditMode ? (
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyWebsite || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].officialEmail}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="officialEmail"
                      value={formData.officialEmail || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.officialEmail || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].phoneMobile}</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="phoneMobile"
                      value={formData.phoneMobile || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.phoneMobile || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].name}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="representativeName"
                      value={formData.representativeName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.representativeName || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].title}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="representativeTitle"
                      value={formData.representativeTitle || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.representativeTitle || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].mobile}</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="representativeMobile"
                      value={formData.representativeMobile || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.representativeMobile || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].nationalId}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="representativeNationalId"
                      value={formData.representativeNationalId || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.representativeNationalId || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].email}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="representativeEmail"
                      value={formData.representativeEmail || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.representativeEmail || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].requestApplicant}</p>
                  {isEditMode ? (
                    <select
                      name="requestApplicant"
                      value={formData.requestApplicant || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="company-in-charge">Company in Charge</option>
                      <option value="representative">Representative</option>
                    </select>
                  ) : (
                    <p className="font-semibold">{formData.requestApplicant || '-'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Company Branches */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyBranchesTitle}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchName}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branches[0]?.branchName || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchName: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchName || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchCountry}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="branchCountry"
                      value={formData.branches[0]?.branchCountry || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchCountry: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchCountry || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchGovernorate}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="branchGovernorate"
                      value={formData.branches[0]?.branchGovernorate || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchGovernorate: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchGovernorate || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchCity}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="branchCity"
                      value={formData.branches[0]?.branchCity || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchCity: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchCity || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchDistrict}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="branchDistrict"
                      value={formData.branches[0]?.branchDistrict || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchDistrict: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchDistrict || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].branchEmail}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="branchEmail"
                      value={formData.branches[0]?.branchEmail || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], branchEmail: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.branchEmail || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Mobile Phone</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="mobilePhone"
                      value={formData.branches[0]?.mobilePhone || ''}
                      onChange={(e) => {
                        const updatedBranches = [...formData.branches];
                        updatedBranches[0] = { ...updatedBranches[0], mobilePhone: e.target.value };
                        setFormData({ ...formData, branches: updatedBranches });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.branches[0]?.mobilePhone || '-'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].activitiesAttachments}</h3>
              <div className="grid md:grid-cols-1 gap-6">
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="softwareDesign"
                      checked={formData.activities?.softwareDesign || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.softwareDesign ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].softwareDesignServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="itSystems"
                      checked={formData.activities?.itSystems || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.itSystems ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].itSystemsServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="trustServices"
                      checked={formData.activities?.trustServices || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.trustServices ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].trustServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="websitesPlatforms"
                      checked={formData.activities?.websitesPlatforms || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.websitesPlatforms ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].websitesPlatformsServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="electronicsEmbedded"
                      checked={formData.activities?.electronicsEmbedded || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.electronicsEmbedded ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].electronicsEmbeddedServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="contentDigitization"
                      checked={formData.activities?.contentDigitization || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.contentDigitization ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].contentDigitizationServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="callCenterBusiness"
                      checked={formData.activities?.callCenterBusiness || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.callCenterBusiness ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].callCenterBusinessServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="consultingResearch"
                      checked={formData.activities?.consultingResearch || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.consultingResearch ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].consultingResearchServices}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      name="trainingLearning"
                      checked={formData.activities?.trainingLearning || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{formData.activities?.trainingLearning ? 'Yes' : 'No'}</p>
                  )}
                  <p className="text-sm text-gray-500">{translations[language].trainingLearningServices}</p>
                </div>
              </div>
            </div>

            {/* Company Head Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyHead}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].name}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyHeadName"
                      value={formData.companyHeadName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadName || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].title}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyHeadTitle"
                      value={formData.companyHeadTitle || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadTitle || 'CTO'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].mobile}</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="companyHeadMobile"
                      value={formData.companyHeadMobile || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadMobile || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].nationalId}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyHeadNationalId"
                      value={formData.companyHeadNationalId || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadNationalId || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].email}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="companyHeadEmail"
                      value={formData.companyHeadEmail || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadEmail || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].email2}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="companyHeadEmail2"
                      value={formData.companyHeadEmail2 || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.companyHeadEmail2 || ''}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].contactPersons}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].name}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.contactPersonName || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].title}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="contactPersonTitle"
                      value={formData.contactPersonTitle || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.contactPersonTitle || 'Manager'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].mobile}</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="contactPersonMobile"
                      value={formData.contactPersonMobile || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.contactPersonMobile || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].nationalId}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="contactPersonNationalId"
                      value={formData.contactPersonNationalId || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.contactPersonNationalId || ''}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].email}</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="contactPersonEmail"
                      value={formData.contactPersonEmail || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{formData.contactPersonEmail || ''}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-md font-semibold mb-4">
                {translations[language].products}
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.products.length > 0 ? (
                  financialData.products.map((product, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].productName}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={product.name || ''}
                          onChange={(e) => {
                            const updatedProducts = [...financialData.products];
                            updatedProducts[index] = { ...updatedProducts[index], name: e.target.value };
                            setFinancialData({ ...financialData, products: updatedProducts });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-semibold">{product.name || '-'}</p>
                      )}
                      <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={product.description || ''}
                          onChange={(e) => {
                            const updatedProducts = [...financialData.products];
                            updatedProducts[index] = { ...updatedProducts[index], description: e.target.value };
                            setFinancialData({ ...financialData, products: updatedProducts });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-semibold">{product.description || '-'}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].productName} ;ldf;lsdf</p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                      <p className="font-semibold">-</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].services}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.services.length > 0 ? (
                  financialData.services.map((service, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].serviceName}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={service.name || ''}
                          onChange={(e) => {
                            const updatedServices = [...financialData.services];
                            updatedServices[index] = { ...updatedServices[index], name: e.target.value };
                            setFinancialData({ ...financialData, services: updatedServices });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-semibold">{service.name || '-'}</p>
                      )}
                      <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={service.description || ''}
                          onChange={(e) => {
                            const updatedServices = [...financialData.services];
                            updatedServices[index] = { ...updatedServices[index], description: e.target.value };
                            setFinancialData({ ...financialData, services: updatedServices });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="font-semibold">{service.description || '-'}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{translations[language].serviceName}</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer References */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].customerReferences}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.customerReferences.length > 0 ? (
                  financialData.customerReferences.map((ref, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].name}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.name || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], name: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.name || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].country}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.country || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], country: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.country || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].projectSize}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.projectSize || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], projectSize: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.projectSize || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].scope}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.scope || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], scope: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.scope || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].industriesSector}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.industriesSector || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], industriesSector: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.industriesSector || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={ref.description || ''}
                            onChange={(e) => {
                              const updatedRefs = [...financialData.customerReferences];
                              updatedRefs[index] = { ...updatedRefs[index], description: e.target.value };
                              setFinancialData({ ...financialData, customerReferences: updatedRefs });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{ref.description || '-'}</p>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].name}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: e.target.value, country: '', projectSize: '', scope: '', industriesSector: '', description: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].name}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].country}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: '', country: e.target.value, projectSize: '', scope: '', industriesSector: '', description: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].country}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].projectSize}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: '', country: '', projectSize: e.target.value, scope: '', industriesSector: '', description: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].projectSize}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].scope}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: '', country: '', projectSize: '', scope: e.target.value, industriesSector: '', description: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].scope}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].industriesSector}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: '', country: '', projectSize: '', scope: '', industriesSector: e.target.value, description: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].industriesSector}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].description}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              customerReferences: [{ name: '', country: '', projectSize: '', scope: '', industriesSector: '', description: e.target.value }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].description}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Export Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].exportInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.exportInformation.length > 0 ? (
                  financialData.exportInformation.map((exportInfo, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].year}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={exportInfo.year || ''}
                            onChange={(e) => {
                              const updatedExports = [...financialData.exportInformation];
                              updatedExports[index] = { ...updatedExports[index], year: e.target.value };
                              setFinancialData({ ...financialData, exportInformation: updatedExports });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{exportInfo.year || '-'}</p>
                        )}
                      </div>


                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].marketRegion}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={exportInfo.marketRegion || ''}
                            onChange={(e) => {
                              const updatedExports = [...financialData.exportInformation];
                              updatedExports[index] = { ...updatedExports[index], marketRegion: e.target.value };
                              setFinancialData({ ...financialData, exportInformation: updatedExports });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{exportInfo.marketRegion || '-'}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].country}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={exportInfo.country || ''}
                            onChange={(e) => {
                              const updatedExports = [...financialData.exportInformation];
                              updatedExports[index] = { ...updatedExports[index], country: e.target.value };
                              setFinancialData({ ...financialData, exportInformation: updatedExports });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{exportInfo.country || '-'}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].valueExported}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={exportInfo.valueExported || ''}
                            onChange={(e) => {
                              const updatedExports = [...financialData.exportInformation];
                              updatedExports[index] = { ...updatedExports[index], valueExported: e.target.value };
                              setFinancialData({ ...financialData, exportInformation: updatedExports });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{exportInfo.valueExported || '-'}</p>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].year}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              exportInformation: [{ year: e.target.value, marketRegion: '', country: '', valueExported: '', totalAmountExported: 0 }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].year}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].marketRegion}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              exportInformation: [{ year: '', marketRegion: e.target.value, country: '', valueExported: '', totalAmountExported: 0 }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].marketRegion}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].country}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              exportInformation: [{ year: '', marketRegion: '', country: e.target.value, valueExported: '', totalAmountExported: 0 }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].country}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].valueExported}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              exportInformation: [{ year: '', marketRegion: '', country: '', valueExported: e.target.value, totalAmountExported: 0 }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].valueExported}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                  </>
                )
                }
              </div>
            </div>

            {/* Owners */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].owners}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.owners.length > 0 ? (
                  financialData.owners.map((owner, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].ownerName}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={owner.name || ''}
                            onChange={(e) => {
                              const updatedOwners = [...financialData.owners];
                              updatedOwners[index] = { ...updatedOwners[index], name: e.target.value };
                              setFinancialData({ ...financialData, owners: updatedOwners });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{owner.name || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].ownerMobile}</p>
                        {isEditMode ? (
                          <input
                            type="tel"
                            value={owner.mobile || ''}
                            onChange={(e) => {
                              const updatedOwners = [...financialData.owners];
                              updatedOwners[index] = { ...updatedOwners[index], mobile: e.target.value };
                              setFinancialData({ ...financialData, owners: updatedOwners });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{owner.mobile || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].ownerTelephone}</p>
                        {isEditMode ? (
                          <input
                            type="tel"
                            value={owner.telephone || ''}
                            onChange={(e) => {
                              const updatedOwners = [...financialData.owners];
                              updatedOwners[index] = { ...updatedOwners[index], telephone: e.target.value };
                              setFinancialData({ ...financialData, owners: updatedOwners });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{owner.telephone || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].ownerEmail}</p>
                        {isEditMode ? (
                          <input
                            type="email"
                            value={owner.email || ''}
                            onChange={(e) => {
                              const updatedOwners = [...financialData.owners];
                              updatedOwners[index] = { ...updatedOwners[index], email: e.target.value };
                              setFinancialData({ ...financialData, owners: updatedOwners });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{owner.email || '-'}</p>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].ownerName}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              owners: [{ name: e.target.value, mobile: '', telephone: '', email: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].ownerName}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].ownerMobile}</p>
                      {isEditMode ? (
                        <input
                          type="tel"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              owners: [{ name: '', mobile: e.target.value, telephone: '', email: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].ownerMobile}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].ownerTelephone}</p>
                      {isEditMode ? (
                        <input
                          type="tel"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              owners: [{ name: '', mobile: '', telephone: e.target.value, email: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].ownerTelephone}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].ownerEmail}</p>
                      {isEditMode ? (
                        <input
                          type="email"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              owners: [{ name: '', mobile: '', telephone: '', email: e.target.value }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].ownerEmail}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Domestic Sales Details */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].domesticSalesDetails}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.domesticSalesDetails.length > 0 ? (
                  financialData.domesticSalesDetails.map((salesDetail, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].domesticSalesYear}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={salesDetail.year || ''}
                            onChange={(e) => {
                              const updatedSales = [...financialData.domesticSalesDetails];
                              updatedSales[index] = { ...updatedSales[index], year: e.target.value };
                              setFinancialData({ ...financialData, domesticSalesDetails: updatedSales });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{salesDetail.year || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].domesticSalesValue}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={salesDetail.value || ''}
                            onChange={(e) => {
                              const updatedSales = [...financialData.domesticSalesDetails];
                              updatedSales[index] = { ...updatedSales[index], value: e.target.value };
                              setFinancialData({ ...financialData, domesticSalesDetails: updatedSales });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{salesDetail.value || '-'}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{translations[language].totalRevenueYear}</p>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={salesDetail.totalRevenueYear || ''}
                            onChange={(e) => {
                              const updatedSales = [...financialData.domesticSalesDetails];
                              updatedSales[index] = { ...updatedSales[index], totalRevenueYear: e.target.value };
                              setFinancialData({ ...financialData, domesticSalesDetails: updatedSales });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="font-semibold">{salesDetail.totalRevenueYear || '-'}</p>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].domesticSalesYear}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              domesticSalesDetails: [{ year: e.target.value, value: '', totalRevenueYear: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].domesticSalesYear}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].domesticSalesValue}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              domesticSalesDetails: [{ year: '', value: e.target.value, totalRevenueYear: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].domesticSalesValue}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{translations[language].totalRevenueYear}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => {
                            setFinancialData({
                              ...financialData,
                              domesticSalesDetails: [{ year: '', value: '', totalRevenueYear: e.target.value }]
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={translations[language].totalRevenueYear}
                        />
                      ) : (
                        <p className="font-semibold">-</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].financialInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].fiscalCapital}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="fiscalCapital"
                      value={formData.fiscalCapital || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.fiscalCapital || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].annualRevenue}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="annualRevenue"
                      value={formData.annualRevenue || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.annualRevenue || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].export}</p>
                  {isEditMode ? (
                    <select
                      name="export"
                      value={formData.export || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{translations[language].select}</option>
                      <option value="Yes">{translations[language].yes}</option>
                      <option value="No">{translations[language].no}</option>
                    </select>
                  ) : (
                    <p className="font-semibold">{financialData.export || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].ownershipNationality}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="ownershipNationality"
                      value={formData.ownershipNationality || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.ownershipNationality || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].percentageEgyptianOwnership}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="percentageEgyptianOwnership"
                      value={formData.percentageEgyptianOwnership || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.percentageEgyptianOwnership || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].percentageNonEgyptianOwnership}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="percentageNonEgyptianOwnership"
                      value={formData.percentageNonEgyptianOwnership || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.percentageNonEgyptianOwnership || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].partnersNationalities}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="partnersNationalities"
                      value={formData.partnersNationalities || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.partnersNationalities || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].totalNumberOfEmployees}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="totalNoOfEmployees"
                      value={formData.totalNoOfEmployees || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.totalNoOfEmployees || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].yearOfEstablishment}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.yearOfEstablishment || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companySize}</p>
                  {isEditMode ? (
                    <select
                      name="companySize"
                      value={formData.companySize || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{translations[language].select}</option>
                      <option value="Small">{translations[language].small}</option>
                      <option value="Medium">{translations[language].medium}</option>
                      <option value="Large">{translations[language].large}</option>
                    </select>
                  ) : (
                    <p className="font-semibold">{financialData.companySize || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].typeOfOwnership}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="typeOfOwnership"
                      value={formData.typeOfOwnership || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.typeOfOwnership || '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].companyData}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="companyData"
                      value={formData.companyData || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.companyData || '-'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].additionalInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].keyTechnologies}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={financialData.keyTechnologies.join(', ') || ''}
                      onChange={(e) => {
                        const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                        setFinancialData({ ...financialData, keyTechnologies: technologies });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter technologies separated by commas"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.keyTechnologies.length > 0 ? financialData.keyTechnologies.join(', ') : '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].certificates}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={financialData.certificates.join(', ') || ''}
                      onChange={(e) => {
                        const certificates = e.target.value.split(',').map(cert => cert.trim()).filter(cert => cert);
                        setFinancialData({ ...financialData, certificates: certificates });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter certificates separated by commas"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.certificates.length > 0 ? financialData.certificates.join(', ') : '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].affiliation}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={financialData.affiliation.join(', ') || ''}
                      onChange={(e) => {
                        const affiliations = e.target.value.split(',').map(aff => aff.trim()).filter(aff => aff);
                        setFinancialData({ ...financialData, affiliation: affiliations });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter affiliations separated by commas"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.affiliation.length > 0 ? financialData.affiliation.join(', ') : '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].memberships}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={financialData.memberships.join(', ') || ''}
                      onChange={(e) => {
                        const memberships = e.target.value.split(',').map(mem => mem.trim()).filter(mem => mem);
                        setFinancialData({ ...financialData, memberships: memberships });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter memberships separated by commas"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.memberships.length > 0 ? financialData.memberships.join(', ') : '-'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{translations[language].partnerships}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={financialData.partnerships.join(', ') || ''}
                      onChange={(e) => {
                        const partnerships = e.target.value.split(',').map(part => part.trim()).filter(part => part);
                        setFinancialData({ ...financialData, partnerships: partnerships });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter partnerships separated by commas"
                    />
                  ) : (
                    <p className="font-semibold">{financialData.partnerships.length > 0 ? financialData.partnerships.join(', ') : '-'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

