export type MockMonthlyType = {
	month: string;
	fixedRevenue: number;
	variableRevenue: number;
	fixedExpense: number;
	variableExpenses: number;
};

export const mockMonthly: MockMonthlyType[] = [
	{
		month: "Ago",
		fixedRevenue: 2875.99,
		fixedExpense: 3528.53,
		variableRevenue: 2749.54,
		variableExpenses: 1736.63
	},
	{
		month: "Set",
		fixedRevenue: 3000,
		fixedExpense: 2800,
		variableRevenue: 2568.89,
		variableExpenses: 1897.57
	},
	{
		month: "Out",
		fixedRevenue: 3000,
		fixedExpense: 2800,
		variableRevenue: 3128.45,
		variableExpenses: 2341.12
	},
	{
		month: "Nov",
		fixedRevenue: 3000,
		fixedExpense: 2800,
		variableRevenue: 1544.67,
		variableExpenses: 2027.34
	},
	{
		month: "Dez",
		fixedRevenue: 3000,
		fixedExpense: 2800,
		variableRevenue: 3000,
		variableExpenses: 2000
	},
]

type MockCategoriesType = {
	name: string;
	value: number;
};

export const mockCategories: MockCategoriesType[] = [
	{ name: "Folha", value: 38000 },
	{ name: "Infraestrutura", value: 12000 },
	{ name: "Marketing", value: 8000 },
	{ name: "Operacional", value: 15000 },
	{ name: "Impostos", value: 9000 },
];

export type MockTransactionsType = {
	id: string;
	date: string;
	description: string;
	type: string;
	category: string;
	amount: number;
	account: string;
};

export const mockTransactions: MockTransactionsType[] = [
	{
		id: "tx-001",
		date: "2025-08-01",
		description: "Assinatura SaaS",
		type: "Despesa",
		category: "Infraestrutura",
		amount: -1200.5,
		account: "Banco Principal",
	},
	{
		id: "tx-002",
		date: "2025-08-02",
		description: "Venda Plano Enterprise",
		type: "Receita",
		category: "Vendas",
		amount: 18000,
		account: "Banco Principal",
	},
	{
		id: "tx-003",
		date: "2025-08-03",
		description: "Campanha Ads",
		type: "Despesa",
		category: "Marketing",
		amount: -3500,
		account: "Cartão Corporativo",
	},
	{
		id: "tx-004",
		date: "2025-08-04",
		description: "Serviço de Consultoria",
		type: "Receita",
		category: "Serviços",
		amount: 9500,
		account: "Banco Secundário",
	},
	{
		id: "tx-005",
		date: "2025-08-05",
		description: "Impostos Federais",
		type: "Despesa",
		category: "Impostos",
		amount: -7000,
		account: "Banco Principal",
	},
];

type MockCustomers = {
	cnpj: string;
	companyName: string;
	fantasyName: string;
	email: string;
	phone: string;
	signedContract: string | null;
	signedDate: string | null;
	dueDate: string | null;
	contractTime: string | null;
	contractStatus: string;
	monthlyFee: number;
	terminationClause: string | null;
	address: {
		street: string;
		neighborhood: string;
		number: string;
		zipCode: string;
		city: string;
		state: string;
		country: string;
	}
};

