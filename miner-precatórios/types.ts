
export interface Precatorio {
  id: string;
  numeroProcesso: string;
  numeroPrecatorio: string;
  tribunal: string;
  regiao: string;
  ano: number;
  uf: string;
  natureza: 'Alimentar' | 'Comum';
  nomeTitular: string;
  cpf: string;
  whatsapp: string;
  email: string;
  valor: number;
  situacao: 'Pago' | 'Aguardando Pagamento' | 'Cancelado' | 'Em Processamento';
  tipoProcesso: string;
  orgao: string;
  loa?: string; // Added LOA field
}

export interface FilterState {
  tribunal: string;
  ano: string;
  uf: string;
  faixaValorMin: string;
  faixaValorMax: string;
  situacao: string;
  nomeTitular: string;
  cpf: string;
  natureza: string;
  numeroProcesso: string;
  numeroPrecatorio: string;
  loa: string; // Added LOA filter
}

export interface UserStats {
  totalSearches: number;
  totalRecordsExtracted: number;
  joinDate: string;
}

export interface User {
  email: string;
  role: 'master' | 'user';
  name: string;
  credits: number;
  stats: UserStats;
}

export const TRIBUNAIS = [
  // TRFs
  'TRF1', 'TRF2', 'TRF3', 'TRF4', 'TRF5', 'TRF6',
  // TJs
  'TJAC', 'TJAL', 'TJAP', 'TJAM', 'TJBA', 'TJCE', 'TJDFT', 'TJES', 
  'TJGO', 'TJMA', 'TJMT', 'TJMS', 'TJMG', 'TJPA', 'TJPB', 'TJPR', 
  'TJPE', 'TJPI', 'TJRJ', 'TJRN', 'TJRS', 'TJRO', 'TJRR', 'TJSC', 
  'TJSP', 'TJSE', 'TJTO',
  // TRTs (Principais/Regionais)
  'TRT1', 'TRT2', 'TRT3', 'TRT4', 'TRT5', 'TRT6', 'TRT7', 'TRT8',
  'TRT9', 'TRT10', 'TRT11', 'TRT12', 'TRT13', 'TRT14', 'TRT15', 
  'TRT16', 'TRT17', 'TRT18', 'TRT19', 'TRT20', 'TRT21', 'TRT22', 
  'TRT23', 'TRT24'
];

export const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];
