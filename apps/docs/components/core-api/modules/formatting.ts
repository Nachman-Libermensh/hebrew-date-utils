import type { ApiModuleDoc } from "../catalog-types";

export const formattingModule: ApiModuleDoc = {
  slug: "formatting",
  title: "formatting.ts",
  sourcePath: "packages/hebrew-date-utils/src/formatting.ts",
  summary: "עיצוב תאריכים: עברי/לועזי, גימטריה, יום בשבוע, שבת ופורמט כפול.",
  notes: [
    "formatGregorian משתמש בפורמט date-fns.",
    "formatHebrew תומך gematriya ו-suppressNikud.",
    "פונקציות גימטריה ויום-בשבוע מתאימות גם ל-DualDateInput.",
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
      name: "formatHebrewDate",
      kind: "function",
      signature: "formatHebrewDate(input: DualDateInput): string",
      description: "מחזיר תאריך עברי בגימטריה מלאה.",
      usage: "formatHebrewDate(new Date(2026, 3, 5));",
      output: "לדוגמה: ט׳ ניסן תשפ״ו.",
    },
    {
      name: "hebrewYearGematriya",
      kind: "function",
      signature: "hebrewYearGematriya(year: number): string",
      description: "מחזיר את השנה העברית בגימטריה.",
      usage: "hebrewYearGematriya(5786);",
      output: "לדוגמה: תשפ״ו.",
    },
    {
      name: "hebrewDayGematriya",
      kind: "function",
      signature: "hebrewDayGematriya(input: DualDateInput): string",
      description: "מחזיר רק את יום החודש העברי בגימטריה.",
      usage: "hebrewDayGematriya(new Date(2026, 3, 5));",
      output: "לדוגמה: ט׳.",
    },
    {
      name: "gregorianMonthNameHe",
      kind: "function",
      signature: "gregorianMonthNameHe(month: number): string",
      description: "שם חודש לועזי בעברית (0-based).",
      usage: "gregorianMonthNameHe(0);",
      output: "ינואר.",
    },
    {
      name: "gregorianMonthNameEn",
      kind: "function",
      signature: "gregorianMonthNameEn(month: number): string",
      description: "שם חודש לועזי באנגלית (0-based).",
      usage: "gregorianMonthNameEn(0);",
      output: "January.",
    },
    {
      name: "hebrewDayOfWeek",
      kind: "function",
      signature: "hebrewDayOfWeek(input: DualDateInput): string",
      description: "שם היום בשבוע בעברית (ראשון..שבת).",
      usage: "hebrewDayOfWeek(new Date(2026, 3, 5));",
      output: "מחרוזת יום עברית.",
    },
    {
      name: "hebrewDayOfWeekFull",
      kind: "function",
      signature: "hebrewDayOfWeekFull(input: DualDateInput): string",
      description: "גרסה מלאה: 'יום ראשון'... ולשבת מוחזר 'שבת'.",
      usage: "hebrewDayOfWeekFull(new Date(2026, 3, 5));",
      output: "יום ... או שבת.",
    },
    {
      name: "isShabbat",
      kind: "function",
      signature: "isShabbat(input: DualDateInput): boolean",
      description: "בודק האם התאריך חל בשבת.",
      usage: "isShabbat(new Date(2026, 3, 11));",
      output: "true/false.",
    },
    {
      name: "isErevShabbat",
      kind: "function",
      signature: "isErevShabbat(input: DualDateInput): boolean",
      description: "בודק האם התאריך חל ביום שישי.",
      usage: "isErevShabbat(new Date(2026, 3, 10));",
      output: "true/false.",
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
