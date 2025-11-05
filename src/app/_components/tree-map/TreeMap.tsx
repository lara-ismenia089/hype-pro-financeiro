"use client";

import React, { useMemo } from "react";

import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "@/lib/mock";
import { currencyBRL, getSubcategory } from "@/lib/utils";

export function CategoriesTreemap() {
  const result = mockTransactions.filter(
    (register) => register.accountId !== 104 && register.accountId !== 106
  );

  const data = useMemo(() => {
    const grouped: Record<string, number> = {};
    result.forEach((t) => {
      const category = getSubcategory(t.accountId);
      grouped[category] = (grouped[category] || 0) + t.amount;
    });
    return Object.entries(grouped).map(([name, size]) => ({ name, size }));
  }, [result]);
	data.sort((a, b) => b.size - a.size);

  const total = data.reduce((acc, cur) => acc + cur.size, 0);
  const filtered = data
    .filter((r) => r.size > 670);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <ResponsiveContainer width="100%" height={400} className="col-span-2">
        <Treemap
          data={data}
          dataKey="size"
          nameKey="name"
          stroke="#fff"
          content={({ x, y, width, height, name, size }) => (
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
                    {currencyBRL(size)}
                  </text>
                </>
              )}
            </g>
          )}
        >
          <Tooltip
            formatter={(value: number) => currencyBRL(value)}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ fontWeight: "bold", color: "#374151" }}
          />
        </Treemap>
      </ResponsiveContainer>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Principais categorias</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma categoria relevante
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((item) => (
                <>
                {item.name.toLowerCase() === "contratos mensais" || item.name.toLowerCase() === "projetos avulsos" ? 
                  <li
                    key={item.name}
                    className="flex justify-between last:border-0 pb-1"
                    >
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {((item.size / total) * 100).toFixed(1)}%
                      </Badge>
                      <span className="text-muted-foreground">
                        {currencyBRL(item.size)}
                      </span>
                    </div>
                  </li>
                : <></>}</>
              ))}

              <div className="border-2 rounded-full"></div>

              {filtered.map((item) => (
                <>
                {item.name.toLowerCase() !== "contratos mensais" && item.name.toLowerCase() !== "projetos avulsos" ? 
                  <li
                    key={item.name}
                    className="flex justify-between last:border-0 pb-1"
                    >
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {((item.size / total) * 100).toFixed(1)}%
                      </Badge>
                      <span className="text-muted-foreground">
                        {currencyBRL(item.size)}
                      </span>
                    </div>
                  </li>
                : <></>}</>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
