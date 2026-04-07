import { differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, } from "date-fns";
import { HDate, HebrewCalendar } from "./hebcal-compat.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
const HEBREW_MONTH_ORDER_LEAP = [7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6];
const HEBREW_MONTH_ORDER_COMMON = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
function monthsBeforeHebrewYear(year) {
    const previousYear = year - 1;
    // Leap years follow the fixed 19-year Hebrew calendar cycle.
    const leapYearsBefore = Math.floor((7 * previousYear + 1) / 19);
    return previousYear * 12 + leapYearsBefore;
}
function getHebrewMonthOrdinalInYear(month, year) {
    const order = HDate.isLeapYear(year)
        ? HEBREW_MONTH_ORDER_LEAP
        : HEBREW_MONTH_ORDER_COMMON;
    const index = order.indexOf(month);
    if (index === -1) {
        throw new RangeError(`Unsupported Hebrew month number: ${month}`);
    }
    return index;
}
function toHebrewMonthSerial(input) {
    const dual = toDualDate(input);
    return (monthsBeforeHebrewYear(dual.hebYear) +
        getHebrewMonthOrdinalInYear(dual.hebMonth, dual.hebYear));
}
/**
 * Returns the signed number of calendar days between two inputs.
 */
export function differenceInDualDays(left, right) {
    return differenceInCalendarDays(toGregorian(left), toGregorian(right));
}
/**
 * Returns the signed number of Gregorian calendar months between two inputs.
 */
export function differenceInDualMonths(left, right) {
    return differenceInCalendarMonths(toGregorian(left), toGregorian(right));
}
/**
 * Returns the signed number of Gregorian calendar years between two inputs.
 */
export function differenceInDualYears(left, right) {
    return differenceInCalendarYears(toGregorian(left), toGregorian(right));
}
/**
 * Returns the signed number of Hebrew calendar months between two inputs.
 */
export function differenceInHebrewMonths(left, right) {
    return toHebrewMonthSerial(left) - toHebrewMonthSerial(right);
}
/**
 * Returns the signed number of Hebrew calendar years between two inputs.
 */
export function differenceInHebrewYears(left, right) {
    return toDualDate(left).hebYear - toDualDate(right).hebYear;
}
/**
 * Computes a birthday (or anniversary) occurrence in a target Hebrew year.
 */
export function getBirthdayInHebrewYear(originalDate, targetHebrewYear) {
    const computed = HebrewCalendar.getBirthdayOrAnniversary(targetHebrewYear, toHDate(originalDate));
    return computed ? toDualDate(computed) : null;
}
/**
 * Computes a yahrzeit occurrence in a target Hebrew year.
 */
export function getYahrzeitInHebrewYear(dateOfDeath, targetHebrewYear) {
    const computed = HebrewCalendar.getYahrzeit(targetHebrewYear, toHDate(dateOfDeath));
    return computed ? toDualDate(computed) : null;
}
/**
 * Returns age in Gregorian years at the specified Gregorian date.
 */
export function getGregorianAge(birthDate, atDate = new Date()) {
    const birthYear = birthDate.getFullYear();
    const hasBirthdayOccurred = atDate.getMonth() > birthDate.getMonth() ||
        (atDate.getMonth() === birthDate.getMonth() &&
            atDate.getDate() >= birthDate.getDate());
    return hasBirthdayOccurred
        ? atDate.getFullYear() - birthYear
        : atDate.getFullYear() - birthYear - 1;
}
/**
 * Returns age in Hebrew years at the specified reference date.
 */
export function getHebrewAge(originalDate, atDate = new Date()) {
    const birth = toDualDate(originalDate);
    const target = toDualDate(atDate);
    let age = target.hebYear - birth.hebYear;
    const birthdayThisYear = HebrewCalendar.getBirthdayOrAnniversary(target.hebYear, birth.heb);
    if (birthdayThisYear && birthdayThisYear.greg() > target.greg) {
        age -= 1;
    }
    return Math.max(age, 0);
}
//# sourceMappingURL=arithmetic.js.map