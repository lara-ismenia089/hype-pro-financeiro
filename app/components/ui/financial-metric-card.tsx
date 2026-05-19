"use client";

import { useState } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FinancialMetric,
	MonthlyFinancialSnapshot,
} from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

import { FinancialMetricChartModal } from "./financial-metric-chart-modal";

type FinancialMetricCardProps = {
	title: string;
	metric?: FinancialMetric;
	historicalData: MonthlyFinancialSnapshot[];
	icon?: React.ReactNode;
};

const FinancialMetricCard = function ({
	icon,
	title,
	metric,
	historicalData,
}: FinancialMetricCardProps) {
	const [isChartOpen, setIsChartOpen] =
		useState(false);

	const metricAmount = metric?.amount ?? 0;

	return (
		<>
			<Card className="bg-[#031c3e] text-white shadow-sm">
				<CardHeader className="flex justify-between pb-2">
					<CardTitle className="text-sm text-muted-foreground">
						{title}
					</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="flex items-end justify-between">
						<div>
							<div className="text-2xl font-semibold">
								{formatCurrency(
									metricAmount
								)}
							</div>

							<div className="mt-1 text-xs text-muted-foreground">
								{metric?.label ?? ""}
							</div>
						</div>

						<button
							type="button"
							onClick={() =>
								setIsChartOpen(true)
							}
							className="h-8 w-8 cursor-pointer opacity-80"
						>
							{icon}
						</button>
					</div>
				</CardContent>
			</Card>

			<FinancialMetricChartModal
				data={historicalData}
				open={isChartOpen}
				onClose={() =>
					setIsChartOpen(false)
				}
			/>
		</>
	);
};

export { FinancialMetricCard };