
import React, { useEffect } from 'react';
import { FileText, ArrowLeft, ShieldCheck } from 'lucide-react';

interface TermsOfUseProps {
  onNavigate: (page: string) => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onNavigate }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <FileText size={300} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-bold"
          >
            <ArrowLeft size={16} /> Voltar ao Início
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Termos de Uso</h1>
              <p className="text-slate-400 mt-2">Regras e condições para utilização da plataforma.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 md:p-12 max-w-4xl mx-auto text-slate-700 leading-relaxed">
          
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">TERMOS DE USO – MINER PRECATÓRIO</h2>
            <p className="text-sm text-slate-500 font-bold">Última atualização: //2025</p>
          </div>

          <div className="space-y-8 text-sm md:text-base">
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="font-bold text-blue-900 mb-2">Bem-vindo ao Miner Precatório (“Plataforma”).</p>
              <p className="text-blue-800">
                Ao utilizar nossos serviços, você concorda integralmente com estes Termos de Uso, que regulam o uso do software, website e funcionalidades associadas. <strong>Leia com atenção antes de utilizar.</strong>
              </p>
            </div>

            {/* 1. SOBRE A PLATAFORMA */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">1. SOBRE A PLATAFORMA</h3>
              <p className="mb-3">O Miner Precatório é uma plataforma digital especializada em:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Mineração e extração automatizada de informações públicas relacionadas a precatórios;</li>
                <li>Consulta estruturada de bancos de dados orçamentários, incluindo: <strong>LOA 2025, LOA 2026, LOA 2027 e LOA 2028 (Em breve)</strong>;</li>
                <li>Extração de telefones vinculados ao credor (quando disponíveis em bases públicas);</li>
                <li>Campos filtráveis avançados (índice, tribunal, natureza, entidade, grupo, ano, faixa, status, entre outros);</li>
                <li>Exportação completa via Excel;</li>
                <li>Suporte via WhatsApp e ligação;</li>
                <li>Utilização de IA para aceleração de processos de extração e organização de dados.</li>
              </ul>
              <p className="mt-3 text-slate-600 italic">
                A plataforma não altera, manipula ou modifica qualquer dado oficial. Apenas consulta, organiza e entrega informações já públicas.
              </p>
            </div>

            {/* 2. ACEITAÇÃO DOS TERMOS */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">2. ACEITAÇÃO DOS TERMOS</h3>
              <p className="mb-2">Ao criar uma conta, contratar um plano ou utilizar qualquer funcionalidade, o usuário declara que:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Leu e concorda com os Termos;</li>
                <li>Possui capacidade civil para firmar contratos;</li>
                <li>Utilizará a plataforma para fins lícitos.</li>
              </ul>
              <p className="mt-2 font-bold text-slate-800">Se não concordar, não utilize o sistema.</p>
            </div>

            {/* 3. PLANOS, PAGAMENTOS E RENOVAÇÃO */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">3. PLANOS, PAGAMENTOS E RENOVAÇÃO</h3>
              <p className="mb-4">A plataforma oferece planos:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Plano Mensal</h4>
                  <p className="text-xl font-bold text-blue-600 mb-2">R$ 3.900/mês</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    <li>Renovação mensal</li>
                    <li>Até 1000 extrações</li>
                    <li>Exportação Excel</li>
                    <li>Suporte via WhatsApp e Ligação</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Plano Semestral</h4>
                  <p className="text-xl font-bold text-blue-600 mb-2">R$ 2.700/mês</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    <li>Compromisso 6 meses</li>
                    <li>Até 1000 extrações</li>
                    <li>Economia de R$ 7.200</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-slate-900 mb-2">Plano Anual</h4>
                  <p className="text-xl font-bold text-yellow-600 mb-2">R$ 2.200/mês</p>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                    <li>Compromisso 12 meses</li>
                    <li>Até 1400 extrações/mês</li>
                    <li>Suporte prioritário</li>
                    <li>Gestor de conta dedicado</li>
                    <li>Economia de R$ 20.400</li>
                  </ul>
                </div>
              </div>

              <h4 className="font-bold text-slate-800 mb-2">Formas de Pagamento</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-3">
                <li>PIX (aprovação imediata)</li>
                <li>Boleto bancário (até 48h para compensar)</li>
              </ul>
              <p className="text-sm text-slate-500 mb-3">
                Os valores representam o custo mensal. A cobrança pode ocorrer mensalmente ou antecipada (conforme negociação comercial).
              </p>
              <h4 className="font-bold text-slate-800 mb-1">Comissão para Afiliados</h4>
              <p className="text-slate-600">Oferecemos programa de parceria e comissionamento para afiliados.</p>
            </div>

            {/* 4. LIMITES DE USO E RESTRIÇÕES */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">4. LIMITES DE USO E RESTRIÇÕES</h3>
              <p className="mb-2">É proibido:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Usar a plataforma para fins ilegais ou antiéticos;</li>
                <li>Revender, redistribuir ou disponibilizar os resultados da plataforma como serviço próprio, salvo com autorização formal;</li>
                <li>Utilizar meios robóticos, scripts ou automações externas para coleta excessiva;</li>
                <li>Tentar burlar limites, travas ou contadores de extração.</li>
              </ul>
              <p className="mt-2 font-bold text-red-600">Contas que violarem os termos poderão ser suspensas ou encerradas.</p>
            </div>

            {/* 5. TRATAMENTO DE DADOS E LGPD */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">5. TRATAMENTO DE DADOS E LGPD</h3>
              <p className="mb-3">
                O Miner Precatório está em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei 13.709/2018).
              </p>
              
              <div className="pl-4 mb-3">
                <h4 className="font-bold text-slate-800">5.1 Dados utilizados</h4>
                <p className="text-slate-600">A plataforma utiliza:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Dados fornecidos pelo usuário (nome, e-mail, telefone, empresa);</li>
                  <li>Dados públicos oriundos de transparência governamental e tribunais;</li>
                  <li>Dados estatísticos gerados pelo uso da ferramenta.</li>
                </ul>
              </div>

              <div className="pl-4 mb-3">
                <h4 className="font-bold text-slate-800">5.2 Telefones de credores</h4>
                <p className="text-slate-600">
                  Os telefones extraídos são Dados Públicos disponibilizados pelas fontes oficiais. A plataforma apenas organiza e apresenta — não se responsabilizando pela veracidade, atualização ou uso inadequado por parte do usuário.
                </p>
              </div>

              <div className="pl-4 mb-3">
                <h4 className="font-bold text-slate-800">5.3 Finalidade</h4>
                <p className="text-slate-600">As informações são usadas exclusivamente para:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>viabilizar a prestação do serviço;</li>
                  <li>melhorar a experiência do usuário;</li>
                  <li>cumprir obrigações legais.</li>
                </ul>
              </div>

              <div className="pl-4">
                <h4 className="font-bold text-slate-800">5.4 Segurança</h4>
                <p className="text-slate-600">Empregamos medidas de segurança para proteção dos dados, mas o usuário entende que nenhum sistema é 100% inviolável.</p>
              </div>
            </div>

            {/* 6. BASES DE DADOS UTILIZADAS */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">6. BASES DE DADOS UTILIZADAS</h3>
              <p className="mb-2">A plataforma consulta e integra informações de:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>LOA 2025</li>
                <li>LOA 2026</li>
                <li>LOA 2027</li>
                <li>LOA 2028 (em breve)</li>
                <li>Portais de transparência</li>
                <li>Tribunais</li>
                <li>Bases orçamentárias públicas</li>
              </ul>
              <p className="mt-2 text-slate-600">
                Não armazenamos ou alteramos dados oficiais. A informação exibida é reflexo da fonte consultada.
              </p>
            </div>

            {/* 7. RESPONSABILIDADE DO USUÁRIO */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">7. RESPONSABILIDADE DO USUÁRIO</h3>
              <p className="mb-2">O usuário é responsável por:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Utilizar os dados de forma ética e legal;</li>
                <li>Seguimento das normas éticas da OAB (se aplicável);</li>
                <li>Não assediar, importunar ou utilizar telefones de forma inadequada;</li>
                <li>Garantir que suas operações estejam em conformidade com a LGPD.</li>
              </ul>
            </div>

            {/* 8. LIMITAÇÃO DE RESPONSABILIDADE */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">8. LIMITAÇÃO DE RESPONSABILIDADE</h3>
              <p className="mb-2">A plataforma não se responsabiliza por:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Dados incorretos fornecidos pelas fontes públicas;</li>
                <li>Decisões administrativas, financeiras ou jurídicas tomadas pelo usuário;</li>
                <li>Danos diretos ou indiretos decorrentes do uso da plataforma;</li>
                <li>Incompatibilidade com dispositivos ou redes do usuário.</li>
              </ul>
            </div>

            {/* 9. CANCELAMENTO E ENCERRAMENTO */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">9. CANCELAMENTO E ENCERRAMENTO</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-2">
                <li><strong>Planos Mensais:</strong> Podem ser cancelados a qualquer momento, com cobrança apenas até o ciclo vigente.</li>
                <li><strong>Planos Semestrais e Anuais:</strong> Possuem fidelidade conforme contratado; não há reembolso proporcional após ativação.</li>
              </ul>
              <p className="text-slate-600">A empresa poderá encerrar contas que violem os Termos.</p>
            </div>

            {/* 10. SUPORTE */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">10. SUPORTE</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>WhatsApp</li>
                <li>Ligação</li>
                <li>E-mail</li>
                <li>Suporte prioritário para planos anuais.</li>
              </ul>
            </div>

            {/* 11. ALTERAÇÕES NOS TERMOS */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">11. ALTERAÇÕES NOS TERMOS</h3>
              <p className="text-slate-600">Podemos atualizar estes Termos a qualquer momento.</p>
            </div>

            {/* Contact Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="font-bold text-slate-900">Equipe Miner,</p>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg inline-block">
                <p className="text-sm font-bold text-slate-500 uppercase mb-1">Suporte</p>
                <a href="mailto:contato@minerprecatorio.com.br" className="text-blue-600 font-bold hover:underline">
                  contato@minerprecatorio.com.br
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
