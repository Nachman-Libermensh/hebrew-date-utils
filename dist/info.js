import { differenceInCalendarDays } from "date-fns";
import { GREGORIAN_MONTH_NAMES_EN } from "./constants.js";
import { getGregorianMonthBoundaries, getHebrewMonthBoundaries, } from "./boundaries.js";
import { listDualDatesInRange } from "./ranges.js";
import { getDaysInHebrewMonth, getHebrewMonthName, getHebrewMonthNameHe, isHebrewLeapYear, } from "./month-utils.js";
export function getHebrewMonthInfo(year, month) {
    const bounds = getHebrewMonthBoundaries(year, month);
    return {
        month: bounds.start.hebMonth,
        name: getHebrewMonthName(bounds.start.hebMonth, year),
        nameHe: getHebrewMonthNameHe(bounds.start.hebMonth, year),
        daysInMonth: getDaysInHebrewMonth(year, bounds.start.hebMonth),
        year,
        isLeapYear: isHebrewLeapYear(year),
        firstDay: bounds.start,
        lastDay: bounds.end,
    };
}
export function getGregorianMonthInfo(year, month) {
    const bounds = getGregorianMonthBoundaries(year, month);
    const days = listDualDatesInRange(bounds.start, bounds.end);
    const hebrewMonthsMap = new Map();
    for (const day of days) {
        const key = `${day.hebYear}-${day.hebMonth}`;
        if (!hebrewMonthsMap.has(key)) {
            hebrewMonthsMap.set(key, {
                month: day.hebMonth,
                year: day.hebYear,
                name: day.hebMonthName,
            });
        }
    }
    return {
        month,
        year,
        name: GREGORIAN_MONTH_NAMES_EN[month] ?? "Unknown",
        daysInMonth: differenceInCalendarDays(bounds.end.greg, bounds.start.greg) + 1,
        firstDay: bounds.start,
        lastDay: bounds.end,
        hebrewMonths: Array.from(hebrewMonthsMap.values()),
    };
}
//# sourceMappingURL=info.js.map