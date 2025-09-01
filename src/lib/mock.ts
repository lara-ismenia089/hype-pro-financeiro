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

type MockPartnerships = {
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

export const mockPartnerships: MockPartnerships[] = [
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
		monthlyFee: 1500.00,
		terminationClause: "Rescisão com aviso prévio de 60 dias.",
		address: {
			street: "Rua das Flores",
			neighborhood: "Centro",
			number: "1200",
			zipCode: "01010-000",
			city: "São Paulo",
			state: "SP",
			country: "Brasil"
		}
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
		monthlyFee: 800.00,
		terminationClause: "Rescisão com aviso prévio de 30 dias.",
		address: {
			street: "Av. Atlântica",
			neighborhood: "Copacabana",
			number: "505",
			zipCode: "22010-001",
			city: "Rio de Janeiro",
			state: "RJ",
			country: "Brasil"
		}
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
			country: "Brasil"
		}
	}
]