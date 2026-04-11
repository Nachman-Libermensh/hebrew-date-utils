import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "normalizeHebrewMonth(month)",
    summary:
      "מנרמל קלט חודש עברי (שם או מספר) למספר חודש פנימי שהספריה עובדת איתו.",
    params: "month: HebrewMonthInput (מספר או מחרוזת כמו 'Nisan' / 'Tishrei').",
    returns: "number של חודש עברי מנורמל.",
    usage: `import { normalizeHebrewMonth } from "hebrew-date-utils";

const nisan = normalizeHebrewMonth("Nisan");
const tishrei = normalizeHebrewMonth("Tishrei");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להבין חודשי קלט לפונקציה",
    },
  },
  {
    name: "isHebrewLeapYear(year)",
    summary: "בודקת האם שנה עברית היא מעוברת (13 חודשים).",
    params: "year: שנה עברית (למשל 5784).",
    returns: "boolean.",
    usage: `import { isHebrewLeapYear } from "hebrew-date-utils";

console.log(isHebrewLeapYear(5784)); // true
console.log(isHebrewLeapYear(5785)); // false`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי וקח ממנו שנת יעד לבדיקה",
    },
  },
  {
    name: "getMonthsInHebrewYear(year)",
    summary: "מחזירה את מספר החודשים בשנה עברית נתונה (12 או 13).",
    params: "year: שנה עברית.",
    returns: "number (12 | 13).",
    usage: `import { getMonthsInHebrewYear } from "hebrew-date-utils";

const monthsCount = getMonthsInHebrewYear(5784);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להפיק שנת בדיקה",
    },
  },
  {
    name: "getDaysInGregorianMonth(year, month)",
    summary: "מחזירה כמה ימים יש בחודש לועזי מסוים (חודש zero-based).",
    params: "year: שנה לועזית, month: מספר חודש 0..11.",
    returns: "number של ימים בחודש.",
    usage: `import { getDaysInGregorianMonth } from "hebrew-date-utils";

const febLeap = getDaysInGregorianMonth(2024, 1); // 29
const febRegular = getDaysInGregorianMonth(2025, 1); // 28`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי ולבדיקת מספר הימים בחודש שלו",
    },
  },
  {
    name: "getDaysInHebrewMonth(year, month)",
    summary: "מחזירה מספר ימים בחודש עברי נתון בשנה נתונה.",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "number של ימים בחודש העברי.",
    usage: `import { getDaysInHebrewMonth } from "hebrew-date-utils";

const tishreiDays = getDaysInHebrewMonth(5785, "Tishrei");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ובדוק את אורך החודש שלו",
    },
  },
  {
    name: "getHebrewMonthName(month, year)",
    summary:
      "מחזירה שם חודש עברי בתעתיק אנגלי בהתאם לשנה (עם טיפול בשנים מעוברות).",
    params: "month: HebrewMonthInput, year: שנה עברית.",
    returns: "string שם חודש.",
    usage: `import { getHebrewMonthName } from "hebrew-date-utils";

const monthName = getHebrewMonthName(7, 5785);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת שם חודש",
    },
  },
  {
    name: "getHebrewMonthNameHe(month, year)",
    summary: "מחזירה את שם החודש בתצוגת Hebrew-friendly (מותאם ממשק עברי).",
    params: "month: HebrewMonthInput, year: שנה עברית.",
    returns: "string.",
    usage: `import { getHebrewMonthNameHe } from "hebrew-date-utils";

const monthNameHe = getHebrewMonthNameHe("Tishrei", 5785);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי לתצוגת שם חודש בעברית",
    },
  },
  {
    name: "getHebrewMonthNameEn(month, year)",
    summary: "מחזירה את שם החודש בתעתיק אנגלי ידידותי.",
    params: "month: HebrewMonthInput, year: שנה עברית.",
    returns: "string.",
    usage: `import { getHebrewMonthNameEn } from "hebrew-date-utils";

const monthNameEn = getHebrewMonthNameEn("Tishrei", 5785);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי לתצוגת שם חודש באנגלית",
    },
  },
  {
    name: "getHebrewYearMonths(year)",
    summary:
      "מחזירה רשימת כל חודשי השנה העברית עם מספר חודש, שם ומספר ימים לכל חודש.",
    params: "year: שנה עברית.",
    returns: "Array<{ month, name, days }>.",
    usage: `import { getHebrewYearMonths } from "hebrew-date-utils";

const months = getHebrewYearMonths(5785);
console.log(months[0], months[months.length - 1]);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי לבחור שנת יעד לרשימת חודשים",
    },
  },
];

export default function MonthUtilsModulePage() {
  return (
    <ModuleDocPage
      moduleName="month-utils"
      description="מודול כלי חודשי הלוח. כאן מתבצעות כל פעולות אורך חודש, שמות חודשים וניהול שנה מעוברת."
      docs={DOCS}
    />
  );
}
