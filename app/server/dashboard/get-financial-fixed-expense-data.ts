"use server";

import { getFixedExpenses } from "@/app/server/dashboard/fixed-expense.service";
import {
	Customer,
	DailyFinancial,
	FixedExpense,
	FixedExpensesByCategory,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

import { getCustomers } from "../customers/customer.service";


function calculateTotalFixedExpenseAmount(
	expenses: FixedExpense[],
): number {
	return expenses.reduce(
		(totalAmount, expense) =>
			totalAmount + expense.amount,
		0,
	);
}

function groupFixedExpensesByCategory(
	expenses: FixedExpense[],
): FixedExpensesByCategory {
	return expenses.reduce<FixedExpensesByCategory>(
		(groupedExpenses, expense) => {
			if (!expense.category) {
				return groupedExpenses;
			}

			if (!groupedExpenses[expense.category]) {
				groupedExpenses[
					expense.category
				] = [];
			}

			groupedExpenses[
				expense.category
			].push(expense);

			return groupedExpenses;
		},
		{},
	);
}

function buildDailyFinancialChartData(
	expenses: FixedExpense[],
	customers: Customer[]
): DailyFinancial[] {
	const revenueTotalsByDate =
		customers.reduce<Record<string, number>>(
			(accumulator, customer) => {
				if (!customer.paymentDueDate) {
					return accumulator;
				}

				const formattedDate = formatDate(
					customer.paymentDueDate,
				);

				accumulator[formattedDate] =
					(accumulator[formattedDate] || 0) +
					customer.monthlyFee;

				return accumulator;
			},
			{},
		);

	const expenseTotalsByDate =
		expenses.reduce<Record<string, number>>(
			(accumulator, expense) => {
				if (!expense.dueDate) {
					return accumulator;
				}

				const formattedDate = formatDate(
					expense.dueDate,
				);

				accumulator[formattedDate] =
					(accumulator[formattedDate] || 0) +
					expense.amount;

				return accumulator;
			},
			{},
		);

	const uniqueDates = Array.from(
		new Set([
			...Object.keys(revenueTotalsByDate),
			...Object.keys(expenseTotalsByDate),
		]),
	);

	const sortedDates = uniqueDates.sort(
		(dateA, dateB) => {
			const [dayA, monthA, yearA] =
				dateA.split("/").map(Number);

			const [dayB, monthB, yearB] =
				dateB.split("/").map(Number);

			return (
				new Date(
					yearA,
					monthA - 1,
					dayA,
				).getTime() -
				new Date(
					yearB,
					monthB - 1,
					dayB,
				).getTime()
			);
		},
	);

	return sortedDates.map((formattedDate) => ({
		day: formattedDate.split("/")[0],
		fullDate: formattedDate,
		totalRevenue:
			revenueTotalsByDate[
				formattedDate
			] || 0,
		totalExpense:
			expenseTotalsByDate[
				formattedDate
			] || 0,
	}));
}

export async function getFixedExpenseSummary() {
	const [expenses, customers] = await Promise.all([
		getFixedExpenses(),
		getCustomers(),
	]);

	const totalAmount =
		calculateTotalFixedExpenseAmount(
			expenses,
		);

	const expensesByCategory =
		groupFixedExpensesByCategory(
			expenses,
		);
	
	const dailyFinancialChartData =
		buildDailyFinancialChartData(
			expenses,
			customers,
		);

	return {
		totalAmount,
		expensesByCategory,
		dailyFinancialChartData,
	};
}