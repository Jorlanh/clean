
import React, { useState } from 'react';
import { User } from '../types';
import { Lock, Mail } from 'lucide-react';
import Mascot from './Mascot';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const today = new Date().toLocaleDateString('pt-BR');

    // Check Master Credentials
    if (email === 'sachabm@gmail.com' && password === 'Sb7548$') {
      onLogin({
        email: email,
        name: 'Sacha Master',
        role: 'master',
        credits: 99999,
        stats: {
          totalSearches: 0,
          totalRecordsExtracted: 0,
          joinDate: today
        }
      });
    } else if (email && password) {
      // Generic User Login Simulation
      onLogin({
        email: email,
        name: email.split('@')[0],
        role: 'user',
        credits: 1000, // Start with 1000 credits (Plan 3 Months default)
        stats: {
          totalSearches: 0,
          totalRecordsExtracted: 0,
          joinDate: today
        }
      });
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleGoogleLogin = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    // Simulation of Google Login
    onLogin({
      email: 'usuario_google@gmail.com',
      name: 'Usuário Google',
      role: 'user',
      credits: 1000,
      stats: {
        totalSearches: 0,
        totalRecordsExtracted: 0,
        joinDate: today
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        
        {/* Decorative circle bg */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-yellow-50 rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="mx-auto mb-4 flex justify-center">
            <Mascot variant="full" size={100} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta!</h2>
          <p className="text-slate-500">Entre para acessar suas minerações.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="********"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Ou continue com</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="mt-6 w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="text-blue-500"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="text-green-500"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                className="text-yellow-500"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="text-red-500"
              />
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
