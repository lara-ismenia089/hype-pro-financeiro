import { motion } from "framer-motion";
import { CardComponent } from "./CardComponent";

type Variation = {
  value: string;
  color: string;
  icon: React.ReactNode;
};

type KpiCardProps = {
  title: string;
  value: string | number;
  variation?: Variation;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  onIconClick?: () => void;
};

export function KpiCard({
  title,
  value,
  variation,
  description,
  icon,
  delay = 0,
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
            <div className="text-2xl font-semibold">{value}</div>
            {variation && (
              <div
                className={`mt-1 flex items-center text-xs font-bold ${variation.color}`}
              >
                {variation.icon}
                {variation.value}
              </div>
            )}
            {description && (
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
