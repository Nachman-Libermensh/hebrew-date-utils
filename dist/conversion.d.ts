import { HDate } from "./hebcal-compat.js";
import type { DualDate, DualDateInput } from "./types.js";
export declare function toHDate(input: DualDateInput): HDate;
export declare function toGregorian(input: DualDateInput): Date;
export declare function toDualDate(input: DualDateInput): DualDate;
export declare function fromGregorianDate(date: Date): DualDate;
export declare function fromHebrewDate(day: number, month: number | string, year: number): DualDate;
export declare function todayDualDate(referenceDate?: Date): DualDate;
//# sourceMappingURL=conversion.d.ts.map