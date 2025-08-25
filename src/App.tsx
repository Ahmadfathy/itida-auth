import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageContext, getInitialLanguage, saveLanguageToStorage } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import CompanyLegalPage from './pages/CompanyLegalPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export type Language = 'en' | 'ar';

function App() {
  const [language, setLanguage] = React.useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    saveLanguageToStorage(newLanguage);
    document.documentElement.dir = newLanguage === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = newLanguage === 'en' ? 'en' : 'ar';
  };

  // Set initial HTML attributes based on saved language
  React.useEffect(() => {
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = language === 'en' ? 'en' : 'ar';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="registration" element={<CompanyLegalPage />} />
            <Route path="registration/details" element={<RegistrationPage onBackToHome={() => window.location.href = '/'} />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
