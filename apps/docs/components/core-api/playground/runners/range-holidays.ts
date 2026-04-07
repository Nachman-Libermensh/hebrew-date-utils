import {
  getHolidaysBetween,
  getHolidaysForHebrewYear,
  getHolidaysOn,
  isHoliday,
  listDaysInGregorianMonth,
  listDaysInHebrewMonth,
  listDualDatesInRange,
  splitRangeByGregorianMonth,
  splitRangeByHebrewMonth,
  toDualDate,
} from "hebrew-date-utils";
import type { RunnerMap } from "./shared";
import {
  asPreview,
  clampWindow,
  dateExpr,
  getHolidayLocale,
  orderedDates,
} from "./shared";

export const rangeHolidayRunners: RunnerMap = {
  listDualDatesInRange: ({ primaryDate, secondaryDate }) => {
    const [start, end] = orderedDates(primaryDate, secondaryDate);
    const bounded = clampWindow(start, end, 45);
    const values = listDualDatesInRange(bounded.start, bounded.end);
    return {
      invocation: `listDualDatesInRange(${dateExpr(bounded.start)}, ${dateExpr(bounded.end)})`,
      output: asPreview(values),
      notes: bounded.clamped
        ? "הטווח הוגבל ל-45 ימים כדי לשמור על תצוגה מהירה וברורה."
        : undefined,
    };
  },
  listDaysInGregorianMonth: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    const values = listDaysInGregorianMonth(year, month);
    return {
      invocation: `listDaysInGregorianMonth(${year}, ${month})`,
      output: asPreview(values),
    };
  },
  listDaysInHebrewMonth: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    const values = listDaysInHebrewMonth(dual.hebYear, dual.hebMonth);
    return {
      invocation: `listDaysInHebrewMonth(${dual.hebYear}, ${dual.hebMonth})`,
      output: asPreview(values),
    };
  },
  splitRangeByHebrewMonth: ({ primaryDate, secondaryDate }) => {
    const [start, end] = orderedDates(primaryDate, secondaryDate);
    const bounded = clampWindow(start, end, 180);
    const values = splitRangeByHebrewMonth(bounded.start, bounded.end);
    return {
      invocation: `splitRangeByHebrewMonth(${dateExpr(bounded.start)}, ${dateExpr(bounded.end)})`,
      output: asPreview(values),
      notes: bounded.clamped ? "הטווח הוגבל ל-180 ימים." : undefined,
    };
  },
  splitRangeByGregorianMonth: ({ primaryDate, secondaryDate }) => {
    const [start, end] = orderedDates(primaryDate, secondaryDate);
    const bounded = clampWindow(start, end, 180);
    const values = splitRangeByGregorianMonth(bounded.start, bounded.end);
    return {
      invocation: `splitRangeByGregorianMonth(${dateExpr(bounded.start)}, ${dateExpr(bounded.end)})`,
      output: asPreview(values),
      notes: bounded.clamped ? "הטווח הוגבל ל-180 ימים." : undefined,
    };
  },

  getHolidaysOn: ({ primaryDate, locale, inIsrael }) => {
    const values = getHolidaysOn(primaryDate, {
      il: inIsrael,
      locale: getHolidayLocale(locale),
    });
    return {
      invocation: `getHolidaysOn(${dateExpr(primaryDate)}, { il: ${inIsrael}, locale: "${getHolidayLocale(locale)}" })`,
      output: asPreview(values),
    };
  },
  getHolidaysForHebrewYear: ({ primaryDate, locale, inIsrael }) => {
    const hebYear = toDualDate(primaryDate).hebYear;
    const values = getHolidaysForHebrewYear(hebYear, {
      il: inIsrael,
      locale: getHolidayLocale(locale),
    });
    return {
      invocation: `getHolidaysForHebrewYear(${hebYear}, { il: ${inIsrael}, locale: "${getHolidayLocale(locale)}" })`,
      output: asPreview(values),
    };
  },
  getHolidaysBetween: ({ primaryDate, secondaryDate, locale, inIsrael }) => {
    const [start, end] = orderedDates(primaryDate, secondaryDate);
    const bounded = clampWindow(start, end, 365);
    const values = getHolidaysBetween(bounded.start, bounded.end, {
      il: inIsrael,
      locale: getHolidayLocale(locale),
    });
    return {
      invocation: `getHolidaysBetween(${dateExpr(bounded.start)}, ${dateExpr(bounded.end)}, { il: ${inIsrael}, locale: "${getHolidayLocale(locale)}" })`,
      output: asPreview(values),
      notes: bounded.clamped
        ? "הטווח הוגבל לשנה אחת לצורך דמו מהיר."
        : undefined,
    };
  },
  isHoliday: ({ primaryDate, locale, inIsrael }) => ({
    invocation: `isHoliday(${dateExpr(primaryDate)}, { il: ${inIsrael}, locale: "${getHolidayLocale(locale)}" })`,
    output: isHoliday(primaryDate, {
      il: inIsrael,
      locale: getHolidayLocale(locale),
    }),
  }),
};
