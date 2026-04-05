import type { DualDateInput, DualDateRange, HebrewMonthInput } from "./types.js";
export declare function isDateInHebrewMonth(input: DualDateInput, month: HebrewMonthInput, year: number): boolean;
export declare function isDateInGregorianMonth(input: DualDateInput, month: number, year: number): boolean;
export declare function isSameHebrewDate(a: DualDateInput, b: DualDateInput): boolean;
export declare function isSameGregorianDate(a: DualDateInput, b: DualDateInput): boolean;
export declare function compareDualDates(a: DualDateInput, b: DualDateInput): number;
export declare function isWithinDualDateRange(input: DualDateInput, range: DualDateRange): boolean;
//# sourceMappingURL=membership.d.ts.map