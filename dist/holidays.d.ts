import type { DualDateInput, HolidayInfo, HolidayQueryOptions } from "./types.js";
export declare function getHolidaysOn(date: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[];
export declare function getHolidaysForHebrewYear(year: number, options?: HolidayQueryOptions): HolidayInfo[];
export declare function getHolidaysBetween(start: DualDateInput, end: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[];
export declare function isHoliday(date: DualDateInput, options?: HolidayQueryOptions): boolean;
//# sourceMappingURL=holidays.d.ts.map