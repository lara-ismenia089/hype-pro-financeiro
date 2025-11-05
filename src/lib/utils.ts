import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { chartAccounts } from "@/lib/mock";

import { MockTransactionsType, ReportGroup } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  );

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-br");
}

export const getSubcategory = (accountId: number): string => {
  for (const account of chartAccounts) {
    const sub = account.subcategories.find((s) => s.accountId === accountId);
    if (sub) return sub.categories;
  }
  return "-";
}

export function buildReport(transactions: MockTransactionsType[]) {
  return transactions.reduce(
    (acc, t) => {
      const category = getSubcategory(t.accountId);

      if (t.typeId === 1 && t.accountId !== 106) {
        acc.revenue[category] = (acc.revenue[category] || 0) + t.amount;
      } else if (t.typeId === 2 && t.accountId !== 104) {
        acc.expense[category] = (acc.expense[category] || 0) + t.amount;
      } else if (t.typeId === 3) {
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

export function buildReportArray(transactions: MockTransactionsType[]): ReportGroup[] {
  const grouped = buildReport(transactions);

  return [
    {
      type: "Receita",
      categories: Object.entries(grouped.revenue)
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total),
    },
    {
      type: "Despesa",
      categories: Object.entries(grouped.expense)
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total),
    },
    {
      type: "Custos",
      categories: Object.entries(grouped.cost)
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total),
    },
  ];
}
