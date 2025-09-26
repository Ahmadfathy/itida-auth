import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header onLogoClick={handleLogoClick} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer onLogoClick={handleLogoClick} />
    </div>
  );
};

export default Layout;
