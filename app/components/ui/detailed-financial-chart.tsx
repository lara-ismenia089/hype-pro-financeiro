import { Bar } from "recharts";

import { MonthlyFinancialSnapshot } from "@/lib/types";

import { BaseFinancialChart } from "./base-financial-chart";


type DetailedFinancialChartProps = {
	data: MonthlyFinancialSnapshot[];
};

const DetailedFinancialChart = ({
	data,
}: DetailedFinancialChartProps) => {
	return (
		<BaseFinancialChart data={data}>
			<Bar
				dataKey="variableRevenue"
				stackId="revenue"
				name="Receita Variável"
				fill="#4A6FA5"
				stroke="#ffffff"
				strokeWidth={1}
				activeBar={{ fill: "#6B8FC7" }}
			/>

			<Bar
				dataKey="fixedRevenue"
				stackId="revenue"
				name="Receita Fixa"
				fill="#1E3A5F"
				stroke="#ffffff"
				strokeWidth={1}
				radius={[6, 6, 0, 0]}
				activeBar={{ fill: "#2C4E73" }}
			/>

			<Bar
				dataKey="expense"
				stackId="expense"
				name="Despesa"
				fill="#031B3D"
				stroke="#ffffff"
				strokeWidth={1}
				activeBar={{ fill: "#0A2A5C" }}
			/>

			<Bar
				dataKey="cost"
				stackId="expense"
				name="Custo"
				fill="#020E20"
				stroke="#ffffff"
				strokeWidth={1}
				radius={[6, 6, 0, 0]}
				activeBar={{ fill: "#0A162E" }}
			/>
		</BaseFinancialChart>
	);
};

export { DetailedFinancialChart };