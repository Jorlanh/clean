
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Mining from './components/Mining';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Metrics from './components/Metrics';
import Affiliates from './components/Affiliates';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import { User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleNavigate = (page: string) => {
    if (page === 'contact') {
      // Scroll to footer/contact section or show a modal
      // For this implementation, we will navigate to Home and scroll to contact
      setCurrentPage('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (page === 'faq') {
       setCurrentPage('home');
       setTimeout(() => {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentPage(page);
    }
  };

  // Protected route check logic
  useEffect(() => {
    if ((currentPage === 'mining' || currentPage === 'metrics') && !user) {
      // Redirect to Login for restricted pages
      setCurrentPage('login');
    }
  }, [currentPage, user]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'mining':
        return user ? <Mining user={user} updateUser={updateUser} /> : <Login onLogin={handleLogin} />;
      case 'metrics':
        return user ? <Metrics user={user} /> : <Login onLogin={handleLogin} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'affiliates':
        return <Affiliates />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfUse onNavigate={handleNavigate} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900">
      <Header 
        user={user} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
        currentPage={currentPage}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
