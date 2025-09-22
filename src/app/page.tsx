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
// import {
//   Select, 
//   SelectItem,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
// } from "@/components/ui/select";
import {
  Bar,
  // Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  // Wallet,
  // Calendar,
  TrendingUp,
  // ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "./_components/container/MainContainer";
import { FooterContainer } from "./_components/footer/FooterContainer";
import { currencyBRL } from "@/lib/utils";
import { 
  mockMonthly,
  // mockCategories,
  mockTransactions,
} from "@/lib/mock";
import { Overview } from "./_components/overview/Overview";
import { TableTransaction } from "./_components/overview/TableTransaction";
import { KpiCard } from "./_components/card/KpiCard";
import { StackedColumnChart } from "./_components/fixed-variable/StackedColumnChart";

export default function FinanceDashboardMockup() {
  // const [range, setRange] = useState("12m");
  // const [account, setAccount] = useState("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("overview");
  const [kpiRevenue, setKpiRevenue] = useState(false);
  const [kpiExpense, setKpiExpense] = useState(false);

  const kpis = useMemo(() => {
    const fixedRevenue = mockMonthly.reduce((a, c) => a + c.fixedRevenue, 0);
    const variableRevenue = mockMonthly.reduce((a, c) => a + c.variableRevenue, 0);
    const cost = mockMonthly.reduce((a, c) => a + c.cost, 0);
    const expense = mockMonthly.reduce((a, c) => a + c.expense, 0);

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
    return mockTransactions.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.bank.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <MainContainer>
      <Header 
        title="Hype Pro Financeiro"
        subtitle="Dashboard interativo para visão de receitas, despesas e fluxo de caixa" 
      />
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 ml-auto">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger>
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
              <SelectItem value="ytd">YTD</SelectItem>
            </SelectContent>
          </Select>
          <Select value={account} onValueChange={setAccount}>
            <SelectTrigger>
              <Wallet className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as contas</SelectItem>
              <SelectItem value="Banco Principal">Banco Principal</SelectItem>
              <SelectItem value="Banco Secundário">Banco Secundário</SelectItem>
              <SelectItem value="Cartão Corporativo">Cartão Corporativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      {/* KPIs */}
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

      {/* Conteúdo Principal */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="fixed-variable">Fixo x Variável</TabsTrigger>
          <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger>
          {/* <TabsTrigger value="categories">Categorias</TabsTrigger> */}
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <Overview mockMonthly={mockMonthly} />

          <TableTransaction
            query={query}
            setQuery={setQuery}
            filter={filteredTx}
          />
        </TabsContent>

        {/* Fixo vs Variádo */}
        <TabsContent value="fixed-variable" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <StackedColumnChart 
              title="Receitas Mensais: Fixas x Variáveis"
              name01="Receita Fixa"
              dataKeyBar01="fixedRevenue"
              name02="Receita Variável"
              dataKeyBar02="variableRevenue"
              dataKeyXAxis="month"
            />

            <StackedColumnChart
              title="Despesas e Custos Mensais"
              name01="Despesa"
              dataKeyBar01="expense"
              name02="Custo"
              dataKeyBar02="cost"
              dataKeyXAxis="month"
            />
          </div>

          {/* Resumo Anual */}
          <Card className="shadow-sm">
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
          </Card>
        </TabsContent>


        {/* Fluxo de Caixa */}
        <TabsContent value="cash-flow" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Entradas x Saídas (Barra)</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                    <Bar dataKey="variableRevenue" name="Receita Variável" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="variableExpenses" name="Despesa Variável" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Saldo Mensal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockMonthly.map((m) => {
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
            </Card>
          </div>
        </TabsContent>

        {/* Categorias */}
        {/* <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Distribuição de Categorias</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockCategories}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name"
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

                    <Bar
                      dataKey="value"
                      name="Valor"
                      fill="#8884d8"                     
                    >
                      {mockCategories.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={entry.value >= 0 ? "#4ade80" : "#f87171"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCategories
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .map((categorie) => (
                    <div key={categorie.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{categorie.name}</span>
                      </div>
                      <span className="font-medium">{currencyBRL(categorie.value)}</span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>

      {/* Rodapé / Ações */}
      <FooterContainer>
        <p className="text-xs text-muted-foreground">
          *
        </p>
        <Image src={"/imagem.jpeg"} alt="Logo" width={50} height={50} />
      </FooterContainer>
    </MainContainer>
  );
}
