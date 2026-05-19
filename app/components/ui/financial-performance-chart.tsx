"use client";

import { useState } from "react";
import { ChartColumn } from "lucide-react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartSummary,
	MonthlyFinancialSnapshot,
} from "@/lib/types";

import { ConsolidatedFinancialChart } from "./consolidated-financial-chart";
import { DetailedFinancialChart } from "./detailed-financial-chart";


type FinancialPerformanceChartProps = {
	consolidatedMonthlyData: ChartSummary[];
	monthlySnapshots: MonthlyFinancialSnapshot[];
};

const FinancialPerformanceChart = ({
	monthlySnapshots,
	consolidatedMonthlyData,
}: FinancialPerformanceChartProps) => {
	const [isDetailedView, setIsDetailedView] = useState(true);

	return (
		<Card className="shadow-md border border-gray-200 rounded-2xl lg:col-span-2">
			<CardHeader>
				<div className="flex w-full justify-between items-center">
					<CardTitle>
						Evolução Receita x Despesas
					</CardTitle>
					
					<button
						type="button"
						onClick={() => setIsDetailedView((prev) => !prev)}
						className="cursor-pointer"
					>
						<ChartColumn
							width={20}
							height={20}
						/>
					</button>
				</div>
			</CardHeader>

			<CardContent className="h-80">
				{isDetailedView ? (
					<DetailedFinancialChart
						data={monthlySnapshots}
					/>
				) : (
					<ConsolidatedFinancialChart
						data={consolidatedMonthlyData}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export { FinancialPerformanceChart };