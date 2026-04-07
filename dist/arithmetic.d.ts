import type { DualDate, DualDateInput } from "./types.js";
/**
 * Returns the signed number of calendar days between two inputs.
 */
export declare function differenceInDualDays(left: DualDateInput, right: DualDateInput): number;
/**
 * Returns the signed number of Gregorian calendar months between two inputs.
 */
export declare function differenceInDualMonths(left: DualDateInput, right: DualDateInput): number;
/**
 * Returns the signed number of Gregorian calendar years between two inputs.
 */
export declare function differenceInDualYears(left: DualDateInput, right: DualDateInput): number;
/**
 * Returns the signed number of Hebrew calendar months between two inputs.
 */
export declare function differenceInHebrewMonths(left: DualDateInput, right: DualDateInput): number;
/**
 * Returns the signed number of Hebrew calendar years between two inputs.
 */
export declare function differenceInHebrewYears(left: DualDateInput, right: DualDateInput): number;
/**
 * Computes a birthday (or anniversary) occurrence in a target Hebrew year.
 */
export declare function getBirthdayInHebrewYear(originalDate: DualDateInput, targetHebrewYear: number): DualDate | null;
/**
 * Computes a yahrzeit occurrence in a target Hebrew year.
 */
export declare function getYahrzeitInHebrewYear(dateOfDeath: DualDateInput, targetHebrewYear: number): DualDate | null;
/**
 * Returns age in Gregorian years at the specified Gregorian date.
 */
export declare function getGregorianAge(birthDate: Date, atDate?: Date): number;
/**
 * Returns age in Hebrew years at the specified reference date.
 */
export declare function getHebrewAge(originalDate: DualDateInput, atDate?: DualDateInput): number;
//# sourceMappingURL=arithmetic.d.ts.map