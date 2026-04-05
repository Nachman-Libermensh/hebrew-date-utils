import type { HebrewMonthInput } from "./types.js";
export declare function normalizeHebrewMonth(month: HebrewMonthInput): number;
export declare function isHebrewLeapYear(year: number): boolean;
export declare function getMonthsInHebrewYear(year: number): number;
export declare function getDaysInHebrewMonth(year: number, month: HebrewMonthInput): number;
export declare function getHebrewMonthName(month: HebrewMonthInput, year: number): string;
export declare function getHebrewMonthNameHe(month: HebrewMonthInput, year: number): string;
export declare function getHebrewMonthNameEn(month: HebrewMonthInput, year: number): string;
export declare function getHebrewYearMonths(year: number): Array<{
    month: number;
    name: string;
    days: number;
}>;
//# sourceMappingURL=month-utils.d.ts.map