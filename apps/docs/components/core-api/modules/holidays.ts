import type { ApiModuleDoc } from "../catalog-types";

export const holidaysModule: ApiModuleDoc = {
  slug: "holidays",
  title: "holidays.ts",
  sourcePath: "packages/hebrew-date-utils/src/holidays.ts",
  summary: "שאילתות חגים ואירועים על בסיס Hebcal עם אפשרויות סינון.",
  notes: [
    "ניתן לבחור il=true לישראל או false/undefined לתפוצות.",
    "locale שולט ב-displayName.",
  ],
  exports: [
    {
      name: "getHolidaysOn",
      kind: "function",
      signature:
        "getHolidaysOn(date: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[]",
      description: "מחזיר אירועי חג בתאריך מסוים.",
      usage: 'getHolidaysOn(new Date(2026, 8, 12), { il: true, locale: "he" });',
      output: "HolidayInfo[].",
    },
    {
      name: "getHolidaysForHebrewYear",
      kind: "function",
      signature:
        "getHolidaysForHebrewYear(year: number, options?: HolidayQueryOptions): HolidayInfo[]",
      description: "מחזיר אירועי חג לכל השנה העברית.",
      usage: "getHolidaysForHebrewYear(5787, { il: true });",
      output: "HolidayInfo[].",
    },
    {
      name: "getHolidaysBetween",
      kind: "function",
      signature:
        "getHolidaysBetween(start: DualDateInput, end: DualDateInput, options?: HolidayQueryOptions): HolidayInfo[]",
      description: "מחזיר אירועים בטווח לועזי כולל.",
      usage:
        'getHolidaysBetween(new Date(2026, 8, 1), new Date(2026, 8, 30), { locale: "he", il: true });',
      output: "HolidayInfo[].",
    },
    {
      name: "isHoliday",
      kind: "function",
      signature: "isHoliday(date: DualDateInput, options?: HolidayQueryOptions): boolean",
      description: "בודק האם קיים לפחות חג אחד בתאריך.",
      usage: "isHoliday(new Date(2026, 8, 12), { il: true });",
      output: "boolean.",
    },
  ],
};
