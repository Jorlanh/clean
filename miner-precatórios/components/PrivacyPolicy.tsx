
import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Shield size={300} />
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
              <Lock size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Política de Privacidade</h1>
              <p className="text-slate-400 mt-2">Transparência e segurança com seus dados.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 md:p-12 max-w-4xl mx-auto text-slate-700 leading-relaxed">
          
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">POLÍTICA DE PRIVACIDADE – MINER PRECATÓRIOS</h2>
            <p className="text-sm text-slate-500 font-bold">Última atualização: 22/12/2025</p>
          </div>

          <div className="space-y-6 text-sm md:text-base">
            <p>
              A presente Política de Privacidade descreve como o <strong>Miner Precatórios</strong> realiza a coleta, uso, armazenamento, compartilhamento e proteção de dados pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD)</strong>.
            </p>
            <p>
              Nos comprometemos a tratar todas as informações com segurança, transparência e respeito ao usuário.
            </p>

            {/* 1. Dados Coletados */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">1. Dados Coletados</h3>
              <p className="mb-3">
                O Miner Precatórios coleta apenas os dados necessários para o funcionamento da plataforma e execução dos serviços. Os tipos de dados podem incluir:
              </p>
              
              <div className="pl-4 mb-4">
                <h4 className="font-bold text-slate-800 mb-2">1.1. Dados fornecidos pelo usuário:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Nome completo</li>
                  <li>E-mail</li>
                  <li>Telefone (opcional)</li>
                  <li>CPF/CNPJ (quando necessário para emissão de nota fiscal ou identificação contratual)</li>
                  <li>Dados de pagamento e informações da assinatura (processados por meios de pagamento terceiros)</li>
                </ul>
              </div>

              <div className="pl-4 mb-4">
                <h4 className="font-bold text-slate-800 mb-2">1.2. Dados de acesso e uso:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Endereço IP</li>
                  <li>Data e hora de acesso</li>
                  <li>Navegador e dispositivo utilizado</li>
                  <li>Ações realizadas dentro da plataforma (ex.: consulta, download, filtros utilizados)</li>
                </ul>
              </div>

              <div className="pl-4">
                <h4 className="font-bold text-slate-800 mb-2">1.3. Dados consultados na plataforma:</h4>
                <p className="mb-2">O sistema pode exibir dados públicos de precatórios, tais como:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Número do processo</li>
                  <li>Tribunal</li>
                  <li>Nome das partes quando disponível em bases públicas</li>
                  <li>Situação do requisitório</li>
                  <li>Valores e datas de pagamento</li>
                  <li>Documentos disponibilizados publicamente pelos tribunais</li>
                </ul>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-slate-700 text-sm">
                  <strong>Importante:</strong> O Miner Precatórios não coleta nem armazena informações sigilosas não públicas de processos judiciais. Toda informação extraída é obtida exclusivamente de fontes públicas, conforme autorizado pelo ordenamento jurídico brasileiro.
                </div>
              </div>
            </div>

            {/* 2. Finalidade */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">2. Finalidade do Tratamento dos Dados</h3>
              <p className="mb-2">Os dados são utilizados para:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Disponibilizar o serviço de consulta e mineração de precatórios</li>
                <li>Gerenciar sua conta e assinatura</li>
                <li>Emitir relatórios, planilhas e resultados de consultas (download ou visualização)</li>
                <li>Controlar acesso, segurança e autenticação</li>
                <li>Monitorar desempenho, estabilidade e prevenção de fraude</li>
                <li>Enviar comunicações de suporte, avisos e informações relevantes</li>
                <li>Cumprir obrigações legais, fiscais e regulatórias</li>
              </ul>
            </div>

            {/* 3. Base Legal */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">3. Base Legal para Tratamento</h3>
              <p className="mb-2">O tratamento é fundamentado nas seguintes bases legais da LGPD:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Execução de contrato (Art. 7º, V)</li>
                <li>Cumprimento de obrigação legal ou regulatória (Art. 7º, II)</li>
                <li>Legítimo interesse do controlador para melhoria da plataforma e prevenção de fraudes (Art. 7º, IX)</li>
                <li>Consentimento, quando aplicável (Art. 7º, I)</li>
              </ul>
            </div>

            {/* 4. Armazenamento */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">4. Armazenamento e Segurança</h3>
              <p className="mb-2">Adotamos medidas técnicas e administrativas adequadas para proteção dos dados, tais como:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Criptografia durante transmissão</li>
                <li>Controle de acesso por autenticação</li>
                <li>Monitoramento de atividades suspeitas</li>
                <li>Backups seguros</li>
                <li>Servidores protegidos e com protocolos atualizados</li>
              </ul>
              <p className="mt-2 text-slate-600 italic">Embora empreguemos esforços para manter o mais alto nível de segurança, nenhum sistema é totalmente inviolável.</p>
            </div>

            {/* 5. Compartilhamento */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">5. Compartilhamento de Dados</h3>
              <p className="mb-2">Podemos compartilhar dados apenas quando necessário, com:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Serviços de pagamento (ex.: Stripe, PayPal, PagSeguro)</li>
                <li>Serviços de hospedagem e infraestrutura</li>
                <li>Contadores para fins fiscais</li>
                <li>Parceiros afiliados</li>
                <li>Autoridades públicas, caso haja exigência legal</li>
              </ul>
              <p className="mt-2 font-bold text-slate-800">O Miner Precatórios não vende dados pessoais.</p>
            </div>

            {/* 6. Retenção */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">6. Retenção e Exclusão dos Dados</h3>
              <p className="mb-2">Os dados são mantidos pelo período necessário para:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Execução dos serviços contratados</li>
                <li>Cumprimento de obrigações legais</li>
                <li>Finalidades previstas nesta Política</li>
              </ul>
              <p className="mt-2">O usuário pode solicitar a exclusão de seus dados pelo contato oficial, respeitadas obrigações legais e fiscais.</p>
            </div>

            {/* 7. Cookies */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">7. Cookies e Tecnologias de Rastreamento</h3>
              <p className="mb-2">Utilizamos cookies para:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Lembrar preferências do usuário</li>
                <li>Realizar autenticação</li>
                <li>Analisar métricas de uso</li>
                <li>Melhorar desempenho do sistema</li>
              </ul>
              <p className="mt-2">O usuário pode gerenciar cookies diretamente no navegador.</p>
            </div>

            {/* 9. Alterações */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-8">9. Alterações desta Política e aceite dos termos</h3>
              <p className="mb-3">
                Ao realizar o cadastro, acessar ou utilizar o Miner Precatórios, o usuário declara que leu, compreendeu e aceita integralmente os presentes Termos de Uso e a Política de Privacidade.
              </p>
              <p className="mb-2">O aceite é formalizado por meio de:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-4">
                <li>Continuidade no uso da plataforma, o que constitui aceitação tácita dos termos atualizados;</li>
                <li>Assinatura eletrônica ou confirmação enviada por meio eletrônico, quando aplicável.</li>
              </ul>
              
              <p className="mb-4 text-slate-600">
                Caso o usuário não concorde com qualquer condição estabelecida, deve interromper imediatamente o uso da plataforma.
              </p>

              <p className="mb-3">
                O Miner Precatórios poderá atualizar, modificar ou complementar estes Termos de Uso e/ou a Política de Privacidade a qualquer momento, para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-4">
                <li>adequação à legislação, inclusive LGPD;</li>
                <li>melhorias nos serviços;</li>
                <li>inclusão de novas funcionalidades ou mudanças operacionais;</li>
                <li>ajustes na forma de tratamento de dados.</li>
              </ul>

              <p className="mb-4">
                As alterações entrarão em vigor a partir da data de publicação no site ou aplicativo.
              </p>

              <p className="mb-2">Sempre que as mudanças forem significativas, o usuário será comunicado por:</p>
               <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>e-mail cadastrado, e/ou</li>
                <li>aviso dentro da plataforma, e/ou</li>
                <li>notificação pop-up solicitando novo aceite, quando necessário.</li>
              </ul>
            </div>

            {/* Contact Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="font-bold text-slate-900">Equipe Miner,</p>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg inline-block">
                <p className="text-sm font-bold text-slate-500 uppercase mb-1">Contato</p>
                <a href="mailto:contato@minerprecatorios.com.br" className="text-blue-600 font-bold hover:underline">
                  contato@minerprecatorios.com.br
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
