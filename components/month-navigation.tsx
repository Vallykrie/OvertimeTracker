"use client";

import { ChevronLeft, ChevronRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format, subMonths, addMonths } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MonthNavigationProps {
  currentMonth: string; // YYYY-MM format
  historicalStats: { month: string; totalHours: number }[];
  hourlyRate: number;
  currency: string;
}

export function MonthNavigation({ 
  currentMonth, 
  historicalStats, 
  hourlyRate, 
  currency 
}: MonthNavigationProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentDate = new Date(`${currentMonth}-01T12:00:00`);

  const nowString = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
  }).format(new Date());

  const isCurrentMonthReal = currentMonth === nowString;

  const handlePrev = () => {
    const prevDate = subMonths(currentDate, 1);
    const newMonth = format(prevDate, "yyyy-MM");
    router.push(`/?month=${newMonth}`);
  };

  const handleNext = () => {
    if (isCurrentMonthReal) return;
    const nextDate = addMonths(currentDate, 1);
    const newMonth = format(nextDate, "yyyy-MM");
    router.push(`/?month=${newMonth}`);
  };

  const handleSelectMonth = (month: string) => {
    router.push(`/?month=${month}`);
    setIsOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center justify-center gap-3 py-2"
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handlePrev}
        className="rounded-full hover:bg-primary/20 transition-all hover:-translate-x-1"
        aria-label="Previous Month"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger 
          render={
            <button 
              className="text-lg font-bold w-40 text-center tabular-nums hover:text-primary transition-colors cursor-pointer"
              title="View History"
            />
          } 
        >
          {format(currentDate, "MMMM yyyy")}
        </DialogTrigger>
        
        <DialogContent className="max-h-[85vh] flex flex-col gap-0 p-0 sm:max-w-md sm:rounded-2xl border-none glass-card">
          <DialogHeader className="p-6 pb-4 border-b border-border/50">
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Month History
            </DialogTitle>
            <DialogDescription>
              Review your overtime statistics from previous months.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {!historicalStats || historicalStats.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No historical data available yet.
              </div>
            ) : (
              historicalStats.map((stat) => {
                const statDate = new Date(`${stat.month}-01T12:00:00`);
                const isSelected = stat.month === currentMonth;
                
                return (
                  <button
                    key={stat.month}
                    onClick={() => handleSelectMonth(stat.month)}
                    className={`flex flex-col gap-2 p-4 rounded-xl border transition-all text-left ${
                      isSelected 
                        ? "border-primary bg-primary/10 ring-1 ring-primary/20" 
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{format(statDate, "MMMM yyyy")}</span>
                      {isSelected && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Current View</span>}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="tabular-nums">{stat.totalHours.toFixed(1)}h</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="tabular-nums">{currency}{(stat.totalHours * hourlyRate).toLocaleString()}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleNext}
        disabled={isCurrentMonthReal}
        className="rounded-full hover:bg-primary/20 transition-all hover:translate-x-1 disabled:opacity-20 disabled:hover:translate-x-0 disabled:hover:bg-transparent"
        aria-label="Next Month"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
