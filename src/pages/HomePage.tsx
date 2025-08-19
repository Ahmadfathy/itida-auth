import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import Features from '../components/Features';
// import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Header onLogoClick={() => navigate('/')} /> */}
      <main>
        <Hero onRegister={() => navigate('/registration')} />
        <LoginForm 
          onForgotPassword={() => navigate('/forgot-password')}
          onRegister={() => navigate('/registration')}
        />
        <Features />
      </main>
      {/* <Footer onLogoClick={() => navigate('/')} /> */}
    </>
  );
};

export default HomePage;
