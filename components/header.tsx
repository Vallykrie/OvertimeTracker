"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SettingsDialog } from "@/components/settings-dialog";
import { motion } from "framer-motion";

interface HeaderProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
  settings: {
    hourlyRate: number;
    monthlyGoal: number;
    currency: string;
  };
}

export function Header({ user, settings }: HeaderProps) {
  const firstName = user.name?.split(" ")[0] ?? "User";
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "U";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-primary/40">
          <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">
            Welcome back,
          </span>
          <span className="text-lg font-bold leading-tight tracking-tight">
            {firstName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <SettingsDialog settings={settings} />
      </div>
    </motion.header>
  );
}
