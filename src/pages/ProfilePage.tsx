import React, { useState } from 'react';
import { useLanguage, translations } from '../contexts/LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
}

const ProfilePage: React.FC = () => {
  const { language } = useLanguage();

  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const [financialData, setFinancialData] = useState<FinancialData>({
    fiscalCapital: '1000000 EGP',
    domesticSalesDetails: [{ year: '2023', value: '500000', totalRevenueYear: '500000' }],
    annualRevenue: '500000 EGP',
    auditedBalanceSheet: null,
    export: 'Yes',
    exportInformation: [{ year: '2023', marketRegion: 'Middle East', country: 'UAE', valueExported: '100000', totalAmountExported: 100000 }],
    ownershipNationality: 'Egyptian',
    percentageEgyptianOwnership: '100%',
    percentageNonEgyptianOwnership: '0%',
    partnersNationalities: 'Egyptian',
    totalNoOfEmployees: '50',
    yearOfEstablishment: '2010',
    companySize: 'Small',
    typeOfOwnership: 'Private',
    companyData: 'Technology Company',
    keyTechnologies: ['React', 'Node.js', 'Python'],
    affiliation: ['ITIDA'],
    memberships: ['Egyptian Software Association'],
    certificates: ['ISO 9001'],
    partnerships: ['Microsoft', 'Google'],
    products: [{ name: 'Dummy Product', description: 'A sample product for demonstration' }],
    services: [{ name: 'Dummy Service', description: 'A sample service for demonstration' }],
    customerReferences: [{ name: 'Client A', country: 'Egypt', projectSize: 'Medium', scope: 'Web Development', industriesSector: 'Technology', description: 'Successful project delivery' }],
    companyClassification: [{ companyClassification: 'Technology', subClassification: 'Software' }],
    owners: [{ name: 'John Doe', mobile: '01234567890', telephone: '02-12345678', email: 'john.doe@dummycompany.com' }]
  });

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
                alt="Company Logo"
                className="border w-24 h-24 rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2 mb-6">
                <span>Dummy Company Name</span>
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
              <div className="text-gray-500 flex space-x-4 mt-1 text-sm">
                <div className='grid grid-cols-2 gap-3'>

                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                    <span>123456789</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c4.418 0 8 3.582 8 8 0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3 0-4.418 3.582-8 8-8z"
                      />
                    </svg>
                    <span>Cairo, Egypt</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9 6 9-6" />
                    </svg>
                    <span>info@dummycompany.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.58 6.58l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68a2 2 0 011.72 2z"
                      />
                    </svg>
                    <span>01234567890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-400 mb-1">Profile Completion</p>
              <div className="w-48 bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '50%' }}>
                  <p className="text-xs text-white px-3 text-end">50%</p>
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-2">
              <button className="btn-primary px-6 py-2">Export PDF</button>
            </div> */}
          </div>
        </div>

        {/* Alerts Section */}
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">
              There was an error processing your profile.{' '}
              <a href="#" className="underline font-semibold text-red-700 hover:text-red-900">
                complete it
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-red-500"
              onClick={() => setShowError(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}
        {showWarning && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Warning! </strong>
            <span className="block sm:inline">
              Your profile is 50% complete.{' '}
              <a href="#" className="underline font-semibold text-yellow-700 hover:text-yellow-900">
                complete it
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-yellow-500"
              onClick={() => setShowWarning(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}
        {showInfo && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Info! </strong>
            <span className="block sm:inline">
              Keep your profile updated for better opportunities.{' '}
              <a href="#" className="underline font-semibold text-blue-700 hover:text-blue-900">
                complete it
              </a>
            </span>
            <button
              type="button"
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-blue-500"
              onClick={() => setShowInfo(false)}
            >
              <svg className="fill-current h-4 w-4" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        )}

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow mt-6">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Profile Details</h2>
            <div className='flex gap-3'>
              <button className="btn-primary px-4 py-2">Edit Profile</button>
              <button className="btn-primary px-6 py-2" onClick={exportPDF}>Export PDF</button>
            </div>
          </div>
          <div id="profile-details-section" className="space-y-8 text-gray-600  p-6">
            {/* Company Legal Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyLegalInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].companyNameEnglish}</p>
                  <p className="font-semibold">Dummy Company Name English</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].companyNameArabic}</p>
                  <p className="font-semibold">اسم الشركة الوهمي</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].commercialDenomination}</p>
                  <p className="font-semibold">Dummy Commercial Denomination</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].legalType}</p>
                  <p className="font-semibold">LLC</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].companyClassification}</p>
                  <p className="font-semibold">Technology</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].commercialRegistryNumber}</p>
                  <p className="font-semibold">123456789</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].unifiedCommercialRegistryNumber}</p>
                  <p className="font-semibold">987654321</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].taxRegistryNumber}</p>
                  <p className="font-semibold">456789123</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].commercialRegistrationDate}</p>
                  <p className="font-semibold">01/01/2010</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].officialCompanyEmail}</p>
                  <p className="font-semibold">official@dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].yearOfEstablishment}</p>
                  <p className="font-semibold">2010</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].contactInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].governorate}</p>
                  <p className="font-semibold">Cairo</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].districtCity}</p>
                  <p className="font-semibold">Nasr City</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].streetAddress}</p>
                  <p className="font-semibold">123 Dummy Street</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].companyWebsiteUrl}</p>
                  <p className="font-semibold">www.dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].officialEmail}</p>
                  <p className="font-semibold">contact@dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].phoneMobile}</p>
                  <p className="font-semibold">01234567890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].name}</p>
                  <p className="font-semibold">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].title}</p>
                  <p className="font-semibold">CEO</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].mobile}</p>
                  <p className="font-semibold">01234567890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].nationalId}</p>
                  <p className="font-semibold">12345678901234</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].email}</p>
                  <p className="font-semibold">john.doe@dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].requestApplicant}</p>
                  <p className="font-semibold">Yes</p>
                </div>
              </div>
            </div>

            {/* Company Branches */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyBranchesTitle}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchName}</p>
                  <p className="font-semibold">Dummy Branch</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchCountry}</p>
                  <p className="font-semibold">Egypt</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchGovernorate}</p>
                  <p className="font-semibold">Cairo</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchCity}</p>
                  <p className="font-semibold">Alexandria</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchDistrict}</p>
                  <p className="font-semibold">Downtown</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].branchEmail}</p>
                  <p className="font-semibold">branch@dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mobile Phone</p>
                  <p className="font-semibold">01987654321</p>
                </div>
              </div>
            </div>

            {/* Activities & Attachments */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].activitiesAttachments}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].softwareDesignServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].itSystemsServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].trustServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].websitesPlatformsServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].electronicsEmbeddedServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].contentDigitizationServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].callCenterBusinessServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].consultingResearchServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].trainingLearningServices}</p>
                  <p className="font-semibold">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].commercialRegisterImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].taxCardImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].nationalIdImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].investmentGazetteImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].declarationUndertakingImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].representativeAuthorizationImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].representativeNationalIdImage}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].licenseReceipt}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].methodOfLicenseReceipt}</p>
                  <p className="font-semibold">Available</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].declarationAgreement}</p>
                  <p className="font-semibold">Available</p>
                </div>
              </div>
            </div>

            {/* Company Head Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].companyHead}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].name}</p>
                  <p className="font-semibold">Jane Smith</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].title}</p>
                  <p className="font-semibold">CTO</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].mobile}</p>
                  <p className="font-semibold">01123456789</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].nationalId}</p>
                  <p className="font-semibold">98765432109876</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].email}</p>
                  <p className="font-semibold">jane.smith@dummycompany.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email 2</p>
                  <p className="font-semibold">jane.smith2@dummycompany.com</p>
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div>
              <h3 className="text-md font-semibold mb-4">Contact Persons</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">{translations[language].name}</p>
                  <p className="font-semibold">Alex Johnson</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].title}</p>
                  <p className="font-semibold">Manager</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].mobile}</p>
                  <p className="font-semibold">01987654321</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].nationalId}</p>
                  <p className="font-semibold">12345678901234</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{translations[language].email}</p>
                  <p className="font-semibold">alex.johnson@dummycompany.com</p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-md font-semibold mb-4">Products</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.products.length > 0 ? (
                  financialData.products.map((product, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400">Product Name</p>
                      <p className="font-semibold">{product.name || '-'}</p>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="font-semibold">{product.description || '-'}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Product Name</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Description</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-md font-semibold mb-4">Services</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.services.length > 0 ? (
                  financialData.services.map((service, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400">Service Name</p>
                      <p className="font-semibold">{service.name || '-'}</p>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="font-semibold">{service.description || '-'}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Service Name</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Description</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer References */}
            <div>
              <h3 className="text-md font-semibold mb-4">Customer References</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.customerReferences.length > 0 ? (
                  financialData.customerReferences.map((ref, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-semibold">{ref.name || '-'}</p>
                      <p className="text-sm text-gray-400">Country</p>
                      <p className="font-semibold">{ref.country || '-'}</p>
                      <p className="text-sm text-gray-400">Project Size</p>
                      <p className="font-semibold">{ref.projectSize || '-'}</p>
                      <p className="text-sm text-gray-400">Scope</p>
                      <p className="font-semibold">{ref.scope || '-'}</p>
                      <p className="text-sm text-gray-400">Industries Sector</p>
                      <p className="font-semibold">{ref.industriesSector || '-'}</p>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="font-semibold">{ref.description || '-'}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Country</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Project Size</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Scope</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Industries Sector</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Description</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Export Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">Export Information</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.exportInformation.length > 0 ? (
                  financialData.exportInformation.map((exportInfo, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400">Year</p>
                      <p className="font-semibold">{exportInfo.year || '-'}</p>
                      <p className="text-sm text-gray-400">Market Region</p>
                      <p className="font-semibold">{exportInfo.marketRegion || '-'}</p>
                      <p className="text-sm text-gray-400">Country</p>
                      <p className="font-semibold">{exportInfo.country || '-'}</p>
                      <p className="text-sm text-gray-400">Value Exported</p>
                      <p className="font-semibold">{exportInfo.valueExported || '-'}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Year</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Market Region</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Country</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Value Exported</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Owners */}
            <div>
              <h3 className="text-md font-semibold mb-4">Owners</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.owners.length > 0 ? (
                  financialData.owners.map((owner, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="font-semibold">{owner.name || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Mobile</p>
                        <p className="font-semibold">{owner.mobile || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Telephone</p>
                        <p className="font-semibold">{owner.telephone || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold">{owner.email || '-'}</p>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mobile</p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Telephone</p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-semibold">-</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Domestic Sales Details */}
            <div>
              <h3 className="text-md font-semibold mb-4">Domestic Sales Details</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {financialData.domesticSalesDetails.length > 0 ? (
                  financialData.domesticSalesDetails.map((salesDetail, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-400">Year</p>
                      <p className="font-semibold">{salesDetail.year || '-'}</p>
                      <p className="text-sm text-gray-400">Value</p>
                      <p className="font-semibold">{salesDetail.value || '-'}</p>
                      <p className="text-sm text-gray-400">Total Revenue Year</p>
                      <p className="font-semibold">{salesDetail.totalRevenueYear || '-'}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">Year</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Value</p>
                    <p className="font-semibold">-</p>
                    <p className="text-sm text-gray-400">Total Revenue Year</p>
                    <p className="font-semibold">-</p>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">{translations[language].financialInformation}</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Fiscal Capital</p>
                  <p className="font-semibold">{financialData.fiscalCapital || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Domestic Sales Value</p>
                  <p className="font-semibold">
                    {financialData.domesticSalesDetails.length > 0
                      ? financialData.domesticSalesDetails.reduce((acc, cur) => acc + Number(cur.value || 0), 0)
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Revenue Year</p>
                  <p className="font-semibold">
                    {financialData.domesticSalesDetails.length > 0
                      ? financialData.domesticSalesDetails[0].totalRevenueYear || '-'
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Annual Revenue</p>
                  <p className="font-semibold">{financialData.annualRevenue || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Audited Balance Sheet</p>
                  <p className="font-semibold">{financialData.auditedBalanceSheet ? financialData.auditedBalanceSheet.name : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Export</p>
                  <p className="font-semibold">{financialData.export || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ownership Nationality</p>
                  <p className="font-semibold">{financialData.ownershipNationality || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Percentage Egyptian Ownership</p>
                  <p className="font-semibold">{financialData.percentageEgyptianOwnership || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Percentage Non-Egyptian Ownership</p>
                  <p className="font-semibold">{financialData.percentageNonEgyptianOwnership || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Partners Nationalities</p>
                  <p className="font-semibold">{financialData.partnersNationalities || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Number of Employees</p>
                  <p className="font-semibold">{financialData.totalNoOfEmployees || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Year of Establishment</p>
                  <p className="font-semibold">{financialData.yearOfEstablishment || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Company Size</p>
                  <p className="font-semibold">{financialData.companySize || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type of Ownership</p>
                  <p className="font-semibold">{financialData.typeOfOwnership || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Company Data</p>
                  <p className="font-semibold">{financialData.companyData || '-'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">Additional Information</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Key Technologies</p>
                  <p className="font-semibold">{financialData.keyTechnologies.length > 0 ? financialData.keyTechnologies.join(', ') : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Certificates</p>
                  <p className="font-semibold">{financialData.certificates.length > 0 ? financialData.certificates.join(', ') : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Affiliation</p>
                  <p className="font-semibold">{financialData.affiliation.length > 0 ? financialData.affiliation.join(', ') : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Memberships</p>
                  <p className="font-semibold">{financialData.memberships.length > 0 ? financialData.memberships.join(', ') : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Partnerships</p>
                  <p className="font-semibold">{financialData.partnerships.length > 0 ? financialData.partnerships.join(', ') : '-'}</p>
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
