import type { ApiModuleDoc } from "../catalog-types";

export const conversionModule: ApiModuleDoc = {
  slug: "conversion",
  title: "conversion.ts",
  sourcePath: "packages/hebrew-date-utils/src/conversion.ts",
  summary: "שכבת נרמול/המרה מרכזית. כמעט כל מודול אחר משתמש בה פנימית.",
  notes: [
    "DualDateInput תומך ב-Date, HDate, DualDate ובאובייקט HebrewDateParts.",
    "כל Date לועזי מנורמל ליום מקומי כדי למנוע רעשי שעה/אזור זמן.",
  ],
  exports: [
    {
      name: "toHDate",
      kind: "function",
      signature: "toHDate(input: DualDateInput): HDate",
      description: "ממיר כל קלט נתמך למופע HDate של Hebcal.",
      usage: 'const hdate = toHDate(new Date(2026, 3, 5));',
      output: "מופע HDate עם המתודות של Hebcal.",
    },
    {
      name: "toGregorian",
      kind: "function",
      signature: "toGregorian(input: DualDateInput): Date",
      description: "ממיר כל קלט נתמך ל-Date לועזי מנורמל (תאריך בלבד).",
      usage: 'const greg = toGregorian({ day: 1, month: "Tishrei", year: 5787 });',
      output: "Date מקומי ללא זמן משמעותי (00:00 מקומי).",
    },
    {
      name: "toDualDate",
      kind: "function",
      signature: "toDualDate(input: DualDateInput): DualDate",
      description: "מחזיר אובייקט כפול עם מידע עברי ולועזי מלא.",
      usage: "const dual = toDualDate(new Date(2026, 3, 5));",
      output:
        "DualDate: שדות greg, heb, hebDay, hebMonth, hebYear, hebMonthName, hebString, hebDisplay.",
    },
    {
      name: "fromGregorianDate",
      kind: "function",
      signature: "fromGregorianDate(date: Date): DualDate",
      description: "Alias נוח ל-toDualDate עבור Date לועזי.",
      usage: "const dual = fromGregorianDate(new Date(2026, 3, 5));",
      output: "DualDate.",
    },
    {
      name: "fromHebrewDate",
      kind: "function",
      signature:
        "fromHebrewDate(day: number, month: number | string, year: number): DualDate",
      description: "בונה תאריך כפול מתוך חלקי תאריך עברי.",
      usage: 'const dual = fromHebrewDate(1, "Tishrei", 5787);',
      output: "DualDate.",
    },
    {
      name: "todayDualDate",
      kind: "function",
      signature: "todayDualDate(referenceDate?: Date): DualDate",
      description: "מחזיר DualDate להיום או לתאריך ייחוס שנמסר.",
      usage: "const today = todayDualDate();",
      output: "DualDate.",
    },
  ],
};
