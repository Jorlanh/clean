
import React from 'react';
import { User } from '../types';
import { 
  Activity, 
  Database, 
  Search, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  PieChart,
  Clock
} from 'lucide-react';
import Mascot from './Mascot';

interface MetricsProps {
  user: User;
}

const Metrics: React.FC<MetricsProps> = ({ user }) => {
  
  // Atualizado: Métricas refletindo o estado real solicitado (Apenas Master ativo)
  const globalStats = {
    activeUsers: 1, // Apenas o Master
    totalSystemExtractions: user.stats.totalRecordsExtracted, // Total real extraído
    totalSystemRevenue: 0.00, // Sem assinantes pagos no momento
    serverStatus: 'Online'
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
           <Mascot variant="full" size={300} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Activity size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Painel de Métricas</h1>
              <p className="text-slate-400">Acompanhe o desempenho das suas minerações.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* User Personal Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-600" /> Minhas Estatísticas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Credits Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Créditos Disponíveis</p>
                <h3 className="text-3xl font-black text-slate-900">{user.credits}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <Database size={24} />
              </div>
            </div>

            {/* Extractions Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Registros Extraídos</p>
                <h3 className="text-3xl font-black text-slate-900">{user.stats.totalRecordsExtracted}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <TrendingUp size={24} />
              </div>
            </div>

            {/* Searches Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Consultas Realizadas</p>
                <h3 className="text-3xl font-black text-slate-900">{user.stats.totalSearches}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Search size={24} />
              </div>
            </div>

             {/* Member Since Card */}
             <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-slate-500 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">Membro Desde</p>
                <h3 className="text-lg font-bold text-slate-900">{user.stats.joinDate}</h3>
              </div>
              <div className="bg-slate-100 p-3 rounded-full text-slate-600">
                <Calendar size={24} />
              </div>
            </div>

          </div>
        </div>

        {/* Master Admin View */}
        {user.role === 'master' && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <PieChart size={20} className="text-purple-600" /> Visão Geral do Sistema (Master)
              </h2>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">ADMINISTRADOR</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card Usuários Ativos */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Usuários Ativos</p>
                    <h3 className="text-4xl font-bold mt-1">{globalStats.activeUsers}</h3>
                  </div>
                  <Users size={28} className="opacity-80" />
                </div>
                <div className="w-full bg-blue-900/30 h-1 rounded-full overflow-hidden">
                  {/* Full width since it's only 1 user */}
                  <div className="bg-white/50 h-full w-full"></div>
                </div>
                <p className="text-xs text-blue-100 mt-2">Apenas administrador</p>
              </div>

              {/* Card Total de Extrações da Plataforma */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-300 text-sm font-medium">Total de Precatórios Extraídos</p>
                    <h3 className="text-4xl font-bold mt-1">{globalStats.totalSystemExtractions}</h3>
                  </div>
                  <Database size={28} className="opacity-80" />
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-full"></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Soma total da plataforma</p>
              </div>

              {/* Card Faturamento */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase">Faturamento Estimado</p>
                    <h3 className="text-3xl font-black text-green-600 mt-1">
                      R$ {globalStats.totalSystemRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <DollarSign size={24} />
                  </div>
                </div>
                <p className="text-xs text-slate-500">Sem assinaturas ativas.</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Section (Empty State) */}
        <div className="mt-8 bg-white rounded-xl shadow-md border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Histórico Recente</h3>
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="bg-slate-100 p-4 rounded-full mb-3">
               <Clock size={32} />
            </div>
            <p className="text-sm font-medium">Nenhuma atividade recente registrada.</p>
            <p className="text-xs">Suas extrações e consultas aparecerão aqui.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Metrics;
