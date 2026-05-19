"use server";

import { getFinancialTransactions } from "@/app/server/dashboard/financial-transactions.service";
import { FinancialTransaction } from "@/lib/types";
import { getCategoryByAccountId } from "@/lib/utils";


function groupTransactionsByCategory(
	transactions: FinancialTransaction[],
) {
	const totalsByCategory: Record<string, number> = {};

	transactions.forEach((transaction) => {
		const category = getCategoryByAccountId(
			transaction.accountId,
		);

		totalsByCategory[category] =
			(totalsByCategory[category] || 0) +
			transaction.amount;
	});

	return Object.entries(totalsByCategory).map(
		([categoryName, totalAmount]) => ({
			categoryName,
			totalAmount,
		}),
	);
}

export async function getCategoryBreakdown() {
	const transactions =
		await getFinancialTransactions();

	const validTransactions = transactions.filter(
		(transaction) =>
			transaction.accountId !== 104 &&
			transaction.accountId !== 106,
	);

	const groupedTransactions =
		groupTransactionsByCategory(
			validTransactions,
		);

	groupedTransactions.sort(
		(a, b) => b.totalAmount - a.totalAmount,
	);

	const totalAmount = groupedTransactions.reduce(
		(accumulator, transaction) =>
			accumulator + transaction.totalAmount,
		0,
	);

	const relevantTransactions =
		groupedTransactions.filter(
			(_, index) =>
				index < 10,
		);

	return {
		totalAmount: totalAmount,
		allCategories: groupedTransactions,
		topCategories: relevantTransactions,
	};
}