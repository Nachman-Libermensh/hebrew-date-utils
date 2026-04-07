import {
  differenceInCalendarDays,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate, toGregorian } from "./conversion.js";
import type {
  DualDateInput,
  DualDateRange,
  HebrewMonthInput,
} from "./types.js";

/**
 * Returns true when date belongs to the specified Hebrew month and year.
 */
export function isDateInHebrewMonth(
  input: DualDateInput,
  month: HebrewMonthInput,
  year: number,
): boolean {
  const dual = toDualDate(input);
  const numericMonth =
    typeof month === "number" ? month : HDate.monthFromName(month);
  return dual.hebYear === year && dual.hebMonth === numericMonth;
}

/**
 * Returns true when date belongs to the specified Gregorian month and year.
 */
export function isDateInGregorianMonth(
  input: DualDateInput,
  month: number,
  year: number,
): boolean {
  const greg = toGregorian(input);
  return greg.getMonth() === month && greg.getFullYear() === year;
}

/**
 * Returns true when two inputs share the same Hebrew day, month, and year.
 */
export function isSameHebrewDate(a: DualDateInput, b: DualDateInput): boolean {
  const da = toDualDate(a);
  const db = toDualDate(b);

  return (
    da.hebYear === db.hebYear &&
    da.hebMonth === db.hebMonth &&
    da.hebDay === db.hebDay
  );
}

/**
 * Returns true when two inputs are the same Gregorian calendar date.
 */
export function isSameGregorianDate(
  a: DualDateInput,
  b: DualDateInput,
): boolean {
  return isSameDay(toGregorian(a), toGregorian(b));
}

/**
 * Compares two inputs by Gregorian day difference.
 */
export function compareDualDates(a: DualDateInput, b: DualDateInput): number {
  return differenceInCalendarDays(toGregorian(a), toGregorian(b));
}

/**
 * Returns true when input falls within the inclusive range.
 */
export function isWithinDualDateRange(
  input: DualDateInput,
  range: DualDateRange,
): boolean {
  const date = toGregorian(input);
  return isWithinInterval(date, {
    start: range.start.greg,
    end: range.end.greg,
  });
}
