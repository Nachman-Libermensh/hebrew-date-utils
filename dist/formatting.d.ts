import type { DualDateInput } from "./types.js";
export interface HebrewFormatOptions {
    locale?: string;
    showYear?: boolean;
    gematriya?: boolean;
    suppressNikud?: boolean;
}
export declare function formatGregorian(input: DualDateInput, pattern?: string): string;
export declare function formatHebrew(input: DualDateInput, options?: HebrewFormatOptions): string;
export declare function formatDualDate(input: DualDateInput, gregorianPattern?: string): string;
export declare function getWeekdayName(input: DualDateInput, locale?: string, style?: Intl.DateTimeFormatOptions["weekday"]): string;
export declare function toIsoDate(input: DualDateInput): string;
//# sourceMappingURL=formatting.d.ts.map