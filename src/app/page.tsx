'use client';

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  Filter,
  Wallet,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Header } from "@/app/_components/header/Header";
import { MainContainer } from "./_components/container/MainContainer";
import { FooterContainer } from "./_components/footer/FooterContainer";
import { currencyBRL } from "@/lib/utils";
import { pieColors } from "@/lib/color";
import { 
  mockMonthly,
  mockCategories,
  mockTransactions,
} from "@/lib/mock";
import { Overview } from "./_components/overview/Overview";
import { CardComponent } from "./_components/card/CardComponent";
import { TableTransaction } from "./_components/overview/TableTransaction";

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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
        <Header 
          title="Hype Pro Financeiro"
          subtitle="Dashboard interativo para visão de receitas, despesas e fluxo de caixa" 
        />
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[140px]">
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
            <SelectTrigger className="w-[190px]">
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
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 }}>
          <CardComponent title="Receita">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{currencyBRL(!info ? kpis.variableRevenue : kpis.fixedRevenue)}</div>
                <div className="mt-1 flex items-center text-xs text-emerald-400 dark:text-emerald-400 font-bold">
                  <ArrowUpRight className="mr-1 h-3 w-3" /> {!info ? "+12% vs. período anterior" : "Outra coisa"}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 opacity-60 hover:cursor-pointer" onClick={() => setInfo(prev => !prev)} />
            </div>
          </CardComponent>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
          <CardComponent title="Despesas">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{currencyBRL(kpis.totalExpenses)}</div>
                <div className="mt-1 flex items-center text-xs text-red-500 dark:text-red-400 font-bold">
                  <ArrowDownRight className="mr-1 h-3 w-3" /> +7% vs. período anterior
                </div>
              </div>
              <ArrowDownRight className="h-8 w-8 opacity-60" />
            </div>
          </CardComponent>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CardComponent title="Saldo de Caixa">
            <div className="text-2xl font-semibold">{currencyBRL(kpis.netIncome)}</div>
            <div className="mt-1 text-xs text-muted-foreground">Disponível consolidado</div>
          </CardComponent>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <CardComponent title="Margem">
            <div className="text-2xl font-semibold">{kpis.profitMargin.toFixed(1)}%</div>
            <div className="mt-1 text-xs text-muted-foreground">Lucro líquido / Receita</div>
          </CardComponent>
        </motion.div>
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
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Receitas Mensais: Fixas x Variáveis</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                    <Bar dataKey="fixedRevenue" stackId="a" fill="#3b82f6" name="Receita Fixa" />
                    <Bar dataKey="variableRevenue" stackId="a" fill="#10b981" name="Receita Variável" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Despesas Mensais: Fixas x Variáveis</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                    <Bar dataKey="fixedExpense" stackId="b" fill="#ef4444" name="Despesa Fixa" />
                    <Bar dataKey="variableExpenses" stackId="b" fill="#f97316" name="Despesa Variável" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
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
