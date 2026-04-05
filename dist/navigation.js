import { addDays, addMonths } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate, toHDate, toGregorian } from "./conversion.js";
export function addGregorianDays(input, amount) {
    return toDualDate(addDays(toGregorian(input), amount));
}
export function addGregorianMonths(input, amount) {
    return toDualDate(addMonths(toGregorian(input), amount));
}
export function addHebrewDays(input, amount) {
    const hd = toHDate(input).add(amount, "day");
    return toDualDate(hd);
}
export function addHebrewMonths(input, amount) {
    const hd = toHDate(input).add(amount, "month");
    return toDualDate(hd);
}
export function addHebrewYears(input, amount) {
    const hd = toHDate(input).add(amount, "year");
    return toDualDate(hd);
}
export function nextHebrewMonth(input) {
    const next = toHDate(input).add(1, "month");
    return toDualDate(new HDate(1, next.getMonth(), next.getFullYear()));
}
export function previousHebrewMonth(input) {
    const previous = toHDate(input).add(-1, "month");
    return toDualDate(new HDate(1, previous.getMonth(), previous.getFullYear()));
}
export function shiftHebrewMonth(month, year, offset) {
    const shifted = new HDate(1, month, year).add(offset, "month");
    return {
        month: shifted.getMonth(),
        year: shifted.getFullYear(),
        name: shifted.getMonthName(),
    };
}
//# sourceMappingURL=navigation.js.map