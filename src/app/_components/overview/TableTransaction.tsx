import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { currencyBRL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MockTransactionsType } from "@/lib/mock";

type TableTransactionType = {
	query: string;
	setQuery: (value: string) => void;
	filter: MockTransactionsType[];
}

export function TableTransaction({ query, setQuery, filter }: TableTransactionType) {
	return (
		<Card className="shadow-sm">
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Transações Recentes</CardTitle>
				
				<div className="flex items-center gap-2">
					<div className="relative w-full sm:w-96">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Buscar transações por descrição, categoria ou tipo..."
							className="pl-9"
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="text-left text-muted-foreground">
						<tr className="border-b">
							<th scope="col" className="py-2 pr-4">Data</th>
							<th scope="col" className="py-2 pr-4">Descrição</th>
							<th scope="col" className="py-2 pr-4">Categoria</th>
							<th scope="col" className="py-2 pr-4">Conta</th>
							<th scope="col" className="py-2 pr-4 text-right">Valor</th>
						</tr>
					</thead>
					<tbody>
						{filter.length === 0 ? (
							<tr>
								<td colSpan={5} className="py-4 text-center text-muted-foreground">
									Nenhuma transação encontrada.
								</td>
							</tr>
						) : (
						filter.map((t) => (
							<tr key={t.id} className="border-b last:border-0">
								<td className="py-2 pr-4">{new Date(t.date).toLocaleDateString("pt-BR")}</td>
								<td className="py-2 pr-4">{t.description}</td>
								<td className="py-2 pr-4">
									<Badge variant={t.type === "Receita" ? "default" : "secondary"}>{t.category}</Badge>
								</td>
								<td className="py-2 pr-4">{t.account}</td>
								<td className={`py-2 pr-0 text-right font-medium ${t.amount < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
									{currencyBRL(t.amount)}
								</td>
							</tr>
						)))}
					</tbody>
				</table>
			</CardContent>
		</Card>
	);
}