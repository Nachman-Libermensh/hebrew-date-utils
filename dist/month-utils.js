import { HDate } from "./hebcal-compat.js";
import { HEBREW_MONTH_NAMES_EN, HEBREW_MONTH_NAMES_HE } from "./constants.js";
export function normalizeHebrewMonth(month) {
    return HDate.monthNum(month);
}
export function isHebrewLeapYear(year) {
    return HDate.isLeapYear(year);
}
export function getMonthsInHebrewYear(year) {
    return HDate.monthsInYear(year);
}
export function getDaysInHebrewMonth(year, month) {
    return HDate.daysInMonth(normalizeHebrewMonth(month), year);
}
export function getHebrewMonthName(month, year) {
    return HDate.getMonthName(normalizeHebrewMonth(month), year);
}
export function getHebrewMonthNameHe(month, year) {
    const normalizedMonth = normalizeHebrewMonth(month);
    return (HEBREW_MONTH_NAMES_HE[normalizedMonth] ??
        getHebrewMonthName(normalizedMonth, year));
}
export function getHebrewMonthNameEn(month, year) {
    const normalizedMonth = normalizeHebrewMonth(month);
    return (HEBREW_MONTH_NAMES_EN[normalizedMonth] ??
        getHebrewMonthName(normalizedMonth, year));
}
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