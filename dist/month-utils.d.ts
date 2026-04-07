import type { HebrewMonthInput } from "./types.js";
/**
 * Normalizes Hebrew month input (number or name) into month number.
 */
export declare function normalizeHebrewMonth(month: HebrewMonthInput): number;
/**
 * Returns whether a Hebrew year is leap (13 months).
 */
export declare function isHebrewLeapYear(year: number): boolean;
/**
 * Returns number of months in a Hebrew year (12 or 13).
 */
export declare function getMonthsInHebrewYear(year: number): number;
/**
 * Returns number of days in a Gregorian month.
 */
export declare function getDaysInGregorianMonth(year: number, month: number): number;
/**
 * Returns number of days in a Hebrew month.
 */
export declare function getDaysInHebrewMonth(year: number, month: HebrewMonthInput): number;
/**
 * Returns Hebrew month name using Hebcal transliteration.
 */
export declare function getHebrewMonthName(month: HebrewMonthInput, year: number): string;
/**
 * Returns Hebrew month name in Hebrew-friendly transliteration.
 */
export declare function getHebrewMonthNameHe(month: HebrewMonthInput, year: number): string;
/**
 * Returns Hebrew month name in English transliteration.
 */
export declare function getHebrewMonthNameEn(month: HebrewMonthInput, year: number): string;
/**
 * Lists months in a Hebrew year with month number, name, and day count.
 */
export declare function getHebrewYearMonths(year: number): Array<{
    month: number;
    name: string;
    days: number;
}>;
//# sourceMappingURL=month-utils.d.ts.map