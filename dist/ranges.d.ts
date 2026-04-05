import type { DualDate, DualDateInput, DualDateRange, HebrewMonthInput, MonthSegment } from "./types.js";
export declare function makeDualDateRange(start: DualDateInput, end: DualDateInput): DualDateRange;
export declare function listDualDatesInRange(start: DualDateInput, end: DualDateInput): DualDate[];
export declare function listDaysInGregorianMonth(year: number, month: number): DualDate[];
export declare function listDaysInHebrewMonth(year: number, month: HebrewMonthInput): DualDate[];
export declare function splitRangeByHebrewMonth(start: DualDateInput, end: DualDateInput): MonthSegment[];
export declare function splitRangeByGregorianMonth(start: DualDateInput, end: DualDateInput): DualDateRange[];
export declare function getHebrewMonthRange(year: number, month: HebrewMonthInput): DualDateRange;
//# sourceMappingURL=ranges.d.ts.map