
import React from 'react';
import { CheckCircle, CreditCard, Star, Zap, QrCode, FileText, Phone } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  
  const handleSubscribe = () => {
    onNavigate('contact');
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Planos Flexíveis</h2>
          <p className="text-slate-600 text-lg">Escolha o período ideal para o seu negócio. Quanto maior o tempo, menor o investimento mensal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Plan 1 - Mensal */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
             <div className="bg-slate-50 p-6 text-center border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-700">Plano Mensal</h3>
                <div className="mt-4 flex justify-center items-baseline text-slate-900">
                  <span className="text-sm font-semibold text-slate-500 -mt-2 mr-1">R$</span>
                  <span className="text-4xl font-extrabold tracking-tight">3.900</span>
                  <span className="ml-1 text-lg font-semibold text-slate-500">/mês</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">Renovação mensal. Sem fidelidade.</p>
             </div>
             <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-blue-500" />
                    <span className="ml-3 text-sm text-slate-700">Até 1000 extrações/mês</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-blue-500" />
                    <span className="ml-3 text-sm text-slate-700">Exportação Excel completa</span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="flex-shrink-0 h-5 w-5 text-blue-500" />
                    <span className="ml-3 text-sm text-slate-700">Suporte via WhatsApp e Ligação</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                   Assinar Mensal
                </button>
             </div>
          </div>

          {/* Plan 2 - Semestral */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
             <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-800">Plano Semestral</h3>
                <div className="mt-4 flex justify-center items-baseline text-slate-900">
                  <span className="text-sm font-semibold text-slate-500 -mt-2 mr-1">R$</span>
                  <span className="text-4xl font-extrabold tracking-tight">2.700</span>
                  <span className="ml-1 text-lg font-semibold text-slate-500">/mês</span>
                </div>
                <p className="mt-2 text-sm text-blue-600 font-semibold">Compromisso de 6 meses</p>
             </div>
             <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Até 1000 extrações/mês</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Exportação Excel completa</span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Suporte via WhatsApp e Ligação</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="flex-shrink-0 h-5 w-5 text-yellow-500" />
                    <span className="ml-3 text-sm text-slate-700 font-semibold">Economia de R$ 7.200</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                   Assinar Semestral
                </button>
             </div>
          </div>

          {/* Plan 3 - Anual (Best Value) */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-yellow-400 flex flex-col transform scale-105 z-10">
             <div className="absolute top-0 inset-x-0 bg-yellow-400 text-slate-900 text-xs font-bold py-1 text-center uppercase tracking-wider">
               Melhor Custo-Benefício
             </div>
             <div className="bg-slate-900 p-6 pt-10 text-center">
                <h3 className="text-xl font-bold text-white">Plano Anual</h3>
                <div className="mt-4 flex justify-center items-baseline text-white">
                  <span className="text-sm font-semibold text-slate-400 -mt-2 mr-1">R$</span>
                  <span className="text-5xl font-extrabold tracking-tight text-yellow-400">2.200</span>
                  <span className="ml-1 text-xl font-semibold text-slate-400">/mês</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">Compromisso de 12 meses</p>
             </div>
             <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700 font-bold">Até 1400 extrações/mês</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Exportação Excel completa</span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Suporte Prioritário (WhatsApp e Ligação)</span>
                  </li>
                   <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="ml-3 text-sm text-slate-700">Gestor de Conta Dedicado</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="flex-shrink-0 h-5 w-5 text-yellow-500" />
                    <span className="ml-3 text-sm text-slate-900 font-bold">Economia de R$ 20.400</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1"
                >
                   <CreditCard size={20} /> Assinar Agora
                </button>
             </div>
          </div>

        </div>

        {/* Formas de Pagamento */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
          <p className="text-slate-700 text-sm mb-6 font-bold uppercase tracking-wide text-center">Formas de pagamento aceitas</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-6">
             {/* PIX */}
             <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-lg border border-slate-100 w-full md:w-auto justify-center hover:border-blue-200 transition-colors">
                <div className="bg-teal-100 p-2.5 rounded-full text-teal-600">
                  <QrCode size={28} />
                </div>
                <div className="text-left">
                   <div className="font-bold text-slate-900 text-lg">PIX</div>
                   <div className="text-xs text-slate-500">Aprovação Imediata</div>
                </div>
             </div>

             {/* Boleto */}
             <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-lg border border-slate-100 w-full md:w-auto justify-center hover:border-blue-200 transition-colors">
                <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
                  <FileText size={28} />
                </div>
                <div className="text-left">
                   <div className="font-bold text-slate-900 text-lg">Boleto Bancário</div>
                   <div className="text-xs text-slate-500">Até 48h para compensar</div>
                </div>
             </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-400 mt-4">
              * Os valores representam o custo mensal da assinatura. A cobrança pode ser feita mensalmente ou em parcela única dependendo da negociação com nosso time comercial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
