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
  TabsContent 
} from "@/components/ui/tabs";
import {
  Select, 
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Wallet,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "./_components/container/MainContainer";
import { FooterContainer } from "./_components/footer/FooterContainer";
import { currencyBRL, formatDate } from "@/lib/utils";
import { pieColors } from "@/lib/color";
import { 
  mockMonthly,
  mockCategories,
  mockTransactions,
} from "@/lib/mock";
import { Overview } from "./_components/overview/Overview";
import { TableTransaction } from "./_components/overview/TableTransaction";
import { KpiCard } from "./_components/card/KpiCard";
import { StackedColumnChart } from "./_components/fixed-variable/StackedColumnChart";

export default function FinanceDashboardMockup() {
  const [range, setRange] = useState("12m");
  const [account, setAccount] = useState("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("overview");
  const [info, setInfo] = useState(false);

  const kpis = useMemo(() => {
    const fixedRevenue = mockMonthly.reduce((a, c) => a + c.fixedRevenue, 0);
    const variableRevenue = mockMonthly.reduce((a, c) => a + c.variableRevenue, 0);
    const fixedExpenses = mockMonthly.reduce((a, c) => a + c.fixedExpense, 0);
    const variableExpenses = mockMonthly.reduce((a, c) => a + c.variableExpenses, 0);

    const totalRevenue = fixedRevenue + variableRevenue;
    const totalExpenses = fixedExpenses + variableExpenses;
    const netIncome = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue ? (netIncome / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      netIncome,
      profitMargin,
      fixedRevenue,
      variableRevenue,
      fixedExpenses,
      variableExpenses,
    };
  }, []);

  const filteredTx = useMemo(() => {
    const q = query.toLowerCase();
    return mockTransactions.filter(
      (t) =>
        (account === "all" || t.account === account) &&
        (t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q))
    );
  }, [account, query]);

  return (
    <MainContainer>
      <Header 
        title="Hype Pro Financeiro"
        subtitle="Dashboard interativo para visão de receitas, despesas e fluxo de caixa" 
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Receita"
          value={currencyBRL(!info ? kpis.variableRevenue : kpis.fixedRevenue)}
          variation={{
            value: !info ? "+12% vs. período anterior" : "Outra coisa",
            color: "text-emerald-400",
            icon: <ArrowUpRight className="mr-1 h-3 w-3" />,
          }}
          icon={<TrendingUp />}
          onIconClick={() => setInfo((prev) => !prev)}
          delay={0.02}
        />

        <KpiCard
          title="Despesas"
          value={currencyBRL(kpis.totalExpenses)}
          variation={{
            value: "+7% vs. período anterior",
            color: "text-red-500 dark:text-red-400",
            icon: <ArrowDownRight className="mr-1 h-3 w-3" />,
          }}
          icon={<ArrowDownRight />}
          delay={0.06}
        />

        <KpiCard
          title="Saldo de Caixa"
          value={currencyBRL(kpis.netIncome)}
          description="Disponível consolidado"
          delay={0.1}
        />

        <KpiCard
          title="Margem"
          value={`${kpis.profitMargin.toFixed(1)}%`}
          description="Lucro líquido / Receita"
          delay={0.14}
        />
      </div>

      {/* Conteúdo Principal */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="fixed-variable">Fixo x Variável</TabsTrigger>
          <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
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
              title="Despesas Mensais: Fixas x Variáveis"
              name01="Despesa Fixa"
              dataKeyBar01="fixedExpense"
              name02="Despesa Variável"
              dataKeyBar02="variableExpenses"
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
                <span className="text-sm text-muted-foreground">Despesas Fixas</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.fixedExpenses)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Despesas Variáveis</span>
                <span className="text-lg font-semibold">{currencyBRL(kpis.variableExpenses)}</span>
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
                  const balance = m.variableRevenue - m.variableExpenses;
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
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Distribuição de Despesas por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockCategories} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                      {mockCategories.map((_, idx) => (
                        <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Top Gastos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCategories
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .map((c, idx) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-3 w-3 rounded"
                          style={{ background: pieColors[idx % pieColors.length] }}
                        />
                        <span>{c.name}</span>
                      </div>
                      <span className="font-medium">{currencyBRL(c.value)}</span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Rodapé / Ações */}
      <FooterContainer>
        <p className="text-xs text-muted-foreground">
          * Este é um mockup estático. Conecte seus endpoints para dados reais.
        </p>
        <Image src={"/imagem.jpeg"} alt="Logo" width={50} height={50} />
      </FooterContainer>
    </MainContainer>
  );
}
