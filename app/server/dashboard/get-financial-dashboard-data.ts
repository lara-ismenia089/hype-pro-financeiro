"use server";

import { MONTH_NAME } from "@/app/server/constaint";
import { getDb } from "@/database/mongo";
import {
	FinancialDashboardData,
	MonthlyFinancialTotals,
} from "@/lib/types";


const getKey = (year: number, month: number) =>
	`${year}-${String(month + 1).padStart(2, '0')}`;

export async function getDashboardData(): Promise<FinancialDashboardData> {
	const db = await getDb();
	const data = await db.collection("transactions").find().toArray();

	if (!data.length) {
		return {
			monthlySnapshots: [],
			averageFixedOrderValue: 0,
			averageEventOrderValue: 0,
			cost: 0,
			expense: 0,
			fixedRevenue: 0,
			netIncome: 0,
			profitMargin: 0,
			totalExpenses: 0,
			totalRevenue: 0,
			variableRevenue: 0,
		};
	}

	const grouped = new Map<string, MonthlyFinancialTotals>();

	let minTime = Infinity;
	let maxTime = -Infinity;

	for (const item of data) {
		const date = new Date(item.date);
		const time = date.getTime();

		if (time < minTime) minTime = time;
		if (time > maxTime) maxTime = time;

		const year = date.getFullYear();
		const month = date.getMonth();
		const key = getKey(year, month);

		if (!grouped.has(key)) {
			grouped.set(key, {
				cost: 0,
				expense: 0,
				fixedRevenue: 0,
				variableRevenue: 0,
			});
		}

		const acc = grouped.get(key)!;

		switch (item.typeId) {
			case 1:
				if (item.accountId === 2) acc.variableRevenue += item.amount;
				if (item.accountId === 3) acc.fixedRevenue += item.amount;
				break;

			case 2:
				if (item.accountId !== 104) acc.expense += item.amount;
				break;

			case 3:
				acc.cost += item.amount;
				break;
		}
	}

	const min = new Date(minTime);
	const max = new Date(maxTime);

	const minDate = new Date(min.getFullYear(), min.getMonth(), 1);
	const maxDate = new Date(max.getFullYear(), max.getMonth(), 1);

	const result = [];
	const cursor = new Date(minDate);

	while (cursor <= maxDate) {
		const year = cursor.getFullYear();
		const month = cursor.getMonth();
		const key = `${getKey(year, month)}`;

		const values = grouped.get(key) ?? {
			cost: 0,
			expense: 0,
			fixedRevenue: 0,
			variableRevenue: 0,
		};

		result.push({
			month: MONTH_NAME[month],
			date: getKey(year, month),
			...values
		});

		cursor.setMonth(cursor.getMonth() + 1);
	}

	let activeMonths = 0;
	let totalFixed = 0;
	let totalVariable = 0;
	let totalCost = 0;
	let totalExpense = 0;

	for (const item of result) {
		if (item.fixedRevenue || item.variableRevenue) activeMonths++;

		totalFixed += item.fixedRevenue;
		totalVariable += item.variableRevenue;
		totalCost += item.cost;
		totalExpense += item.expense;
	}

	const divisor = activeMonths || 1;

	const totalRevenue = totalFixed + totalVariable;
	const totalExpenses = totalCost + totalExpense;
	const netIncome = totalRevenue - totalExpenses;
	const profitMargin = totalRevenue ? (netIncome / totalRevenue) * 100 : 0;

	return {
		monthlySnapshots: result,
		averageFixedOrderValue: totalFixed / divisor,
		averageEventOrderValue: totalVariable / divisor,

		cost: totalCost,
		expense: totalExpense,
		netIncome,
		profitMargin,
		fixedRevenue: totalFixed,
		totalRevenue,
		totalExpenses,
		variableRevenue: totalVariable,
	};
}
