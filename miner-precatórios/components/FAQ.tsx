
import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQCategory {
  title: string;
  items: { q: string; a: string | React.ReactNode }[];
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories: FAQCategory[] = [
    {
      title: "📌 Sobre o Miner Precatório",
      items: [
        {
          q: "1. O que é o Miner Precatório?",
          a: "O Miner Precatório é um aplicativo que minera, organiza e filtra informações públicas sobre precatórios, auxiliando profissionais a identificar oportunidades com rapidez e precisão."
        },
        {
          q: "2. O aplicativo compra ou vende precatórios?",
          a: "Não. O app não negocia precatórios. Ele apenas coleta e organiza dados públicos."
        },
        {
          q: "3. Para quem o app é indicado?",
          a: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Investidores</li>
              <li>Correspondentes</li>
              <li>Escritórios jurídicos</li>
              <li>Consultores</li>
              <li>Profissionais que analisam precatórios</li>
            </ul>
          )
        }
      ]
    },
    {
      title: "📌 Funcionalidades da Plataforma",
      items: [
        {
          q: "4. O que significa “minerar precatórios”?",
          a: (
            <span>
              É automatizar a busca e a organização de informações públicas, exibindo: valores, natureza, datas, situação (quando disponível) e dados úteis para análise.
            </span>
          )
        },
        {
          q: "5. Quais filtros estão disponíveis?",
          a: (
             <ul className="list-disc pl-5 space-y-1">
              <li>Tribunal / UF</li>
              <li>Tipo (Federal, Estadual, Municipal)</li>
              <li>Natureza (Alimentar ou Comum)</li>
              <li>Faixa de valor</li>
              <li>Ano de expedição</li>
              <li>Número do processo</li>
              <li>Número do credor</li>
              <li>Situação do precatório (quando disponível)</li>
            </ul>
          )
        },
        {
          q: "6. A plataforma captura telefones do credor?",
          a: "Sim. Quando os telefones do credor estão presentes nas bases públicas consultadas, o sistema captura e organiza essas informações automaticamente. Nada é coletado fora das fontes oficiais."
        },
        {
          q: "7. Quais bases orçamentárias o Miner Precatório utiliza?",
          a: (
            <span>
              Atualmente, o app integra as seguintes LOAs: <strong>LOA 2025, LOA 2026, LOA 2027 e LOA 2028 (Em breve)</strong>. Essas bases ajudam na análise de previsões de pagamento e priorização orçamentária.
            </span>
          )
        },
        {
          q: "8. Posso exportar os dados minerados?",
          a: "Sim. Você pode exportar tudo em Excel completo."
        },
        {
          q: "9. Quantas extrações posso fazer por mês?",
          a: (
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Plano Mensal:</strong> 1000 extrações</li>
              <li><strong>Plano Semestral:</strong> 1000 extrações</li>
              <li><strong>Plano Anual:</strong> 1400 extrações</li>
            </ul>
          )
        }
      ]
    },
    {
      title: "📌 Privacidade, Dados e LGPD",
      items: [
        {
          q: "10. O Miner Precatório usa apenas dados públicos?",
          a: "Sim. O sistema acessa exclusivamente informações públicas divulgadas pelos tribunais e portais oficiais."
        },
        {
          q: "11. O app captura dados privados fora das bases públicas?",
          a: "Não. A plataforma jamais coleta dados privados de terceiros. Qualquer telefone, nome ou informação do credor exibida já estava publicamente disponível."
        },
        {
          q: "12. O aplicativo está em conformidade com a LGPD?",
          a: "Sim. A plataforma cumpre todos os requisitos da LGPD: usa apenas dados públicos, protege seus dados pessoais com criptografia, não vende nem compartilha informações e permite exclusão de dados e conta a qualquer momento."
        }
      ]
    },
    {
      title: "📌 Pagamentos, Planos e Assinaturas",
      items: [
        {
          q: "13. Quais são as formas de pagamento?",
          a: (
             <ul className="list-disc pl-5 space-y-1">
              <li><strong>PIX</strong> → aprovação imediata</li>
              <li><strong>Boleto Bancário</strong> → compensação em até 48h</li>
            </ul>
          )
        },
        {
          q: "14. Como funciona a cobrança?",
          a: "O valor informado representa o custo mensal da assinatura. A cobrança pode ser Mensal ou em parcela única, dependendo da negociação com o time comercial."
        },
        {
          q: "15. Existe fidelidade?",
          a: (
             <ul className="list-disc pl-5 space-y-1">
              <li><strong>Mensal:</strong> sem fidelidade</li>
              <li><strong>Semestral:</strong> 6 meses</li>
              <li><strong>Anual:</strong> 12 meses</li>
            </ul>
          )
        }
      ]
    },
    {
      title: "📌 Suporte, Benefícios e Parcerias",
      items: [
        {
          q: "16. O que está incluído nos planos?",
          a: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Limite de extrações conforme o plano</li>
              <li>Exportação Excel completa</li>
              <li>Suporte via WhatsApp e ligação</li>
              <li>Gestor de conta dedicado</li>
            </ul>
          )
        },
        {
          q: "17. O Miner Precatório possui programa de afiliados?",
          a: "Sim! Temos um programa de afiliados, onde você pode indicar clientes e receber comissão pelas vendas realizadas."
        }
      ]
    }
  ];

  return (
    <div className="bg-white py-20" id="faq-section">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Tire suas dúvidas</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-slate-900">Perguntas Frequentes</h2>
          <p className="text-slate-500 mt-2">Tudo o que você precisa saber sobre o Miner Precatórios.</p>
        </div>
        
        <div className="space-y-8 mb-16">
          {categories.map((cat, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{cat.title}</h3>
              <div className="space-y-3">
                {cat.items.map((item, itemIndex) => {
                  const uniqueId = `${catIndex}-${itemIndex}`;
                  const isOpen = openIndex === uniqueId;
                  
                  return (
                    <div key={uniqueId} className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 hover:border-blue-200 transition-colors">
                      <button 
                        onClick={() => toggleFAQ(uniqueId)}
                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 focus:outline-none"
                      >
                        <span className="pr-4">{item.q}</span>
                        {isOpen ? <ChevronUp size={20} className="text-blue-500 flex-shrink-0" /> : <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-white">
                          <div className="mt-2">
                             {item.a}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* LGPD Clause Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-slate-800">
            <ShieldCheck className="text-blue-600" size={32} />
            <h3 className="text-xl font-bold">Cláusula de Conformidade com a LGPD e Fontes de Dados Públicas</h3>
          </div>
          <div className="text-sm text-slate-600 space-y-3 text-justify">
            <p>
              O usuário declara estar ciente de que todos os dados disponibilizados dentro da plataforma Miner Precatórios são provenientes de bases públicas oficiais disponibilizadas pelos tribunais brasileiros, observando os princípios de publicidade previstos na legislação.
            </p>
            <p>
              O Miner Precatórios não coleta dados privados, somente organiza e apresenta informações públicas.
            </p>
            <p>
              A plataforma atua em conformidade com a LGPD, com finalidade legítima de consulta, mineração e extração de precatórios.
            </p>
            <p>
              É proibido utilizar os dados para fins ilegais, abusivos ou incompatíveis com a legislação vigente.
            </p>
            <p>
              O usuário é totalmente responsável pelo uso das informações, devendo cumprir LGPD, CDC, Marco Civil e demais normas aplicáveis.
            </p>
            <p>
              O Miner Precatórios poderá suspender ou bloquear usuários que utilizarem a plataforma de forma irregular.
            </p>
            <p className="font-bold text-slate-800 mt-4 border-t border-slate-200 pt-4">
              Ao continuar usando o sistema, o usuário concorda integralmente com esta cláusula e com os Termos de Uso.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
