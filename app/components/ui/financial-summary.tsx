import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type FinancialSummaryProps = {
	totalCost: number;
	totalExpense: number;
	totalRevenue: number;
	averageEventOrderValue: number;
	averageFixedOrderValue: number;
};

const FinancialSummary = function ({
	totalCost,
	totalExpense,
	totalRevenue,
	averageEventOrderValue,
	averageFixedOrderValue,
}: FinancialSummaryProps) {
	const expenseRatio =
		totalRevenue > 0
			? (totalExpense / totalRevenue) * 100
			: 0;

	const costRatio =
		totalRevenue > 0
			? (totalCost / totalRevenue) * 100
			: 0;

	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle>
					Resumo Financeiro
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-3">
				<div className="flex items-center justify-between border-b py-2 text-sm">
					<span>Ticket Médio</span>

					<div className="flex flex-col gap-2 text-muted-foreground">
						<span className="flex justify-between space-x-2 font-medium">
							<span>Fixo</span>

							<span>
								{formatCurrency(
									averageFixedOrderValue
								)}
							</span>
						</span>

						<span className="flex justify-between space-x-2 font-medium">
							<span>Eventos</span>

							<span>
								{formatCurrency(
									averageEventOrderValue
								)}
							</span>
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between text-sm">
					<span>
						Despesas / Receita
					</span>

					<Badge variant="secondary">
						{expenseRatio.toFixed(2)}%
					</Badge>
				</div>

				<div className="flex items-center justify-between text-sm">
					<span>
						Custos / Receita
					</span>

					<Badge variant="secondary">
						{costRatio.toFixed(2)}%
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

export { FinancialSummary };