import type { DualDate, DualDateInput } from "./types.js";
export declare function addGregorianDays(input: DualDateInput, amount: number): DualDate;
export declare function addGregorianMonths(input: DualDateInput, amount: number): DualDate;
export declare function addHebrewDays(input: DualDateInput, amount: number): DualDate;
export declare function addHebrewMonths(input: DualDateInput, amount: number): DualDate;
export declare function addHebrewYears(input: DualDateInput, amount: number): DualDate;
export declare function nextHebrewMonth(input: DualDateInput): DualDate;
export declare function previousHebrewMonth(input: DualDateInput): DualDate;
export declare function shiftHebrewMonth(month: number, year: number, offset: number): {
    month: number;
    year: number;
    name: string;
};
//# sourceMappingURL=navigation.d.ts.map