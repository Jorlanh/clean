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

  // CORREÇÃO: Recupera o utilizador ao carregar para evitar deslogar no F5
  useEffect(() => {
    const savedUser = localStorage.getItem('miner_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('miner_user');
      }
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('miner_user');
    setUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    // Proteção de rotas: se tentar ir para mining/metrics sem login, vai para o login
    if ((currentPage === 'mining' || currentPage === 'metrics') && !user) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'mining': return user ? <Mining user={user} updateUser={setUser} /> : <Login onLogin={handleLogin} />;
      case 'metrics': return user ? <Metrics user={user} /> : <Login onLogin={handleLogin} />;
      case 'pricing': return <Pricing onNavigate={handleNavigate} />;
      case 'affiliates': return <Affiliates />;
      case 'privacy': return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'terms': return <TermsOfUse onNavigate={handleNavigate} />;
      case 'login': return <Login onLogin={handleLogin} />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} currentPage={currentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;