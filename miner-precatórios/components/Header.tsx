
import React from 'react';
import { Menu, X, LogOut, User as UserIcon, PieChart, HelpCircle } from 'lucide-react';
import { User } from '../types';
import Mascot from './Mascot';

interface HeaderProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Updated navItems with 'FAQ'
  const navItems = [
    { label: 'Mineração', value: 'mining' },
    { label: 'Preços', value: 'pricing' },
    { label: 'Afiliados', value: 'affiliates' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Contato', value: 'contact' },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Clickable to Home */}
        <div 
          className="text-xl md:text-2xl font-bold cursor-pointer flex items-center gap-3 hover:opacity-90 transition-opacity"
          onClick={() => handleNav('home')}
          title="Voltar para o Início"
        >
          <div className="bg-slate-800 p-1 rounded-full border border-slate-700">
            <Mascot variant="logo" size={42} />
          </div>
          <span className="tracking-tight hidden sm:inline">Miner Precatórios</span>
          <span className="tracking-tight sm:hidden">Miner</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNav(item.value)}
              className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                currentPage === item.value ? 'text-yellow-400 font-bold' : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}

          {user && (
            <button
              onClick={() => handleNav('metrics')}
              className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-blue-500 ${
                currentPage === 'metrics' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'
              }`}
            >
              <PieChart size={16} /> Métricas
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4 ml-2 border-l border-slate-700 pl-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-yellow-400">
                  <UserIcon size={16} />
                </div>
                <div className="text-xs hidden lg:block">
                  <div className="font-bold text-white">{user.name}</div>
                  <div className="text-slate-400">{user.role === 'master' ? 'Administrador' : 'Usuário'}</div>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-slate-800 rounded-full text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="ml-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 absolute w-full">
          <div className="flex flex-col p-4 gap-4 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`text-left text-base font-medium py-2 ${
                  currentPage === item.value ? 'text-yellow-400' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user && (
               <button
                onClick={() => handleNav('metrics')}
                className={`text-left text-base font-bold py-2 flex items-center gap-2 ${
                  currentPage === 'metrics' ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                <PieChart size={18} /> Métricas
              </button>
            )}

            {user ? (
              <div className="border-t border-slate-700 pt-4 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300">Olá, {user.name}</span>
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-400 capitalize">{user.role}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-900/30 text-red-400 py-2 rounded-lg"
                >
                  <LogOut size={18} /> Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="bg-yellow-500 text-slate-900 py-3 rounded-lg font-bold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
