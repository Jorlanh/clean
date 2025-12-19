
import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  FileSpreadsheet, 
  Shield, 
  CheckCircle, 
  Clock, 
  Send, 
  Phone, 
  Mail, 
  FileText, 
  UserCheck, 
  MessageCircle, 
  Banknote, 
  Landmark, 
  Tag, 
  Building2, 
  Calendar 
} from 'lucide-react';
import FAQ from './FAQ';
import Mascot from './Mascot';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    interest: 'Assinatura'
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', interest: 'Assinatura' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-20 pb-24 overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Column: Text & CTA */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-blue-800 text-blue-200 rounded-full text-sm font-semibold mb-6 border border-blue-700">
                🚀 A plataforma nº 1 em dados jurídicos
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Mineração de <span className="text-yellow-400">Precatórios</span> <br />
                <span className="text-blue-400">Rápida e Inteligente</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                Automatize a prospecção de ativos judiciais. Nossa tecnologia monitora tribunais de todo o Brasil e entrega dados higienizados, prontos para você fechar os melhores acordos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => onNavigate('mining')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20"
                >
                  Começar Mineração
                </button>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="bg-transparent border-2 border-slate-600 hover:border-white text-white font-bold py-4 px-8 rounded-full transition-all"
                >
                  Ver Planos
                </button>
              </div>
            </div>
            
            {/* Right Column: Mascote Grande (Reverted) */}
            <div className="md:w-1/2 flex justify-center md:justify-end relative mt-12 md:mt-0">
               <div className="relative z-10">
                  <div className="absolute top-0 right-0 bg-yellow-400 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <Mascot variant="full" size={450} />
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* LOA Status Bar */}
      <div className="bg-slate-950 border-b border-slate-800 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
            Bases de Dados Orçamentários Integradas
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {/* LOA 2025 */}
            <div className="flex items-center gap-2 bg-green-900/20 border border-green-800/50 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-green-400 font-bold text-sm">LOA 2025</span>
            </div>
            
            {/* LOA 2026 */}
            <div className="flex items-center gap-2 bg-green-900/20 border border-green-800/50 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-green-400 font-bold text-sm">LOA 2026</span>
            </div>

            {/* LOA 2027 */}
            <div className="flex items-center gap-2 bg-green-900/20 border border-green-800/50 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="text-green-400" />
              <span className="text-green-400 font-bold text-sm">LOA 2027</span>
            </div>

            {/* LOA 2028 */}
            <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/40 px-4 py-2 rounded-full">
              <Clock size={16} className="text-yellow-500" />
              <span className="text-yellow-500 font-bold text-sm">LOA 2028 (Em Breve)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que usar o Miner Precatórios?</h2>
          <p className="text-slate-600">Nossa tecnologia simplifica a busca complexa nos tribunais.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-blue-500 group hover:shadow-xl transition-all">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Database size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fontes Oficiais</h3>
            <p className="text-slate-600">
              Integração direta com portais públicos de TRFs e TJs estaduais. Dados confiáveis e atualizados.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-yellow-500 group hover:shadow-xl transition-all">
            <div className="bg-yellow-100 w-14 h-14 rounded-lg flex items-center justify-center text-yellow-600 mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <FileSpreadsheet size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Excel Organizado</h3>
            <p className="text-slate-600">
              Esqueça dados agrupados. Receba planilhas com colunas separadas para CPF, Valor, Email e WhatsApp.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-slate-800 group hover:shadow-xl transition-all">
            <div className="bg-slate-100 w-14 h-14 rounded-lg flex items-center justify-center text-slate-800 mb-6 group-hover:bg-slate-800 group-hover:text-white transition-colors">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Segurança & Compliance</h3>
            <p className="text-slate-600">
              Operamos estritamente dentro da LGPD, utilizando apenas dados de caráter público.
            </p>
          </div>
        </div>
      </div>

      {/* What can you extract? */}
      <div className="bg-white py-20 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">O que você pode extrair?</h2>
            <p className="text-slate-600 mt-2 text-lg">Dados completos, higienizados e prontos para prospecção.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
             
             {/* Item 1 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Precatório e Processo</h4>
                  <p className="text-xs text-slate-500">Número completo</p>
                </div>
             </div>

             {/* Item 2 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Nome e CPF</h4>
                  <p className="text-xs text-slate-500">Dados do Titular</p>
                </div>
             </div>

             {/* Item 3 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-green-100 p-3 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">WhatsApp e E-mail</h4>
                  <p className="text-xs text-slate-500">Contato direto</p>
                </div>
             </div>

             {/* Item 4 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <Banknote size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Valor do Precatório</h4>
                  <p className="text-xs text-slate-500">Valor de face atualizado</p>
                </div>
             </div>

             {/* Item 5 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-slate-200 p-3 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Landmark size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tribunal e Região</h4>
                  <p className="text-xs text-slate-500">TRFs, TJs e TRTs</p>
                </div>
             </div>

             {/* Item 6 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-slate-200 p-3 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Tag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Status e Natureza</h4>
                  <p className="text-xs text-slate-500">Alimentar ou Comum</p>
                </div>
             </div>

             {/* Item 7 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-slate-200 p-3 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Órgão Responsável</h4>
                  <p className="text-xs text-slate-500">Entidade Devedora</p>
                </div>
             </div>

             {/* Item 8 */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-colors group">
                <div className="bg-slate-200 p-3 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Ano de Expedição</h4>
                  <p className="text-xs text-slate-500">Ano Base / LOA</p>
                </div>
             </div>

          </div>
        </div>
      </div>

      {/* Banner CTA */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
         <div className="absolute top-0 left-0 opacity-10">
            <Mascot variant="logo" size={300} />
         </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
           <div className="md:w-2/3 pl-10">
             <h2 className="text-3xl font-bold mb-4">Pronto para escalar seu negócio?</h2>
             <p className="text-blue-200 text-lg">Seja o primeiro a minerar precatórios.</p>
           </div>
           <div>
             <button 
               onClick={() => onNavigate('pricing')}
               className="bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
             >
               Ver Preços
             </button>
           </div>
        </div>
      </div>

      {/* FAQ Section integrated */}
      <FAQ />

      {/* Contact / Lead Form Section */}
      <div className="bg-slate-100 py-20" id="contact-section">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
              
              {/* Left Side: Info */}
              <div className="lg:w-2/5 bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                 {/* Decoration */}
                 <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full -mr-10 -mt-10"></div>
                 
                 <div>
                   <h3 className="text-2xl font-bold mb-6">Fale com um Especialista</h3>
                   <p className="text-slate-300 mb-8 leading-relaxed">
                     Preencha o formulário e nosso time comercial entrará em contato para demonstrar como o Miner Precatórios pode transformar sua prospecção.
                   </p>
                   
                   <div className="space-y-6">
                     <div className="flex items-start gap-4">
                       <div className="bg-slate-800 p-3 rounded-lg text-yellow-400">
                         <Phone size={20} />
                       </div>
                       <div>
                         <p className="font-bold text-sm text-slate-400 uppercase">WhatsApp / Telefone</p>
                         <p className="text-lg font-semibold">(48) 99999-9999</p>
                       </div>
                     </div>

                     <div className="flex items-start gap-4">
                       <div className="bg-slate-800 p-3 rounded-lg text-yellow-400">
                         <Mail size={20} />
                       </div>
                       <div>
                         <p className="font-bold text-sm text-slate-400 uppercase">E-mail</p>
                         <p className="text-lg font-semibold">contato@minerprecatorios.com.br</p>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="mt-12">
                   <div className="flex items-center gap-3">
                      <Mascot variant="logo" size={48} />
                      <p className="text-sm text-slate-400 max-w-xs">
                        Nosso time está disponível de Seg. a Sex. das 09h às 18h.
                      </p>
                   </div>
                 </div>
              </div>

              {/* Right Side: Form */}
              <div className="lg:w-3/5 p-8 md:p-12">
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                    <p className="text-slate-600 max-w-md">
                      Obrigado pelo interesse. Nosso time comercial já recebeu seus dados e entrará em contato em breve pelo WhatsApp ou E-mail informado.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-8 text-blue-600 font-bold hover:underline"
                    >
                      Enviar nova mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="Seu nome"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp</label>
                        <input 
                          type="text" 
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="nome@suaempresa.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Interesse Principal</label>
                      <select 
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      >
                        <option value="Assinatura">Quero assinar a plataforma</option>
                        <option value="Demonstracao">Solicitar demonstração</option>
                        <option value="Parceria">Quero ser parceiro/afiliado</option>
                        <option value="Duvidas">Tenho dúvidas técnicas</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'sending' ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send size={20} /> Solicitar Contato Agora
                        </>
                      )}
                    </button>
                    
                    <p className="text-xs text-center text-slate-500 mt-4">
                      Ao enviar, você concorda com nossa Política de Privacidade e aceita ser contatado.
                    </p>
                  </form>
                )}
              </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;
