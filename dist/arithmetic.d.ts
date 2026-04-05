import type { DualDate, DualDateInput } from "./types.js";
export declare function differenceInDualDays(left: DualDateInput, right: DualDateInput): number;
export declare function getBirthdayInHebrewYear(originalDate: DualDateInput, targetHebrewYear: number): DualDate | null;
export declare function getYahrzeitInHebrewYear(dateOfDeath: DualDateInput, targetHebrewYear: number): DualDate | null;
export declare function getGregorianAge(birthDate: Date, atDate?: Date): number;
export declare function getHebrewAge(originalDate: DualDateInput, atDate?: DualDateInput): number;
//# sourceMappingURL=arithmetic.d.ts.map