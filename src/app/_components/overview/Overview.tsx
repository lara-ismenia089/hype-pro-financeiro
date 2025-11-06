"use client";

import { useState } from "react";

import { 
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	LabelList,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import { ChartColumn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { 
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "@/components/ui/card";
import { MockMonthlyType } from "@/lib/types";
import { currencyBRL } from "@/lib/utils";

export function Overview({ mockMonthly, fixedAvg, eventAvg }: { mockMonthly: MockMonthlyType[], fixedAvg: number, eventAvg: number }) {
	const [isOpen, setIsOpen] = useState(true);

	const totalRevenue = mockMonthly.reduce(
		(acc, cur) => acc + cur.fixedRevenue + cur.variableRevenue,
		0
	);

	const cost = mockMonthly.reduce(
		(acc, cur) => acc + cur.cost,
		0
	);
	
	const expense = mockMonthly.reduce(
		(acc, cur) => acc + cur.expense,
		0
	);

	const dataResult = mockMonthly.map((item) => ({
		month: item.month,
		totalRevenue: item.fixedRevenue + item.variableRevenue,
		totalExpense: item.expense + item.cost,
	}));

	return (
		<div className="grid gap-4 lg:grid-cols-3">
			<Card className="shadow-md border border-gray-200 rounded-2xl lg:col-span-2">
				<CardHeader>
					<div className="flex w-full justify-between">
						<CardTitle>Evolução Receita x Despesas</CardTitle>
						<span onClick={() => setIsOpen((prev) => !prev)}>
							<ChartColumn width={20} height={20} className="hover:cursor-pointer" />
						</span>
					</div>
				</CardHeader>
				<CardContent className="h-[320px]">
					<ResponsiveContainer width="100%" height="100%">
						{isOpen ? (
							<BarChart data={mockMonthly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
								<CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
								<XAxis
									dataKey="month"
									tick={{ fill: "#6b7280", fontSize: 10 }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									tickFormatter={(value: number) => currencyBRL(value)}
									tick={{ fill: "#6b7280", fontSize: 10 }}
									axisLine={false}
									tickLine={false}
								/>
								<Tooltip
									formatter={(value: number) => currencyBRL(value)}
									contentStyle={{
										backgroundColor: "#fff",
										borderRadius: "8px",
										border: "1px solid #e5e7eb",
										boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
									}}
									labelStyle={{ fontWeight: "bold", color: "#374151" }}
								/>
								<Bar
									type="monotone"
									dataKey="variableRevenue"
									stackId={"revenue"}
									name="Receita Variável"
									fill="#031B3D"
								>
									<LabelList 
										dataKey="variableRevenue"
										formatter={(label: React.ReactNode) =>
											currencyBRL(Number(label))
										}
										fontSize={10}
									/>
								</Bar>
								<Bar
									type="monotone"
									dataKey="fixedRevenue"
									stackId={"revenue"}
									name="Receita Fixa"
									fill="#020E20"
									radius={[6, 6, 0, 0]}
								>
									<LabelList 
										dataKey="fixedRevenue"
										formatter={(value: React.ReactNode) => 
											currencyBRL(Number(value))
										}
										fontSize={10}
									/>
								</Bar>
								<Bar
									type="monotone"
									dataKey="expense"
									name="Despesa"
									stackId={"expense"}
									fill="#031B3D"
								>
									<LabelList
										dataKey="expense"
										formatter={(label: React.ReactNode) =>
											currencyBRL(Number(label))
										}
										fontSize={10}
									/>
								</Bar>
								<Bar
									type="monotone"
									dataKey="cost"
									name="Custo"
									stackId={"expense"}
									fill="#020E20"
									radius={[6, 6, 0, 0]}
								>
									<LabelList 
										dataKey="cost"
										formatter={(label: React.ReactNode) =>
											currencyBRL(Number(label))
										}
										fontSize={10}
									/>
								</Bar>
							</BarChart>
						) : (
							<BarChart data={dataResult} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
								<CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
								<XAxis
									dataKey="month"
									tick={{ fill: "#6b7280", fontSize: 10 }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									tickFormatter={(value: number) => currencyBRL(value)}
									tick={{ fill: "#6b7280", fontSize: 10 }}
									axisLine={false}
									tickLine={false}
								/>
								<Tooltip
									formatter={(value: number) => currencyBRL(value)}
									contentStyle={{
										backgroundColor: "#fff",
										borderRadius: "8px",
										border: "1px solid #e5e7eb",
										boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
									}}
									labelStyle={{ fontWeight: "bold", color: "#374151" }}
								/>
								<Bar
									type="monotone"
									dataKey="totalRevenue"
									stackId={"revenue"}
									name="Receita"
									fill="#031B3D"
								>
									<LabelList 
										dataKey="totalRevenue"
										formatter={(label: React.ReactNode) =>
											currencyBRL(Number(label))
										}
										fontSize={10}
									/>
								</Bar>
								<Bar
									type="monotone"
									dataKey="totalExpense"
									stackId={"revenue"}
									name="Despesa e custo"
									fill="#020E20"
									radius={[6, 6, 0, 0]}
								>
									<LabelList 
										dataKey="totalExpense"
										formatter={(label: React.ReactNode) =>
											currencyBRL(Number(label))
										}
										fontSize={10}
									/>
								</Bar>
							</BarChart>
						)}
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle>Resumo Financeiro</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center justify-between text-sm border-b py-2">
						<span>Ticket Médio</span>
						<div className="flex flex-col gap-2 text-muted-foreground">
							<span className="font-medium flex space-x-1.5 justify-between">
								<span>Fixo</span>
								<span>{currencyBRL(fixedAvg)}</span>
							</span>
							<span className="font-medium flex space-x-1.5 justify-between">
								<span>Eventos</span>
								<span>{currencyBRL(eventAvg)}</span>
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span>Despesa / Receita</span>
						<Badge variant="secondary">{((expense / totalRevenue) * 100).toFixed(2)}%</Badge>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span>Custos / Receita</span>
						<Badge variant="secondary">{((cost / totalRevenue) * 100).toFixed(2)}%</Badge>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}