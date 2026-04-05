import { endOfMonth, startOfMonth } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate } from "./conversion.js";
import { getDaysInHebrewMonth, normalizeHebrewMonth } from "./month-utils.js";
import type { DualDate, DualDateRange, HebrewMonthInput } from "./types.js";

export function getGregorianMonthFirstDay(
  year: number,
  month: number,
): DualDate {
  return toDualDate(startOfMonth(new Date(year, month, 1)));
}

export function getGregorianMonthLastDay(
  year: number,
  month: number,
): DualDate {
  return toDualDate(endOfMonth(new Date(year, month, 1)));
}

export function getGregorianMonthBoundaries(
  year: number,
  month: number,
): DualDateRange {
  return {
    start: getGregorianMonthFirstDay(year, month),
    end: getGregorianMonthLastDay(year, month),
  };
}

export function getHebrewMonthFirstDay(
  year: number,
  month: HebrewMonthInput,
): DualDate {
  return toDualDate(new HDate(1, normalizeHebrewMonth(month), year));
}

export function getHebrewMonthLastDay(
  year: number,
  month: HebrewMonthInput,
): DualDate {
  const normalizedMonth = normalizeHebrewMonth(month);
  const lastDay = getDaysInHebrewMonth(year, normalizedMonth);
  return toDualDate(new HDate(lastDay, normalizedMonth, year));
}

export function getHebrewMonthBoundaries(
  year: number,
  month: HebrewMonthInput,
): DualDateRange {
  return {
    start: getHebrewMonthFirstDay(year, month),
    end: getHebrewMonthLastDay(year, month),
  };
}
