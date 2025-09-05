import { 
	Card, 
	CardTitle,
	CardHeader, 
	CardContent, 
} from "@/components/ui/card";
import { 
	Bar,
	XAxis, 
	YAxis,
	Tooltip, 
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import { mockMonthly } from "@/lib/mock";
import { currencyBRL } from "@/lib/utils";

type StackedColumnChartType = {
	title: string;
	dataKeyXAxis: string;
	dataKeyBar01: string;
	name01: string;
	dataKeyBar02: string;
	name02: string;
};

export function StackedColumnChart(data: StackedColumnChartType) {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle>{data.title}</CardTitle>
			</CardHeader>
			<CardContent className="h-[320px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={mockMonthly}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={data.dataKeyXAxis} />
						<YAxis />
						<Tooltip formatter={(v: number) => currencyBRL(v)} />
						<Bar dataKey={data.dataKeyBar01} stackId="a" fill="#202020" name={data.name01} />
						<Bar dataKey={data.dataKeyBar02} stackId="a" fill="#FBA91F" name={data.name02} />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}