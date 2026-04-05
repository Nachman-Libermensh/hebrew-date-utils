import { format as formatGregorianDateFn } from "date-fns";
import { DEFAULT_GREGORIAN_LOCALE } from "./constants.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
export function formatGregorian(input, pattern = "yyyy-MM-dd") {
    return formatGregorianDateFn(toGregorian(input), pattern);
}
export function formatHebrew(input, options = {}) {
    const { locale = "en", showYear = true, gematriya = false, suppressNikud = true, } = options;
    const hebDate = toHDate(input);
    if (gematriya) {
        return hebDate.renderGematriya(suppressNikud, !showYear);
    }
    return hebDate.render(locale, showYear);
}
export function formatDualDate(input, gregorianPattern = "yyyy-MM-dd") {
    const dual = toDualDate(input);
    return `${formatGregorianDateFn(dual.greg, gregorianPattern)} | ${dual.hebString}`;
}
export function getWeekdayName(input, locale = DEFAULT_GREGORIAN_LOCALE, style = "long") {
    return new Intl.DateTimeFormat(locale, { weekday: style }).format(toGregorian(input));
}
export function toIsoDate(input) {
    return formatGregorian(input, "yyyy-MM-dd");
}
//# sourceMappingURL=formatting.js.map