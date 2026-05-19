import {
	Building2,
	CalendarDays,
	DollarSign,
	Mail,
	Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Customer } from "@/lib/types";
import {
	formatCurrency,
	formatDate,
} from "@/lib/utils";


type CustomersSummaryCardProps = {
	summary: {
		totalCustomers: number;
		activeRevenue: number;
		grossRevenue: number;
		averageMonthlyFee: number;
	}
	customerList: Customer[];
};

const CustomersSummaryCard = function({
	summary,
	customerList,
}: CustomersSummaryCardProps) {
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
								<CardTitle>Total de Clientes</CardTitle>
							</CardHeader>
							<CardContent className="text-2xl font-bold">
								{summary.totalCustomers}
							</CardContent>
						</Card>

						<Card className="rounded-xl shadow border">
							<CardHeader>
								<CardTitle>Mensalidades</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-green-600">
									{formatCurrency(summary.activeRevenue)}
								</div>
								<p className="text-sm text-muted-foreground">
									Bruto: {formatCurrency(summary.grossRevenue)}
								</p>
							</CardContent>
						</Card>

						<Card className="rounded-xl shadow border">
							<CardHeader>
								<CardTitle>Média de Mensalidade</CardTitle>
							</CardHeader>
							<CardContent className="text-2xl font-bold text-blue-600">
								{formatCurrency(summary.averageMonthlyFee)}
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<Card className="rounded-2xl shadow-md border">
				<CardHeader>
					<CardTitle className="text-xl">Clientes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{customerList.length > 0 ? (
							customerList.map((customer) => (
								<Card
									key={customer.cnpj}
									className="rounded-2xl shadow-sm border hover:shadow-lg transition"
								>
									<CardHeader className="flex flex-row items-center justify-between">
										<CardTitle className="flex items-center gap-2 text-lg">
											<Building2 className="w-5 h-5 text-blue-600" />
											{customer.tradeName}
										</CardTitle>
										<Badge
											variant={
												customer.contractStatus === "Ativo"
													? "default"
													: customer.contractStatus === "vencido"
													? "destructive"
													: "secondary"
											}
											className="capitalize"
										>
											{customer.contractStatus}
										</Badge>
									</CardHeader>

									<CardContent className="space-y-3 text-sm">
										<div>
											<p className="text-muted-foreground">
												{customer.legalName}
											</p>
											<p className="text-xs text-muted-foreground">
												CNPJ:{" "}
												<span className="font-medium">{customer.cnpj}</span>
											</p>
										</div>

										<div className="space-y-1">
											<p className="flex items-center gap-2">
												<Mail className="w-4 h-4 text-muted-foreground" />
												<span>{customer.email}</span>
											</p>
											<p className="flex items-center gap-2">
												<Phone className="w-4 h-4 text-muted-foreground" />
												<span>{customer.phone}</span>
											</p>
										</div>

										<div className="space-y-1">
											{customer.contractSignedAt && (
												<p className="flex items-center gap-2">
													<CalendarDays className="w-4 h-4 text-muted-foreground" />
													Início:{" "}
													<span className="font-medium">
														{formatDate(customer.contractSignedAt)}
													</span>
												</p>
											)}
											{customer.contractExpiresAt && (
												<p className="flex items-center gap-2">
													<CalendarDays className="w-4 h-4 text-muted-foreground" />
													Vencimento:{" "}
													<span className="font-medium">
														{formatDate(customer.contractExpiresAt)}
													</span>
												</p>
											)}
										</div>

										<div className="flex items-center gap-2 pt-2 border-t">
											<DollarSign className="w-4 h-4 text-green-600" />
											<span className="font-semibold">
												{customer.monthlyFee > 0
													? formatCurrency(customer.monthlyFee)
													: "A definir"}
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

export { CustomersSummaryCard };