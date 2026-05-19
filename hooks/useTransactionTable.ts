"use client";

import { useMemo } from "react";

import { FinancialTransaction } from "@/lib/types";


export function useTransactionTable(
	transactions: FinancialTransaction[]
) {
	const groupedTransactions = useMemo(() => {
		const grouped = transactions.reduce<
			Record<string, FinancialTransaction[]>
		>((acc, transaction) => {
			const date = new Date(transaction.transactionDate);

			const dateKey = [
				date.getFullYear(),
				String(date.getMonth() + 1).padStart(2, "0"),
				String(date.getDate()).padStart(2, "0"),
			].join("-");

			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}

			acc[dateKey].push(transaction);

			return acc;
		}, {});

		const sortedDates = Object.keys(grouped).sort();

		const calculated = sortedDates.reduce<
			Record<
				string,
				{
					transactions: FinancialTransaction[];
					cumulative: number;
					dailyTotal: number;
				}
			>
		>((acc, date, index) => {
			const dailyTotal = grouped[date].reduce(
				(sum, transaction) => {
					if (transaction.transactionType === "credit") {
						return sum + transaction.amount;
					}

					return sum - transaction.amount;
				},
				0
			);

			const previousDate = sortedDates[index - 1];

			const previousCumulative = previousDate
				? acc[previousDate].cumulative
				: 0;

			const cumulative = previousCumulative + dailyTotal;

			acc[date] = {
				transactions: grouped[date],
				dailyTotal,
				cumulative,
			};

			return acc;
		}, {});

		return Object.fromEntries(
			Object.entries(calculated).reverse()
		);
	}, [transactions]);

	return groupedTransactions;
}