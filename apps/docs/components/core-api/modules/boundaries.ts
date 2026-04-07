import type { ApiModuleDoc } from "../catalog-types";

export const boundariesModule: ApiModuleDoc = {
  slug: "boundaries",
  title: "boundaries.ts",
  sourcePath: "packages/hebrew-date-utils/src/boundaries.ts",
  summary: "פונקציות גבולות (תחילת/סוף חודש) לשני הלוחות.",
  notes: [
    "בחודשים לועזיים month הוא zero-based: ינואר=0.",
    "בחודשים עבריים month יכול להיות מספר או שם.",
  ],
  exports: [
    {
      name: "getGregorianMonthFirstDay",
      kind: "function",
      signature:
        "getGregorianMonthFirstDay(year: number, month: number): DualDate",
      description: "היום הראשון בחודש לועזי (month הוא zero-based).",
      usage: "getGregorianMonthFirstDay(2026, 3);",
      output: "DualDate של היום הראשון.",
    },
    {
      name: "getGregorianMonthLastDay",
      kind: "function",
      signature:
        "getGregorianMonthLastDay(year: number, month: number): DualDate",
      description: "היום האחרון בחודש לועזי.",
      usage: "getGregorianMonthLastDay(2026, 3);",
      output: "DualDate של היום האחרון.",
    },
    {
      name: "getGregorianMonthBoundaries",
      kind: "function",
      signature:
        "getGregorianMonthBoundaries(year: number, month: number): DualDateRange",
      description: "מחזיר טווח התחלה/סוף מלא לחודש לועזי.",
      usage: "getGregorianMonthBoundaries(2026, 3);",
      output: "{ start: DualDate, end: DualDate }.",
    },
    {
      name: "getHebrewMonthFirstDay",
      kind: "function",
      signature:
        "getHebrewMonthFirstDay(year: number, month: HebrewMonthInput): DualDate",
      description: "היום הראשון בחודש עברי.",
      usage: 'getHebrewMonthFirstDay(5787, "Tishrei");',
      output: "DualDate של היום הראשון.",
    },
    {
      name: "getHebrewMonthLastDay",
      kind: "function",
      signature:
        "getHebrewMonthLastDay(year: number, month: HebrewMonthInput): DualDate",
      description: "היום האחרון בחודש עברי.",
      usage: 'getHebrewMonthLastDay(5787, "Tishrei");',
      output: "DualDate של היום האחרון.",
    },
    {
      name: "getHebrewMonthBoundaries",
      kind: "function",
      signature:
        "getHebrewMonthBoundaries(year: number, month: HebrewMonthInput): DualDateRange",
      description: "מחזיר טווח התחלה/סוף מלא לחודש עברי.",
      usage: 'getHebrewMonthBoundaries(5787, "Tishrei");',
      output: "{ start: DualDate, end: DualDate }.",
    },
  ],
};
