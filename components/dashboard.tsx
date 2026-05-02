"use client";

import { Header } from "@/components/header";
import { MoneyDisplay } from "@/components/money-display";
import { GoalRing } from "@/components/goal-ring";
import { OvertimeController } from "@/components/overtime-controller";
import { RecentHistory } from "@/components/recent-history";
import { motion } from "framer-motion";

interface LogEntry {
  _id: string;
  date: string;
  hours: number;
}

interface DashboardProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
  settings: {
    hourlyRate: number;
    monthlyGoal: number;
    currency: string;
  };
  logs: LogEntry[];
}

export function Dashboard({ user, settings, logs }: DashboardProps) {
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden mesh-gradient">
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-chart-2/5 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col gap-5 px-4 py-5 sm:mx-auto sm:max-w-lg sm:px-6 sm:py-6 md:max-w-xl">
        {/* Header */}
        <Header user={user} settings={settings} />

        {/* Money + Goal section */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            {/* Money Display */}
            <div className="flex-1 flex justify-center">
              <MoneyDisplay
                totalHours={totalHours}
                hourlyRate={settings.hourlyRate}
                currency={settings.currency}
              />
            </div>

            {/* Goal Ring */}
            <GoalRing
              currentHours={totalHours}
              goalHours={settings.monthlyGoal}
            />
          </div>
        </div>

        {/* Controller */}
        <OvertimeController />

        {/* Recent History */}
        <RecentHistory logs={logs} />
      </div>
    </div>
  );
}
