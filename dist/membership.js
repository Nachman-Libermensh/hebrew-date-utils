import { differenceInCalendarDays, isSameDay, isWithinInterval, } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate, toGregorian } from "./conversion.js";
export function isDateInHebrewMonth(input, month, year) {
    const dual = toDualDate(input);
    const numericMonth = typeof month === "number" ? month : HDate.monthFromName(month);
    return dual.hebYear === year && dual.hebMonth === numericMonth;
}
export function isDateInGregorianMonth(input, month, year) {
    const greg = toGregorian(input);
    return greg.getMonth() === month && greg.getFullYear() === year;
}
export function isSameHebrewDate(a, b) {
    const da = toDualDate(a);
    const db = toDualDate(b);
    return (da.hebYear === db.hebYear &&
        da.hebMonth === db.hebMonth &&
        da.hebDay === db.hebDay);
}
export function isSameGregorianDate(a, b) {
    return isSameDay(toGregorian(a), toGregorian(b));
}
export function compareDualDates(a, b) {
    return differenceInCalendarDays(toGregorian(a), toGregorian(b));
}
export function isWithinDualDateRange(input, range) {
    const date = toGregorian(input);
    return isWithinInterval(date, {
        start: range.start.greg,
        end: range.end.greg,
    });
}
//# sourceMappingURL=membership.js.map