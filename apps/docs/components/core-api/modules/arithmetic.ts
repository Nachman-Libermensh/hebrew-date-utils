import type { ApiModuleDoc } from "../catalog-types";

export const arithmeticModule: ApiModuleDoc = {
  slug: "arithmetic",
  title: "arithmetic.ts",
  sourcePath: "packages/hebrew-date-utils/src/arithmetic.ts",
  summary: "חישובי פערים וגילאים בין תאריכים, כולל Birthday/Yahrzeit.",
  notes: [
    "הפרשים Gregorian מבוססים date-fns.",
    "הפרשי Hebrew months/years מבוססים סדר חודשים עברי אמיתי.",
  ],
  exports: [
    {
      name: "differenceInDualDays",
      kind: "function",
      signature:
        "differenceInDualDays(left: DualDateInput, right: DualDateInput): number",
      description: "הפרש ימים (חתום) לפי לוח לועזי.",
      usage:
        "differenceInDualDays(new Date(2026, 3, 10), new Date(2026, 3, 1));",
      output: "מספר ימים (לדוגמה 9).",
    },
    {
      name: "differenceInDualMonths",
      kind: "function",
      signature:
        "differenceInDualMonths(left: DualDateInput, right: DualDateInput): number",
      description: "הפרש חודשי לוח לועזי (חתום).",
      usage:
        "differenceInDualMonths(new Date(2026, 9, 1), new Date(2026, 0, 1));",
      output: "מספר חודשים (לדוגמה 9).",
    },
    {
      name: "differenceInDualYears",
      kind: "function",
      signature:
        "differenceInDualYears(left: DualDateInput, right: DualDateInput): number",
      description: "הפרש שנות לוח לועזי (חתום).",
      usage:
        "differenceInDualYears(new Date(2028, 0, 1), new Date(2026, 0, 1));",
      output: "מספר שנים.",
    },
    {
      name: "differenceInHebrewMonths",
      kind: "function",
      signature:
        "differenceInHebrewMonths(left: DualDateInput, right: DualDateInput): number",
      description: "הפרש חודשי לוח עברי (חתום).",
      usage:
        'differenceInHebrewMonths({ day: 1, month: "Kislev", year: 5787 }, { day: 1, month: "Tishrei", year: 5787 });',
      output: "מספר חודשים בלוח העברי.",
    },
    {
      name: "differenceInHebrewYears",
      kind: "function",
      signature:
        "differenceInHebrewYears(left: DualDateInput, right: DualDateInput): number",
      description: "הפרש שנות לוח עברי (חתום).",
      usage:
        'differenceInHebrewYears({ day: 1, month: "Tishrei", year: 5789 }, { day: 1, month: "Tishrei", year: 5786 });',
      output: "מספר שנים.",
    },
    {
      name: "getBirthdayInHebrewYear",
      kind: "function",
      signature:
        "getBirthdayInHebrewYear(originalDate: DualDateInput, targetHebrewYear: number): DualDate | null",
      description: "מחשב יום הולדת/יום נישואין בשנה עברית יעד.",
      usage: "getBirthdayInHebrewYear(new Date(1992, 2, 15), 5790);",
      output: "DualDate או null אם אין מיפוי תקין.",
    },
    {
      name: "getYahrzeitInHebrewYear",
      kind: "function",
      signature:
        "getYahrzeitInHebrewYear(dateOfDeath: DualDateInput, targetHebrewYear: number): DualDate | null",
      description: "מחשב יארצייט בשנה עברית יעד.",
      usage: "getYahrzeitInHebrewYear(new Date(2010, 6, 1), 5790);",
      output: "DualDate או null.",
    },
    {
      name: "getGregorianAge",
      kind: "function",
      signature: "getGregorianAge(birthDate: Date, atDate?: Date): number",
      description: "גיל לפי לוח לועזי בתאריך נתון.",
      usage: "getGregorianAge(new Date(2000, 0, 1), new Date(2026, 0, 2));",
      output: "מספר שלם לא שלילי.",
    },
    {
      name: "getHebrewAge",
      kind: "function",
      signature:
        "getHebrewAge(originalDate: DualDateInput, atDate?: DualDateInput): number",
      description: "גיל לפי לוח עברי עם לוגיקת יום הולדת עברי.",
      usage: "getHebrewAge(new Date(2000, 0, 1), new Date(2026, 9, 10));",
      output: "מספר שלם לא שלילי.",
    },
  ],
};
