export type MonthlyFinancialSnapshot = {
	cost: number;
	date: string;
	month: string;
	expense: number;
	fixedRevenue: number;
	variableRevenue: number;
};

export type ChartSummary = {
	month: string;
	totalRevenue: number;
	totalExpense: number;
};

export type FinancialDashboardData = {
	monthlySnapshots: MonthlyFinancialSnapshot[];

	averageFixedOrderValue: number;
	averageEventOrderValue: number;

	cost?: number;
	expense?: number;

	netIncome?: number;
	profitMargin?: number;

	fixedRevenue?: number;
	variableRevenue?: number;

	totalRevenue?: number;
	totalExpenses?: number;
};

export type FinancialMetric = {
	label: string;
	amount?: number;
};

export type FinancialCategoryKey =
	| "fixed"
	| "variable"
	| "total";

export type FinancialBreakdown = Record<
	FinancialCategoryKey,
	FinancialMetric
>;

export type FinancialIndicators = {
	averageEventOrderValue: number;
	averageFixedOrderValue: number;

	totalCost?: number;
	totalExpense?: number;

	totalRevenue: number;
};

export type TransactionKind = "credit" | "debit";

export type FinancialTransaction = {
	id: string;

	bankName: string;

	transactionDate: Date;

	transactionType: TransactionKind;
	transactionTypeId: number;

	amount: number;

	historyDescription: string;
	description: string;

	customerName: string;
	customerId: string;

	accountId: number;
};

export type MonthlyFinancialTotals = {
	cost: number;
	expense: number;
	fixedRevenue: number;
	variableRevenue: number;
};

export type Subcategories = {
  accountId: number;
  categories: string;
  subordinate: string;
};

export type ChartAccounts = {
  id: number;
  type: string;
  subcategories: Subcategories[];
};

export type FinancialCategorySummary = {
	categoryName: string;
	totalAmount: number;
};

export type FinancialReportSection = {
	sectionType: string;
	categories: FinancialCategorySummary[];
};


export type FixedExpense = {
	id: string;
	description: string | null;
	paymentMethod: string | null;
	amount: number;
	dueDate: Date | null;
	notes: string | null;
	category: string | null;
};

export type FixedExpensesByCategory = Record<
	string,
	FixedExpense[]
>;

export type CustomerAddress = {
	street: string | null;
	avenue: string | null;
	number: number;
	neighborhood: string | null;
	city: string;
	state: string;
};

export type Customer = {
	id: string;

	cnpj: string;
	legalName: string;
	tradeName: string;

	email: string;
	phone: string;

	contractSignedAt: Date | null;
	contractExpiresAt: Date | null;
	paymentDueDate: Date;

	monthlyFee: number;
	contractStatus: string;
	terminationClause: string | null;

	address: CustomerAddress;
};

export type Event = {
	id: string;

	date: Date;
	customer: string;

	eventAmount: number;

	totalAmount: number;
	paidAmount: number;
	openAmount: number;
};

export type DailyFinancial = {
	day: string,
	fullDate: string,
	totalRevenue: number;
	totalExpense: number;
};