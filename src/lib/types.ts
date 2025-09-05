export type MockCustomers = {
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

export type MockMonthlyType = {
	month: string;
  date: string;
	fixedRevenue: number;
	variableRevenue: number;
	fixedExpense: number;
	variableExpenses: number;
};

export type MockCategoriesType = {
	name: string;
	value: number;
};

export type MockTransactionsType = {
	id: string;
	date: string;
	description: string;
	type: string;
	category: string;
	amount: number;
	account: string;
};
