'use client';

import { Wallet } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DailyFinancial,
	FixedExpensesByCategory,
} from "@/lib/types";
import {
	formatCurrency,
	formatDate,
} from "@/lib/utils";


type FixedExpensesSummaryProps = {
	totalAmount: number;
	expensesByCategory: FixedExpensesByCategory;
	dailyFinancial: DailyFinancial[];
};

export function FixedExpensesSummary({
	totalAmount,
	dailyFinancial,
	expensesByCategory,
}: FixedExpensesSummaryProps) {
	return (
		<div className="grid gap-6 md:grid-cols-1">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<div className="flex items-center gap-2">
						<Wallet className="h-5 w-5 text-muted-foreground" />

						<CardTitle className="text-lg font-medium">
							Resumo de Despesas Fixas
						</CardTitle>
					</div>
				</CardHeader>

				<CardContent>
					<p className="text-2xl font-bold">
						{formatCurrency(totalAmount)}
					</p>
				</CardContent>
			</Card>

			<Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Receita x Despesa por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            width={500}
            height={125}
            data={dailyFinancial}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) => formatCurrency(value)}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", color: "#374151" }}
            />
            <Bar dataKey="totalRevenue" name="Receita" fill="#020E20" radius={[4, 4, 0, 0]} />
            <Bar dataKey="totalExpense" name="Despesa" fill="#031B3D" radius={[4, 4, 0, 0]} />
          </BarChart>
        </CardContent>
      </Card>

			<Card className="md:col-span-2">
				<CardContent className="space-y-8">
					{Object.entries(expensesByCategory)
						.map(([category, expenses]) => {
							const categoryTotalAmount =
								expenses.reduce((
										totalAmount,
										expense,
									) =>
										totalAmount +
										expense.amount,
									0,
								);

							return (
								<div
									key={category}
									className="border-t pt-6 first:border-0 first:pt-0"
								>
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-md font-semibold">
											{category}
										</h3>

										<span className="text-sm font-medium text-muted-foreground">
											Subtotal:{" "}
											<span className="text-base font-bold text-emerald-600">
												{formatCurrency(categoryTotalAmount)}
											</span>
										</span>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{expenses.map((expense) => (
												<Card
													key={expense.id}
													className="border rounded-xl shadow-sm"
												>
													<CardHeader>
														<CardTitle className="text-base font-semibold">
															{expense.description}
														</CardTitle>
													</CardHeader>

													<CardContent className="space-y-2">
														<p className="text-sm text-muted-foreground">
															Vencimento:{" "}
															<span className="font-medium">
																{expense.dueDate ?
																	formatDate(expense.dueDate) :
																	"Data não registrada"
																}
															</span>
														</p>

														{expense.notes && (
															<p className="text-sm text-muted-foreground">
																Obs:{" "}
																<span className="font-medium">
																	{expense.notes}
																</span>
															</p>
														)}

														<p className="text-lg font-bold text-right">
															{formatCurrency(expense.amount)}
														</p>
													</CardContent>
												</Card>
											),
										)}
									</div>
								</div>
							);
						},
					)}
				</CardContent>
			</Card>
		</div>
	);
}