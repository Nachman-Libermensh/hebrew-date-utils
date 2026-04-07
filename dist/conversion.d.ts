import { HDate } from "./hebcal-compat.js";
import type { DualDate, DualDateInput } from "./types.js";
/**
 * Converts any supported input into a Hebcal HDate.
 */
export declare function toHDate(input: DualDateInput): HDate;
/**
 * Converts any supported input into a normalized Gregorian Date.
 */
export declare function toGregorian(input: DualDateInput): Date;
/**
 * Creates a DualDate object that includes Hebrew and Gregorian views.
 */
export declare function toDualDate(input: DualDateInput): DualDate;
/**
 * Alias for creating a DualDate from a Gregorian Date.
 */
export declare function fromGregorianDate(date: Date): DualDate;
/**
 * Creates a DualDate from Hebrew date parts.
 */
export declare function fromHebrewDate(day: number, month: number | string, year: number): DualDate;
/**
 * Returns today's date as a DualDate (or for a supplied reference date).
 */
export declare function todayDualDate(referenceDate?: Date): DualDate;
//# sourceMappingURL=conversion.d.ts.map