"use client";

import { useMemo } from "react";

import { FinancialTransaction } from "@/lib/types";
import { buildReportArray } from "@/lib/utils";


export function useCategoryDetails(
	transactions: FinancialTransaction[],
	selectedMonth: number,
	selectedYear: number,
) {
	return useMemo(() => {
		const filtered =
			transactions.filter((transaction) => {
				const transactionDate = new Date(transaction.transactionDate);

				return (
					transactionDate.getMonth() + 1 === selectedMonth &&
					transactionDate.getFullYear() === selectedYear
				);
			});

		return buildReportArray(filtered);
	}, [
		transactions,
		selectedMonth,
		selectedYear,
	]);
}