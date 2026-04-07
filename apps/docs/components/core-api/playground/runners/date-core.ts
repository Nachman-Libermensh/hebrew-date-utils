import {
  addGregorianDays,
  addGregorianMonths,
  addGregorianYears,
  addHebrewDays,
  addHebrewMonths,
  addHebrewYears,
  compareDualDates,
  formatDualDate,
  formatGregorian,
  formatHebrew,
  fromGregorianDate,
  fromHebrewDate,
  getWeekdayName,
  isDateInGregorianMonth,
  isDateInHebrewMonth,
  isSameGregorianDate,
  isSameHebrewDate,
  isWithinDualDateRange,
  makeDualDateRange,
  nextHebrewMonth,
  previousHebrewMonth,
  shiftHebrewMonth,
  toDualDate,
  toGregorian,
  toHDate,
  toIsoDate,
  todayDualDate,
} from "hebrew-date-utils";
import type { RunnerMap } from "./shared";
import {
  dateExpr,
  getHolidayLocale,
  getUiLocale,
  normalizedShift,
} from "./shared";

export const dateCoreRunners: RunnerMap = {
  toHDate: ({ primaryDate }) => {
    const hdate = toHDate(primaryDate);
    return {
      invocation: `toHDate(${dateExpr(primaryDate)})`,
      output: {
        day: hdate.getDate(),
        month: hdate.getMonth(),
        year: hdate.getFullYear(),
        asDual: toDualDate(hdate),
      },
    };
  },
  toGregorian: ({ primaryDate }) => ({
    invocation: `toGregorian(${dateExpr(primaryDate)})`,
    output: toGregorian(primaryDate),
  }),
  toDualDate: ({ primaryDate }) => ({
    invocation: `toDualDate(${dateExpr(primaryDate)})`,
    output: toDualDate(primaryDate),
  }),
  fromGregorianDate: ({ primaryDate }) => ({
    invocation: `fromGregorianDate(${dateExpr(primaryDate)})`,
    output: fromGregorianDate(primaryDate),
  }),
  fromHebrewDate: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `fromHebrewDate(${dual.hebDay}, ${dual.hebMonth}, ${dual.hebYear})`,
      output: fromHebrewDate(dual.hebDay, dual.hebMonth, dual.hebYear),
      notes: "הארגומנטים נגזרו מתאריך הבסיס שנבחר.",
    };
  },
  todayDualDate: ({ primaryDate }) => ({
    invocation: `todayDualDate(${dateExpr(primaryDate)})`,
    output: todayDualDate(primaryDate),
  }),

  addGregorianDays: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addGregorianDays(${dateExpr(primaryDate)}, ${amount})`,
      output: addGregorianDays(primaryDate, amount),
    };
  },
  addGregorianMonths: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addGregorianMonths(${dateExpr(primaryDate)}, ${amount})`,
      output: addGregorianMonths(primaryDate, amount),
    };
  },
  addGregorianYears: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addGregorianYears(${dateExpr(primaryDate)}, ${amount})`,
      output: addGregorianYears(primaryDate, amount),
    };
  },
  addHebrewDays: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addHebrewDays(${dateExpr(primaryDate)}, ${amount})`,
      output: addHebrewDays(primaryDate, amount),
    };
  },
  addHebrewMonths: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addHebrewMonths(${dateExpr(primaryDate)}, ${amount})`,
      output: addHebrewMonths(primaryDate, amount),
    };
  },
  addHebrewYears: ({ primaryDate, shiftAmount }) => {
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `addHebrewYears(${dateExpr(primaryDate)}, ${amount})`,
      output: addHebrewYears(primaryDate, amount),
    };
  },
  nextHebrewMonth: ({ primaryDate }) => ({
    invocation: `nextHebrewMonth(${dateExpr(primaryDate)})`,
    output: nextHebrewMonth(primaryDate),
  }),
  previousHebrewMonth: ({ primaryDate }) => ({
    invocation: `previousHebrewMonth(${dateExpr(primaryDate)})`,
    output: previousHebrewMonth(primaryDate),
  }),
  shiftHebrewMonth: ({ primaryDate, shiftAmount }) => {
    const dual = toDualDate(primaryDate);
    const amount = normalizedShift(shiftAmount);
    return {
      invocation: `shiftHebrewMonth(${dual.hebMonth}, ${dual.hebYear}, ${amount})`,
      output: shiftHebrewMonth(dual.hebMonth, dual.hebYear, amount),
    };
  },

  isDateInHebrewMonth: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `isDateInHebrewMonth(${dateExpr(primaryDate)}, ${dual.hebMonth}, ${dual.hebYear})`,
      output: isDateInHebrewMonth(primaryDate, dual.hebMonth, dual.hebYear),
    };
  },
  isDateInGregorianMonth: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `isDateInGregorianMonth(${dateExpr(primaryDate)}, ${month}, ${year})`,
      output: isDateInGregorianMonth(primaryDate, month, year),
    };
  },
  isSameHebrewDate: ({ primaryDate, secondaryDate }) => ({
    invocation: `isSameHebrewDate(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: isSameHebrewDate(primaryDate, secondaryDate),
  }),
  isSameGregorianDate: ({ primaryDate, secondaryDate }) => ({
    invocation: `isSameGregorianDate(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: isSameGregorianDate(primaryDate, secondaryDate),
  }),
  compareDualDates: ({ primaryDate, secondaryDate }) => ({
    invocation: `compareDualDates(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: compareDualDates(primaryDate, secondaryDate),
  }),
  isWithinDualDateRange: ({ primaryDate, secondaryDate }) => {
    const range = makeDualDateRange(primaryDate, secondaryDate);
    return {
      invocation: `isWithinDualDateRange(${dateExpr(primaryDate)}, makeDualDateRange(...))`,
      output: isWithinDualDateRange(primaryDate, range),
    };
  },

  formatGregorian: ({ primaryDate }) => ({
    invocation: `formatGregorian(${dateExpr(primaryDate)}, "yyyy-MM-dd")`,
    output: formatGregorian(primaryDate, "yyyy-MM-dd"),
  }),
  formatHebrew: ({ primaryDate, locale }) => ({
    invocation: `formatHebrew(${dateExpr(primaryDate)}, { locale: "${getHolidayLocale(locale)}", gematriya: ${locale === "he"} })`,
    output: formatHebrew(primaryDate, {
      locale: getHolidayLocale(locale),
      gematriya: locale === "he",
    }),
  }),
  formatDualDate: ({ primaryDate }) => ({
    invocation: `formatDualDate(${dateExpr(primaryDate)})`,
    output: formatDualDate(primaryDate),
  }),
  getWeekdayName: ({ primaryDate, locale }) => ({
    invocation: `getWeekdayName(${dateExpr(primaryDate)}, "${getUiLocale(locale)}", "long")`,
    output: getWeekdayName(primaryDate, getUiLocale(locale), "long"),
  }),
  toIsoDate: ({ primaryDate }) => ({
    invocation: `toIsoDate(${dateExpr(primaryDate)})`,
    output: toIsoDate(primaryDate),
  }),
};
