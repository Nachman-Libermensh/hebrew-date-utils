import type { ApiModuleDoc } from "../catalog-types";

export const membershipModule: ApiModuleDoc = {
  slug: "membership",
  title: "membership.ts",
  sourcePath: "packages/hebrew-date-utils/src/membership.ts",
  summary: "בדיקות שייכות, השוואה וטווחים.",
  notes: [
    "isSameHebrewDate משווה day/month/year עבריים.",
    "compareDualDates מחזיר הפרש ימים signed בין a ל-b.",
  ],
  exports: [
    {
      name: "isDateInHebrewMonth",
      kind: "function",
      signature:
        "isDateInHebrewMonth(input: DualDateInput, month: HebrewMonthInput, year: number): boolean",
      description: "בודק שייכות של תאריך לחודש עברי ושנה עברית.",
      usage: 'isDateInHebrewMonth(new Date(2026, 8, 12), "Tishrei", 5787);',
      output: "boolean.",
    },
    {
      name: "isDateInGregorianMonth",
      kind: "function",
      signature:
        "isDateInGregorianMonth(input: DualDateInput, month: number, year: number): boolean",
      description: "בודק שייכות לחודש לועזי ושנה לועזית.",
      usage: "isDateInGregorianMonth(new Date(2026, 8, 12), 8, 2026);",
      output: "boolean.",
    },
    {
      name: "isSameHebrewDate",
      kind: "function",
      signature:
        "isSameHebrewDate(a: DualDateInput, b: DualDateInput): boolean",
      description: "השוואת יום/חודש/שנה עברית.",
      usage: "isSameHebrewDate(new Date(2026, 8, 12), new Date(2026, 8, 12));",
      output: "boolean.",
    },
    {
      name: "isSameGregorianDate",
      kind: "function",
      signature:
        "isSameGregorianDate(a: DualDateInput, b: DualDateInput): boolean",
      description: "השוואת תאריך לועזי בלבד.",
      usage:
        "isSameGregorianDate(new Date(2026, 8, 12), { day: 19, month: 7, year: 5787 });",
      output: "boolean.",
    },
    {
      name: "compareDualDates",
      kind: "function",
      signature: "compareDualDates(a: DualDateInput, b: DualDateInput): number",
      description: "מחזיר הפרש ימים לועזי חתום בין שני תאריכים.",
      usage: "compareDualDates(new Date(2026, 8, 14), new Date(2026, 8, 12));",
      output: "number.",
    },
    {
      name: "isWithinDualDateRange",
      kind: "function",
      signature:
        "isWithinDualDateRange(input: DualDateInput, range: DualDateRange): boolean",
      description: "בודק אם תאריך נמצא בטווח כולל start/end.",
      usage:
        "isWithinDualDateRange(new Date(2026, 8, 12), { start: toDualDate(new Date(2026, 8, 1)), end: toDualDate(new Date(2026, 8, 30)) });",
      output: "boolean.",
    },
  ],
};
