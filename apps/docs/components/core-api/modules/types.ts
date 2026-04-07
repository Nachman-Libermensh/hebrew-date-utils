import type { ApiModuleDoc } from "../catalog-types";

export const typesModule: ApiModuleDoc = {
  slug: "types",
  title: "types.ts",
  sourcePath: "packages/hebrew-date-utils/src/types.ts",
  summary: "טיפוסים ציבוריים לשימוש בעת פיתוח TypeScript.",
  notes: ["מומלץ לייבא טיפוסים ישירות מהחבילה במקום להגדיר מחדש."],
  exports: [
    {
      name: "HebrewMonthInput",
      kind: "type",
      signature: "type HebrewMonthInput = number | string",
      description: "קלט חודש עברי גמיש (מספר או שם).",
      usage: 'const month: HebrewMonthInput = "Tishrei";',
      output: "טיפוס compile-time.",
    },
    {
      name: "HebrewDateParts",
      kind: "interface",
      signature: "{ day: number; month: HebrewMonthInput; year: number }",
      description: "מבנה קלט לתאריך עברי מפורק.",
      usage: "const heb: HebrewDateParts = { day: 1, month: 7, year: 5787 };",
      output: "טיפוס compile-time.",
    },
    {
      name: "DualDate",
      kind: "interface",
      signature:
        "{ greg: Date; heb: HDate; hebDay: number; hebMonth: number; hebYear: number; hebMonthName: string; hebString: string; hebDisplay: string }",
      description: "אובייקט תאריך משולב עברי/לועזי.",
      usage: "const dual: DualDate = toDualDate(new Date());",
      output: "טיפוס compile-time.",
    },
    {
      name: "DualDateInput",
      kind: "type",
      signature: "Date | HDate | DualDate | HebrewDateParts",
      description: "טיפוס קלט אחיד לרוב פונקציות הספריה.",
      usage:
        "function normalize(input: DualDateInput) { return toDualDate(input); }",
      output: "טיפוס compile-time.",
    },
    {
      name: "DualDateRange",
      kind: "interface",
      signature: "{ start: DualDate; end: DualDate }",
      description: "טווח תאריכים משולב.",
      usage:
        "const range: DualDateRange = makeDualDateRange(new Date(), new Date());",
      output: "טיפוס compile-time.",
    },
    {
      name: "MonthSegment",
      kind: "interface",
      signature:
        "{ hebMonth; hebMonthName; hebYear; gregMonth; gregYear; start; end; days }",
      description: "קטע טווח שחולק לפי חודש עברי.",
      usage: "const segments: MonthSegment[] = splitRangeByHebrewMonth(a, b);",
      output: "טיפוס compile-time.",
    },
    {
      name: "HebrewMonthInfo",
      kind: "interface",
      signature: "metadata for Hebrew month",
      description: "נתוני חודש עברי מרוכזים.",
      usage: "const info: HebrewMonthInfo = getHebrewMonthInfo(5787, 7);",
      output: "טיפוס compile-time.",
    },
    {
      name: "GregorianMonthInfo",
      kind: "interface",
      signature: "metadata for Gregorian month + included Hebrew months",
      description: "נתוני חודש לועזי כולל חודשי עברי חופפים.",
      usage: "const info: GregorianMonthInfo = getGregorianMonthInfo(2026, 8);",
      output: "טיפוס compile-time.",
    },
    {
      name: "HolidayInfo",
      kind: "interface",
      signature: "normalized holiday object",
      description: "מבנה אחיד לאירועי חגים.",
      usage: "const holidays: HolidayInfo[] = getHolidaysOn(new Date());",
      output: "טיפוס compile-time.",
    },
    {
      name: "HolidayQueryOptions",
      kind: "interface",
      signature:
        "{ il?: boolean; locale?: string; noMinorFast?: boolean; noModern?: boolean; noRoshChodesh?: boolean; noSpecialShabbat?: boolean }",
      description: "אפשרויות סינון ו-localization לאירועי חגים.",
      usage: 'const options: HolidayQueryOptions = { il: true, locale: "he" };',
      output: "טיפוס compile-time.",
    },
    {
      name: "HebrewYearInfo",
      kind: "interface",
      signature:
        "{ year; isLeapYear; monthsInYear; daysInYear; longCheshvan; shortKislev; firstDay; lastDay }",
      description: "נתוני שנה עברית.",
      usage: "const info: HebrewYearInfo = getHebrewYearInfo(5787);",
      output: "טיפוס compile-time.",
    },
  ],
};
