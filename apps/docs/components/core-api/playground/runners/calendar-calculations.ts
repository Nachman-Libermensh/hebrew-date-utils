import {
  differenceInDualDays,
  differenceInDualMonths,
  differenceInDualYears,
  differenceInHebrewMonths,
  differenceInHebrewYears,
  getBirthdayInHebrewYear,
  getCurrentDualDate,
  getCurrentHebrewYear,
  getDaysInGregorianMonth,
  getDaysInHebrewMonth,
  getGregorianAge,
  getGregorianMonthBoundaries,
  getGregorianMonthFirstDay,
  getGregorianMonthInfo,
  getGregorianMonthLastDay,
  getHebrewAge,
  getHebrewMonthBoundaries,
  getHebrewMonthFirstDay,
  getHebrewMonthInfo,
  getHebrewMonthLastDay,
  getHebrewMonthName,
  getHebrewMonthNameEn,
  getHebrewMonthNameHe,
  getHebrewMonthRange,
  getHebrewYearForGregorianYear,
  getHebrewYearInfo,
  getHebrewYearMonths,
  getMonthsInHebrewYear,
  getYahrzeitInHebrewYear,
  isHebrewLeapYear,
  normalizeHebrewMonth,
  toDualDate,
} from "hebrew-date-utils";
import type { RunnerMap } from "./shared";
import { asPreview, dateExpr, normalizedShift, orderedDates } from "./shared";

