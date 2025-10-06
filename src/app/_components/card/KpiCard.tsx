import { motion } from "framer-motion";

import { CardComponent } from "./CardComponent";

type Variation = {
  value: string;
  color?: string;
  icon?: React.ReactNode;
};

type KpiCardProps = {
  title: string;
  value: string | number;
  primaryLabel?: string;
  primaryValue?: string | number;
  secondaryLabel?: string;
  secondaryValue?: string | number;
  variation?: Variation;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  doubleResult?: boolean;
  onIconClick?: () => void;
};

export function KpiCard({
  title,
  value,
  primaryLabel,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  variation,
  description,
  icon,
  delay = 0,
  doubleResult = false,
  onIconClick,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <CardComponent title={title}>
        <div className="flex items-end justify-between">
          <div>
            {!doubleResult && <div className={`text-2xl font-semibold ${(value as string).charAt(0) === "-" ? "text-red-500" : ""}`}>{value}</div>}
            {doubleResult && (
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">{primaryLabel}</span>
                <div className="text-md font-semibold">{primaryValue}</div>
                <span className="text-xs font-semibold text-gray-500">{secondaryLabel}</span>
                <div className="text-md font-semibold">{secondaryValue}</div>
              </div>
            )}
            {variation && (
              <div
                className={`mt-1 flex items-center text-xs font-bold ${variation.color}`}
              >
                {variation.icon}
                {variation.value}
              </div>
            )}
            {description && !doubleResult && (
              <div className="mt-1 text-xs text-muted-foreground">
                {description}
              </div>
            )}
          </div>

          {icon &&
            (onIconClick ? (
              <div
                className="h-8 w-8 opacity-60 hover:cursor-pointer"
                onClick={onIconClick}
              >
                {icon}
              </div>
            ) : (
              <div className="h-8 w-8 opacity-60">{icon}</div>
            ))}
        </div>
      </CardComponent>
    </motion.div>
  );
}
