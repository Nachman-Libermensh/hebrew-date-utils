import type { DualDate, DualDateInput } from "./types.js";
/**
 * Adds Gregorian calendar days and returns a normalized DualDate.
 */
export declare function addGregorianDays(input: DualDateInput, amount: number): DualDate;
/**
 * Adds Gregorian calendar months and returns a normalized DualDate.
 */
export declare function addGregorianMonths(input: DualDateInput, amount: number): DualDate;
/**
 * Adds Gregorian calendar years and returns a normalized DualDate.
 */
export declare function addGregorianYears(input: DualDateInput, amount: number): DualDate;
/**
 * Adds Hebrew calendar days and returns a normalized DualDate.
 */
export declare function addHebrewDays(input: DualDateInput, amount: number): DualDate;
/**
 * Adds Hebrew calendar months and returns a normalized DualDate.
 */
export declare function addHebrewMonths(input: DualDateInput, amount: number): DualDate;
/**
 * Adds Hebrew calendar years and returns a normalized DualDate.
 */
export declare function addHebrewYears(input: DualDateInput, amount: number): DualDate;
/**
 * Returns the first day of the next Hebrew month.
 */
export declare function nextHebrewMonth(input: DualDateInput): DualDate;
/**
 * Returns the first day of the previous Hebrew month.
 */
export declare function previousHebrewMonth(input: DualDateInput): DualDate;
/**
 * Shifts a Hebrew month/year pair by a month offset.
 */
export declare function shiftHebrewMonth(month: number, year: number, offset: number): {
    month: number;
    year: number;
    name: string;
};
//# sourceMappingURL=navigation.d.ts.map