import axios from 'axios';
import { Precatorio, FilterState, User } from '../types';
import * as XLSX from 'xlsx';

// --- CONFIGURAÇÃO DA API ---
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Anexa o Token automaticamente
api.interceptors.request.use((config) => {
  const userJson = localStorage.getItem('miner_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error("Erro ao ler token", e);
    }
  }
  return config;
});

// --- HELPER FUNCTIONS ---
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// --- LOGIN REAL ---
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const userData = response.data;
    localStorage.setItem('miner_user', JSON.stringify(userData));
    return userData;
  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.code === "ERR_NETWORK") {
      throw new Error('Erro de Conexão: O servidor Backend está desligado.');
    }
    if (error.response && error.response.status === 403) {
       throw new Error('Email ou senha incorretos.');
    }
    throw new Error('Falha ao conectar com o servidor.');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('miner_user');
  window.location.reload();
};

// --- BUSCA REAL (SEM MOCKS) ---
export const searchPrecatorios = async (filters: FilterState, limit: number): Promise<Precatorio[]> => {
  try {
    console.log("Conectando ao Backend Java...");
    
    // Tenta buscar no servidor
    const response = await api.post('/precatorios/search', filters, {
      params: { limit }
    });

    console.log("Dados recebidos:", response.data);
    return response.data;

  } catch (error: any) {
    console.error('Erro na mineração:', error);

    // 1. Se o servidor estiver desligado (Network Error)
    if (error.code === "ERR_NETWORK") {
        throw new Error("Conexão Recusada: O Backend (Java) parece estar desligado ou inacessível na porta 8080.");
    }

    // 2. Erro de Sessão (Token Inválido)
    if (error.response && error.response.status === 403) {
        throw new Error("Sessão expirada. Faça login novamente.");
    }

    // 3. Erro de Saldo ou Regra de Negócio (Vem do Java)
    if (error.response && error.response.data) {
        // Se o Java mandou uma mensagem de texto, exibe ela
        if (typeof error.response.data === 'string') {
             throw new Error(error.response.data); 
        }
        // Se mandou JSON com campo 'message' ou 'error'
        if (error.response.data.message) throw new Error(error.response.data.message);
        if (error.response.data.error) throw new Error(error.response.data.error);
    }

    // 4. Erro genérico
    throw new Error("Erro desconhecido ao buscar dados no servidor.");
  }
};

// --- EXPORTAÇÃO EXCEL ---
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
  XLSX.writeFile(workbook, `Miner_Precatorios_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export const sendContactForm = async (data: any) => {
  // Apenas simulação de envio de email de contato
  return new Promise((resolve) => setTimeout(resolve, 1000));
};