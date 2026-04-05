import { differenceInCalendarDays } from "date-fns";
import { HebrewCalendar } from "./hebcal-compat.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
export function differenceInDualDays(left, right) {
    return differenceInCalendarDays(toGregorian(left), toGregorian(right));
}
export function getBirthdayInHebrewYear(originalDate, targetHebrewYear) {
    const computed = HebrewCalendar.getBirthdayOrAnniversary(targetHebrewYear, toHDate(originalDate));
    return computed ? toDualDate(computed) : null;
}
export function getYahrzeitInHebrewYear(dateOfDeath, targetHebrewYear) {
    const computed = HebrewCalendar.getYahrzeit(targetHebrewYear, toHDate(dateOfDeath));
    return computed ? toDualDate(computed) : null;
}
export function getGregorianAge(birthDate, atDate = new Date()) {
    const birthYear = birthDate.getFullYear();
    const hasBirthdayOccurred = atDate.getMonth() > birthDate.getMonth() ||
        (atDate.getMonth() === birthDate.getMonth() &&
            atDate.getDate() >= birthDate.getDate());
    return hasBirthdayOccurred
        ? atDate.getFullYear() - birthYear
        : atDate.getFullYear() - birthYear - 1;
}
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