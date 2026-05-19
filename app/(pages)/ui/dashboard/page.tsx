import {
	ChartColumnBig,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

import { DashboardOverviewTabs } from "@/app/components/ui/dashboard-tabs";
import { FinancialBreakdownCard } from "@/app/components/ui/financial-breakdown-card";
import { FinancialMetricCard } from "@/app/components/ui/financial-metric-card";
import { FinancialPercentageCard } from "@/app/components/ui/financial-percentage-card";
import { Header } from "@/app/components/ui/header";
import { getFinancialDashboardViewModel } from "@/app/server/dashboard/financial-dashboard.presenter";


export default async function Dashboard() {
	const {
		summary,
		transactions,
		categoryBreakdown,
		fixedExpenseSummary,
	} = await getFinancialDashboardViewModel();
	
	return (
		<>
			<Header
				title="Hype Pro Financeiro"
				subtitle="Dashboard iterativo para o acompanhamento de recitas, despesas e fluxo de caixa"
			/>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-start">
				<FinancialBreakdownCard
					title="Receita"
					icon={<TrendingUp />}
					metrics={summary.revenue}
				/>

				<FinancialBreakdownCard
					title="Despesas"
					icon={<TrendingDown />}
					metrics={summary.expense}
				/>

				<FinancialMetricCard
					title="Resultado"
					icon={<ChartColumnBig />}
					metric={summary.balance.consolidated}
					historicalData={summary.monthlySnapshots}
				/>
				
				<FinancialPercentageCard
					title="Margem"
					metric={summary.margin.profit}
				/>
			</div>

			<DashboardOverviewTabs
				indicators={summary.indicators}
				transactions={transactions}
				monthlySnapshots={summary.monthlySnapshots}
				categoryBreakdown={categoryBreakdown}
				fixedExpenseSummary={fixedExpenseSummary}
			/>
		</>
	);
}