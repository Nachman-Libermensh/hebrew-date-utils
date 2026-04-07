import { getDaysInMonth } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { HEBREW_MONTH_NAMES_EN, HEBREW_MONTH_NAMES_HE } from "./constants.js";
/**
 * Normalizes Hebrew month input (number or name) into month number.
 */
export function normalizeHebrewMonth(month) {
    return HDate.monthNum(month);
}
/**
 * Returns whether a Hebrew year is leap (13 months).
 */
export function isHebrewLeapYear(year) {
    return HDate.isLeapYear(year);
}
/**
 * Returns number of months in a Hebrew year (12 or 13).
 */
export function getMonthsInHebrewYear(year) {
    return HDate.monthsInYear(year);
}
/**
 * Returns number of days in a Gregorian month.
 */
export function getDaysInGregorianMonth(year, month) {
    return getDaysInMonth(new Date(year, month, 1));
}
/**
 * Returns number of days in a Hebrew month.
 */
export function getDaysInHebrewMonth(year, month) {
    return HDate.daysInMonth(normalizeHebrewMonth(month), year);
}
/**
 * Returns Hebrew month name using Hebcal transliteration.
 */
export function getHebrewMonthName(month, year) {
    return HDate.getMonthName(normalizeHebrewMonth(month), year);
}
/**
 * Returns Hebrew month name in Hebrew-friendly transliteration.
 */
export function getHebrewMonthNameHe(month, year) {
    const normalizedMonth = normalizeHebrewMonth(month);
    return (HEBREW_MONTH_NAMES_HE[normalizedMonth] ??
        getHebrewMonthName(normalizedMonth, year));
}
/**
 * Returns Hebrew month name in English transliteration.
 */
export function getHebrewMonthNameEn(month, year) {
    const normalizedMonth = normalizeHebrewMonth(month);
    return (HEBREW_MONTH_NAMES_EN[normalizedMonth] ??
        getHebrewMonthName(normalizedMonth, year));
}
/**
 * Lists months in a Hebrew year with month number, name, and day count.
 */
export function getHebrewYearMonths(year) {
    const first = new HDate(1, 1, year);
    const monthsInYear = getMonthsInHebrewYear(year);
    const result = [];
    for (let i = 0; i < monthsInYear; i += 1) {
        const current = first.add(i, "month");
        const month = current.getMonth();
        result.push({
            month,
            name: getHebrewMonthName(month, year),
            days: getDaysInHebrewMonth(year, month),
        });
    }
    return result;
}
//# sourceMappingURL=month-utils.js.map