import {
	FinancialBreakdown,
	FinancialDashboardData,
	FinancialIndicators,
	FinancialMetric,
	MonthlyFinancialSnapshot,
} from "@/lib/types";


function buildRevenueBreakdown(
	data: FinancialDashboardData
): FinancialBreakdown {
	return {
		fixed: {
			label: "Fixa",
			amount: data.fixedRevenue ?? 0,
		},

		variable: {
			label: "Variável",
			amount: data.variableRevenue ?? 0,
		},

		total: {
			label: "Fixa e Variável",
			amount: data.totalRevenue ?? 0,
		},
	};
}

function buildExpenseBreakdown(
	data: FinancialDashboardData
): FinancialBreakdown {
	return {
		fixed: {
			label: "Despesa",
			amount: data.expense ?? 0,
		},

		variable: {
			label: "Custo",
			amount: data.cost ?? 0,
		},

		total: {
			label: "Custo e Despesa",
			amount: data.totalExpenses ?? 0,
		},
	};
}

function buildBalanceMetric(
	data: FinancialDashboardData
): FinancialMetric {
	return {
		label: "Disponível Consolidado",
		amount: data.netIncome ?? 0,
	};
}

function buildProfitMarginMetric(
	data: FinancialDashboardData
): FinancialMetric {
	return {
		label: "Lucro Líquido / Receita",
		amount: data.profitMargin ?? 0,
	};
}

function buildFinancialIndicators(
	data: FinancialDashboardData
): FinancialIndicators {
	return {
		averageEventOrderValue:
			data.averageEventOrderValue,

		averageFixedOrderValue:
			data.averageFixedOrderValue,

		totalCost: data.cost ?? 0,

		totalExpense: data.expense ?? 0,

		totalRevenue: data.totalRevenue ?? 0,
	};
}

function buildMonthlySnapshots(
	data: FinancialDashboardData
): MonthlyFinancialSnapshot[] {
	return data.monthlySnapshots;
}

export function mapFinancialDashboardData(
	data: FinancialDashboardData
) {
	return {
		revenue:
			buildRevenueBreakdown(data),

		expense:
			buildExpenseBreakdown(data),

		balance: {
			consolidated:
				buildBalanceMetric(data),
		},

		margin: {
			profit:
				buildProfitMarginMetric(data),
		},

		indicators:
			buildFinancialIndicators(data),

		monthlySnapshots:
			buildMonthlySnapshots(data),
	};
}