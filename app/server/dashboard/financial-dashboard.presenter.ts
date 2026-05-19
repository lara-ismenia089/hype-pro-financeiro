"use server";

import { mapFinancialDashboardData } from "@/app/server/dashboard/financial-dashboard.mapper";
import { getFinancialTransactions } from "@/app/server/dashboard/financial-transactions.service";
import { getCategoryBreakdown } from "@/app/server/dashboard/get-financial-category-breakdown-data";
import { getDashboardData } from "@/app/server/dashboard/get-financial-dashboard-data";
import { getFixedExpenseSummary } from "@/app/server/dashboard/get-financial-fixed-expense-data";


export async function getFinancialDashboardViewModel() {
	const dashboardData =
		await getDashboardData();

	const transactions =
		await getFinancialTransactions();

	const categoryBreakdown =
		await getCategoryBreakdown();

	const fixedExpenseSummary =
		await getFixedExpenseSummary();

	const summary =
		mapFinancialDashboardData(
			dashboardData,
		);

	return {
		summary,
		transactions,
		categoryBreakdown,
		fixedExpenseSummary,
	};
}