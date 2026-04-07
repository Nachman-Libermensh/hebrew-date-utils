import type { DualDateInput } from "./types.js";
/**
 * Options for Hebrew date rendering.
 */
export interface HebrewFormatOptions {
    locale?: string;
    showYear?: boolean;
    gematriya?: boolean;
    suppressNikud?: boolean;
}
/**
 * Formats input using a date-fns Gregorian format pattern.
 */
export declare function formatGregorian(input: DualDateInput, pattern?: string): string;
/**
 * Formats input as a Hebrew date string.
 */
export declare function formatHebrew(input: DualDateInput, options?: HebrewFormatOptions): string;
/**
 * Formats both Gregorian and Hebrew values in a single string.
 */
export declare function formatDualDate(input: DualDateInput, gregorianPattern?: string): string;
/**
 * Returns localized weekday name for the Gregorian date.
 */
export declare function getWeekdayName(input: DualDateInput, locale?: string, style?: Intl.DateTimeFormatOptions["weekday"]): string;
/**
 * Formats input as ISO-like local date string (yyyy-MM-dd).
 */
export declare function toIsoDate(input: DualDateInput): string;
//# sourceMappingURL=formatting.d.ts.map