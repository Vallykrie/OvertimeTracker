"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/app/actions/overtime";
import { Settings, Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface SettingsDialogProps {
  settings: {
    hourlyRate: number;
    monthlyGoal: number;
    currency: string;
  };
}

export function SettingsDialog({ settings }: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(String(settings.hourlyRate));
  const [monthlyGoal, setMonthlyGoal] = useState(String(settings.monthlyGoal));
  const [currency, setCurrency] = useState(settings.currency);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await updateSettings(
        parseFloat(hourlyRate) || 0,
        parseFloat(monthlyGoal) || 60,
        currency || "NT$"
      );
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full transition-all duration-300 hover:bg-accent hover:rotate-45"
            aria-label="Settings"
          />
        }
      >
        <Settings className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="glass-card border-none sm:max-w-md sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
          <DialogDescription>
            Configure your hourly rate, monthly goal, and currency.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="currency" className="text-sm font-medium">
              Currency Symbol
            </Label>
            <Input
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="NT$"
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="hourlyRate" className="text-sm font-medium">
              Hourly Rate ({currency})
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="0"
              min="0"
              className="rounded-xl text-lg font-semibold tabular-nums"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="monthlyGoal" className="text-sm font-medium">
              Monthly Goal (hours)
            </Label>
            <Input
              id="monthlyGoal"
              type="number"
              value={monthlyGoal}
              onChange={(e) => setMonthlyGoal(e.target.value)}
              placeholder="60"
              min="1"
              className="rounded-xl text-lg font-semibold tabular-nums"
            />
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:flex-col">
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full rounded-xl py-5 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full gap-2 rounded-xl text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
