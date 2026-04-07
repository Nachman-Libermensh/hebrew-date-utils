import { addDays, addMonths, addYears } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate, toHDate, toGregorian } from "./conversion.js";
/**
 * Adds Gregorian calendar days and returns a normalized DualDate.
 */
export function addGregorianDays(input, amount) {
    return toDualDate(addDays(toGregorian(input), amount));
}
/**
 * Adds Gregorian calendar months and returns a normalized DualDate.
 */
export function addGregorianMonths(input, amount) {
    return toDualDate(addMonths(toGregorian(input), amount));
}
/**
 * Adds Gregorian calendar years and returns a normalized DualDate.
 */
export function addGregorianYears(input, amount) {
    return toDualDate(addYears(toGregorian(input), amount));
}
/**
 * Adds Hebrew calendar days and returns a normalized DualDate.
 */
export function addHebrewDays(input, amount) {
    const hd = toHDate(input).add(amount, "day");
    return toDualDate(hd);
}
/**
 * Adds Hebrew calendar months and returns a normalized DualDate.
 */
export function addHebrewMonths(input, amount) {
    const hd = toHDate(input).add(amount, "month");
    return toDualDate(hd);
}
/**
 * Adds Hebrew calendar years and returns a normalized DualDate.
 */
export function addHebrewYears(input, amount) {
    const hd = toHDate(input).add(amount, "year");
    return toDualDate(hd);
}
/**
 * Returns the first day of the next Hebrew month.
 */
export function nextHebrewMonth(input) {
    const next = toHDate(input).add(1, "month");
    return toDualDate(new HDate(1, next.getMonth(), next.getFullYear()));
}
/**
 * Returns the first day of the previous Hebrew month.
 */
export function previousHebrewMonth(input) {
    const previous = toHDate(input).add(-1, "month");
    return toDualDate(new HDate(1, previous.getMonth(), previous.getFullYear()));
}
/**
 * Shifts a Hebrew month/year pair by a month offset.
 */
export function shiftHebrewMonth(month, year, offset) {
    const shifted = new HDate(1, month, year).add(offset, "month");
    return {
        month: shifted.getMonth(),
        year: shifted.getFullYear(),
        name: shifted.getMonthName(),
    };
}
//# sourceMappingURL=navigation.js.map