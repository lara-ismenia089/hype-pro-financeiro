"use client";

import { motion } from "framer-motion";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  LabelList,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { currencyBRL } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { MockMonthlyType } from "@/lib/types";

type ResultChartModalProps = {
  open: boolean;
  onClose: () => void;
  data: MockMonthlyType[];
};

export function ResultChartModal({ open, onClose, data }: ResultChartModalProps) {

  const dataFormated = data.map((item) => {
    return { month: item.month, result: (item.fixedRevenue + item.variableRevenue) - (item.expense + item.cost) }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Resultado Mensal</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataFormated} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value: number) => currencyBRL(value)}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
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
              <Bar
                dataKey="result"
                stackId="result"
                name="Resultado Mensal"
                fill="#031B3D"
                radius={[6, 6, 0, 0]}
              >
                <LabelList
                  dataKey="result"
                  formatter={(value: React.ReactNode) => currencyBRL(Number(value))}
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
