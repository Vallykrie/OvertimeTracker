"use client";

import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteOvertime } from "@/app/actions/overtime";
import { Trash2, Clock, CalendarDays } from "lucide-react";
import { format as formatDateFns } from "date-fns";

interface LogEntry {
  _id: string;
  date: string;
  hours: number;
}

interface RecentHistoryProps {
  logs: LogEntry[];
  currentMonth: string;
}

const TIMEZONE = "Asia/Taipei";

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function LogItem({ log, index }: { log: LogEntry; index: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteOvertime(log._id);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/8">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-sm font-medium">{formatDate(log.date)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="gap-1 rounded-lg px-2.5 py-1 font-semibold tabular-nums"
        >
          <Clock className="h-3 w-3" />
          {log.hours}h
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}
          className="h-7 w-7 rounded-lg opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

export function RecentHistory({ logs, currentMonth }: RecentHistoryProps) {
  const recentLogs = logs.slice(0, 5);
  const monthName = formatDateFns(new Date(`${currentMonth}-01T12:00:00`), "MMMM");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Recent Activity
        </h3>
        <span className="text-xs text-muted-foreground/60">
          {logs.length} entries in {monthName}
        </span>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        {recentLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="mb-2 h-6 w-6 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground/60">
              No overtime logged in {monthName}
            </p>
            <p className="text-xs text-muted-foreground/40">
              Add your first entry above
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {recentLogs.map((log, index) => (
              <LogItem key={log._id} log={log} index={index} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
