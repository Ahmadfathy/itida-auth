import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const dashboardStats = [
    {
      title: language === 'en' ? 'Total Companies' : 'إجمالي الشركات',
      value: '1,234',
      icon: '🏢',
      color: 'bg-blue-500'
    },
    {
      title: language === 'en' ? 'Active Registrations' : 'التسجيلات النشطة',
      value: '567',
      icon: '📋',
      color: 'bg-green-500'
    },
    {
      title: language === 'en' ? 'Pending Approvals' : 'الموافقات المعلقة',
      value: '89',
      icon: '⏳',
      color: 'bg-yellow-500'
    },
    {
      title: language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات',
      value: 'EGP 2.5M',
      icon: '💰',
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      company: 'Tech Solutions Ltd',
      action: language === 'en' ? 'Submitted registration' : 'قدم طلب تسجيل',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      company: 'Digital Innovations Inc',
      action: language === 'en' ? 'Updated profile' : 'حدث الملف الشخصي',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      company: 'Smart Systems Co',
      action: language === 'en' ? 'Uploaded documents' : 'رفع المستندات',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'en' ? 'Welcome to your ITIDA dashboard' : 'مرحباً بك في لوحة تحكم ITIDA'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'en' ? 'Recent Activities' : 'الأنشطة الأخيرة'}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {activity.status === 'completed' ? '✓' : '⏳'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.company}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/registration')}
                    className="w-full bg-itida-blue hover:bg-itida-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {language === 'en' ? '+ New Registration' : '+ تسجيل جديد'}
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                    {language === 'en' ? 'View Reports' : 'عرض التقارير'}
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                    {language === 'en' ? 'Manage Users' : 'إدارة المستخدمين'}
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                    {language === 'en' ? 'Settings' : 'الإعدادات'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section Placeholder */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Analytics Overview' : 'نظرة عامة على التحليلات'}
            </h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                {language === 'en' ? 'Charts and analytics will be displayed here' : 'سيتم عرض الرسوم البيانية والتحليلات هنا'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
