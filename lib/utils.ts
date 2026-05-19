import {
  clsx,
  type ClassValue,
} from "clsx";
import { twMerge } from "tailwind-merge";

import { CHART_ACCOUNT } from "@/app/server/constaint";
import {
  FinancialTransaction,
  FinancialReportSection,
} from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

export function formatDate(date: string | Date) {
	if (typeof date === "string") {
		const [year, month, day] = date.split("T")[0].split("-");

		return `${day}/${month}/${year}`;
	}

	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return `${day}/${month}/${year}`;
}

export const getCategoryByAccountId = (
	accountId: number,
): string => {
	for (const accountGroup of CHART_ACCOUNT) {
		const matchedSubcategory =
			accountGroup.subcategories.find(
				(subcategory) =>
					subcategory.accountId === accountId,
			);

		if (matchedSubcategory) {
			return matchedSubcategory.categories;
		}
	}

	return "-";
};

export function buildReport(transactions: FinancialTransaction[]) {
  return transactions.reduce(
    (acc, t) => {
      const category = getCategoryByAccountId(t.accountId);

      if (t.transactionTypeId === 1 && t.accountId !== 106) {
        acc.revenue[category] = (acc.revenue[category] || 0) + t.amount;
      } else if (t.transactionTypeId === 2 && t.accountId !== 104) {
        acc.expense[category] = (acc.expense[category] || 0) + t.amount;
      } else if (t.transactionTypeId === 3) {
        acc.cost[category] = (acc.cost[category] || 0) + t.amount;
      }

      return acc;
    },
    {
      revenue: {} as Record<string, number>,
      expense: {} as Record<string, number>,
      cost: {} as Record<string, number>,
    }
  );
}

export function buildReportArray(
  transactions: FinancialTransaction[]
): FinancialReportSection[] {
  const grouped = buildReport(transactions);

  return [
    {
      sectionType: "Receita",
      categories: Object.entries(grouped.revenue)
        .map(([category, total]) => ({ categoryName: category, totalAmount: total }))
        .sort((a, b) => b.totalAmount - a.totalAmount),
    },
    {
      sectionType: "Despesa",
      categories: Object.entries(grouped.expense)
        .map(([category, total]) => ({ categoryName: category, totalAmount: total }))
        .sort((a, b) => b.totalAmount - a.totalAmount),
    },
    {
      sectionType: "Custos",
      categories: Object.entries(grouped.cost)
        .map(([category, total]) => ({ categoryName: category, totalAmount: total }))
        .sort((a, b) => b.totalAmount - a.totalAmount),
    },
  ];
}