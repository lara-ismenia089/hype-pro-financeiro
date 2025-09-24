import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  Calendar
} from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
	Search,
	ChevronDown,
  CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { 
	formatDate,
	currencyBRL,
  getSubcategory, 
} from "@/lib/utils";
import { Tooltip } from "react-tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MockTransactionsType } from "@/lib/types";
import React, { useState } from "react";

type TableTransactionType = {
  query: string;
  setQuery: (value: string) => void;
  endDate: Date;
  setEndDate: (value: Date) => void;
  filter: MockTransactionsType[];
};

export function TableTransaction({ 
  query, 
  filter,
  endDate,
  setQuery,
  setEndDate, 
}: TableTransactionType) {
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

  const dates = Object.keys(grouped).sort();
  let runningTotal = 0;

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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="relative">            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[180px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : <span>Até a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar transações..."
              className="pl-9 rounded-lg"
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
                {(date !== "2025-08-16" && date !== "2025-08-24") ? (<tr
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
                </tr>): <></>}

                {openCustomers[date] &&
                  transactions.transactions
                    .filter((t) => t.id !== "tx-00101" && t.id !== "tx-00111")
                    .map((t) => (
                      <React.Fragment key={t.id}>
                        <tr
                          className="border-b last:border-0 bg-white dark:bg-gray-900 transition-colors"
                          data-tooltip-id={`tooltip-${t.accountId}`}
                          data-tooltip-content={t.history}
                          data-tooltip-place="top"
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
                              t.type === "Debito"
                                ? "text-red-600 dark:text-red-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {currencyBRL(t.amount)}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
        {Object.entries(groupedWithCumulative).map(([_, transactions]) => (
          transactions.transactions.map((t) => (
            <Tooltip key={t.id} id={`tooltip-${t.accountId}`} />
          ))
        ))}
      </CardContent>
    </Card>
  );
}
