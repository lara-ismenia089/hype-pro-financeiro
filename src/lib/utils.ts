import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { chartAccounts } from "@/lib/mock";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  );

export const formatDate = (date: string) => {
  const dateList = date.split('-');
  return `${dateList[2]}/${dateList[1]}/${dateList[0]}`;
}

export const getSubcategory = (accountId: number): string => {
  for (const account of chartAccounts) {
    const sub = account.subcategories.find((s) => s.accountId === accountId);
    if (sub) return sub.categories;
  }
  return "-";
}
