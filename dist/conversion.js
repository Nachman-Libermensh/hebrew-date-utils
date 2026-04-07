import { HDate } from "./hebcal-compat.js";
function isDate(value) {
    return value instanceof Date;
}
function isDualDate(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    return "greg" in value && "heb" in value;
}
function isHebrewDateParts(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    return "day" in value && "month" in value && "year" in value;
}
function normalizeLocalDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
/**
 * Converts any supported input into a Hebcal HDate.
 */
export function toHDate(input) {
    if (isDualDate(input)) {
        return new HDate(input.heb);
    }
    if (HDate.isHDate(input)) {
        return new HDate(input);
    }
    if (isDate(input)) {
        return new HDate(normalizeLocalDate(input));
    }
    if (isHebrewDateParts(input)) {
        return new HDate(input.day, input.month, input.year);
    }
    return new HDate();
}
/**
 * Converts any supported input into a normalized Gregorian Date.
 */
export function toGregorian(input) {
    if (isDualDate(input)) {
        return normalizeLocalDate(input.greg);
    }
    if (isDate(input)) {
        return normalizeLocalDate(input);
    }
    return normalizeLocalDate(toHDate(input).greg());
}
/**
 * Creates a DualDate object that includes Hebrew and Gregorian views.
 */
export function toDualDate(input) {
    const heb = toHDate(input);
    const greg = normalizeLocalDate(heb.greg());
    return {
        greg,
        heb,
        hebDay: heb.getDate(),
        hebMonth: heb.getMonth(),
        hebYear: heb.getFullYear(),
        hebMonthName: heb.getMonthName(),
        hebString: heb.toString(),
        hebDisplay: heb.renderGematriya(true),
    };
}
/**
 * Alias for creating a DualDate from a Gregorian Date.
 */
export function fromGregorianDate(date) {
    return toDualDate(date);
}
/**
 * Creates a DualDate from Hebrew date parts.
 */
export function fromHebrewDate(day, month, year) {
    return toDualDate({ day, month, year });
}
/**
 * Returns today's date as a DualDate (or for a supplied reference date).
 */
export function todayDualDate(referenceDate = new Date()) {
    return toDualDate(referenceDate);
}
//# sourceMappingURL=conversion.js.map