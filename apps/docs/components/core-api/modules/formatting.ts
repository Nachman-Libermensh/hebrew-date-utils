import type { ApiModuleDoc } from "../catalog-types";

export const formattingModule: ApiModuleDoc = {
  slug: "formatting",
  title: "formatting.ts",
  sourcePath: "packages/hebrew-date-utils/src/formatting.ts",
  summary: "עיצוב מחרוזות תאריך לועזי/עברי + ISO helper.",
  notes: [
    "formatGregorian משתמש בפורמט date-fns.",
    "formatHebrew תומך gematriya ו-suppressNikud.",
  ],
  exports: [
    {
      name: "HebrewFormatOptions",
      kind: "interface",
      signature:
        "{ locale?: string; showYear?: boolean; gematriya?: boolean; suppressNikud?: boolean }",
      description: "אפשרויות לרינדור תאריך עברי.",
      usage:
        'const options: HebrewFormatOptions = { locale: "he", gematriya: true };',
      output: "טיפוס compile-time.",
    },
    {
      name: "formatGregorian",
      kind: "function",
      signature:
        "formatGregorian(input: DualDateInput, pattern?: string): string",
      description: "פורמט לועזי עם pattern של date-fns.",
      usage: 'formatGregorian(new Date(2026, 3, 5), "yyyy-MM-dd");',
      output: "מחרוזת לועזית.",
    },
    {
      name: "formatHebrew",
      kind: "function",
      signature:
        "formatHebrew(input: DualDateInput, options?: HebrewFormatOptions): string",
      description: "פורמט עברי (רגיל או גימטריה).",
      usage:
        'formatHebrew(new Date(2026, 3, 5), { locale: "he", gematriya: true });',
      output: "מחרוזת עברית.",
    },
    {
      name: "formatDualDate",
      kind: "function",
      signature:
        "formatDualDate(input: DualDateInput, gregorianPattern?: string): string",
      description: "פורמט משולב לועזי | עברי.",
      usage: "formatDualDate(new Date(2026, 3, 5));",
      output: "מחרוזת בסגנון yyyy-MM-dd | Hebrew.",
    },
    {
      name: "getWeekdayName",
      kind: "function",
      signature:
        "getWeekdayName(input: DualDateInput, locale?: string, style?: Intl.DateTimeFormatOptions['weekday']): string",
      description: "מחזיר שם יום בשבוע לפי locale.",
      usage: 'getWeekdayName(new Date(2026, 3, 5), "he-IL", "long");',
      output: "מחרוזת יום בשבוע.",
    },
    {
      name: "toIsoDate",
      kind: "function",
      signature: "toIsoDate(input: DualDateInput): string",
      description: "פורמט yyyy-MM-dd מקומי.",
      usage: "toIsoDate(new Date(2026, 3, 5));",
      output: "מחרוזת תאריך ISO-like.",
    },
  ],
};
