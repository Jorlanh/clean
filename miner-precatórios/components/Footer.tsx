
import React from 'react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Miner Precatórios</h3>
            <div className="text-sm space-y-2">
              <p className="font-semibold text-slate-300">B&M Negócios Ltda</p>
              <p>CNPJ: 58.500.491/0001-10</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-blue-400 transition-colors text-left">Termos de Uso</button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-blue-400 transition-colors text-left">Política de Privacidade</button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-blue-400 transition-colors text-left">Perguntas Frequentes (FAQ)</button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">Planos e Preços</button>
              </li>
              <li>
                <button onClick={() => handleNav('affiliates')} className="hover:text-blue-400 transition-colors text-left">Afiliados</button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
            <div className="text-sm space-y-3">
              <p className="flex items-center gap-2">
                <span className="font-medium text-slate-300">Email:</span>
                <a href="mailto:contato@minerprecatorios.com.br" className="hover:text-blue-400">contato@minerprecatorios.com.br</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-slate-300">WhatsApp:</span>
                <a href="#" className="hover:text-blue-400">(48) 99999-9999</a>
              </p>
            </div>
            <div className="mt-6 text-xs text-slate-500">
              <p>Horário de atendimento: Seg a Sex, 9h às 18h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Miner Precatórios. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
