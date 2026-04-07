import { HebrewCalendar, } from "./hebcal-compat.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
function toHolidayInfo(event, locale) {
    const dualDate = toDualDate(event.getDate());
    return {
        id: `${dualDate.hebYear}-${dualDate.hebMonth}-${dualDate.hebDay}-${event.getDesc()}`,
        name: event.getDesc(),
        displayName: event.render(locale),
        date: dualDate,
        categories: event.getCategories(),
        flags: event.getFlags(),
        observedInIsrael: event.observedInIsrael(),
        observedInDiaspora: event.observedInDiaspora(),
        url: event.url(),
    };
}
function buildCalendarOptions(options) {
    const base = { candlelighting: false };
    if (typeof options.il === "boolean") {
        base.il = options.il;
    }
    if (typeof options.noMinorFast === "boolean") {
        base.noMinorFast = options.noMinorFast;
    }
    if (typeof options.noModern === "boolean") {
        base.noModern = options.noModern;
    }
    if (typeof options.noRoshChodesh === "boolean") {
        base.noRoshChodesh = options.noRoshChodesh;
    }
    if (typeof options.noSpecialShabbat === "boolean") {
        base.noSpecialShabbat = options.noSpecialShabbat;
    }
    return base;
}
/**
 * Returns holiday events that occur on a specific date.
 */
export function getHolidaysOn(date, options = {}) {
    const locale = options.locale ?? "en";
    const events = HebrewCalendar.getHolidaysOnDate(toHDate(date), options.il) ?? [];
    return events.map((event) => toHolidayInfo(event, locale));
}
/**
 * Returns holiday events for an entire Hebrew year.
 */
export function getHolidaysForHebrewYear(year, options = {}) {
    const locale = options.locale ?? "en";
    const events = HebrewCalendar.getHolidaysForYearArray(year, Boolean(options.il));
    return events.map((event) => toHolidayInfo(event, locale));
}
/**
 * Returns holiday events within an inclusive Gregorian date interval.
 */
export function getHolidaysBetween(start, end, options = {}) {
    const locale = options.locale ?? "en";
    const calendarOptions = buildCalendarOptions(options);
    const events = HebrewCalendar.calendar({
        ...calendarOptions,
        start: toGregorian(start),
        end: toGregorian(end),
    });
    return events.map((event) => toHolidayInfo(event, locale));
}
/**
 * Returns true when at least one holiday exists on the given date.
 */
export function isHoliday(date, options = {}) {
    return getHolidaysOn(date, options).length > 0;
}
//# sourceMappingURL=holidays.js.map