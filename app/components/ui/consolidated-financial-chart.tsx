import { Bar } from "recharts";

import { ChartSummary } from "@/lib/types";

import { BaseFinancialChart } from "./base-financial-chart";


type ConsolidatedFinancialChartProps = {
	data: ChartSummary[];
};

const ConsolidatedFinancialChart = ({
	data,
}: ConsolidatedFinancialChartProps) => {
	return (
		<BaseFinancialChart data={data}>
			<Bar
				dataKey="totalRevenue"
				name="Receita"
				fill="#1E3A5F"
				stroke="#ffffff"
				strokeWidth={1}
				radius={[6, 6, 0, 0]}
				activeBar={{ fill: "#2C4E73" }}
			/>

			<Bar
				dataKey="totalExpense"
				name="Despesa e Custo"
				fill="#031B3D"
				stroke="#ffffff"
				strokeWidth={1}
				radius={[6, 6, 0, 0]}
				activeBar={{ fill: "#0A2A5C" }}
			/>
		</BaseFinancialChart>
	);
};

export { ConsolidatedFinancialChart };