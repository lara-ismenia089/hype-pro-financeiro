import { formatCurrency } from "@/lib/utils";


type FinancialBreakdownViewProps = {
	fixedLabel?: string;
	fixedAmount: number;
	variableLabel?: string;
	variableAmount: number;
};

const FinancialBreakdownView = function ({
	fixedLabel,
	fixedAmount,
	variableLabel,
	variableAmount,
}: FinancialBreakdownViewProps) {
	return (
		<div className="flex flex-col">
			<span className="text-sm font-semibold text-gray-500">
				{fixedLabel ?? ""}
			</span>

			<div className="text-md font-semibold">
				{formatCurrency(fixedAmount)}
			</div>

			<span className="text-sm font-semibold text-gray-500">
				{variableLabel ?? ""}
			</span>

			<div className="text-md font-semibold">
				{formatCurrency(variableAmount)}
			</div>
		</div>
	);
};

export { FinancialBreakdownView };