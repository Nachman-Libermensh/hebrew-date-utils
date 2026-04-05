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
export function getHolidaysOn(date, options = {}) {
    const locale = options.locale ?? "en";
    const events = HebrewCalendar.getHolidaysOnDate(toHDate(date), options.il) ?? [];
    return events.map((event) => toHolidayInfo(event, locale));
}
export function getHolidaysForHebrewYear(year, options = {}) {
    const locale = options.locale ?? "en";
    const events = HebrewCalendar.getHolidaysForYearArray(year, Boolean(options.il));
    return events.map((event) => toHolidayInfo(event, locale));
}
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
export function isHoliday(date, options = {}) {
    return getHolidaysOn(date, options).length > 0;
}
//# sourceMappingURL=holidays.js.map