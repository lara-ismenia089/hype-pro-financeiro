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
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Filter,
  Search,
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

export default function FinanceDashboardMockup() {
  const [range, setRange] = useState("12m");
  const [account, setAccount] = useState("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("visao-geral");
  const [info, setInfo] = useState(false);

  const kpis = useMemo(() => {
    const revenue = mockMonthly.reduce((acc, cur) => acc + cur.variableRevenue, 0);
    const expenses = mockMonthly.reduce((acc, cur) => acc + cur.variableExpenses, 0);
    const netIncome = revenue - expenses;
    const profitMargin = revenue ? (netIncome / revenue) * 100 : 0;

    return {
      revenue,
      expenses,
      netIncome,
      profitMargin,
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      {/* Barra de busca */}
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

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 }}>
          <Card className="shadow-sm text-white bg-[#031c3e]">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">Receita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold">{currencyBRL(!info ? kpis.revenue : 10)}</div>
                  <div className="mt-1 flex items-center text-xs text-emerald-400 dark:text-emerald-400 font-bold">
                    <ArrowUpRight className="mr-1 h-3 w-3" /> {!info ? "+12% vs. período anterior" : "Outra coisa"}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 opacity-60 hover:cursor-pointer" onClick={() => setInfo(prev => !prev)} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
          <Card className="shadow-sm text-white bg-[#031c3e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold">{currencyBRL(kpis.expenses)}</div>
                  <div className="mt-1 flex items-center text-xs text-red-500 dark:text-red-400 font-bold">
                    <ArrowDownRight className="mr-1 h-3 w-3" /> +7% vs. período anterior
                  </div>
                </div>
                <ArrowDownRight className="h-8 w-8 opacity-60" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-sm text-white bg-[#031c3e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Saldo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{currencyBRL(kpis.netIncome)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Disponível consolidado</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <Card className="shadow-sm text-white bg-[#031c3e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Margem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{kpis.profitMargin.toFixed(1)}%</div>
              <div className="mt-1 text-xs text-muted-foreground">Lucro líquido / Receita</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Conteúdo Principal */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="fluxo-caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle>Evolução Receita x Despesas</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockMonthly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => currencyBRL(v)} />
                    <Line type="monotone" dataKey="variableRevenue" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="variableExpenses" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Resumo Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Ticket Médio</span>
                  <span className="font-medium">{currencyBRL(1870)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Clientes Ativos</span>
                  <span className="font-medium">326</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Inadimplência</span>
                  <Badge variant="secondary">3,4%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Runway de Caixa</span>
                  <span className="font-medium">8,2 meses</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Descrição</th>
                    <th className="py-2 pr-4">Categoria</th>
                    <th className="py-2 pr-4">Conta</th>
                    <th className="py-2 pr-4 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTx.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{new Date(t.date).toLocaleDateString("pt-BR")}</td>
                      <td className="py-2 pr-4">{t.description}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={t.type === "Receita" ? "default" : "secondary"}>{t.category}</Badge>
                      </td>
                      <td className="py-2 pr-4">{t.account}</td>
                      <td className={`py-2 pr-0 text-right font-medium ${t.amount < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {currencyBRL(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fluxo de Caixa */}
        <TabsContent value="fluxo-caixa" className="space-y-4">
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
                    <Bar dataKey="variableRevenue" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="variableExpenses" radius={[6, 6, 0, 0]} />
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
        <TabsContent value="categorias" className="space-y-4">
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
