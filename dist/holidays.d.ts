import type { DualDateInput, HolidayInfo, HolidayQueryOptions } from "./types.js";
/**
 * Returns holiday events that occur on a specific date.
 */
export declare function getHolidaysOn(date: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[];
/**
 * Returns holiday events for an entire Hebrew year.
 */
export declare function getHolidaysForHebrewYear(year: number, options?: HolidayQueryOptions): HolidayInfo[];
/**
 * Returns holiday events within an inclusive Gregorian date interval.
 */
export declare function getHolidaysBetween(start: DualDateInput, end: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[];
/**
 * Returns true when at least one holiday exists on the given date.
 */
export declare function isHoliday(date: DualDateInput, options?: HolidayQueryOptions): boolean;
//# sourceMappingURL=holidays.d.ts.map