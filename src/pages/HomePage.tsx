import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import Services from '../components/Services';
import AdditionalBenefits from '../components/AdditionalBenefits'
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
      </main>
      {/* <Footer onLogoClick={() => navigate('/')} /> */}
    </>
  );
};

export default HomePage;
