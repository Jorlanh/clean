import React, { useState } from 'react';
import { User } from '../types';
import { loginUser } from '../services/precatorioService';
import { Lock, Mail, Loader2 } from 'lucide-react';
import Mascot from './Mascot';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await loginUser(email, password);
      onLogin(userData); // Atualiza o estado no App.tsx e redireciona
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <Mascot variant="full" size={100} />
          <h2 className="text-2xl font-bold text-slate-900 mt-4">Login Miner</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">{error}</div>}
          <input 
             type="email" placeholder="Email" required
             className="w-full border p-3 rounded-lg text-slate-900 bg-white"
             value={email} onChange={e => setEmail(e.target.value)} 
          />
          <input 
             type="password" placeholder="Senha" required
             className="w-full border p-3 rounded-lg text-slate-900 bg-white"
             value={password} onChange={e => setPassword(e.target.value)} 
          />
          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;