export const calendarCalculationRunners: RunnerMap = {
  differenceInDualDays: ({ primaryDate, secondaryDate }) => ({
    invocation: `differenceInDualDays(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: differenceInDualDays(primaryDate, secondaryDate),
  }),
  differenceInDualMonths: ({ primaryDate, secondaryDate }) => ({
    invocation: `differenceInDualMonths(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: differenceInDualMonths(primaryDate, secondaryDate),
  }),
  differenceInDualYears: ({ primaryDate, secondaryDate }) => ({
    invocation: `differenceInDualYears(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: differenceInDualYears(primaryDate, secondaryDate),
  }),
  differenceInHebrewMonths: ({ primaryDate, secondaryDate }) => ({
    invocation: `differenceInHebrewMonths(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: differenceInHebrewMonths(primaryDate, secondaryDate),
  }),
  differenceInHebrewYears: ({ primaryDate, secondaryDate }) => ({
    invocation: `differenceInHebrewYears(${dateExpr(primaryDate)}, ${dateExpr(secondaryDate)})`,
    output: differenceInHebrewYears(primaryDate, secondaryDate),
  }),
  getBirthdayInHebrewYear: ({ primaryDate, secondaryDate }) => {
    const targetYear = toDualDate(secondaryDate).hebYear;
    return {
      invocation: `getBirthdayInHebrewYear(${dateExpr(primaryDate)}, ${targetYear})`,
      output: getBirthdayInHebrewYear(primaryDate, targetYear),
    };
  },
  getYahrzeitInHebrewYear: ({ primaryDate, secondaryDate }) => {
    const targetYear = toDualDate(secondaryDate).hebYear;
    return {
      invocation: `getYahrzeitInHebrewYear(${dateExpr(primaryDate)}, ${targetYear})`,
      output: getYahrzeitInHebrewYear(primaryDate, targetYear),
    };
  },
  getGregorianAge: ({ primaryDate, secondaryDate }) => {
    const [birth, at] = orderedDates(primaryDate, secondaryDate);
    return {
      invocation: `getGregorianAge(${dateExpr(birth)}, ${dateExpr(at)})`,
      output: getGregorianAge(birth, at),
    };
  },
  getHebrewAge: ({ primaryDate, secondaryDate }) => {
    const [birth, at] = orderedDates(primaryDate, secondaryDate);
    return {
      invocation: `getHebrewAge(${dateExpr(birth)}, ${dateExpr(at)})`,
      output: getHebrewAge(birth, at),
    };
  },

  getGregorianMonthFirstDay: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `getGregorianMonthFirstDay(${year}, ${month})`,
      output: getGregorianMonthFirstDay(year, month),
    };
  },
  getGregorianMonthLastDay: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `getGregorianMonthLastDay(${year}, ${month})`,
      output: getGregorianMonthLastDay(year, month),
    };
  },
  getGregorianMonthBoundaries: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `getGregorianMonthBoundaries(${year}, ${month})`,
      output: getGregorianMonthBoundaries(year, month),
    };
  },
  getHebrewMonthFirstDay: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthFirstDay(${dual.hebYear}, ${dual.hebMonth})`,
      output: getHebrewMonthFirstDay(dual.hebYear, dual.hebMonth),
    };
  },
  getHebrewMonthLastDay: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthLastDay(${dual.hebYear}, ${dual.hebMonth})`,
      output: getHebrewMonthLastDay(dual.hebYear, dual.hebMonth),
    };
  },
  getHebrewMonthBoundaries: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthBoundaries(${dual.hebYear}, ${dual.hebMonth})`,
      output: getHebrewMonthBoundaries(dual.hebYear, dual.hebMonth),
    };
  },

  normalizeHebrewMonth: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `normalizeHebrewMonth("${dual.hebMonthName}")`,
      output: normalizeHebrewMonth(dual.hebMonthName),
    };
  },
  isHebrewLeapYear: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `isHebrewLeapYear(${dual.hebYear})`,
      output: isHebrewLeapYear(dual.hebYear),
    };
  },
  getMonthsInHebrewYear: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getMonthsInHebrewYear(${dual.hebYear})`,
      output: getMonthsInHebrewYear(dual.hebYear),
    };
  },
  getDaysInGregorianMonth: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `getDaysInGregorianMonth(${year}, ${month})`,
      output: getDaysInGregorianMonth(year, month),
    };
  },
  getDaysInHebrewMonth: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getDaysInHebrewMonth(${dual.hebYear}, ${dual.hebMonth})`,
      output: getDaysInHebrewMonth(dual.hebYear, dual.hebMonth),
    };
  },
  getHebrewMonthName: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthName(${dual.hebMonth}, ${dual.hebYear})`,
      output: getHebrewMonthName(dual.hebMonth, dual.hebYear),
    };
  },
  getHebrewMonthNameHe: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthNameHe(${dual.hebMonth}, ${dual.hebYear})`,
      output: getHebrewMonthNameHe(dual.hebMonth, dual.hebYear),
    };
  },
  getHebrewMonthNameEn: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthNameEn(${dual.hebMonth}, ${dual.hebYear})`,
      output: getHebrewMonthNameEn(dual.hebMonth, dual.hebYear),
    };
  },
  getHebrewYearMonths: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    const months = getHebrewYearMonths(dual.hebYear);
    return {
      invocation: `getHebrewYearMonths(${dual.hebYear})`,
      output: asPreview(months),
    };
  },

  getHebrewMonthInfo: ({ primaryDate }) => {
    const dual = toDualDate(primaryDate);
    return {
      invocation: `getHebrewMonthInfo(${dual.hebYear}, ${dual.hebMonth})`,
      output: getHebrewMonthInfo(dual.hebYear, dual.hebMonth),
    };
  },
  getGregorianMonthInfo: ({ primaryDate }) => {
    const month = primaryDate.getMonth();
    const year = primaryDate.getFullYear();
    return {
      invocation: `getGregorianMonthInfo(${year}, ${month})`,
      output: getGregorianMonthInfo(year, month),
    };
  },

  getCurrentDualDate: ({ primaryDate }) => ({
    invocation: `getCurrentDualDate(${dateExpr(primaryDate)})`,
    output: getCurrentDualDate(primaryDate),
  }),
  getCurrentHebrewYear: ({ primaryDate }) => ({
    invocation: `getCurrentHebrewYear(${dateExpr(primaryDate)})`,
    output: getCurrentHebrewYear(primaryDate),
  }),
  getHebrewYearInfo: ({ primaryDate }) => {
    const year = toDualDate(primaryDate).hebYear;
    return {
      invocation: `getHebrewYearInfo(${year})`,
      output: getHebrewYearInfo(year),
    };
  },
  getHebrewYearForGregorianYear: ({ primaryDate }) => {
    const year = primaryDate.getFullYear();
    return {
      invocation: `getHebrewYearForGregorianYear(${year})`,
      output: getHebrewYearForGregorianYear(year),
    };
  },

  getHebrewMonthRange: ({ primaryDate, shiftAmount }) => {
    const dual = toDualDate(primaryDate);
    const monthOffset = normalizedShift(shiftAmount);
    const shifted =
      monthOffset === 0
        ? dual
        : toDualDate(
            new Date(
              primaryDate.getTime() + monthOffset * 30 * 24 * 60 * 60 * 1000,
            ),
          );
    return {
      invocation: `getHebrewMonthRange(${shifted.hebYear}, ${shifted.hebMonth})`,
      output: getHebrewMonthRange(shifted.hebYear, shifted.hebMonth),
      notes: "offset משמש כאן לבחירת חודש יעד דינמי לדמו.",
    };
  },
};
