import {
	ChartSummary,
	FinancialIndicators,
	MonthlyFinancialSnapshot,
} from "@/lib/types";

import { FinancialPerformanceChart } from "./financial-performance-chart";
import { FinancialSummary } from "./financial-summary";

type FinancialOverviewProps = {
	indicators: FinancialIndicators;
	monthlySnapshots: MonthlyFinancialSnapshot[];
	chartSummary: ChartSummary[];
};

const Overview = function({
	indicators,
	chartSummary,
	monthlySnapshots,
}: FinancialOverviewProps) {	
	return (
		<div className="grid lg:grid-cols-3 gap-4">
			<FinancialPerformanceChart
				monthlySnapshots={monthlySnapshots}
				consolidatedMonthlyData={chartSummary}
			/>

			<FinancialSummary
				totalCost={indicators.totalCost ?? 0}
				totalExpense={indicators.totalExpense ?? 0}
				totalRevenue={indicators.totalRevenue ?? 0}
				averageFixedOrderValue={indicators.averageFixedOrderValue}
				averageEventOrderValue={indicators.averageEventOrderValue}
			/>
		</div>
	);
}

export { Overview };