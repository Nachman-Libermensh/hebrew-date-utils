import { HDate, months } from "./hebcal-compat.js";
import { toDualDate } from "./conversion.js";
/**
 * Returns current date as DualDate.
 */
export function getCurrentDualDate(referenceDate = new Date()) {
    return toDualDate(referenceDate);
}
/**
 * Returns current Hebrew year from a Gregorian reference date.
 */
export function getCurrentHebrewYear(referenceDate = new Date()) {
    return new HDate(referenceDate).getFullYear();
}
/**
 * Returns Hebrew year-level metadata and boundaries.
 */
export function getHebrewYearInfo(year) {
    const firstDay = toDualDate(new HDate(1, months.TISHREI, year));
    const lastDayOfElul = HDate.daysInMonth(months.ELUL, year);
    const lastDay = toDualDate(new HDate(lastDayOfElul, months.ELUL, year));
    return {
        year,
        isLeapYear: HDate.isLeapYear(year),
        monthsInYear: HDate.monthsInYear(year),
        daysInYear: HDate.daysInYear(year),
        longCheshvan: HDate.longCheshvan(year),
        shortKislev: HDate.shortKislev(year),
        firstDay,
        lastDay,
    };
}
/**
 * Returns Hebrew year that contains January 1st of the Gregorian year.
 */
export function getHebrewYearForGregorianYear(gregorianYear) {
    return new HDate(new Date(gregorianYear, 0, 1)).getFullYear();
}
//# sourceMappingURL=year.js.map