export const mockCustomers: MockCustomers[] = [
  {
    cnpj: "98.636.752/0001-63",
    companyName: "Empresa ABC LTDA.",
    fantasyName: "Empresa ABC",
    email: "contato@empresaabc.com.br",
    phone: "(11) 98888-7777",
    signedContract: "Contrato_ABC_2025.pdf",
    signedDate: "2025-01-10",
    dueDate: "2026-01-10",
    contractTime: "12 meses",
    contractStatus: "ativo",
    monthlyFee: 1500.0,
    terminationClause: "Rescisão com aviso prévio de 60 dias.",
    address: {
      street: "Rua das Flores",
      neighborhood: "Centro",
      number: "1200",
      zipCode: "01010-000",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    },
  },
  {
    cnpj: "21.456.789/0001-44",
    companyName: "Tech Solutions ME",
    fantasyName: "Tech Soluções",
    email: "suporte@techsolucoes.com",
    phone: "(21) 97777-6666",
    signedContract: "Contrato_Tech_2023.pdf",
    signedDate: "2023-05-15",
    dueDate: "2024-05-15",
    contractTime: "12 meses",
    contractStatus: "vencido",
    monthlyFee: 800.0,
    terminationClause: "Rescisão com aviso prévio de 30 dias.",
    address: {
      street: "Av. Atlântica",
      neighborhood: "Copacabana",
      number: "505",
      zipCode: "22010-001",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brasil",
    },
  },
  {
    cnpj: "35.987.654/0001-09",
    companyName: "Comercial Delta S.A.",
    fantasyName: "Delta Comércio",
    email: "delta@comercialdelta.com",
    phone: "(31) 96666-5555",
    signedContract: null,
    signedDate: null,
    dueDate: null,
    contractTime: null,
    contractStatus: "em análise",
    monthlyFee: 0,
    terminationClause: null,
    address: {
      street: "Rua Minas Gerais",
      neighborhood: "Funcionários",
      number: "320",
      zipCode: "30130-000",
      city: "Belo Horizonte",
      state: "MG",
      country: "Brasil",
    },
  },
  {
    cnpj: "12.345.678/0001-22",
    companyName: "Alpha Consultoria Ltda.",
    fantasyName: "Alpha Consult",
    email: "contato@alphaconsult.com",
    phone: "(41) 95555-4444",
    signedContract: "Contrato_Alpha_2024.pdf",
    signedDate: "2024-07-01",
    dueDate: "2025-07-01",
    contractTime: "12 meses",
    contractStatus: "ativo",
    monthlyFee: 2200.0,
    terminationClause: "Rescisão somente com multa proporcional.",
    address: {
      street: "Av. Sete de Setembro",
      neighborhood: "Centro",
      number: "150",
      zipCode: "80010-000",
      city: "Curitiba",
      state: "PR",
      country: "Brasil",
    },
  },
  {
    cnpj: "87.654.321/0001-55",
    companyName: "Logística Rápida S/A",
    fantasyName: "Rápida Log",
    email: "financeiro@rapidalog.com",
    phone: "(51) 94444-3333",
    signedContract: "Contrato_RapidaLog_2022.pdf",
    signedDate: "2022-02-20",
    dueDate: "2023-02-20",
    contractTime: "12 meses",
    contractStatus: "rescindido",
    monthlyFee: 3000.0,
    terminationClause: "Rescisão antecipada por descumprimento contratual.",
    address: {
      street: "Rua dos Andradas",
      neighborhood: "Centro Histórico",
      number: "890",
      zipCode: "90020-010",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
    },
  },
  {
    cnpj: "44.222.111/0001-88",
    companyName: "StartUp Inova ME",
    fantasyName: "InovaTech",
    email: "hello@inovatech.com",
    phone: "(85) 93333-2222",
    signedContract: "Contrato_Inova_2025.pdf",
    signedDate: "2025-03-01",
    dueDate: "2025-09-01",
    contractTime: "6 meses",
    contractStatus: "pendente",
    monthlyFee: 1200.0,
    terminationClause: "Cláusula em negociação.",
    address: {
      street: "Av. Beira Mar",
      neighborhood: "Meireles",
      number: "456",
      zipCode: "60165-121",
      city: "Fortaleza",
      state: "CE",
      country: "Brasil",
    },
  },
  {
    cnpj: "77.888.999/0001-33",
    companyName: "Agro Vale do Sol LTDA.",
    fantasyName: "Vale do Sol Agro",
    email: "agro@valedosol.com",
    phone: "(62) 92222-1111",
    signedContract: "Contrato_Vale_2024.pdf",
    signedDate: "2024-09-15",
    dueDate: "2025-09-15",
    contractTime: "12 meses",
    contractStatus: "em renovação",
    monthlyFee: 5000.0,
    terminationClause: "Rescisão com aviso de 90 dias.",
    address: {
      street: "Rodovia BR-153",
      neighborhood: "Zona Rural",
      number: "Km 45",
      zipCode: "74000-000",
      city: "Goiânia",
      state: "GO",
      country: "Brasil",
    },
  },
];
