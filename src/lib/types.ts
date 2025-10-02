export type MockCustomers = {
	id: string;
	cnpj: string;
	companyName: string;
	fantasyName: string;
	email: string;
	phone: string;
	signedContract: string | null;
	signedDate: string | null;
	dueDate: string;
	contractTime: string | null;
	contractStatus: string;
	monthlyFee: number;
	terminationClause: string | null;
	address: {
		street: string;
		avenue: string;
		number: number;
		neighborhood: string;
		city: string;
		state: string;
	}
};

export type MockFixedExpense = {
	id: string;
  description: string;
  paymentMethod: string;
  amount: number;
  dueDate: string;
  observation: string;
	type: string;
};

export type MockCustomersVariables = {
	id: string;
	date: string;
	customer: string;
	event: string;
	total: number;
	paid: number;
	open: number;
};

export type MockMonthlyType = {
	month: string;
  date: string;
	fixedRevenue: number;
	variableRevenue: number;
	cost: number;
	expense: number;
};

export type MockCategoriesType = {
	name: string;
	value: number;
};

export type MockTransactionsType = {
	id: string;
	date: string;
	description: string;
	history: string;
	customerId: string;
	customer: string;
	typeId: number;
	type: string;
	amount: number;
	accountId: number;
	bank: string;
};

export type SubcategoriesType = {
  accountId: number;
  categories: string;
  subordinate: string;
};

export type ChartAccountsType = {
  id: number;
  type: string;
  subcategories: SubcategoriesType[];
};

export type ReportGroup = {
  type: "Receita" | "Despesa" | "Custos";
  categories: { category: string; total: number }[];
};