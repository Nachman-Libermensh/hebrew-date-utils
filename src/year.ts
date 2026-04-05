import { HDate, months } from "./hebcal-compat.js";
import { toDualDate } from "./conversion.js";
import type { DualDate, HebrewYearInfo } from "./types.js";

export function getCurrentDualDate(referenceDate: Date = new Date()): DualDate {
  return toDualDate(referenceDate);
}

export function getCurrentHebrewYear(referenceDate: Date = new Date()): number {
  return new HDate(referenceDate).getFullYear();
}

export function getHebrewYearInfo(year: number): HebrewYearInfo {
  const firstDay = toDualDate(new HDate(1, months.TISHREI, year));
  const lastDayOfElul = HDate.daysInMonth(months.ELUL, year);
  const lastDay = toDualDate(new HDate(lastDayOfElul, months.ELUL, year));

  return {
    year,
    isLeapYear: HDate.isLeapYear(year),
    monthsInYear: HDate.monthsInYear(year),
    daysInYear: HDate.daysInYear(year),
    longCheshvan: HDate.longCheshvan(year),
    shortKislev: HDate.shortKislev(year),
    firstDay,
    lastDay,
  };
}

export function getHebrewYearForGregorianYear(gregorianYear: number): number {
  return new HDate(new Date(gregorianYear, 0, 1)).getFullYear();
}
