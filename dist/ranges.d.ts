import type { DualDate, DualDateInput, DualDateRange, HebrewMonthInput, MonthSegment } from "./types.js";
/**
 * Builds an ordered inclusive date range from two inputs.
 */
export declare function makeDualDateRange(start: DualDateInput, end: DualDateInput): DualDateRange;
/**
 * Lists every day in an inclusive range as DualDate entries.
 */
export declare function listDualDatesInRange(start: DualDateInput, end: DualDateInput): DualDate[];
/**
 * Lists all days in a Gregorian month.
 */
export declare function listDaysInGregorianMonth(year: number, month: number): DualDate[];
/**
 * Lists all days in a Hebrew month.
 */
export declare function listDaysInHebrewMonth(year: number, month: HebrewMonthInput): DualDate[];
/**
 * Splits an inclusive range into contiguous Hebrew-month segments.
 */
export declare function splitRangeByHebrewMonth(start: DualDateInput, end: DualDateInput): MonthSegment[];
/**
 * Splits an inclusive range into contiguous Gregorian-month ranges.
 */
export declare function splitRangeByGregorianMonth(start: DualDateInput, end: DualDateInput): DualDateRange[];
/**
 * Alias for Hebrew month boundaries.
 */
export declare function getHebrewMonthRange(year: number, month: HebrewMonthInput): DualDateRange;
//# sourceMappingURL=ranges.d.ts.map