"use client";

import { useMemo, useState } from "react";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	ChartSummary,
	DailyFinancial,
	FinancialCategorySummary,
	FinancialIndicators,
	FinancialTransaction,
	FixedExpensesByCategory,
	MonthlyFinancialSnapshot,
} from "@/lib/types";

import { CategoriesTreeMap } from "./categories-tree-map";
import { CategoryDetailsCard } from "./category-details-card";
import { FixedExpensesSummary } from "./fixed-expense-summary";
import { Overview } from "./overview";
import { TransactionsTable } from "./transactions-table";


type DashboardTabsProps = {
	indicators: FinancialIndicators;

	transactions: FinancialTransaction[];

	monthlySnapshots: MonthlyFinancialSnapshot[];

	categoryBreakdown: {
		totalAmount: number;
		allCategories: FinancialCategorySummary[];
		topCategories: FinancialCategorySummary[];
	};

	fixedExpenseSummary: {
		totalAmount: number;
		dailyFinancialChartData: DailyFinancial[];
		expensesByCategory: FixedExpensesByCategory;
	};
};

type DashboardTabs =
	| "overview"
	| "categories"
	| "expenses";

const DashboardOverviewTabs = function ({
	indicators,
	transactions,
	monthlySnapshots,
	categoryBreakdown,
	fixedExpenseSummary,
}: DashboardTabsProps) {
	const [activeTab, setActiveTab] =
		useState<DashboardTabs>("overview");

	function isDashboardTab(value: string): value is DashboardTabs {
		const allowedTabs: DashboardTabs[] = [
			"overview",
			"categories",
			"expenses",
		];
		return allowedTabs.includes(value as DashboardTabs); 
	}

	function handleTabChange(value: string) {
		
		if (isDashboardTab(value)) {
			setActiveTab(value);
		}
	}

	const overviewChartData = useMemo<
		ChartSummary[]
	>(() => {
		return monthlySnapshots.map(
			(snapshot) => ({
				month: snapshot.month,

				totalRevenue:
					snapshot.fixedRevenue +
					snapshot.variableRevenue,

				totalExpense:
					snapshot.expense +
					snapshot.cost,
			}),
		);
	}, [monthlySnapshots]);

	return (
		<Tabs
			value={activeTab}
			onValueChange={handleTabChange}
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-3 sm:w-auto">
				<TabsTrigger value="overview">
					Visão Geral
				</TabsTrigger>

				<TabsTrigger value="categories">
					Fluxo de Caixa
				</TabsTrigger>

				<TabsTrigger value="expenses">
					Controle
				</TabsTrigger>
			</TabsList>

			<TabsContent
				value="overview"
				className="space-y-4"
			>
				<Overview
					indicators={indicators}
					chartSummary={overviewChartData}
					monthlySnapshots={monthlySnapshots}
				/>

				<TransactionsTable
					transactions={transactions}
				/>
			</TabsContent>

			<TabsContent
				value="categories"
				className="space-y-4"
			>
				<CategoriesTreeMap
					totalCategorizedAmount={
						categoryBreakdown.totalAmount
					}
					categories={
						categoryBreakdown.allCategories
					}
					topCategories={
						categoryBreakdown.topCategories
					}
				/>

				<CategoryDetailsCard
					transactions={transactions}
				/>
			</TabsContent>

			<TabsContent
				value="expenses"
				className="space-y-4"
			>
				<FixedExpensesSummary
					totalAmount={
						fixedExpenseSummary.totalAmount
					}
					expensesByCategory={
						fixedExpenseSummary.expensesByCategory
					}
					dailyFinancial={
						fixedExpenseSummary.dailyFinancialChartData
					}
				/>
			</TabsContent>
		</Tabs>
	);
};

export { DashboardOverviewTabs };