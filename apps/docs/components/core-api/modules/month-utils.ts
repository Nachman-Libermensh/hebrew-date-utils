import type { ApiModuleDoc } from "../catalog-types";

export const monthUtilsModule: ApiModuleDoc = {
  slug: "month-utils",
  title: "month-utils.ts",
  sourcePath: "packages/hebrew-date-utils/src/month-utils.ts",
  summary: "כלי עזר לתכונות חודש: שמות, ימים, חודשים בשנה, שנה מעוברת.",
  notes: [
    "normalizeHebrewMonth משתמש ב-HDate.monthNum של Hebcal.",
    "getHebrewYearMonths מחזיר מערך מוכן לתצוגת UI.",
  ],
  exports: [
    {
      name: "normalizeHebrewMonth",
      kind: "function",
      signature: "normalizeHebrewMonth(month: HebrewMonthInput): number",
      description: "מנרמל שם/מספר חודש עברי למספר חודש חוקי.",
      usage: 'normalizeHebrewMonth("Tishrei");',
      output: "מספר חודש עברי.",
    },
    {
      name: "isHebrewLeapYear",
      kind: "function",
      signature: "isHebrewLeapYear(year: number): boolean",
      description: "בודק אם השנה העברית מעוברת.",
      usage: "isHebrewLeapYear(5787);",
      output: "boolean.",
    },
    {
      name: "getMonthsInHebrewYear",
      kind: "function",
      signature: "getMonthsInHebrewYear(year: number): number",
      description: "מחזיר 12 או 13 לפי השנה העברית.",
      usage: "getMonthsInHebrewYear(5787);",
      output: "number (12/13).",
    },
    {
      name: "getDaysInGregorianMonth",
      kind: "function",
      signature: "getDaysInGregorianMonth(year: number, month: number): number",
      description: "כמות ימים בחודש לועזי (month הוא zero-based).",
      usage: "getDaysInGregorianMonth(2026, 1);",
      output: "number (למשל 28 או 29).",
    },
    {
      name: "getDaysInHebrewMonth",
      kind: "function",
      signature:
        "getDaysInHebrewMonth(year: number, month: HebrewMonthInput): number",
      description: "כמות ימים בחודש עברי.",
      usage: 'getDaysInHebrewMonth(5787, "Tishrei");',
      output: "number (29/30 בדרך כלל).",
    },
    {
      name: "getHebrewMonthName",
      kind: "function",
      signature:
        "getHebrewMonthName(month: HebrewMonthInput, year: number): string",
      description: "שם חודש עברי לפי Hebcal transliteration.",
      usage: "getHebrewMonthName(7, 5787);",
      output: "string.",
    },
    {
      name: "getHebrewMonthNameHe",
      kind: "function",
      signature:
        "getHebrewMonthNameHe(month: HebrewMonthInput, year: number): string",
      description: "שם חודש ידידותי לממשק עברי.",
      usage: "getHebrewMonthNameHe(7, 5787);",
      output: "string.",
    },
    {
      name: "getHebrewMonthNameEn",
      kind: "function",
      signature:
        "getHebrewMonthNameEn(month: HebrewMonthInput, year: number): string",
      description: "שם חודש בתעתיק אנגלי.",
      usage: "getHebrewMonthNameEn(7, 5787);",
      output: "string.",
    },
    {
      name: "getHebrewYearMonths",
      kind: "function",
      signature:
        "getHebrewYearMonths(year: number): Array<{ month: number; name: string; days: number }>",
      description: "מחזיר את רשימת חודשי השנה עם מספר חודש, שם ומספר ימים.",
      usage: "getHebrewYearMonths(5787);",
      output: "מערך אובייקטים עם month/name/days.",
    },
  ],
};
