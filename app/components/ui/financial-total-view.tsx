import { formatCurrency } from "@/lib/utils";


type FinancialTotalViewProps = {
	totalLabel?: string;
	totalAmount: number;
};

const FinancialTotalView = function ({
	totalLabel,
	totalAmount,
}: FinancialTotalViewProps) {
	return (
		<div>
			<div className="text-2xl font-semibold">
				{formatCurrency(totalAmount)}
			</div>

			<div className="mt-1 text-xs text-muted-foreground">
				{totalLabel ?? ""}
			</div>
		</div>
	);
};

export { FinancialTotalView };