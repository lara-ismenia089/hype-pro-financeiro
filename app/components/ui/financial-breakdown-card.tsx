"use client";

import { useState } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FinancialBreakdown,
} from "@/lib/types";

import { FinancialBreakdownView } from "./financial-breakdown-view";
import { FinancialTotalView } from "./financial-total-view";


type FinancialBreakdownCardProps = {
	title: string;
	metrics?: FinancialBreakdown;
	icon?: React.ReactNode;
};

const FinancialBreakdownCard = function ({
	title,
	metrics,
	icon,
}: FinancialBreakdownCardProps) {
	const [isDetailedView, setIsDetailedView] =
		useState(false);

	const totalMetric = metrics?.total;

	const fixedMetric = metrics?.fixed;

	const variableMetric = metrics?.variable;

	return (
		<Card className="bg-[#031c3e] text-white shadow-sm">
			<CardHeader className="flex justify-between pb-2">
				<CardTitle className="text-sm text-muted-foreground">
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="flex items-end justify-between">
					{!isDetailedView ? (
						<FinancialTotalView
							totalLabel={
								totalMetric?.label
							}
							totalAmount={
								totalMetric?.amount ??
								0
							}
						/>
					) : (
						<FinancialBreakdownView
							fixedLabel={
								fixedMetric?.label
							}
							fixedAmount={
								fixedMetric?.amount ??
								0
							}
							variableLabel={
								variableMetric?.label
							}
							variableAmount={
								variableMetric?.amount ??
								0
							}
						/>
					)}

					<button
						type="button"
						onClick={() =>
							setIsDetailedView(
								(prev) => !prev
							)
						}
						className="h-8 w-8 cursor-pointer opacity-80"
					>
						{icon}
					</button>
				</div>
			</CardContent>
		</Card>
	);
};

export { FinancialBreakdownCard };