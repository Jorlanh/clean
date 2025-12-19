import React, { useState } from 'react';
import { FilterState, Precatorio, TRIBUNAIS, ESTADOS, User } from '../types';
import { exportToExcel, formatCurrency } from '../services/precatorioService';
import { Download, Search, RefreshCw, Filter, AlertCircle } from 'lucide-react';
import Mascot from './Mascot';

interface MiningProps {
  user: User;
  updateUser: (user: User) => void;
}

const Mining: React.FC<MiningProps> = ({ user, updateUser }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Precatorio[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [quantity, setQuantity] = useState<string>('10');

  const [filters, setFilters] = useState<FilterState>({
    tribunal: '',
    ano: '',
    uf: '',
    faixaValorMin: '',
    faixaValorMax: '',
    situacao: '',
    nomeTitular: '',
    cpf: '',
    natureza: '',
    numeroProcesso: '',
    numeroPrecatorio: '',
    loa: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const limit = parseInt(quantity);
    const token = localStorage.getItem('token'); // Recupera o token

    if (!token) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        return;
    }

    if (!limit || limit <= 0) {
      alert("Por favor, insira uma quantidade válida de precatórios a extrair.");
      return;
    }

    // Validação visual de créditos (o backend fará a validação final)
    if (limit > user.credits) {
      alert(`Você não possui créditos suficientes. Seus créditos: ${user.credits}. Necessários: ${limit}.`);
      return;
    }

    setLoading(true);
    setHasSearched(false);
    setResults([]);

    try {
      // === REQUISIÇÃO AO BACKEND ===
      // Ajuste a URL abaixo se o seu Controller usar outro caminho (ex: /api/mining/extract)
      const response = await fetch('http://localhost:8080/mining/extract', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // O Header que conecta tudo!
        },
        body: JSON.stringify({
            ...filters,
            limit: limit // Envia o limite desejado junto com os filtros
        })
      });

      if (!response.ok) {
          if (response.status === 403 || response.status === 401) {
              throw new Error("Não autorizado. Verifique seus créditos ou faça login novamente.");
          }
          throw new Error("Erro no servidor ao processar mineração.");
      }

      const data: Precatorio[] = await response.json();
      
      if (data.length === 0) {
        alert("Nenhum dado retornado pelos tribunais com os filtros selecionados.");
      } else {
        setResults(data);
        setHasSearched(true);

        // Atualiza a interface com os novos créditos
        const newCredits = user.credits - data.length;
        const newStats = {
          ...user.stats,
          totalSearches: (user.stats.totalSearches || 0) + 1,
          totalRecordsExtracted: (user.stats.totalRecordsExtracted || 0) + data.length
        };
        
        updateUser({ 
          ...user, 
          credits: newCredits,
          stats: newStats
        });
      }

    } catch (error: any) {
      console.error("Erro na busca:", error);
      alert(error.message || "Erro ao buscar precatórios. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (results.length === 0) {
      alert("Nenhum dado para exportar.");
      return;
    }
    try {
      exportToExcel(results);
    } catch (error) {
      console.error("Erro exportação", error);
      alert("Erro ao gerar arquivo Excel.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-blue-900 text-white py-10 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
           <Mascot variant="mining" size={200} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Filter className="text-yellow-400" /> Mineração de Precatórios
              </h1>
              <p className="text-blue-200">Configure os filtros e deixe nosso minerador encontrar os dados.</p>
            </div>
            <div className="bg-blue-800/50 backdrop-blur-sm p-4 rounded-xl border border-blue-700 flex items-center gap-3 shadow-lg">
              <div className="bg-yellow-500 p-2 rounded-full text-blue-900 border-2 border-yellow-300">
                <Mascot variant="logo" size={32} />
              </div>
              <div>
                <div className="text-xs text-blue-200 uppercase font-bold">Seus Créditos</div>
                <div className="text-2xl font-black text-white tracking-wider">{user.credits}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-100">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {/* Tribunal */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Tribunal</label>
                <select 
                  name="tribunal" 
                  value={filters.tribunal} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Todos (TJs, TRFs, TRTs)</option>
                  {TRIBUNAIS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* UF */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">UF / Estado</label>
                <select 
                  name="uf" 
                  value={filters.uf} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Todas</option>
                  {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>

              {/* LOA (Novo Filtro) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-blue-700 uppercase">LOA (Orçamento)</label>
                <select 
                  name="loa" 
                  value={filters.loa} 
                  onChange={handleFilterChange}
                  className="w-full border-2 border-blue-100 bg-blue-50 rounded-lg p-2.5 text-sm font-semibold text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Todas as LOAs</option>
                  <option value="LOA 2025">LOA 2025</option>
                  <option value="LOA 2026">LOA 2026</option>
                  <option value="LOA 2027">LOA 2027</option>
                </select>
              </div>

              {/* Ano */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Ano de Expedição</label>
                <input 
                  type="number" 
                  name="ano" 
                  placeholder="Ex: 2024"
                  value={filters.ano} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  disabled={!!filters.loa} 
                />
              </div>

              {/* Situação */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Situação</label>
                <select 
                  name="situacao" 
                  value={filters.situacao} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Todas</option>
                  <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                  <option value="Pago">Pago</option>
                  <option value="Em Processamento">Em Processamento</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

               {/* Natureza */}
               <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Natureza</label>
                <select 
                  name="natureza" 
                  value={filters.natureza} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Todas</option>
                  <option value="Alimentar">Alimentar</option>
                  <option value="Comum">Comum</option>
                </select>
              </div>

              {/* Faixa de Valor Min */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Valor Mínimo (R$)</label>
                <input 
                  type="number" 
                  name="faixaValorMin" 
                  placeholder="0,00"
                  value={filters.faixaValorMin} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Faixa de Valor Max */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Valor Máximo (R$)</label>
                <input 
                  type="number" 
                  name="faixaValorMax" 
                  placeholder="0,00"
                  value={filters.faixaValorMax} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Nome Titular */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Nome do Titular</label>
                <input 
                  type="text" 
                  name="nomeTitular" 
                  placeholder="Nome parcial ou completo"
                  value={filters.nomeTitular} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* CPF */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">CPF</label>
                <input 
                  type="text" 
                  name="cpf" 
                  placeholder="Somente números"
                  value={filters.cpf} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Número Processo */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Nº do Processo</label>
                <input 
                  type="text" 
                  name="numeroProcesso" 
                  placeholder="Ex: 5001234-55.2020.4.04.7000"
                  value={filters.numeroProcesso} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Número Precatório */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Nº do Precatório</label>
                <input 
                  type="text" 
                  name="numeroPrecatorio" 
                  placeholder="Ex: PRC12345/2023"
                  value={filters.numeroPrecatorio} 
                  onChange={handleFilterChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

            </div>

            {/* Extraction Configuration */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg w-full md:w-auto">
                <AlertCircle size={20} className="text-blue-500" />
                <span className="text-xs text-slate-600">
                  Os créditos serão debitados apenas após a extração dos dados.
                </span>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-1 md:w-48">
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Quantidade a Extrair</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max={user.credits}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="pt-5">
                   <button 
                    type="submit" 
                    disabled={loading || user.credits <= 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md w-full md:w-auto justify-center hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                    {loading ? 'Processando...' : 'Extrair Dados'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {hasSearched && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div className="p-6 bg-green-50 border-b border-green-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-full text-green-600">
                   <Download size={24} />
                 </div>
                 <div>
                   <h2 className="text-lg font-bold text-green-900">Extração Concluída com Sucesso!</h2>
                   <p className="text-sm text-green-700">
                     {results.length} registros foram extraídos e debitados.
                   </p>
                 </div>
              </div>
              <button 
                onClick={handleExport}
                disabled={results.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg transform hover:scale-105"
              >
                <Download size={20} /> Baixar Excel (.xlsx)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Tribunal / UF</th>
                    <th className="px-4 py-3 whitespace-nowrap">Nº Processo / Precatório</th>
                    <th className="px-4 py-3 whitespace-nowrap">Natureza / Ano / LOA</th>
                    <th className="px-4 py-3 whitespace-nowrap">Titular / CPF</th>
                    <th className="px-4 py-3 whitespace-nowrap">Contato</th>
                    <th className="px-4 py-3 whitespace-nowrap text-right">Valor</th>
                    <th className="px-4 py-3 whitespace-nowrap text-center">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                        Nenhum precatório encontrado para os filtros e quantidade selecionados.
                      </td>
                    </tr>
                  ) : (
                    results.slice(0, 100).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-blue-900">{item.tribunal}</div>
                          <div className="text-xs text-slate-500">{item.uf} - {item.regiao}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-700" title={item.numeroProcesso}>
                            {item.numeroProcesso.substring(0, 15)}...
                          </div>
                          <div className="text-xs text-blue-600 font-mono">{item.numeroPrecatorio}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 inline-block mb-1">
                            {item.natureza}
                          </div>
                          <div className="text-slate-500">{item.ano}</div>
                          {item.loa && <div className="text-xs font-bold text-green-600">{item.loa}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{item.nomeTitular}</div>
                          <div className="text-xs text-slate-500 font-mono">{item.cpf}</div>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <div className="flex items-center gap-1 text-slate-600">
                            <span className="font-bold">W:</span> {item.whatsapp}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <span className="font-bold">E:</span> {item.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-800">
                          {formatCurrency(item.valor)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                            item.situacao === 'Pago' ? 'bg-green-100 text-green-700' :
                            item.situacao === 'Aguardando Pagamento' ? 'bg-yellow-100 text-yellow-700' :
                            item.situacao === 'Cancelado' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {item.situacao}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {results.length > 100 && (
                <div className="p-3 bg-slate-50 text-center text-xs text-slate-500 border-t border-slate-200">
                  Exibindo os primeiros 100 registros de {results.length}. Baixe a planilha para ver todos.
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200 text-xs text-slate-500 bg-slate-50 text-center">
              * Os dados apresentados são públicos e foram obtidos diretamente dos portais dos tribunais.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mining;