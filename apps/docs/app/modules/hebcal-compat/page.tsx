import type { FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "months",
    syntax: "months",
    signature: "const months: { NISAN: 1; ...; ADAR_II: 13 };",
    summary: "מפת מספרי חודשים תואמת API של Hebcal.",
    params: "ללא.",
    returns: "object.",
    usage: `import { months } from "hebrew-date-utils";

console.log(months.TISHREI);`,
  },
  {
    name: "flags",
    syntax: "flags",
    signature: "const flags: { CHAG: number; MINOR_FAST: number; ... };",
    summary: "ביטי סיווג אירועים (חג, צום, ערב חג ועוד).",
    params: "ללא.",
    returns: "object.",
    usage: `import { flags } from "hebrew-date-utils";

console.log(flags.CHAG);`,
  },
  {
    name: "HDate(day, month, year)",
    syntax: "HDate(day, month, year)",
    signature:
      "new HDate(day: number, month: number | string, year: number): HDate;",
    summary: "יוצר מופע HDate מחלקי תאריך עברי.",
    params: "day/month/year של תאריך עברי.",
    returns: "HDate.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate(1, "Tishrei", 5787);
console.log(hd.toString());`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ליצירת HDate",
    },
  },
  {
    name: "HDate.isHDate(value)",
    summary: "בודקת אם ערך נתון הוא מופע HDate.",
    params: "value: unknown.",
    returns: "value is HDate.",
    usage: `import { HDate } from "hebrew-date-utils";

const candidate = new HDate();
console.log(HDate.isHDate(candidate));`,
  },
  {
    name: "HDate.monthNum(month)",
    summary: "מנרמל שם/מספר חודש למספר חודש עברי.",
    params: "month: number | string.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.monthNum("Nisan"));`,
  },
  {
    name: "HDate.monthFromName(month)",
    summary: "Alias ל-normalization של שם חודש.",
    params: "month: string.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.monthFromName("Tishrei"));`,
  },
  {
    name: "HDate.isLeapYear(year)",
    summary: "בודקת אם שנה עברית מעוברת.",
    params: "year: number.",
    returns: "boolean.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.isLeapYear(5784));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי לבדיקת leap year",
    },
  },
  {
    name: "HDate.monthsInYear(year)",
    summary: "מחזירה 12 או 13 חודשים בשנה עברית.",
    params: "year: number.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.monthsInYear(5786));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להפקת חודשים בשנה",
    },
  },
  {
    name: "HDate.daysInMonth(month, year)",
    summary: "מחזירה את מספר הימים בחודש עברי נתון.",
    params: "month: number, year: number.",
    returns: "number.",
    usage: `import { HDate, months } from "hebrew-date-utils";

console.log(HDate.daysInMonth(months.KISLEV, 5786));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להבנת אורך חודש",
    },
  },
  {
    name: "HDate.getMonthName(month, year)",
    summary: "מחזירה שם חודש בהתאם לשנה (כולל טיפול באדר).",
    params: "month: number, year: number.",
    returns: "string.",
    usage: `import { HDate, months } from "hebrew-date-utils";

console.log(HDate.getMonthName(months.ADAR_II, 5784));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת שם חודש",
    },
  },
  {
    name: "HDate.daysInYear(year)",
    summary: "מחזירה מספר ימים בשנה עברית.",
    params: "year: number.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.daysInYear(5786));`,
  },
  {
    name: "HDate.longCheshvan(year)",
    summary: "בודקת אם חודש חשוון ארוך באותה שנה.",
    params: "year: number.",
    returns: "boolean.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.longCheshvan(5786));`,
  },
  {
    name: "HDate.shortKislev(year)",
    summary: "בודקת אם חודש כסלו קצר באותה שנה.",
    params: "year: number.",
    returns: "boolean.",
    usage: `import { HDate } from "hebrew-date-utils";

console.log(HDate.shortKislev(5786));`,
  },
  {
    name: "hdate.greg()",
    syntax: "hdate.greg()",
    signature: "greg(): Date;",
    summary: "מחזירה Date לועזי מהייצוג העברי.",
    params: "ללא.",
    returns: "Date.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate(1, "Tishrei", 5787);
console.log(hd.greg().toISOString().slice(0, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והמר אותו ל-Date",
    },
  },
  {
    name: "hdate.getDate()",
    syntax: "hdate.getDate()",
    signature: "getDate(): number;",
    summary: "מחזירה את היום בחודש העברי.",
    params: "ללא.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.getDate());`,
  },
  {
    name: "hdate.getMonth()",
    syntax: "hdate.getMonth()",
    signature: "getMonth(): number;",
    summary: "מחזירה מספר חודש עברי.",
    params: "ללא.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.getMonth());`,
  },
  {
    name: "hdate.getFullYear()",
    syntax: "hdate.getFullYear()",
    signature: "getFullYear(): number;",
    summary: "מחזירה את השנה העברית המלאה.",
    params: "ללא.",
    returns: "number.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.getFullYear());`,
  },
  {
    name: "hdate.getMonthName()",
    syntax: "hdate.getMonthName()",
    signature: "getMonthName(): string;",
    summary: "מחזירה שם חודש עברי עבור התאריך.",
    params: "ללא.",
    returns: "string.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.getMonthName());`,
  },
  {
    name: "hdate.add(amount, unit)",
    syntax: "hdate.add(amount, unit)",
    signature: 'add(amount: number, unit: "day" | "month" | "year"): HDate;',
    summary: "מזיז את התאריך ביחידות יום/חודש/שנה עבריות.",
    params: "amount: מספר שלם, unit: day|month|year.",
    returns: "HDate.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate(1, "Tishrei", 5787);
const shifted = hd.add(1, "month");
console.log(shifted.toString());`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והזז אותו ביחידות שונות",
    },
  },
  {
    name: "hdate.toString()",
    syntax: "hdate.toString()",
    signature: "toString(): string;",
    summary: "מחזירה תיאור טקסטואלי בסיסי של התאריך העברי.",
    params: "ללא.",
    returns: "string.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.toString());`,
  },
  {
    name: "hdate.render(locale?, showYear?)",
    syntax: "hdate.render(locale?, showYear?)",
    signature: 'render(locale = "en", showYear = true): string;',
    summary: "רינדור לוקלי של תאריך עברי, כולל אפשרות הסתרת שנה.",
    params: "locale?: string, showYear?: boolean.",
    returns: "string.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.render("he", true));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ובדוק רינדור locale",
    },
  },
  {
    name: "hdate.renderGematriya(suppressNikud?, noYear?)",
    syntax: "hdate.renderGematriya(suppressNikud?, noYear?)",
    signature:
      "renderGematriya(_suppressNikud = true, noYear = false): string;",
    summary: "רינדור גימטריה עברית עם אפשרות להסתיר שנה.",
    params: "suppressNikud?: boolean, noYear?: boolean.",
    returns: "string.",
    usage: `import { HDate } from "hebrew-date-utils";

const hd = new HDate();
console.log(hd.renderGematriya(true, false));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת גימטריה",
    },
  },
  {
    name: "event.getDate()",
    syntax: "event.getDate()",
    signature: "getDate(): HDate;",
    summary: "מחזירה את תאריך האירוע כאובייקט HDate.",
    params: "ללא.",
    returns: "HDate.",
    usage: `import { HebrewCalendar, HDate } from "hebrew-date-utils";

const list = HebrewCalendar.getHolidaysOnDate(new HDate());
console.log(list[0]?.getDate().toString());`,
  },
  {
    name: "event.render(locale?)",
    syntax: "event.render(locale?)",
    signature: 'render(_locale = "en"): string;',
    summary: "מחזירה תיאור טקסטואלי של האירוע.",
    params: "locale?: string.",
    returns: "string.",
    usage: `import { HebrewCalendar, HDate } from "hebrew-date-utils";

const list = HebrewCalendar.getHolidaysOnDate(new HDate());
console.log(list[0]?.render("he"));`,
  },
  {
    name: "HebrewCalendar.getBirthdayOrAnniversary(targetHebrewYear, original)",
    summary: "מחשב יום הולדת/יום נישואין עבור שנה עברית יעד.",
    params: "targetHebrewYear: number, original: HDate.",
    returns: "HDate | null.",
    usage: `import { HebrewCalendar, HDate } from "hebrew-date-utils";

const original = new HDate(1, "Tishrei", 5760);
const next = HebrewCalendar.getBirthdayOrAnniversary(5787, original);
console.log(next?.toString());`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי מקורי וחישוב לשנת יעד",
    },
  },
  {
    name: "HebrewCalendar.getYahrzeit(targetHebrewYear, original)",
    summary: "מחשב יארצייט לפי שנת יעד.",
    params: "targetHebrewYear: number, original: HDate.",
    returns: "HDate | null.",
    usage: `import { HebrewCalendar, HDate } from "hebrew-date-utils";

const original = new HDate(10, "Kislev", 5770);
const y = HebrewCalendar.getYahrzeit(5787, original);
console.log(y?.toString());`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והפק יארצייט לשנה אחרת",
    },
  },
  {
    name: "HebrewCalendar.getHolidaysOnDate(date, il?)",
    summary: "מחזירה רשימת אירועים ליום עברי ספציפי.",
    params: "date: HDate, il?: boolean.",
    returns: "Event[].",
    usage: `import { HebrewCalendar, HDate } from "hebrew-date-utils";

const list = HebrewCalendar.getHolidaysOnDate(new HDate(1, "Tishrei", 5787), true);
console.log(list.map((event) => event.render()));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ובדוק אירועי יום",
    },
  },
  {
    name: "HebrewCalendar.getHolidaysForYearArray(year, il?)",
    summary: "מחזירה את כל אירועי השנה העברית כרשימה.",
    params: "year: number, il?: boolean.",
    returns: "Event[].",
    usage: `import { HebrewCalendar } from "hebrew-date-utils";

const list = HebrewCalendar.getHolidaysForYearArray(5787, true);
console.log(list.length);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להפיק ממנו שנת חגים",
    },
  },
  {
    name: "HebrewCalendar.calendar(options)",
    summary: "שאילתת אירועים בטווח תאריכים עם מסננים.",
    params: "options: CalOptions (start, end, il ועוד).",
    returns: "Event[].",
    usage: `import { HebrewCalendar } from "hebrew-date-utils";

const list = HebrewCalendar.calendar({
  il: true,
  start: new Date(2026, 8, 1),
  end: new Date(2026, 9, 30),
});
console.log(list.length);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח תאריכים לבניית calendar query",
    },
  },
];

export default function HebcalCompatModulePage() {
  return (
    <ModuleDocPage
      moduleName="hebcal-compat"
      description="שכבת תאימות ל-API של Hebcal, ממומשת מעל jewish-date/jewish-holidays עם רישוי MIT."
      docs={DOCS}
    />
  );
}
