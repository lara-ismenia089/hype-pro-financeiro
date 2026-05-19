"use client";

import {
	ResponsiveContainer,
	Tooltip,
	Treemap,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FinancialCategorySummary } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";


type CategoriesTreeMapProps = {
	totalCategorizedAmount: number;
	categories: FinancialCategorySummary[];
	topCategories: FinancialCategorySummary[];
};

const FEATURED_CATEGORIES = [
	"contratos mensais",
	"projetos avulsos",
];

const CategoriesTreeMap = ({
	totalCategorizedAmount,
	categories,
	topCategories,
}: CategoriesTreeMapProps) => {
	const featuredCategories = topCategories.filter((item) =>
		FEATURED_CATEGORIES.includes(
			item.categoryName.toLowerCase(),
		),
	);

	const remainingCategories = topCategories.filter(
		(item) =>
			!FEATURED_CATEGORIES.includes(
				item.categoryName.toLowerCase(),
			),
	);

	return (
		<div className="grid gap-4 lg:grid-cols-3">
			<ResponsiveContainer
				width="100%"
				height={400}
				className="col-span-2"
			>
				<Treemap
					data={categories}
					dataKey="totalAmount"
					nameKey="categoryName"
					stroke="#fff"
					content={({
						x,
						y,
						width,
						height,
						name,
						value,
					}) => (
						<g>
							<rect
								x={x}
								y={y}
								width={width}
								height={height}
								style={{
									fill: "#020E20",
									stroke: "#fff",
									strokeWidth: 2,
								}}
							/>

							{width > 90 && height > 30 && (
								<>
									<text
										x={x + width / 2}
										y={y + height / 2 - 6}
										textAnchor="middle"
										dominantBaseline="middle"
										fill="#fff"
										fontSize={14}
										fontWeight="600"
									>
										{name}
									</text>

									<text
										x={x + width / 2}
										y={y + height / 2 + 12}
										textAnchor="middle"
										dominantBaseline="middle"
										fill="#f3f4f6"
										fontSize={12}
									>
										{formatCurrency(
											value as number,
										)}
									</text>
								</>
							)}
						</g>
					)}
				>
					<Tooltip
						formatter={(value) =>
							formatCurrency(value as number)
						}
						contentStyle={{
							backgroundColor: "#fff",
							borderRadius: "8px",
							border: "1px solid #e5e7eb",
							boxShadow:
								"0 4px 10px rgba(0,0,0,0.1)",
						}}
						labelStyle={{
							fontWeight: "bold",
							color: "#374151",
						}}
					/>
				</Treemap>
			</ResponsiveContainer>

			<Card className="shadow-sm">
				<CardHeader>
					<CardTitle>
						Principais categorias
					</CardTitle>
				</CardHeader>

				<CardContent>
					{topCategories.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Nenhuma categoria relevante
						</p>
					) : (
						<ul className="space-y-2">
							{featuredCategories.map((item) => (
								<li
									key={item.categoryName}
									className="flex justify-between pb-1"
								>
									<span className="font-medium">
										{item.categoryName}
									</span>

									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											{(
												(item.totalAmount /
													totalCategorizedAmount) *
												100
											).toFixed(1)}
											%
										</Badge>

										<span className="text-muted-foreground">
											{formatCurrency(
												item.totalAmount,
											)}
										</span>
									</div>
								</li>
							))}

							<div className="border rounded-full" />

							{remainingCategories.map((item) => (
								<li
									key={item.categoryName}
									className="flex justify-between pb-1"
								>
									<span className="font-medium">
										{item.categoryName}
									</span>

									<div className="flex items-center gap-2">
										<Badge variant="secondary">
											{(
												(item.totalAmount /
													totalCategorizedAmount) *
												100
											).toFixed(1)}
											%
										</Badge>

										<span className="text-muted-foreground">
											{formatCurrency(
												item.totalAmount,
											)}
										</span>
									</div>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export { CategoriesTreeMap };