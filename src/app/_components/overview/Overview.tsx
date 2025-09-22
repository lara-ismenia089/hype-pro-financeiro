import { Badge } from "@/components/ui/badge";
import { MockMonthlyType } from "@/lib/types";
import { 
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "@/components/ui/card";
import { 
	Line,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	LineChart,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import { currencyBRL } from "@/lib/utils";

export function Overview({ mockMonthly }: { mockMonthly: MockMonthlyType[] }) {
	const totalRevenue = mockMonthly.reduce(
		(acc, cur) => acc + cur.fixedRevenue + cur.variableRevenue,
		0
	);

	const totalExpenses = mockMonthly.reduce(
		(acc, cur) => acc + cur.expense + cur.cost,
		0
	);

	// const netResult = totalRevenue - totalExpenses;
	const breakEven = totalExpenses;

	const cost = mockMonthly.reduce(
		(acc, cur) => acc + cur.cost,
		0
	);
	const expense = mockMonthly.reduce(
		(acc, cur) => acc + cur.expense,
		0
	);

	return (
		<div className="grid gap-4 lg:grid-cols-3">
			<Card className="shadow-md border border-gray-200 rounded-2xl lg:col-span-2">
				<CardHeader>
					<CardTitle>Evolução Receita x Despesas</CardTitle>
				</CardHeader>
				<CardContent className="h-[320px]">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={mockMonthly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
							<CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
							<Legend
								verticalAlign="top"
								align="center"
								wrapperStyle={{ paddingBottom: "12px" }}
							/>
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
							<Line
								type="monotone"
								dataKey="variableRevenue"
								name="Receita Variável"
								stroke="#16a34a"
								strokeWidth={2}
								dot={{ r: 3 }}
								activeDot={{ r: 5 }}
							/>
							<Line
								type="monotone"
								dataKey="fixedRevenue"
								name="Receita Fixa"
								stroke="#4ade80"
								strokeWidth={2}
								dot={{ r: 3 }}
								activeDot={{ r: 5 }}
							/>
							<Line
								type="monotone"
								dataKey="expense"
								name="Despesa"
								stroke="#dc2626"
								strokeWidth={2}
								dot={{ r: 3 }}
								activeDot={{ r: 5 }}
							/>
							<Line
								type="monotone"
								dataKey="cost"
								name="Custo"
								stroke="#f87171"
								strokeWidth={2}
								dot={{ r: 3 }}
								activeDot={{ r: 5 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle>Resumo Financeiro</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center justify-between text-sm">
						<span>Ponto de Equilíbrio</span>
						<span className="font-medium">{currencyBRL(breakEven)}</span>
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