"use client";

import { useState } from "react";
import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCategoryDetails } from "@/hooks/useCategoryDetails";
import {
	FinancialReportSection,
	FinancialTransaction,
} from "@/lib/types";
import {
	formatCurrency,
} from "@/lib/utils";


const reportGroupTextColors: Record<
	FinancialReportSection["sectionType"],
	string
> = {
	Receita:
		"text-emerald-700 dark:text-emerald-400",

	Despesa:
		"text-red-700 dark:text-red-400",

	Custos:
		"text-amber-700 dark:text-amber-400",
};

const reportGroupIcons: Record<
	FinancialReportSection["sectionType"],
	React.ReactElement
> = {
	Receita: (
		<ArrowUpRight className="h-4 w-4 text-emerald-600" />
	),

	Despesa: (
		<ArrowDownRight className="h-4 w-4 text-red-600" />
	),

	Custos: (
		<Activity className="h-4 w-4 text-amber-600" />
	),
};

type CategoryDetailsCardProps = {
	transactions: FinancialTransaction[];
};

export function CategoryDetailsCard({
	transactions,
}: CategoryDetailsCardProps) {
	const [selectedMonth, setSelectedMonth] =
		useState<number>(
			new Date().getMonth() + 1,
		);

	const [selectedYear, setSelectedYear] =
		useState<number>(
			new Date().getFullYear(),
		);

	const reportSections = useCategoryDetails(
		transactions,
		selectedMonth,
		selectedYear
	);

	return (
		<Card className="shadow-sm">
			<CardHeader>
				<div className="flex w-full items-center justify-between">
					<CardTitle>
						Detalhamento por Categoria
					</CardTitle>

					<div className="flex gap-2">
						<Select
							value={selectedMonth.toString()}
							onValueChange={(value) =>
								setSelectedMonth(Number(value))
							}
						>
							<SelectTrigger className="w-24">
								<SelectValue placeholder="Mês" />
							</SelectTrigger>

							<SelectContent>
								{Array.from(
									{ length: 12 },
									(_, index) => index + 1,
								).map((month) => (
									<SelectItem
										key={month}
										value={month.toString()}
									>
										{month
											.toString()
											.padStart(2, "0")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Input
							type="number"
							value={selectedYear}
							onChange={(event) =>
								setSelectedYear(
									Number(event.target.value),
								)
							}
							className="w-28"
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div className="space-y-6">
					{reportSections.map(
						(reportSection) => {
							const sectionTotal =
								reportSection.categories.reduce(
									(accumulator, category) =>
										accumulator + category.totalAmount, 0,
								);

							return (
								<div
									key={reportSection.sectionType}
								>
									<h4
										className={`flex items-center gap-2 font-semibold ${
											reportGroupTextColors[
												reportSection.sectionType
											]
										}`}
									>
										{reportGroupIcons[reportSection.sectionType]}
										{reportSection.sectionType}
									</h4>

									<ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
										{reportSection.categories.map(
											(category) => (
												<li
													key={category.categoryName}
													className="flex flex-col rounded-lg border bg-muted/30 p-3"
												>
													<span className="text-sm text-muted-foreground">
														{category.categoryName}
													</span>

													<span className="text-base font-semibold">
														{formatCurrency(category.totalAmount)}
													</span>
												</li>
											),
										)}
									</ul>

									<div
										className={`mt-3 flex justify-between rounded-lg p-3 font-semibold ${
											reportSection.sectionType ===
											"Receita"
												? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
												: reportSection.sectionType ===
													  "Despesa"
													? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
													: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
										}`}
									>
										<span>Total</span>
										<span>
											{formatCurrency(sectionTotal)}
										</span>
									</div>
								</div>
							);
						},
					)}
				</div>
			</CardContent>
		</Card>
	);
}