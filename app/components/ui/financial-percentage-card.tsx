import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FinancialMetric } from "@/lib/types";

type FinancialPercentageCardProps = {
	title: string;
	metric?: FinancialMetric;
};

const FinancialPercentageCard = function ({
	title,
	metric,
}: FinancialPercentageCardProps) {
	const percentageValue = metric?.amount ?? 0;

	return (
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
							{percentageValue.toFixed(2)}%
						</div>

						<div className="mt-1 text-xs text-muted-foreground">
							{metric?.label ?? ""}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export { FinancialPercentageCard };