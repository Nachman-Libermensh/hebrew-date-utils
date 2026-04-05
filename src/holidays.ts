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

export function getHolidaysOn(
  date: DualDateInput,
  options: HolidayQueryOptions = {},
): HolidayInfo[] {
  const locale = options.locale ?? "en";
  const events: Event[] =
    HebrewCalendar.getHolidaysOnDate(toHDate(date), options.il) ?? [];
  return events.map((event: Event) => toHolidayInfo(event, locale));
}

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

export function isHoliday(
  date: DualDateInput,
  options: HolidayQueryOptions = {},
): boolean {
  return getHolidaysOn(date, options).length > 0;
}
