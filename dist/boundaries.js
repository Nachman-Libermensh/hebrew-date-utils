import { endOfMonth, startOfMonth } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate } from "./conversion.js";
import { getDaysInHebrewMonth, normalizeHebrewMonth } from "./month-utils.js";
/**
 * Returns the first day of a Gregorian month as DualDate.
 */
export function getGregorianMonthFirstDay(year, month) {
    return toDualDate(startOfMonth(new Date(year, month, 1)));
}
/**
 * Returns the last day of a Gregorian month as DualDate.
 */
export function getGregorianMonthLastDay(year, month) {
    return toDualDate(endOfMonth(new Date(year, month, 1)));
}
/**
 * Returns first and last Gregorian day for a given month.
 */
export function getGregorianMonthBoundaries(year, month) {
    return {
        start: getGregorianMonthFirstDay(year, month),
        end: getGregorianMonthLastDay(year, month),
    };
}
/**
 * Returns the first day of a Hebrew month as DualDate.
 */
export function getHebrewMonthFirstDay(year, month) {
    return toDualDate(new HDate(1, normalizeHebrewMonth(month), year));
}
/**
 * Returns the last day of a Hebrew month as DualDate.
 */
export function getHebrewMonthLastDay(year, month) {
    const normalizedMonth = normalizeHebrewMonth(month);
    const lastDay = getDaysInHebrewMonth(year, normalizedMonth);
    return toDualDate(new HDate(lastDay, normalizedMonth, year));
}
/**
 * Returns first and last Hebrew day for a given Hebrew month.
 */
export function getHebrewMonthBoundaries(year, month) {
    return {
        start: getHebrewMonthFirstDay(year, month),
        end: getHebrewMonthLastDay(year, month),
    };
}
//# sourceMappingURL=boundaries.js.map