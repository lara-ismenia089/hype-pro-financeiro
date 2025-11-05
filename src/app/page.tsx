'use client';

import { useMemo, useState } from "react";

import { TrendingUp, ArrowDownRight } from "lucide-react";

import { KpiCard } from "@/app/_components/card/KpiCard";
import { MainContainer } from "@/app/_components/container/MainContainer";
import { FixedExpenses } from "@/app/_components/fixed-expense/FixedExpenses";
import { FooterContainer } from "@/app/_components/footer/FooterContainer";
import { FooterContent } from "@/app/_components/footer/FooterContent";
import { Header } from "@/app/_components/header/Header";
import { Overview } from "@/app/_components/overview/Overview";
import { TableTransaction } from "@/app/_components/overview/TableTransaction";
import { DetailsReport } from "@/app/_components/report/DetailsReport";
import { CategoriesTreemap } from "@/app/_components/tree-map/TreeMap";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
} from "@/components/ui/tabs";
import { mockMonthly, mockTransactions } from "@/lib/mock";
import { currencyBRL, getSubcategory } from "@/lib/utils";
import { isWithinInterval, isSameDay, endOfDay } from "date-fns";

export default function FinanceDashboardMockup() {
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
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
        String(t.amount).includes(q) ||
        t.bank.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        getSubcategory(t.accountId).toLowerCase().includes(q);

      const txDate = new Date(t.date);

      if (!dateRange.from && !dateRange.to) {
        return matchesQuery;
      }

      let inDateRange = true;

      if (dateRange.from && dateRange.to) {
        inDateRange =
          isWithinInterval(txDate, {
            start: dateRange.from,
            end: endOfDay(dateRange.to),
          }) ||
          isSameDay(txDate, dateRange.from) ||
          isSameDay(txDate, dateRange.to);
      } else if (dateRange.from) {
        inDateRange =
          txDate >= dateRange.from || isSameDay(txDate, dateRange.from);
      } else if (dateRange.to) {
        inDateRange =
          txDate <= endOfDay(dateRange.to) || isSameDay(txDate, dateRange.to);
      }

      return matchesQuery && inDateRange;
    });
  }, [query, dateRange]);

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
        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="categories">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="controller">Controle</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Overview
            mockMonthly={mockMonthly.month}
            fixedAvg={mockMonthly.averageOrderValueFixed}
            eventAvg={mockMonthly.averageOrderValueEvent}
          />

          <TableTransaction
            query={query}
            setQuery={setQuery}
            dateRange={dateRange}
            setDateRange={setDateRange}
            filter={filteredTx}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <CategoriesTreemap />
          <DetailsReport />
        </TabsContent>

        <TabsContent value="controller" className="space-y-4">
          <FixedExpenses />
        </TabsContent>
      </Tabs>
        
      <FooterContainer>
        <FooterContent />
      </FooterContainer>
    </MainContainer>
  );
}
