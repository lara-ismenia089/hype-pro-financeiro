'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
} from "@/components/ui/tabs";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ArrowDownRight,
} from "lucide-react";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "./_components/container/MainContainer";
import { FooterContainer } from "./_components/footer/FooterContainer";
import { currencyBRL } from "@/lib/utils";
import { 
  mockMonthly,
  mockTransactions,
} from "@/lib/mock";
import { Overview } from "./_components/overview/Overview";
import { TableTransaction } from "./_components/overview/TableTransaction";
import { KpiCard } from "./_components/card/KpiCard";
import { CategoriesTreemap } from "./_components/tree-map/TreeMap";
import { DetailsReport } from "./_components/report/DetailsReport";

export default function FinanceDashboardMockup() {
  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [tab, setTab] = useState("overview");
  const [kpiRevenue, setKpiRevenue] = useState(false);
  const [kpiExpense, setKpiExpense] = useState(false);

  const kpis = useMemo(() => {
    const fixedRevenue = mockMonthly.month.reduce((a, c) => a + c.fixedRevenue, 0);
    const variableRevenue = mockMonthly.month.reduce((a, c) => a + c.variableRevenue, 0);
    const cost = mockMonthly.month.reduce((a, c) => a + c.cost, 0);
    const expense = mockMonthly.month.reduce((a, c) => a + c.expense, 0);

    const totalRevenue = fixedRevenue + variableRevenue;
    const totalExpenses = cost + expense;
    const netIncome = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue ? (netIncome / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      expense,
      cost,
      netIncome,
      profitMargin,
      fixedRevenue,
      variableRevenue,
    };
  }, []);

  const filteredTx = useMemo(() => {
    const q = query.toLowerCase();

    return mockTransactions.filter((t) => {
      const matchesQuery =
        t.description.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.bank.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q);

      const txDate = new Date(t.date);
      const beforeEnd = !endDate || txDate <= new Date(endDate);

      return matchesQuery && beforeEnd;
    });
  }, [query, endDate]);

  return (
    <MainContainer>
      <Header 
        title="Hype Pro Financeiro"
        subtitle="Dashboard interativo para visão de receitas, despesas e fluxo de caixa" 
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita"
          value={currencyBRL(kpis.totalRevenue)}
          primaryLabel="Fixa"
          primaryValue={currencyBRL(kpis.fixedRevenue)}
          secondaryLabel="Variável"
          secondaryValue={currencyBRL(kpis.variableRevenue)}
          doubleResult={kpiRevenue}
          icon={<TrendingUp />}
          onIconClick={() => setKpiRevenue((prev) => !prev)}
          delay={0.02}
          description="Fixa e variável"
        />

        <KpiCard
          title="Despesas"
          value={currencyBRL(kpis.totalExpenses)}
          primaryLabel="Custo"
          primaryValue={currencyBRL(kpis.cost)}
          secondaryLabel="Despesa"
          secondaryValue={currencyBRL(kpis.expense)}
          doubleResult={kpiExpense}
          icon={<ArrowDownRight />}
          onIconClick={() => setKpiExpense((prev) => !prev)}
          delay={0.06}
          description="Custo e Despesa"
        />

        <KpiCard
          title="Resultado"
          value={currencyBRL(kpis.totalRevenue - kpis.totalExpenses)}
          description="Disponível consolidado"
          delay={0.1}
        />

        <KpiCard
          title="Margem"
          value={`${(((kpis.totalRevenue - kpis.totalExpenses) / kpis.totalRevenue) * 100).toFixed(2)}%`}
          description="Lucro líquido / Receita"
          delay={0.14}
        />
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          {/* <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger> */}
          <TabsTrigger value="categories">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Overview mockMonthly={mockMonthly.month} avg={mockMonthly.averageOrderValue} />

          <TableTransaction
            query={query}
            setQuery={setQuery}            
            endDate={endDate}
            setEndDate={setEndDate}
            filter={filteredTx}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <CategoriesTreemap />
          <DetailsReport />
        </TabsContent>
      </Tabs>
        {/* </TabsContent>

        <TabsContent value="cash-flow" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3"> */}
            {/* <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Entradas x Saídas</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthly.month} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                    <Bar dataKey="variableRevenue" name="Receita Variável" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="variableExpenses" name="Despesa Variável" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

            {/* <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Saldo Mensal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockMonthly.month.map((m) => {
                  const balance = m.variableRevenue - 0;
                  return (
                    <div key={m.month} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.month}</span>
                      <span className={`font-medium ${balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                        {currencyBRL(balance)}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card> */}
          {/* </div> */}

          {/* <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Resumo Anual Consolidado</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Receitas Fixas</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.fixedRevenue)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Receitas Variáveis</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.variableRevenue)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Despesas</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.expense)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Custos</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.cost)}</span>
              </div>
            </CardContent>
          </Card> */}

          

      <FooterContainer>
        <p className="text-xs text-muted-foreground">
          
        </p>
        <Image src={"/imagem.jpeg"} alt="Logo" width={50} height={50} />
      </FooterContainer>
    </MainContainer>
  );
}
