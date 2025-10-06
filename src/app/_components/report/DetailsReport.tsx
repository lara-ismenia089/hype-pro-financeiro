"use client";

import { useState } from "react";

import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions } from "@/lib/mock";
import { ReportGroup } from "@/lib/types";
import { currencyBRL, buildReportArray } from "@/lib/utils";

const typeColors: Record<ReportGroup["type"], string> = {
  Receita: "text-emerald-700 dark:text-emerald-400",
  Despesa: "text-red-700 dark:text-red-400",
  Custos: "text-amber-700 dark:text-amber-400",
};

const typeIcons: Record<ReportGroup["type"], React.ReactElement> = {
  Receita: <ArrowUpRight className="h-4 w-4 text-emerald-600" />,
  Despesa: <ArrowDownRight className="h-4 w-4 text-red-600" />,
  Custos: <Activity className="h-4 w-4 text-amber-600" />,
};

export function DetailsReport() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const filteredTransactions = mockTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() + 1 === month && txDate.getFullYear() === year;
  });

  const result = buildReportArray(filteredTransactions);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <CardTitle>Detalhamento por Categoria</CardTitle>

          <div className="flex gap-2">
            {/* Mês */}
            <Select value={month.toString()} onValueChange={(v) => setMonth(Number(v))}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <SelectItem key={m} value={m.toString()}>
                    {m.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ano */}
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-28"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {result.map((section) => {
            const totalSection = section.categories.reduce(
              (sum, item) => sum + item.total,
              0
            );

            return (
              <div key={section.type}>
                <h4 className={`flex items-center gap-2 font-semibold ${typeColors[section.type]}`}>
                  {typeIcons[section.type]}
                  {section.type}
                </h4>

                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {section.categories.map((item) => (
                    <li
                      key={item.category}
                      className="flex flex-col rounded-lg border bg-muted/30 p-3"
                    >
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                      <span className="text-base font-semibold">{currencyBRL(item.total)}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-3 rounded-lg p-3 font-semibold flex justify-between ${
                    section.type === "Receita"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : section.type === "Despesa"
                      ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  <span>Total</span>
                  <span>{currencyBRL(totalSection)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
