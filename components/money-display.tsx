"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface MoneyDisplayProps {
  totalHours: number;
  hourlyRate: number;
  currency: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) =>
    v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

export function MoneyDisplay({
  totalHours,
  hourlyRate,
  currency,
}: MoneyDisplayProps) {
  const totalEarnings = totalHours * hourlyRate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" />
        Extra Earnings This Month
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-muted-foreground">
          {currency}
        </span>
        <span className="text-6xl font-extrabold tracking-tighter sm:text-7xl">
          <AnimatedNumber value={totalEarnings} />
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <span className="font-medium tabular-nums">{totalHours.toFixed(1)}</span>
        <span>hours logged</span>
        <span className="text-border">·</span>
        <span className="font-medium tabular-nums">
          {currency}
          {hourlyRate}
        </span>
        <span>/hr</span>
      </motion.div>
    </motion.div>
  );
}
