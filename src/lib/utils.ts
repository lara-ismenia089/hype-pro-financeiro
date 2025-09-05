import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  );

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('pt-br') + ' ' +
  new Date(date).toLocaleTimeString("pt-br");