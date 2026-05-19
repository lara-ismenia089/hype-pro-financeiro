"use client";

import { ReactNode } from "react";
import {
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { formatCurrency } from "@/lib/utils";


type BaseFinancialChartProps<T> = {
	data: T[];
	children: ReactNode;
};

const BaseFinancialChart = <T,>({
	data,
	children,
}: BaseFinancialChartProps<T>) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={data}
				margin={{
					left: 8,
					right: 8,
					top: 8,
					bottom: 8,
				}}
			>
				<CartesianGrid
					stroke="#e5e7eb"
					strokeDasharray="4 4"
				/>

				<XAxis
					dataKey="month"
					tick={{
						fill: "#6b7280",
						fontSize: 10,
					}}
					axisLine={false}
					tickLine={false}
				/>

				<YAxis
					tickFormatter={(value: number) =>
						formatCurrency(value)
					}
					tick={{
						fill: "#6b7280",
						fontSize: 10,
					}}
					axisLine={false}
					tickLine={false}
				/>

				<Tooltip
					formatter={(value, name) => [
						formatCurrency(value as number),
						name,
					]}
					labelFormatter={(label) =>
						`Mês: ${label}`
					}
					contentStyle={{
						backgroundColor: "#fff",
						borderRadius: "8px",
						border: "1px solid #e5e7eb",
						boxShadow:
							"0 4px 10px rgba(0,0,0,0.1)",
					}}
					labelStyle={{
						fontWeight: "bold",
						color: "#374151",
					}}
				/>

				<Legend
					verticalAlign="top"
					height={36}
					iconType="circle"
					wrapperStyle={{
						fontSize: "12px",
					}}
				/>

				{children}
			</BarChart>
		</ResponsiveContainer>
	);
};

export { BaseFinancialChart };