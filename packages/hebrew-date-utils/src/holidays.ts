import {
  HebrewCalendar,
  type CalOptions,
  type Event,
} from "./hebcal-compat.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
import type {
  DualDateInput,
  HolidayInfo,
  HolidayQueryOptions,
} from "./types.js";

function toHolidayInfo(event: Event, locale: string): HolidayInfo {
  const dualDate = toDualDate(event.getDate());
  const eventUrl = event.url();

  return {
    id: `${dualDate.hebYear}-${dualDate.hebMonth}-${dualDate.hebDay}-${event.getDesc()}`,
    name: event.getDesc(),
    displayName: event.render(locale),
    date: dualDate,
    categories: event.getCategories(),
    flags: event.getFlags(),
    observedInIsrael: event.observedInIsrael(),
    observedInDiaspora: event.observedInDiaspora(),
    ...(eventUrl ? { url: eventUrl } : {}),
  };
}

function buildCalendarOptions(options: HolidayQueryOptions): CalOptions {
  const base: CalOptions = { candlelighting: false };

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
export function getHolidaysOn(
  date: DualDateInput,
  options: HolidayQueryOptions = {},
): HolidayInfo[] {
  const locale = options.locale ?? "en";
  const events: Event[] =
    HebrewCalendar.getHolidaysOnDate(toHDate(date), options.il) ?? [];
  return events.map((event: Event) => toHolidayInfo(event, locale));
}

/**
 * Returns holiday events for an entire Hebrew year.
 */
export function getHolidaysForHebrewYear(
  year: number,
  options: HolidayQueryOptions = {},
): HolidayInfo[] {
  const locale = options.locale ?? "en";
  const events: Event[] = HebrewCalendar.getHolidaysForYearArray(
    year,
    Boolean(options.il),
  );
  return events.map((event: Event) => toHolidayInfo(event, locale));
}

/**
 * Returns holiday events within an inclusive Gregorian date interval.
 */
export function getHolidaysBetween(
  start: DualDateInput,
  end: DualDateInput,
  options: HolidayQueryOptions = {},
): HolidayInfo[] {
  const locale = options.locale ?? "en";
  const calendarOptions = buildCalendarOptions(options);

  const events: Event[] = HebrewCalendar.calendar({
    ...calendarOptions,
    start: toGregorian(start),
    end: toGregorian(end),
  });

  return events.map((event: Event) => toHolidayInfo(event, locale));
}

/**
 * Returns true when at least one holiday exists on the given date.
 */
export function isHoliday(
  date: DualDateInput,
  options: HolidayQueryOptions = {},
): boolean {
  return getHolidaysOn(date, options).length > 0;
}
