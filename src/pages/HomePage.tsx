import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import Features from '../components/Features';
// import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const loginRef = useRef<HTMLDivElement>(null);

  const scrollToLogin = () => {
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <Features />
      </main>
      {/* <Footer onLogoClick={() => navigate('/')} /> */}
    </>
  );
};

export default HomePage;
