import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import {
  getGregorianMonthBoundaries,
  getHebrewMonthBoundaries,
} from "./boundaries.js";
import { toDualDate, toGregorian } from "./conversion.js";
import { getDaysInHebrewMonth, normalizeHebrewMonth } from "./month-utils.js";
import type {
  DualDate,
  DualDateInput,
  DualDateRange,
  HebrewMonthInput,
  MonthSegment,
} from "./types.js";

export function makeDualDateRange(
  start: DualDateInput,
  end: DualDateInput,
): DualDateRange {
  const startDate = toGregorian(start);
  const endDate = toGregorian(end);

  if (startDate > endDate) {
    return {
      start: toDualDate(endDate),
      end: toDualDate(startDate),
    };
  }

  return {
    start: toDualDate(startDate),
    end: toDualDate(endDate),
  };
}

export function listDualDatesInRange(
  start: DualDateInput,
  end: DualDateInput,
): DualDate[] {
  const range = makeDualDateRange(start, end);
  return eachDayOfInterval({
    start: range.start.greg,
    end: range.end.greg,
  }).map((date) => toDualDate(date));
}

export function listDaysInGregorianMonth(
  year: number,
  month: number,
): DualDate[] {
  const bounds = getGregorianMonthBoundaries(year, month);
  return listDualDatesInRange(bounds.start, bounds.end);
}

export function listDaysInHebrewMonth(
  year: number,
  month: HebrewMonthInput,
): DualDate[] {
  const normalizedMonth = normalizeHebrewMonth(month);
  const count = getDaysInHebrewMonth(year, normalizedMonth);
  const first = new HDate(1, normalizedMonth, year);
  const result: DualDate[] = [];

  for (let day = 0; day < count; day += 1) {
    result.push(toDualDate(first.add(day, "day")));
  }

  return result;
}

export function splitRangeByHebrewMonth(
  start: DualDateInput,
  end: DualDateInput,
): MonthSegment[] {
  const days = listDualDatesInRange(start, end);

  if (days.length === 0) {
    return [];
  }

  const segments: MonthSegment[] = [];
  const firstDay = days[0]!;
  let segmentStart = firstDay;
  let previous = firstDay;

  for (const current of days.slice(1)) {
    if (
      current.hebMonth !== previous.hebMonth ||
      current.hebYear !== previous.hebYear
    ) {
      segments.push({
        hebMonth: previous.hebMonth,
        hebMonthName: previous.hebMonthName,
        hebYear: previous.hebYear,
        gregMonth: segmentStart.greg.getMonth(),
        gregYear: segmentStart.greg.getFullYear(),
        start: segmentStart,
        end: previous,
        days: differenceInCalendarDays(previous.greg, segmentStart.greg) + 1,
      });

      segmentStart = current;
    }

    previous = current;
  }

  const last = days[days.length - 1]!;
  segments.push({
    hebMonth: last.hebMonth,
    hebMonthName: last.hebMonthName,
    hebYear: last.hebYear,
    gregMonth: segmentStart.greg.getMonth(),
    gregYear: segmentStart.greg.getFullYear(),
    start: segmentStart,
    end: last,
    days: differenceInCalendarDays(last.greg, segmentStart.greg) + 1,
  });

  return segments;
}

export function splitRangeByGregorianMonth(
  start: DualDateInput,
  end: DualDateInput,
): DualDateRange[] {
  const days = listDualDatesInRange(start, end);

  if (days.length === 0) {
    return [];
  }

  const ranges: DualDateRange[] = [];
  const firstDay = days[0]!;
  let currentStart = firstDay;
  let previous = firstDay;

  for (const current of days.slice(1)) {
    if (
      current.greg.getMonth() !== previous.greg.getMonth() ||
      current.greg.getFullYear() !== previous.greg.getFullYear()
    ) {
      ranges.push({ start: currentStart, end: previous });
      currentStart = current;
    }

    previous = current;
  }

  ranges.push({ start: currentStart, end: previous });
  return ranges;
}

export function getHebrewMonthRange(
  year: number,
  month: HebrewMonthInput,
): DualDateRange {
  return getHebrewMonthBoundaries(year, month);
}
