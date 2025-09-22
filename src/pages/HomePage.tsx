import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import AdditionalBenefits from '../components/AdditionalBenefits';
import ComprehensiveDataTest from '../components/ComprehensiveDataTest';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import LoginTestComponent from '../components/LoginTestComponent';
import Services from '../components/Services';
// import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const loginRef = useRef<HTMLDivElement>(null);

  const scrollToLogin = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = () => {
    navigate('/registration')
  }

  return (
    <>
      {/* <Header onLogoClick={() => navigate('/')} /> */}
      <main>
        <Hero onRegister={() => navigate('/registration')} onLogin={scrollToLogin} />
        <div ref={loginRef}>
          <LoginForm
            onForgotPassword={() => navigate('/forgot-password')}
            onRegister={() => navigate('/registration')}
          />
        </div>
        <AdditionalBenefits onRegister={handleRegister} />
        <Services />
        <div className="container mx-auto px-4 py-8 space-y-8">
          <ComprehensiveDataTest />
          <LoginTestComponent />
        </div>
      </main>
      {/* <Footer onLogoClick={() => navigate('/')} /> */}
    </>
  );
};

export default HomePage;
