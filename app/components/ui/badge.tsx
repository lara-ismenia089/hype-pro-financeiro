import { TransactionKind } from "@/lib/types";
import { cn } from "@/lib/utils";


type BadgeProps = {
	label: TransactionKind;
	children: React.ReactNode;
};

const Badge = function({ label, children }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-full px-2 py-1 text-xs font-medium",
				label ===	"credit" &&
					"bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
				label ===	"debit" &&
					"bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
			)}
		>
			{children}
		</span>
	);
};

export { Badge };