"use client";

import { Header } from "@/components/header";
import { MonthNavigation } from "@/components/month-navigation";
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
  currentMonth: string;
  historicalStats: { month: string; totalHours: number }[];
}

export function Dashboard({ user, settings, logs, currentMonth, historicalStats }: DashboardProps) {
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);

  return (
    <div className="relative flex h-screen w-screen flex-col mesh-gradient overflow-hidden">
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

      {/* Scrollable container */}
      <div className="relative z-10 h-full w-full overflow-y-auto scrollbar-hide">
        {/* Main content */}
        <div className="flex min-h-full flex-col gap-5 px-4 py-10 sm:mx-auto sm:max-w-lg sm:px-6 sm:py-6 md:max-w-xl sm:py-5">
        {/* Header */}
        <Header user={user} settings={settings} />

        {/* Month Navigation */}
        <MonthNavigation 
          currentMonth={currentMonth} 
          historicalStats={historicalStats}
          hourlyRate={settings.hourlyRate}
          currency={settings.currency}
        />

        {/* Money + Goal section */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            {/* Money Display */}
            <div className="flex-1 flex justify-center">
              <MoneyDisplay
                totalHours={totalHours}
                hourlyRate={settings.hourlyRate}
                currency={settings.currency}
                currentMonth={currentMonth}
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
        <OvertimeController currentMonth={currentMonth} />

        {/* Recent History */}
        <RecentHistory logs={logs} currentMonth={currentMonth} />
        </div>
      </div>
    </div>
  );
}
