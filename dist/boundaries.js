import { endOfMonth, startOfMonth } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate } from "./conversion.js";
import { getDaysInHebrewMonth, normalizeHebrewMonth } from "./month-utils.js";
export function getGregorianMonthFirstDay(year, month) {
    return toDualDate(startOfMonth(new Date(year, month, 1)));
}
export function getGregorianMonthLastDay(year, month) {
    return toDualDate(endOfMonth(new Date(year, month, 1)));
}
export function getGregorianMonthBoundaries(year, month) {
    return {
        start: getGregorianMonthFirstDay(year, month),
        end: getGregorianMonthLastDay(year, month),
    };
}
export function getHebrewMonthFirstDay(year, month) {
    return toDualDate(new HDate(1, normalizeHebrewMonth(month), year));
}
export function getHebrewMonthLastDay(year, month) {
    const normalizedMonth = normalizeHebrewMonth(month);
    const lastDay = getDaysInHebrewMonth(year, normalizedMonth);
    return toDualDate(new HDate(lastDay, normalizedMonth, year));
}
export function getHebrewMonthBoundaries(year, month) {
    return {
        start: getHebrewMonthFirstDay(year, month),
        end: getHebrewMonthLastDay(year, month),
    };
}
//# sourceMappingURL=boundaries.js.map