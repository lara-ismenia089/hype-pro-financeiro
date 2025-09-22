import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { 
	Search,
	ChevronDown, 
} from "lucide-react";
import { 
	formatDate,
	currencyBRL,
  getSubcategory, 
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MockTransactionsType } from "@/lib/types";
import React, { useState } from "react";

type TableTransactionType = {
  query: string;
  setQuery: (value: string) => void;
  filter: MockTransactionsType[];
};

export function TableTransaction({ query, setQuery, filter }: TableTransactionType) {
  const [openCustomers, setOpenCustomers] = useState<Record<string, boolean>>({});

  const toggleCustomer = (date: string) => {
    setOpenCustomers((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const grouped = filter.reduce<Record<string, MockTransactionsType[]>>((acc, transaction) => {
    if (!acc[transaction.date]) acc[transaction.date] = [];
    acc[transaction.date].push(transaction);
    return acc;
  }, {});

  // Ordenar as datas
  const dates = Object.keys(grouped).sort();
  let runningTotal = 0;

  // Criar novo objeto mantendo arrays + acumulado
  const groupedWithCumulative = dates.reduce<Record<string, { transactions: MockTransactionsType[]; cumulative: number }>>(
    (acc, date) => {
      const dailySum = grouped[date].reduce((sum, t) => t.typeId <= 1 ? sum + t.amount : sum - t.amount, 0);
      runningTotal += dailySum;

      acc[date] = {
        transactions: grouped[date],
        cumulative: runningTotal,
      };
      return acc;
    },
    {}
  );


  return (
    <Card className="shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Movimentações</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar transações por descrição, categoria ou tipo..."
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4 pl-4">Data</th>
              <th className="py-2 pr-4">Cliente</th>
              <th className="py-2 pr-4">Descrição</th>
              <th className="py-2 pr-4">Categoria</th>
              <th className="py-2 pr-4">Subcategoria</th> 
              <th className="py-2 pr-4 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {filter.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-muted-foreground">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              Object.entries(groupedWithCumulative).map(([date, transactions]) => (
                <React.Fragment key={date}>
                <tr
                  className="bg-gray-100 dark:bg-gray-800 font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleCustomer(date)}
                >
                  <td colSpan={6} className="py-2 px-4">
                    <div className="flex justify-between items-center w-full">
                      <span className="truncate font-medium">{formatDate(date)}</span>
                      <span className="flex items-center gap-4">
                        <span className="font-normal text-sm text-muted-foreground">
                          {currencyBRL(transactions.cumulative)}
                        </span>
                        <span className={`transition-transform duration-200 ${openCustomers[date] ? "rotate-180" : ""}`}>
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>

                  {openCustomers[date] &&
                    transactions.transactions.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b last:border-0 bg-white dark:bg-gray-900 transition-colors"
                      >
                        <td className="py-2 pr-4 pl-4">{formatDate(t.date)}</td>
                        <td className="py-2 pr-4">{t.customer.toLowerCase()}</td>
                        <td className="py-2 pr-4">{t.description}</td>
                        <td className="py-2 pr-4">
                          <Badge variant={t.typeId === 1 ? "default" : "secondary"}>
                            {t.type}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4 pl-4">
                          {getSubcategory(t.accountId)}
                        </td>
                        <td
                          className={`py-2 pr-0 text-right font-medium ${
                            t.type === "Débito"
                              ? "text-red-600 dark:text-red-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {currencyBRL(t.amount)}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
