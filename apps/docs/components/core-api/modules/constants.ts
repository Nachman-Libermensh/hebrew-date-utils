import type { ApiModuleDoc } from "../catalog-types";

export const constantsModule: ApiModuleDoc = {
  slug: "constants",
  title: "constants.ts",
  sourcePath: "packages/hebrew-date-utils/src/constants.ts",
  summary: "קבועי locale ושמות חודשים לועזיים/עבריים.",
  notes: ["מתאים לתצוגות UI ולברירות מחדל עקביות."],
  exports: [
    {
      name: "DEFAULT_HEBREW_RENDER_LOCALE",
      kind: "const",
      signature: 'DEFAULT_HEBREW_RENDER_LOCALE = "en"',
      description: "לוקאל ברירת מחדל לרינדור עברי.",
      usage: "formatHebrew(date, { locale: DEFAULT_HEBREW_RENDER_LOCALE });",
      output: 'מחרוזת לוקאל ("en").',
    },
    {
      name: "DEFAULT_GREGORIAN_LOCALE",
      kind: "const",
      signature: 'DEFAULT_GREGORIAN_LOCALE = "en-US"',
      description: "לוקאל ברירת מחדל לשמות ימים לועזיים.",
      usage: "getWeekdayName(date, DEFAULT_GREGORIAN_LOCALE);",
      output: 'מחרוזת לוקאל ("en-US").',
    },
    {
      name: "GREGORIAN_MONTH_NAMES_EN",
      kind: "const",
      signature: "readonly string[12]",
      description: "מערך שמות חודשי לוח לועזי באנגלית.",
      usage: "const monthLabel = GREGORIAN_MONTH_NAMES_EN[3];",
      output: "שם חודש באנגלית.",
    },
    {
      name: "HEBREW_MONTH_NAMES_EN",
      kind: "const",
      signature: "Record<number, string>",
      description: "מיפוי מספר חודש עברי לשם תעתיק אנגלי.",
      usage: "const monthLabel = HEBREW_MONTH_NAMES_EN[7];",
      output: "שם חודש עברי בתעתיק.",
    },
    {
      name: "HEBREW_MONTH_NAMES_HE",
      kind: "const",
      signature: "Record<number, string>",
      description: "מיפוי מספר חודש עברי לשם ידידותי לממשק עברי.",
      usage: "const monthLabel = HEBREW_MONTH_NAMES_HE[7];",
      output: "שם חודש.",
    },
    {
      name: "HEBREW_MONTH_ORDER",
      kind: "const",
      signature: "readonly number[]",
      description: "סדר חודשי לוח עברי לשימוש בניווט/תצוגה.",
      usage: "const firstHebrewMonth = HEBREW_MONTH_ORDER[0];",
      output: "מספר חודש עברי.",
    },
  ],
};
