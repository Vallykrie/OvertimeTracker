"use client";

import { motion } from "framer-motion";

interface GoalRingProps {
  currentHours: number;
  goalHours: number;
}

export function GoalRing({ currentHours, goalHours }: GoalRingProps) {
  const percentage = Math.min((currentHours / goalHours) * 100, 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 100) return { stroke: "oklch(0.72 0.19 150)", glow: "oklch(0.72 0.19 150 / 30%)" };
    if (percentage >= 75) return { stroke: "oklch(0.7 0.18 265)", glow: "oklch(0.7 0.18 265 / 30%)" };
    if (percentage >= 50) return { stroke: "oklch(0.75 0.15 60)", glow: "oklch(0.75 0.15 60 / 30%)" };
    return { stroke: "oklch(0.65 0.18 265)", glow: "oklch(0.65 0.18 265 / 20%)" };
  };

  const colors = getColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-36 w-36 sm:h-40 sm:w-40">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/50"
          />

          {/* Glow behind progress */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.glow}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ filter: "blur(6px)" }}
          />

          {/* Progress arc */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl font-bold tabular-nums"
          >
            {currentHours.toFixed(1)}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-muted-foreground"
          >
            / {goalHours} hrs
          </motion.span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Monthly Goal
        </p>
        <p className="text-xs text-muted-foreground/60">
          {percentage >= 100
            ? "🎉 Goal reached!"
            : `${(goalHours - currentHours).toFixed(1)} hrs remaining`}
        </p>
      </div>
    </motion.div>
  );
}
