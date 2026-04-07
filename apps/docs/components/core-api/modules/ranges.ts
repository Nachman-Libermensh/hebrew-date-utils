import type { ApiModuleDoc } from "../catalog-types";

export const rangesModule: ApiModuleDoc = {
  slug: "ranges",
  title: "ranges.ts",
  sourcePath: "packages/hebrew-date-utils/src/ranges.ts",
  summary: "בניית טווחים, רשימות ימים ופיצול טווחים לפי חודשים.",
  notes: [
    "הטווחים הם inclusive (כוללים start ו-end).",
    "makeDualDateRange מסדר start/end גם אם הקלט הפוך.",
  ],
  exports: [
    {
      name: "makeDualDateRange",
      kind: "function",
      signature:
        "makeDualDateRange(start: DualDateInput, end: DualDateInput): DualDateRange",
      description: "מנרמל טווח תאריכים כך ש-start <= end.",
      usage: "makeDualDateRange(new Date(2026, 3, 10), new Date(2026, 3, 1));",
      output: "DualDateRange מסודר.",
    },
    {
      name: "listDualDatesInRange",
      kind: "function",
      signature:
        "listDualDatesInRange(start: DualDateInput, end: DualDateInput): DualDate[]",
      description: "רשימת כל הימים בטווח כולל.",
      usage:
        "listDualDatesInRange(new Date(2026, 3, 1), new Date(2026, 3, 3));",
      output: "DualDate[] באורך מתאים.",
    },
    {
      name: "listDaysInGregorianMonth",
      kind: "function",
      signature:
        "listDaysInGregorianMonth(year: number, month: number): DualDate[]",
      description: "כל ימי חודש לועזי נתון.",
      usage: "listDaysInGregorianMonth(2026, 3);",
      output: "DualDate[].",
    },
    {
      name: "listDaysInHebrewMonth",
      kind: "function",
      signature:
        "listDaysInHebrewMonth(year: number, month: HebrewMonthInput): DualDate[]",
      description: "כל ימי חודש עברי נתון.",
      usage: 'listDaysInHebrewMonth(5787, "Tishrei");',
      output: "DualDate[].",
    },
    {
      name: "splitRangeByHebrewMonth",
      kind: "function",
      signature:
        "splitRangeByHebrewMonth(start: DualDateInput, end: DualDateInput): MonthSegment[]",
      description: "פיצול טווח לקטעים לפי חודשים עבריים רציפים.",
      usage:
        "splitRangeByHebrewMonth(new Date(2026, 8, 1), new Date(2026, 9, 20));",
      output: "MonthSegment[].",
    },
    {
      name: "splitRangeByGregorianMonth",
      kind: "function",
      signature:
        "splitRangeByGregorianMonth(start: DualDateInput, end: DualDateInput): DualDateRange[]",
      description: "פיצול טווח לקטעים לפי חודשים לועזיים רציפים.",
      usage:
        "splitRangeByGregorianMonth(new Date(2026, 8, 1), new Date(2026, 10, 3));",
      output: "DualDateRange[].",
    },
    {
      name: "getHebrewMonthRange",
      kind: "function",
      signature:
        "getHebrewMonthRange(year: number, month: HebrewMonthInput): DualDateRange",
      description: "Alias לגבולות חודש עברי.",
      usage: 'getHebrewMonthRange(5787, "Tishrei");',
      output: "DualDateRange.",
    },
  ],
};
