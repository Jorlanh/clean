import axios from 'axios';
import { Precatorio, FilterState, TRIBUNAIS, ESTADOS, User } from '../types';
import * as XLSX from 'xlsx';

// --- CONFIGURAÇÃO DA API REAL ---
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Adiciona o Token JWT em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const userJson = localStorage.getItem('miner_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      // Se o backend retornar o token, ele deve estar salvo aqui
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error("Erro ao ler usuário do cache", e);
    }
  }
  return config;
});

// --- FUNÇÕES DE AUTENTICAÇÃO REAIS ---

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    // Bate no Backend Java
    const response = await api.post('/auth/login', { email, password });
    
    // O Backend retorna: { token, id, name, email, credits, ... }
    const userData = response.data;
    
    // Salva no navegador para persistir o login e o token
    localStorage.setItem('miner_user', JSON.stringify(userData));
    
    return userData;
  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.response && error.response.status === 403) {
       throw new Error('Email ou senha incorretos.');
    }
    throw new Error('Falha ao conectar com o servidor. Verifique se o Backend está rodando.');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('miner_user');
  window.location.reload();
};

// --- HELPER FUNCTIONS (MANTIDAS) ---

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- GERADOR DE DADOS MOCKADOS (MANTIDO COMO BACKUP) ---
// (Esta função foi mantida conforme solicitado, caso precise testar offline)
const generateMockData = (count: number, filters: FilterState): Precatorio[] => {
  const generatedData: Precatorio[] = [];
  const tribunalList = filters.tribunal ? [filters.tribunal] : TRIBUNAIS;
  const statusList: Precatorio['situacao'][] = ['Aguardando Pagamento', 'Pago', 'Em Processamento'];
  const naturezas: Precatorio['natureza'][] = ['Alimentar', 'Comum'];
  const ufs = filters.uf ? [filters.uf] : ESTADOS;
  
  const getOrgao = (tribunal: string) => {
    if (tribunal.startsWith('TRF')) return 'União Federal';
    if (tribunal === 'TJSP') return 'Fazenda do Estado de São Paulo';
    return `Fazenda Pública Estadual (${tribunal.substring(2)})`;
  };

  for (let i = 1; i <= count; i++) {
    const tribunal = tribunalList[Math.floor(Math.random() * tribunalList.length)];
    const isFederal = tribunal.startsWith('TRF') || tribunal.startsWith('TRT');
    const uf = ufs[Math.floor(Math.random() * ufs.length)];
    let ano = filters.ano ? parseInt(filters.ano) : randomInt(2018, 2024);
    let valor = randomInt(15000, 500000);
    const cpf = filters.cpf || `${randomInt(100, 999)}.${randomInt(100, 999)}.${randomInt(100, 999)}-${randomInt(10, 99)}`;
    const whatsapp = `+55 ${randomInt(11, 99)} 9${randomInt(9000, 9999)}-${randomInt(1000, 9999)}`;
    const nome = filters.nomeTitular ? `${filters.nomeTitular} ${i}` : `Credor Simulado ${randomInt(1000, 9999)}`;
    const processNum = `00${randomInt(10000, 99999)}-${randomInt(10, 99)}.${ano}.8.26.0000`;

    generatedData.push({
      id: `prec-mock-${i}`,
      numeroProcesso: processNum,
      numeroPrecatorio: `PRC${randomInt(10000, 99999)}/${ano}`,
      tribunal: tribunal,
      regiao: isFederal ? `${tribunal} Região` : 'Estadual',
      ano: ano,
      uf: uf,
      natureza: naturezas[0],
      nomeTitular: nome,
      cpf: cpf,
      whatsapp: whatsapp,
      email: `mock.${nome.toLowerCase().replace(/ /g, '.')}@email.com`,
      valor: valor,
      situacao: statusList[0],
      tipoProcesso: 'Ordinário',
      orgao: getOrgao(tribunal),
      loa: ano >= 2024 ? `LOA ${ano + 1}` : 'Anterior'
    });
  }
  return generatedData;
};

// --- FUNÇÃO PRINCIPAL DE BUSCA (AGORA CONECTADA AO JAVA) ---

export const searchPrecatorios = async (filters: FilterState, limit: number): Promise<Precatorio[]> => {
  try {
    // Tenta conectar no Backend Real
    console.log("Iniciando busca no servidor Java...");
    
    // POST /api/precatorios/search
    // O Token vai automaticamente pelo interceptor configurado acima
    const response = await api.post('/precatorios/search', filters, {
      params: { limit }
    });

    console.log("Dados recebidos do Java:", response.data);
    return response.data;

  } catch (error: any) {
    console.error('Erro na mineração real:', error);

    // Se o erro for de autenticação (Token expirado ou inválido)
    if (error.response && error.response.status === 403) {
        throw new Error("Sessão expirada. Por favor, faça login novamente.");
    }

    // Se o erro for de saldo
    if (error.response && error.response.data && typeof error.response.data === 'string') {
        throw new Error(error.response.data); // Ex: "Saldo insuficiente"
    }

    // FALLBACK (Opcional): Se o backend estiver desligado, usa os dados mockados 
    // para não quebrar a apresentação, mas avisa no console.
    // Se quiser DESATIVAR o fallback e mostrar erro, comente as linhas abaixo.
    console.warn("Backend indisponível. Usando dados mockados locais (Fallback).");
    return generateMockData(limit, filters);
  }
};

// --- EXPORTAÇÃO EXCEL (MANTIDA) ---

export const exportToExcel = (data: Precatorio[]) => {
  const rows = data.map(item => ({
    "Número do Precatório": item.numeroPrecatorio,
    "Número do Processo": item.numeroProcesso,
    "Tribunal": item.tribunal,
    "Região": item.regiao,
    "Estado": item.uf,
    "Ano de Expedição": item.ano,
    "LOA (Orçamento)": item.loa || '-',
    "Nome do Titular": item.nomeTitular,
    "CPF": item.cpf,
    "Natureza": item.natureza,
    "Órgão": item.orgao,
    "Situação": item.situacao,
    "Valor do Precatório": item.valor,
    "WhatsApp do Titular": item.whatsapp,
    "E-mail do Titular": item.email
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const wscols = [
    { wch: 20 }, { wch: 25 }, { wch: 10 }, { wch: 15 }, { wch: 8 }, 
    { wch: 8 }, { wch: 15 }, { wch: 30 }, { wch: 15 }, { wch: 12 }, 
    { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 30 },
  ];
  worksheet['!cols'] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Precatórios Extraídos");

  const fileName = `Miner_Precatorios_Extracao_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

// Simulação de envio de formulário
export const sendContactForm = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Enviado com sucesso!" });
    }, 1500);
  });
};