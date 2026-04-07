import { toIsoDate } from "hebrew-date-utils";
import type { PlaygroundRunner } from "../types";

const DAY_MS = 24 * 60 * 60 * 1000;

export type RunnerMap = Record<string, PlaygroundRunner>;

export function orderedDates(a: Date, b: Date): [Date, Date] {
  return a.getTime() <= b.getTime() ? [a, b] : [b, a];
}

export function dateExpr(value: Date): string {
  return `new Date("${toIsoDate(value)}")`;
}

export function getHolidayLocale(locale: "he" | "en"): string {
  return locale === "he" ? "he" : "en";
}

export function getUiLocale(locale: "he" | "en"): string {
  return locale === "he" ? "he-IL" : "en-US";
}

export function clampWindow(start: Date, end: Date, maxDays = 90) {
  const span = Math.floor((end.getTime() - start.getTime()) / DAY_MS);
  if (span <= maxDays) {
    return { start, end, clamped: false };
  }

  return {
    start,
    end: new Date(start.getTime() + maxDays * DAY_MS),
    clamped: true,
  };
}

export function asPreview<T>(items: T[], size = 8) {
  return {
    total: items.length,
    preview: items.slice(0, size),
  };
}

export function normalizedShift(shiftAmount: number): number {
  if (!Number.isFinite(shiftAmount)) {
    return 1;
  }

  return Math.max(-24, Math.min(24, Math.trunc(shiftAmount)));
}
