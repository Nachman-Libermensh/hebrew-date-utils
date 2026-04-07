import type { DualDate, DualDateRange, HebrewMonthInput } from "./types.js";
/**
 * Returns the first day of a Gregorian month as DualDate.
 */
export declare function getGregorianMonthFirstDay(year: number, month: number): DualDate;
/**
 * Returns the last day of a Gregorian month as DualDate.
 */
export declare function getGregorianMonthLastDay(year: number, month: number): DualDate;
/**
 * Returns first and last Gregorian day for a given month.
 */
export declare function getGregorianMonthBoundaries(year: number, month: number): DualDateRange;
/**
 * Returns the first day of a Hebrew month as DualDate.
 */
export declare function getHebrewMonthFirstDay(year: number, month: HebrewMonthInput): DualDate;
/**
 * Returns the last day of a Hebrew month as DualDate.
 */
export declare function getHebrewMonthLastDay(year: number, month: HebrewMonthInput): DualDate;
/**
 * Returns first and last Hebrew day for a given Hebrew month.
 */
export declare function getHebrewMonthBoundaries(year: number, month: HebrewMonthInput): DualDateRange;
//# sourceMappingURL=boundaries.d.ts.map