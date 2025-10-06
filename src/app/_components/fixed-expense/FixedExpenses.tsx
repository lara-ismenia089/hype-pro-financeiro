'use client';

import { useMemo, useState } from "react";

import { isAfter, isBefore } from "date-fns";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
} from "recharts";

import { Wallet, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { mockCustomers, mockExpensesFixed } from "@/lib/mock";
import { MockFixedExpense } from "@/lib/types";
import { formatDate, currencyBRL } from "@/lib/utils";

export function FixedExpenses() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const filteredExpenses = useMemo(() => {
    return mockExpensesFixed.filter((item) => {
      const due = new Date(item.dueDate);
      if (dateRange.from && isBefore(due, dateRange.from)) return false;
      if (dateRange.to && isAfter(due, dateRange.to)) return false;
      return true;
    });
  }, [dateRange]);

  const total = filteredExpenses.reduce(
    (accumulator, register) => accumulator + register.amount,
    0
  );

  const grouped = filteredExpenses.reduce<
    Record<string, MockFixedExpense[]>
  >((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const chartData = useMemo(() => {
    const revenueByDay = mockCustomers.reduce<Record<string, number>>((acc, item) => {
      const day = formatDate(item.dueDate);
      acc[day] = (acc[day] || 0) + item.monthlyFee;
      return acc;
    }, {});

    const expenseByDay = mockExpensesFixed.reduce<Record<string, number>>((acc, item) => {
      const day = formatDate(item.dueDate);
      acc[day] = (acc[day] || 0) + item.amount;
      return acc;
    }, {});

    const allDays = Array.from(new Set([...Object.keys(revenueByDay), ...Object.keys(expenseByDay)]));

    const sortedDays = allDays.sort((a, b) => {
      const [da, ma, ya] = a.split("/").map(Number);
      const [db, mb, yb] = b.split("/").map(Number);
      return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime();
    });

    return sortedDays.map((dateStr) => ({
      day: dateStr.split("/")[0],
      fullDate: dateStr,
      totalRevenue: revenueByDay[dateStr] || 0,
      totalExpense: expenseByDay[dateStr] || 0,
    }));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-medium">
              Resumo de Despesas Fixas
            </CardTitle>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange.from && dateRange.to ? (
                  <span>
                    {dateRange.from.toDateString()} - {dateRange.to.toDateString()}
                  </span>
                ) : (
                  <span>Filtrar</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) =>
                  setDateRange({
                    from: range?.from,
                    to: range?.to,
                  })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{currencyBRL(total)}</p>
          <p className="text-sm text-muted-foreground">
            {filteredExpenses.length} despesas filtradas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Receita x Despesa por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            width={500}
            height={125}
            data={chartData}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) => currencyBRL(value)}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => currencyBRL(value)}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#374151" }}
            />
            <Bar dataKey="totalRevenue" name="Receita" fill="#020E20" radius={[4, 4, 0, 0]} />
            <Bar dataKey="totalExpense" name="Despesa" fill="#031B3D" radius={[4, 4, 0, 0]} />
          </BarChart>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="space-y-8">
          {Object.entries(grouped).map(([type, expenses]) => {
            const subtotal = expenses.reduce((acc, e) => acc + e.amount, 0);
            return (
              <div
                key={type}
                className="border-t pt-6 first:border-0 first:pt-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-md font-semibold">{type}</h3>
                  <span className="text-sm font-medium text-muted-foreground">
                    Subtotal:{" "}
                    <span className="text-base font-bold text-emerald-600">
                      {currencyBRL(subtotal)}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expenses.map((item, idx) => (
                    <Card
                      key={idx}
                      className="border rounded-xl shadow-sm"
                    >
                      <CardHeader>
                        <CardTitle className="text-base font-semibold">
                          {item.description}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Vencimento:{" "}
                          <span className="font-medium">
                            {formatDate(item.dueDate)}
                          </span>
                        </p>
                        {item.observation && (
                          <p className="text-sm text-muted-foreground">
                            Obs:{" "}
                            <span className="font-medium">
                              {item.observation}
                            </span>
                          </p>
                        )}
                        <p className="text-lg font-bold text-right">
                          {currencyBRL(item.amount)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
