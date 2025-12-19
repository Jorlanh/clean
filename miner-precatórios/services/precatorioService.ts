
import { Precatorio, FilterState, TRIBUNAIS, ESTADOS } from '../types';
import * as XLSX from 'xlsx';

// Helper to format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Helper for random ranges
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Mock Data Generator with strict requirements
const generateMockData = (count: number, filters: FilterState): Precatorio[] => {
  const generatedData: Precatorio[] = [];
  
  // If a specific tribunal is selected, use it. Otherwise, pick from the full list.
  const tribunalList = filters.tribunal ? [filters.tribunal] : TRIBUNAIS;
  
  const statusList: Precatorio['situacao'][] = ['Aguardando Pagamento', 'Pago', 'Em Processamento'];
  const naturezas: Precatorio['natureza'][] = ['Alimentar', 'Comum'];
  
  // If a specific UF is selected, use it. Otherwise, pick from full list.
  const ufs = filters.uf ? [filters.uf] : ESTADOS;
  
  // Orgaos mapping logic expanded
  const getOrgao = (tribunal: string) => {
    if (tribunal.startsWith('TRF')) return 'União Federal';
    if (tribunal.startsWith('TRT')) return 'União Federal (Trabalhista)';
    if (tribunal === 'TJSP') return 'Fazenda do Estado de São Paulo';
    if (tribunal === 'TJRJ') return 'Estado do Rio de Janeiro';
    if (tribunal === 'TJMG') return 'Estado de Minas Gerais';
    if (tribunal === 'TJRS') return 'Estado do Rio Grande do Sul';
    if (tribunal === 'TJPR') return 'Estado do Paraná';
    if (tribunal === 'TJBA') return 'Estado da Bahia';
    if (tribunal === 'TJSC') return 'Estado de Santa Catarina';
    if (tribunal === 'TJDFT') return 'Distrito Federal';
    return `Fazenda Pública Estadual (${tribunal.substring(2)})`;
  };

  for (let i = 1; i <= count; i++) {
    const tribunal = tribunalList[Math.floor(Math.random() * tribunalList.length)];
    const isFederal = tribunal.startsWith('TRF') || tribunal.startsWith('TRT');
    const uf = ufs[Math.floor(Math.random() * ufs.length)];
    
    // Logic for Ano/LOA
    let ano: number;
    if (filters.loa) {
      // If filtering by LOA, the "Ano do Precatório" (Inscricao) is typically the year prior or earlier
      const loaYear = parseInt(filters.loa.replace('LOA ', ''));
      ano = loaYear - 1; 
    } else if (filters.ano) {
      ano = parseInt(filters.ano);
    } else {
      ano = randomInt(2018, 2024);
    }
    
    // Generates a realistic value (never zero)
    let valor = randomInt(15000, 500000) + (randomInt(0, 99) / 100);
    
    // Apply value filters if present
    if (filters.faixaValorMin && valor < parseFloat(filters.faixaValorMin)) valor = parseFloat(filters.faixaValorMin) + randomInt(100, 1000);
    if (filters.faixaValorMax && valor > parseFloat(filters.faixaValorMax)) valor = parseFloat(filters.faixaValorMax) - randomInt(100, 1000);

    const cpf = filters.cpf || `${randomInt(100, 999)}.${randomInt(100, 999)}.${randomInt(100, 999)}-${randomInt(10, 99)}`;
    
    // Normalize WhatsApp format: +55 DDD 9XXXX-XXXX
    const ddd = randomInt(11, 99);
    const phonePart1 = randomInt(9000, 9999);
    const phonePart2 = randomInt(1000, 9999);
    const whatsapp = `+55 ${ddd} 9${phonePart1}-${phonePart2}`; // Strict format

    const nome = filters.nomeTitular ? `${filters.nomeTitular} ${i}` : `Credor Exemplo ${randomInt(1000, 9999)}`;

    // Generate process numbers based on court type
    const processNum = filters.numeroProcesso || (isFederal 
      ? `500${randomInt(1000, 9999)}-${randomInt(10, 99)}.${ano}.4.0${randomInt(1, 5)}.${randomInt(7000, 7999)}` // Just pattern simulation
      : `00${randomInt(10000, 99999)}-${randomInt(10, 99)}.${ano}.8.${randomInt(10, 26)}.${randomInt(0, 9999)}`
    );

    generatedData.push({
      id: `prec-${Date.now()}-${i}`,
      numeroProcesso: processNum,
      numeroPrecatorio: filters.numeroPrecatorio || `PRC${randomInt(10000, 99999)}/${ano}`,
      tribunal: tribunal,
      regiao: isFederal ? `${tribunal} Região` : 'Estadual',
      ano: ano,
      uf: uf,
      natureza: (filters.natureza as any) || naturezas[Math.floor(Math.random() * naturezas.length)],
      nomeTitular: nome,
      cpf: cpf,
      whatsapp: whatsapp,
      email: `contato.${nome.toLowerCase().replace(/ /g, '.')}@email.com`,
      valor: valor,
      situacao: (filters.situacao as any) || statusList[Math.floor(Math.random() * statusList.length)],
      tipoProcesso: 'Indenizatório',
      orgao: getOrgao(tribunal),
      loa: filters.loa || (ano >= 2024 ? `LOA ${ano + 1}` : 'Anterior')
    });
  }

  return generatedData;
};

// Simulate API fetch
export const searchPrecatorios = async (filters: FilterState, limit: number): Promise<Precatorio[]> => {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      // Generate exactly 'limit' records to simulate a successful extraction of that many items
      // This ensures we don't return 1 item or duplicate items unnecessarily.
      // In a real app, this would query the database.
      const data = generateMockData(limit, filters);
      resolve(data);
    }, 1500); 
  });
};

export const exportToExcel = (data: Precatorio[]) => {
  // Map data to the strict columns requested
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
    "Valor do Precatório": item.valor, // Raw number for Excel to format
    "WhatsApp do Titular": item.whatsapp,
    "E-mail do Titular": item.email
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Apply basic column width adjustments
  const wscols = [
    { wch: 20 }, // Num Prec
    { wch: 25 }, // Num Proc
    { wch: 10 }, // Tribunal
    { wch: 15 }, // Regiao
    { wch: 8 },  // UF
    { wch: 8 },  // Ano
    { wch: 15 }, // LOA
    { wch: 30 }, // Nome
    { wch: 15 }, // CPF
    { wch: 12 }, // Natureza
    { wch: 25 }, // Orgao
    { wch: 20 }, // Situacao
    { wch: 15 }, // Valor
    { wch: 20 }, // WhatsApp
    { wch: 30 }, // Email
  ];
  worksheet['!cols'] = wscols;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Precatórios Extraídos");

  // Generate file name
  const fileName = `Miner_Precatorios_Extracao_${new Date().toISOString().slice(0, 10)}.xlsx`;

  // Write file
  XLSX.writeFile(workbook, fileName);
};
