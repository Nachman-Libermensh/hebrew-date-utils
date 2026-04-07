import type { DualDate, HebrewYearInfo } from "./types.js";
/**
 * Returns current date as DualDate.
 */
export declare function getCurrentDualDate(referenceDate?: Date): DualDate;
/**
 * Returns current Hebrew year from a Gregorian reference date.
 */
export declare function getCurrentHebrewYear(referenceDate?: Date): number;
/**
 * Returns Hebrew year-level metadata and boundaries.
 */
export declare function getHebrewYearInfo(year: number): HebrewYearInfo;
/**
 * Returns Hebrew year that contains January 1st of the Gregorian year.
 */
export declare function getHebrewYearForGregorianYear(gregorianYear: number): number;
//# sourceMappingURL=year.d.ts.map