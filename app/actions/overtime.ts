"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import OvertimeLog from "@/models/OvertimeLog";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

const TIMEZONE = "Asia/Taipei"; // UTC+8

/**
 * Get the current date boundaries in UTC+8 timezone.
 * Returns the start and end of "today" in UTC+8 as UTC Date objects.
 */
function getTodayBoundaries(): { start: Date; end: Date } {
  const now = new Date();
  // Format the date in UTC+8 to get the local date string
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const localDateStr = formatter.format(now); // e.g. "2026-04-30"

  // Parse back to create UTC boundaries for that local day
  const start = new Date(`${localDateStr}T00:00:00+08:00`);
  const end = new Date(`${localDateStr}T23:59:59.999+08:00`);

  return { start, end };
}

/**
 * Get the current month boundaries in UTC+8 timezone.
 */
function getMonthBoundaries(): { start: Date; end: Date } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const localDateStr = formatter.format(now); // "2026-04-30"
  const [year, month] = localDateStr.split("-").map(Number);

  const start = new Date(`${year}-${String(month).padStart(2, "0")}-01T00:00:00+08:00`);

  // Last day of month
  const lastDay = new Date(year, month, 0).getDate();
  const end = new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}T23:59:59.999+08:00`
  );

  return { start, end };
}

/**
 * Format a Date to a local date string in UTC+8.
 */
function formatDateLocal(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export async function getMonthlyLogs() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const { start, end } = getMonthBoundaries();

  const logs = await OvertimeLog.find({
    userId: session.user.id,
    date: { $gte: start, $lte: end },
  })
    .sort({ date: -1, createdAt: -1 })
    .lean();

  return logs.map((log) => ({
    _id: log._id.toString(),
    date: log.date.toISOString(),
    hours: log.hours,
  }));
}

export async function addOvertime(hours: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!hours || hours === 0) {
    throw new Error("Hours cannot be zero");
  }

  await dbConnect();

  // Use the UTC+8 "today" as a noon timestamp to avoid boundary issues
  const { start } = getTodayBoundaries();
  const dateForLog = new Date(start.getTime() + 12 * 60 * 60 * 1000); // noon UTC+8

  await OvertimeLog.create({
    userId: session.user.id,
    date: dateForLog,
    hours,
  });

  revalidatePath("/");
}

export async function deleteOvertime(logId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  // Only allow deleting own logs
  const log = await OvertimeLog.findOne({
    _id: logId,
    userId: session.user.id,
  });

  if (!log) {
    throw new Error("Log not found");
  }

  await OvertimeLog.deleteOne({ _id: logId });

  revalidatePath("/");
}

export async function getUserSettings() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const user = await User.findById(session.user.id).lean();

  if (!user) {
    throw new Error("User not found");
  }

  return {
    hourlyRate: user.hourlyRate ?? 0,
    monthlyGoal: user.monthlyGoal ?? 60,
    currency: user.currency ?? "NT$",
  };
}

export async function updateSettings(
  hourlyRate: number,
  monthlyGoal: number,
  currency: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  await User.findByIdAndUpdate(session.user.id, {
    hourlyRate: Math.max(0, hourlyRate),
    monthlyGoal: Math.max(1, monthlyGoal),
    currency: currency || "NT$",
  });

  revalidatePath("/");
}
