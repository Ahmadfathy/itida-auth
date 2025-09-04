import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';


const ProfilePage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
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
                <div className='grid grid-cols-3 gap-3'>

                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>SF, Bay Area</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12h.01M12 12h.01M8 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>max@kt.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>SF, Bay Area</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12h.01M12 12h.01M8 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>max@kt.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>SF, Bay Area</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12h.01M12 12h.01M8 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>max@kt.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-400 mb-1">Profile Completion</p>
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">50%</p>
            </div>
            <div className="flex space-x-2">
              <button className="btn-primary px-6 py-2">Export PDF</button>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg shadow mt-6 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Profile Details</h2>
            <button className="btn-primary px-4 py-2">Edit Profile</button>
          </div>
          <div className="space-y-8 text-gray-600">
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
