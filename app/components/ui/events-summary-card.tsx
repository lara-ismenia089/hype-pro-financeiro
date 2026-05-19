import {
	User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Event } from "@/lib/types";
import {
	formatCurrency,
	formatDate,
} from "@/lib/utils";

type EventsSummaryCardProps = {
	summary: {
		totalAmount: number;
		paidAmount: number;
		openAmount: number;
	},
	eventList: Event[];
	grossRevenue: number;
};

const EventsSummaryCard = function({
	summary,
	eventList,
	grossRevenue,
}: EventsSummaryCardProps) {
	return (
		<>
			<Card className="mb-8 rounded-2xl shadow-md border">
				<CardHeader>
					<CardTitle className="text-xl">Resumo</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<Card className="rounded-xl shadow border">
							<CardHeader>
								<CardTitle>Total</CardTitle>
							</CardHeader>
							<CardContent className="text-2xl font-bold">
								{formatCurrency(summary.totalAmount)}
							</CardContent>
						</Card>

						<Card className="rounded-xl shadow border">
							<CardHeader>
								<CardTitle>Recebido</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-green-600">
									{formatCurrency(summary.paidAmount)}
								</div>
								<p className="text-sm text-muted-foreground">
									Bruto: {formatCurrency(grossRevenue)}
								</p>
							</CardContent>
						</Card>

						<Card className="rounded-xl shadow border">
							<CardHeader>
								<CardTitle>Em aberto</CardTitle>
							</CardHeader>
							<CardContent className="text-2xl font-bold text-blue-600">
								{formatCurrency(summary.openAmount)}
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<Card className="rounded-2xl shadow-md border">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Eventos</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{eventList.length > 0 ? (
							eventList.map((event) => (
								<Card
									key={event.customer + event.date + event.eventAmount}
									className="rounded-2xl border shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
								>
									<CardHeader className="flex flex-row items-center justify-between gap-2">
										<CardTitle className="flex items-center gap-2 min-w-0 text-xs md:text-lg font-semibold">
											<User className="w-5 h-5 shrink-0 text-blue-600" />

											<span className="truncate">
												{event.customer}
											</span>
										</CardTitle>

										<Badge className="shrink-0 capitalize text-xs px-2 py-1">
											{formatDate(event.date)}
										</Badge>
									</CardHeader>

									<CardContent className="space-y-4 text-sm">
										<p className="font-medium text-muted-foreground">
											Tipo do evento: {event.eventAmount}
										</p>

										<div className="flex flex-col gap-2 pt-3 border-t">
											<span className="flex justify-between">
												<span className="text-muted-foreground">Pago</span>
												<span className="font-semibold">
													{formatCurrency(event.paidAmount || 0)}
												</span>
											</span>

											<span className="flex justify-between">
												<span className="text-muted-foreground">Em aberto</span>
												<span className="font-semibold">
													{formatCurrency(event.openAmount || 0)}
												</span>
											</span>
											
											<span className="flex justify-between border-t pt-2">
												<span className="text-muted-foreground">Total</span>
												<span className="font-bold">
													{formatCurrency(event.totalAmount || 0)}
												</span>
											</span>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<p className="text-muted-foreground">Nenhum cliente encontrado.</p>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export { EventsSummaryCard };