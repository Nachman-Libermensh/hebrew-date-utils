import { format as formatGregorianDateFn } from "date-fns";
import { DEFAULT_GREGORIAN_LOCALE } from "./constants.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
/**
 * Formats input using a date-fns Gregorian format pattern.
 */
export function formatGregorian(input, pattern = "yyyy-MM-dd") {
    return formatGregorianDateFn(toGregorian(input), pattern);
}
/**
 * Formats input as a Hebrew date string.
 */
export function formatHebrew(input, options = {}) {
    const { locale = "en", showYear = true, gematriya = false, suppressNikud = true, } = options;
    const hebDate = toHDate(input);
    if (gematriya) {
        return hebDate.renderGematriya(suppressNikud, !showYear);
    }
    return hebDate.render(locale, showYear);
}
/**
 * Formats both Gregorian and Hebrew values in a single string.
 */
export function formatDualDate(input, gregorianPattern = "yyyy-MM-dd") {
    const dual = toDualDate(input);
    return `${formatGregorianDateFn(dual.greg, gregorianPattern)} | ${dual.hebString}`;
}
/**
 * Returns localized weekday name for the Gregorian date.
 */
export function getWeekdayName(input, locale = DEFAULT_GREGORIAN_LOCALE, style = "long") {
    return new Intl.DateTimeFormat(locale, { weekday: style }).format(toGregorian(input));
}
/**
 * Formats input as ISO-like local date string (yyyy-MM-dd).
 */
export function toIsoDate(input) {
    return formatGregorian(input, "yyyy-MM-dd");
}
//# sourceMappingURL=formatting.js.map