
import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Send, 
  Lock, 
  Copy, 
  Check, 
  BarChart3, 
  Wallet, 
  ArrowUpRight,
  LogOut,
  PieChart,
  CreditCard,
  Target
} from 'lucide-react';
import Mascot from './Mascot';

const Affiliates: React.FC = () => {
  // State for authentication simulation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for dashboard interactions
  const [copied, setCopied] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        setIsLoggedIn(true);
      } else {
        alert("Por favor, preencha email e senha.");
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://minerprecatorios.com.br/?ref=parceiro_123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- DASHBOARD VIEW (LOGGED IN) ---
  if (isLoggedIn) {
    return (
      <div className="bg-slate-50 min-h-screen pb-12">
        {/* Dashboard Header */}
        <div className="bg-slate-900 text-white py-8 border-b border-slate-800">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="bg-yellow-500 p-2 rounded-lg text-slate-900">
                 <Mascot variant="logo" size={24} />
               </div>
               <div>
                 <h1 className="text-xl font-bold">Painel do Afiliado</h1>
                 <p className="text-xs text-slate-400">Nível: <span className="text-yellow-400 font-bold">Ouro (20% de comissão)</span></p>
               </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-4">
          
          {/* Link Generator Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <Target className="text-blue-600" size={18} /> Seu Link de Rastreamento
              </label>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Ativo</span>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-grow bg-slate-100 border border-slate-300 rounded-lg px-4 py-3 text-slate-600 font-mono text-sm flex items-center">
                https://minerprecatorios.com.br/?ref=parceiro_123
              </div>
              <button 
                onClick={copyLink}
                className={`px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copiado!' : 'Copiar Link'}
              </button>
            </div>
          </div>

          {/* Financial KPI Cards */}
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <TrendingUp size={20} /> Métricas Financeiras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Saldo Disponível */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Saldo para Saque</p>
                <div className="bg-green-100 p-1.5 rounded text-green-600"><Wallet size={16} /></div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">R$ 1.450,00</h3>
              <button className="mt-3 text-xs font-bold text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition-colors w-full">
                Solicitar Pagamento
              </button>
            </div>

            {/* Ganhos Totais */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Comissões Totais</p>
                <div className="bg-blue-100 p-1.5 rounded text-blue-600"><DollarSign size={16} /></div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">R$ 5.890,00</h3>
              <p className="text-xs text-green-600 flex items-center mt-1 font-bold">
                <ArrowUpRight size={12} /> +15% este mês
              </p>
            </div>

            {/* Conversões */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Vendas Confirmadas</p>
                <div className="bg-purple-100 p-1.5 rounded text-purple-600"><Check size={16} /></div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">42</h3>
              <p className="text-xs text-slate-500 mt-1">Taxa de Conversão: <span className="text-slate-900 font-bold">3.8%</span></p>
            </div>

            {/* Cliques */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Tráfego (Cliques)</p>
                <div className="bg-yellow-100 p-1.5 rounded text-yellow-600"><BarChart3 size={16} /></div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">1.205</h3>
              <p className="text-xs text-slate-500 mt-1">CTR do Link: <span className="text-slate-900 font-bold">12%</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Earnings Breakdown (Visual) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <PieChart size={18} className="text-slate-500" /> Origem das Comissões
               </h3>
               
               <div className="space-y-6">
                 {/* Item 1 */}
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Plano Anual</span>
                     <span className="font-bold text-slate-900">R$ 3.500 (60%)</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                     <div className="bg-yellow-500 h-full rounded-full" style={{ width: '60%' }}></div>
                   </div>
                 </div>

                 {/* Item 2 */}
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Plano Semestral</span>
                     <span className="font-bold text-slate-900">R$ 1.760 (30%)</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                     <div className="bg-blue-500 h-full rounded-full" style={{ width: '30%' }}></div>
                   </div>
                 </div>

                 {/* Item 3 */}
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Plano Mensal</span>
                     <span className="font-bold text-slate-900">R$ 630 (10%)</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                     <div className="bg-slate-500 h-full rounded-full" style={{ width: '10%' }}></div>
                   </div>
                 </div>
               </div>

               <div className="mt-8 pt-6 border-t border-slate-100">
                 <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Evolução Mensal</h4>
                 <div className="flex items-end justify-between gap-2 h-24">
                    {[30, 45, 35, 60, 50, 75, 90].map((h, i) => (
                      <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700"
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Nov</span>
                    <span>Dez</span>
                    <span>Jan</span>
                    <span>Fev</span>
                    <span>Mar</span>
                    <span>Abr</span>
                    <span>Mai</span>
                 </div>
               </div>
            </div>

            {/* Detailed Transaction Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard size={18} className="text-slate-500" /> Últimas Comissões Geradas
                </h3>
                <button className="text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-full">
                  Ver Histórico Completo
                </button>
              </div>
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white text-slate-500 uppercase text-xs border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Data</th>
                      <th className="px-6 py-3 font-semibold">Descrição</th>
                      <th className="px-6 py-3 font-semibold">Valor Venda</th>
                      <th className="px-6 py-3 font-semibold text-right">Sua Comissão</th>
                      <th className="px-6 py-3 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">24/05/2024</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">Assinatura Anual</div>
                        <div className="text-xs text-slate-500">Ref: user_902</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">R$ 2.200,00</td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-green-600">+ R$ 440,00</div>
                        <div className="text-xs text-slate-400">20%</div>
                      </td>
                      <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Disponível</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">23/05/2024</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">Assinatura Semestral</div>
                        <div className="text-xs text-slate-500">Ref: user_885</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">R$ 2.700,00</td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-green-600">+ R$ 270,00</div>
                        <div className="text-xs text-slate-400">10%</div>
                      </td>
                      <td className="px-6 py-4 text-center"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Em Análise</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">20/05/2024</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">Assinatura Mensal</div>
                        <div className="text-xs text-slate-500">Ref: user_810</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">R$ 3.900,00</td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-green-600">+ R$ 390,00</div>
                        <div className="text-xs text-slate-400">10%</div>
                      </td>
                      <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Disponível</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">18/05/2024</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">Assinatura Anual</div>
                        <div className="text-xs text-slate-500">Ref: user_755</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">R$ 2.200,00</td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-green-600">+ R$ 440,00</div>
                        <div className="text-xs text-slate-400">20%</div>
                      </td>
                      <td className="px-6 py-4 text-center"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">Pago</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE VIEW (NOT LOGGED IN) ---
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section with Login Form */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
           <Mascot variant="full" size={400} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-yellow-500 text-slate-900 rounded-full text-sm font-bold mb-6">
                Programa de Parceria
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Lucre indicando o <span className="text-yellow-400">Miner Precatórios</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Torne-se um afiliado e ganhe comissões recorrentes por cada assinatura. Acompanhe seus ganhos em tempo real no nosso painel exclusivo.
              </p>
              
              <div className="flex gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="text-green-400" /> Pagamento Mensal
                </div>
                <div className="flex items-center gap-2">
                   <Check className="text-green-400" /> Dashboard Completo
                </div>
              </div>
            </div>

            {/* Login Box */}
            <div className="lg:w-1/3 w-full bg-white rounded-xl shadow-2xl p-8 text-slate-900">
              <h3 className="text-2xl font-bold mb-2">Área do Afiliado</h3>
              <p className="text-slate-500 mb-6 text-sm">Faça login para ver seus ganhos.</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="seu@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Senha</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="********" 
                    />
                    <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-md flex justify-center"
                >
                  {loading ? 'Entrando...' : 'Acessar Painel'}
                </button>
              </form>
              
              <div className="mt-6 text-center border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">Não é afiliado ainda?</p>
                <button 
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth'})}
                  className="text-blue-600 font-bold text-sm hover:underline mt-1"
                >
                  Cadastre-se gratuitamente abaixo
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Vantagens Exclusivas</h2>
          <p className="text-slate-600 mt-2">Por que promover nossa plataforma?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-6">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Comissões Altas</h3>
            <p className="text-slate-600">
              Ganhe até 20% de comissão sobre o valor da primeira mensalidade e 10% recorrente enquanto o cliente permanecer ativo.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Produto em Alta</h3>
            <p className="text-slate-600">
              O mercado de precatórios está aquecido. Venda uma solução essencial para advogados e investidores.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center text-yellow-600 mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Suporte Dedicado</h3>
            <p className="text-slate-600">
              Tenha acesso a um gerente de contas e materiais de marketing prontos para divulgar nas suas redes.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works & Registration Form */}
      <div className="bg-white py-16 border-t border-slate-100" id="registration-form">
         <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                 <h2 className="text-3xl font-bold text-slate-900 mb-6">Como funciona?</h2>
                 <ul className="space-y-6">
                   <li className="flex gap-4">
                     <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-700 flex-shrink-0">1</div>
                     <div>
                       <h4 className="font-bold text-slate-900">Faça seu cadastro</h4>
                       <p className="text-slate-600 text-sm">Preencha o formulário. A aprovação é rápida.</p>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-700 flex-shrink-0">2</div>
                     <div>
                       <h4 className="font-bold text-slate-900">Pegue seu link</h4>
                       <p className="text-slate-600 text-sm">Você terá um link exclusivo para compartilhar.</p>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-700 flex-shrink-0">3</div>
                     <div>
                       <h4 className="font-bold text-slate-900">Receba Comissões</h4>
                       <p className="text-slate-600 text-sm">Acompanhe as vendas e solicite o saque direto para sua conta bancária.</p>
                     </div>
                   </li>
                 </ul>
              </div>
              <div className="md:w-1/2 bg-slate-50 p-8 rounded-xl border border-slate-200">
                 <h3 className="text-xl font-bold text-slate-900 mb-4">Solicitar Afiliação</h3>
                 <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="Nome" className="w-full border border-slate-300 rounded-lg p-3 text-sm" />
                       <input type="text" placeholder="Sobrenome" className="w-full border border-slate-300 rounded-lg p-3 text-sm" />
                    </div>
                    <input type="email" placeholder="Seu melhor e-mail" className="w-full border border-slate-300 rounded-lg p-3 text-sm" />
                    <input type="text" placeholder="WhatsApp" className="w-full border border-slate-300 rounded-lg p-3 text-sm" />
                    <input type="text" placeholder="CPF ou CNPJ" className="w-full border border-slate-300 rounded-lg p-3 text-sm" />
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                      <Send size={18} /> Enviar Solicitação
                    </button>
                 </form>
              </div>
           </div>
         </div>
      </div>

    </div>
  );
};

export default Affiliates;
