import { getDaysInMonth } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { HEBREW_MONTH_NAMES_EN, HEBREW_MONTH_NAMES_HE } from "./constants.js";
import type { HebrewMonthInput } from "./types.js";

/**
 * Normalizes Hebrew month input (number or name) into month number.
 */
export function normalizeHebrewMonth(month: HebrewMonthInput): number {
  return HDate.monthNum(month);
}

/**
 * Returns whether a Hebrew year is leap (13 months).
 */
export function isHebrewLeapYear(year: number): boolean {
  return HDate.isLeapYear(year);
}

/**
 * Returns number of months in a Hebrew year (12 or 13).
 */
export function getMonthsInHebrewYear(year: number): number {
  return HDate.monthsInYear(year);
}

/**
 * Returns number of days in a Gregorian month.
 */
export function getDaysInGregorianMonth(year: number, month: number): number {
  return getDaysInMonth(new Date(year, month, 1));
}

/**
 * Returns number of days in a Hebrew month.
 */
export function getDaysInHebrewMonth(
  year: number,
  month: HebrewMonthInput,
): number {
  return HDate.daysInMonth(normalizeHebrewMonth(month), year);
}

/**
 * Returns Hebrew month name using the package transliteration.
 */
export function getHebrewMonthName(
  month: HebrewMonthInput,
  year: number,
): string {
  return HDate.getMonthName(normalizeHebrewMonth(month), year);
}

/**
 * Returns Hebrew month name in Hebrew-friendly transliteration.
 */
export function getHebrewMonthNameHe(
  month: HebrewMonthInput,
  year: number,
): string {
  const normalizedMonth = normalizeHebrewMonth(month);
  return (
    HEBREW_MONTH_NAMES_HE[normalizedMonth] ??
    getHebrewMonthName(normalizedMonth, year)
  );
}

/**
 * Returns Hebrew month name in English transliteration.
 */
export function getHebrewMonthNameEn(
  month: HebrewMonthInput,
  year: number,
): string {
  const normalizedMonth = normalizeHebrewMonth(month);
  return (
    HEBREW_MONTH_NAMES_EN[normalizedMonth] ??
    getHebrewMonthName(normalizedMonth, year)
  );
}

/**
 * Lists months in a Hebrew year with month number, name, and day count.
 */
export function getHebrewYearMonths(
  year: number,
): Array<{ month: number; name: string; days: number }> {
  const first = new HDate(1, 1, year);
  const monthsInYear = getMonthsInHebrewYear(year);
  const result: Array<{ month: number; name: string; days: number }> = [];

  for (let i = 0; i < monthsInYear; i += 1) {
    const current = first.add(i, "month");
    const month = current.getMonth();
    result.push({
      month,
      name: getHebrewMonthName(month, year),
      days: getDaysInHebrewMonth(year, month),
    });
  }

  return result;
}
