import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ProfilePage: React.FC = () => {
  const { language } = useLanguage();

  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

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
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
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

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
                <span>Company Name Here</span>
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
                    <span>45646454</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c4.418 0 8 3.582 8 8 0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3 0-4.418 3.582-8 8-8z"
                      />
                    </svg>
                    <span>location here</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} stroke="currentColor" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9 6 9-6" />
                    </svg>
                    <span>max@kt.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.58 6.58l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68a2 2 0 011.72 2z"
                      />
                    </svg>
                    <span>01236547890</span>
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
            {/* Company Head Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">Company Head Information</h3>
              <div className="grid md:grid-cols-6 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Full Name</p>
                  <p className="font-semibold">Max Smith</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Position</p>
                  <p className="font-semibold">CEO</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nationality</p>
                  <p className="font-semibold">Egyptian</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">ID/Passport Number</p>
                  <p className="font-semibold">123456789</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold">max.smith@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone Number</p>
                  <p className="font-semibold">+20 123 456 7890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mobile Number</p>
                  <p className="font-semibold">+20 987 654 3210</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Appointment Date</p>
                  <p className="font-semibold">2023-01-01</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ownership Percentage (%)</p>
                  <p className="font-semibold">50%</p>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3 className="text-md font-semibold mb-4">Financial Information</h3>
              <div className="grid md:grid-cols-6 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Authorized Capital (EGP)</p>
                  <p className="font-semibold">1,000,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Issued Capital (EGP)</p>
                  <p className="font-semibold">800,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Paid-up Capital (EGP)</p>
                  <p className="font-semibold">750,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bank Name</p>
                  <p className="font-semibold">National Bank</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bank Branch</p>
                  <p className="font-semibold">Downtown</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Number</p>
                  <p className="font-semibold">1234567890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">IBAN Number</p>
                  <p className="font-semibold">EG12345678901234567890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Financial Year Start</p>
                  <p className="font-semibold">January</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Financial Year End</p>
                  <p className="font-semibold">December</p>
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
