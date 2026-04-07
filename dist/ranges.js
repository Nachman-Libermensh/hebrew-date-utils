import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { getGregorianMonthBoundaries, getHebrewMonthBoundaries, } from "./boundaries.js";
import { toDualDate, toGregorian } from "./conversion.js";
import { getDaysInHebrewMonth, normalizeHebrewMonth } from "./month-utils.js";
/**
 * Builds an ordered inclusive date range from two inputs.
 */
export function makeDualDateRange(start, end) {
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
/**
 * Lists every day in an inclusive range as DualDate entries.
 */
export function listDualDatesInRange(start, end) {
    const range = makeDualDateRange(start, end);
    return eachDayOfInterval({
        start: range.start.greg,
        end: range.end.greg,
    }).map((date) => toDualDate(date));
}
/**
 * Lists all days in a Gregorian month.
 */
export function listDaysInGregorianMonth(year, month) {
    const bounds = getGregorianMonthBoundaries(year, month);
    return listDualDatesInRange(bounds.start, bounds.end);
}
/**
 * Lists all days in a Hebrew month.
 */
export function listDaysInHebrewMonth(year, month) {
    const normalizedMonth = normalizeHebrewMonth(month);
    const count = getDaysInHebrewMonth(year, normalizedMonth);
    const first = new HDate(1, normalizedMonth, year);
    const result = [];
    for (let day = 0; day < count; day += 1) {
        result.push(toDualDate(first.add(day, "day")));
    }
    return result;
}
/**
 * Splits an inclusive range into contiguous Hebrew-month segments.
 */
export function splitRangeByHebrewMonth(start, end) {
    const days = listDualDatesInRange(start, end);
    if (days.length === 0) {
        return [];
    }
    const segments = [];
    const firstDay = days[0];
    let segmentStart = firstDay;
    let previous = firstDay;
    for (const current of days.slice(1)) {
        if (current.hebMonth !== previous.hebMonth ||
            current.hebYear !== previous.hebYear) {
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
    const last = days[days.length - 1];
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
/**
 * Splits an inclusive range into contiguous Gregorian-month ranges.
 */
export function splitRangeByGregorianMonth(start, end) {
    const days = listDualDatesInRange(start, end);
    if (days.length === 0) {
        return [];
    }
    const ranges = [];
    const firstDay = days[0];
    let currentStart = firstDay;
    let previous = firstDay;
    for (const current of days.slice(1)) {
        if (current.greg.getMonth() !== previous.greg.getMonth() ||
            current.greg.getFullYear() !== previous.greg.getFullYear()) {
            ranges.push({ start: currentStart, end: previous });
            currentStart = current;
        }
        previous = current;
    }
    ranges.push({ start: currentStart, end: previous });
    return ranges;
}
/**
 * Alias for Hebrew month boundaries.
 */
export function getHebrewMonthRange(year, month) {
    return getHebrewMonthBoundaries(year, month);
}
//# sourceMappingURL=ranges.js.map