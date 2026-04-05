import { HDate } from "./hebcal-compat.js";
import { HEBREW_MONTH_NAMES_EN, HEBREW_MONTH_NAMES_HE } from "./constants.js";
import type { HebrewMonthInput } from "./types.js";

export function normalizeHebrewMonth(month: HebrewMonthInput): number {
  return HDate.monthNum(month);
}

export function isHebrewLeapYear(year: number): boolean {
  return HDate.isLeapYear(year);
}

export function getMonthsInHebrewYear(year: number): number {
  return HDate.monthsInYear(year);
}

export function getDaysInHebrewMonth(
  year: number,
  month: HebrewMonthInput,
): number {
  return HDate.daysInMonth(normalizeHebrewMonth(month), year);
}

export function getHebrewMonthName(
  month: HebrewMonthInput,
  year: number,
): string {
  return HDate.getMonthName(normalizeHebrewMonth(month), year);
}

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
