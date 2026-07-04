"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addOvertime } from "@/app/actions/overtime";
import { Plus, Minus, Loader2 } from "lucide-react";

interface OvertimeControllerProps {
  currentMonth: string;
}

export function OvertimeController({ currentMonth }: OvertimeControllerProps) {
  const [hours, setHours] = useState<string>("");
  const [activeAction, setActiveAction] = useState<"add" | "subtract" | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (isSubtract: boolean = false) => {
    const numHours = parseFloat(hours);
    if (isNaN(numHours) || numHours <= 0) return;

    setActiveAction(isSubtract ? "subtract" : "add");
    startTransition(async () => {
      try {
        await addOvertime(isSubtract ? -numHours : numHours, currentMonth);
        setHours("");
      } finally {
        setActiveAction(null);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(false);
    }
  };

  const isSubtracting = isPending && activeAction === "subtract";
  const isAdding = isPending && activeAction === "add";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass flex items-center gap-3 rounded-2xl p-4"
    >
      <div className="flex flex-1 items-center gap-3">
        <Input
          type="number"
          placeholder="Input overtime hours here (e.g. 2.5)"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          onKeyDown={handleKeyDown}
          min="0.5"
          step="0.5"
          disabled={isPending}
          className="h-12 flex-1 rounded-xl border-none bg-background/50 text-center text-lg font-semibold tabular-nums placeholder:text-muted-foreground/40 focus-visible:ring-primary/30"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleSubmit(true)}
          disabled={isPending || !hours || parseFloat(hours) <= 0}
          aria-label="Subtract overtime hours"
          title="Subtract overtime hours"
          className="h-12 gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] disabled:opacity-40"
        >
          {isSubtracting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Minus className="h-5 w-5" />
          )}
          {isSubtracting ? "Decreasing..." : ""}
        </Button>
        <Button
          onClick={() => handleSubmit(false)}
          disabled={isPending || !hours || parseFloat(hours) <= 0}
          aria-label="Add overtime hours"
          title="Add overtime hours"
          className="h-12 gap-2 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] disabled:opacity-40"
        >
          {isAdding ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          {isAdding ? "Adding..." : ""}
        </Button>
      </div>
    </motion.div>
  );
}
