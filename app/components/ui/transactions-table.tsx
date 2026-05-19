"use client";

import React from "react";
import {
	useState,
} from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTransactionTable } from "@/hooks/useTransactionTable";
import { FinancialTransaction } from "@/lib/types";
import {
	cn,
	formatCurrency,
	formatDate,
	getCategoryByAccountId,
} from "@/lib/utils";


type TransactionsTableProps = {
	transactions: FinancialTransaction[];
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [search, setSearch] = useState("");

	const normalizedSearch = search
		.trim()
		.toLowerCase();
	
	const [openGroups, setOpenGroups] = useState<
		Record<string, boolean>
	>({});

	function toggleGroup(date: string) {
		setOpenGroups((prev) => ({
			...prev,
			[date]: !prev[date],
		}));
	}

	const groupedTransactions = useTransactionTable(transactions);

	const filteredGroups = Object.entries(groupedTransactions)
		.filter(([date]) => {
			if (startDate && date < startDate) {
				return false;
			}

			if (endDate && date > endDate) {
				return false;
			}

			return true;
		})
		.map(([date, group]) => {
			if (!normalizedSearch) {
				return [date, group] as const;
			}

			const filteredTransactions =
				group.transactions.filter((transaction) => {
					const searchableContent = [
						transaction.bankName,
						transaction.description,
						transaction.customerName,
						transaction.historyDescription,
						getCategoryByAccountId(transaction.accountId),
					]
						.filter(Boolean)
						.join(" ")
						.toLowerCase();

					return searchableContent.includes(
						normalizedSearch
					);
				});

			if (filteredTransactions.length === 0) {
				return null;
			}

			return [
				date,
				{
					...group,
					transactions: filteredTransactions,
				},
			] as const;
		})
		.filter((item): item is readonly [
				string,
				{
					transactions: FinancialTransaction[];
					cumulative: number;
					dailyTotal: number;
				},
			] => item !== null
		);

	return (
		<Card className="shadow-sm">
			<CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<CardTitle>Movimentações</CardTitle>

				<div className="flex flex-col gap-2 sm:flex-row">
					<input
						type="text"
						placeholder="Buscar movimentação..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="rounded-md border bg-background px-3 py-2 text-sm"
					/>

					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="rounded-md border bg-background px-3 py-2 text-sm"
					/>

					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="rounded-md border bg-background px-3 py-2 text-sm"
					/>
				</div>
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="text-left text-muted-foreground">
						<tr className="border-b">
							<th className="py-3 pr-4 pl-4 font-medium">
								Data
							</th>

							<th className="py-3 pr-4 font-medium">
								Cliente
							</th>

							<th className="py-3 pr-4 font-medium">
								Movimento
							</th>

							<th className="py-3 pr-4 font-medium">
								Categoria
							</th>

							<th className="py-3 pr-4 font-medium">
								Banco
							</th>

							<th className="py-3 pr-4 text-right font-medium">
								Valor
							</th>
						</tr>
					</thead>

					<tbody>
						{transactions.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="py-8 text-center text-muted-foreground"
								>
									Nenhuma movimentação encontrada.
								</td>
							</tr>
						) : (
							filteredGroups
								.map(([date, group]) => (
									<React.Fragment key={date}>
										<tr
											onClick={() =>
												toggleGroup(date)
											}
											className={cn(
												"cursor-pointer border-b bg-muted/40 transition-colors hover:bg-muted"
											)}
										>
											<td
												colSpan={6}
												className="px-4 py-3"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														<span className="font-medium">
															{formatDate(
																date
															)}
														</span>

														<span className="text-xs text-muted-foreground">
															{
																group
																	.transactions
																	.length
															}{" "}
															movimentações
														</span>
													</div>

													<div className="flex items-center gap-4">
														<div className="flex flex-col items-end">
															<span
																className={cn(
																	"text-sm font-medium",
																	group.dailyTotal > 0
																		? "text-emerald-600 dark:text-emerald-400" :
																	group.dailyTotal < 0
																		? "text-red-600 dark:text-red-400" : ""
																)}
															>
																{formatCurrency(
																	group.dailyTotal
																)}
															</span>

															<span className="text-xs text-muted-foreground">
																Saldo:{" "}
																{formatCurrency(
																	group.cumulative
																)}
															</span>
														</div>

														<ChevronDown
															className={cn(
																"h-4 w-4 transition-transform duration-200",
																openGroups[
																	date
																] &&
																	"rotate-180"
															)}
														/>
													</div>
												</div>
											</td>
										</tr>

										{openGroups[date] &&
											group.transactions.map((transaction) => (
												<tr
													key={transaction.id}
													className="border-b transition-colors hover:bg-muted/40"
												>
													<td className="py-3 pr-4 pl-10 whitespace-nowrap">
														{formatDate(transaction.transactionDate)}
													</td>

													<td className="py-3 pr-4">
														{transaction.customerName}
													</td>

													<td className="py-3 pr-4">
														<Badge label={transaction.transactionType}>
															{transaction.transactionType ===
															"credit"
																? "Crédito"
																: "Débito"}
														</Badge>
													</td>

													<td className="py-3 pr-4">
														{transaction.description}
													</td>

													<td className="py-3 pr-4">
														{transaction.bankName}
													</td>

													<td
														className={cn(
															"py-3 pr-4 text-right font-medium whitespace-nowrap",
															transaction.transactionType ===
																"credit" &&
																"text-emerald-600 dark:text-emerald-400",
															transaction.transactionType ===
																"debit" &&
																"text-red-600 dark:text-red-400"
														)}
													>
														{transaction.transactionType === "credit"
															? "+"
															: "-"}
														{formatCurrency(
															transaction.amount
														)}
													</td>
												</tr>
											))
										}
									</React.Fragment>
								))
						)}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
}