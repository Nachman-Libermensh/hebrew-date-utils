import type { DualDateInput, DualDateRange, HebrewMonthInput } from "./types.js";
/**
 * Returns true when date belongs to the specified Hebrew month and year.
 */
export declare function isDateInHebrewMonth(input: DualDateInput, month: HebrewMonthInput, year: number): boolean;
/**
 * Returns true when date belongs to the specified Gregorian month and year.
 */
export declare function isDateInGregorianMonth(input: DualDateInput, month: number, year: number): boolean;
/**
 * Returns true when two inputs share the same Hebrew day, month, and year.
 */
export declare function isSameHebrewDate(a: DualDateInput, b: DualDateInput): boolean;
/**
 * Returns true when two inputs are the same Gregorian calendar date.
 */
export declare function isSameGregorianDate(a: DualDateInput, b: DualDateInput): boolean;
/**
 * Compares two inputs by Gregorian day difference.
 */
export declare function compareDualDates(a: DualDateInput, b: DualDateInput): number;
/**
 * Returns true when input falls within the inclusive range.
 */
export declare function isWithinDualDateRange(input: DualDateInput, range: DualDateRange): boolean;
//# sourceMappingURL=membership.d.ts.map