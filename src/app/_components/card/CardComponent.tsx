import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

export function CardComponent({ title, children }: { title: string, children: React.ReactNode }) {
	return (
		<Card className="shadow-sm text-white bg-[#031c3e]">
			<CardHeader className="flex justify-between pb-2">
				<CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
}