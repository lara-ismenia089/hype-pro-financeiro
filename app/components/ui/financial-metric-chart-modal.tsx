"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MonthlyFinancialSnapshot } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";


type FinancialMetricChartModalProps = {
  open: boolean;
  onClose: () => void;
  data: MonthlyFinancialSnapshot[];
};

export function FinancialMetricChartModal({
  data,
  open,
  onClose,
}: FinancialMetricChartModalProps) {
  const dataFormated = data.map((item) => {
    return {
      month: item.month,
      result: (item.fixedRevenue + item.variableRevenue) - (item.expense + item.cost)
    };
  });

  const barWidth = 60;
  const chartWidth = dataFormated.length * barWidth + 40;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-xl p-6">
        <DialogHeader>
          <DialogTitle>Resultado Mensal</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="overflow-x-auto">
            <div style={{ width: chartWidth, minWidth: "100%" }}>
              <BarChart 
                width={chartWidth}
                height={360}
                data={dataFormated}
                margin={{ left: 30, right: 10, top: 10, bottom: 10 }}
                className=""
              >
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                
                <YAxis
                  tickFormatter={(value: number) => formatCurrency(value)}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                
                <Tooltip
                  formatter={(value) => 
                    typeof value === "number" ? formatCurrency(value) : value
                  }
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
                />
              </BarChart>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}