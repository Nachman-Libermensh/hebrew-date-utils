import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "formatGregorian(input, pattern?)",
    summary: "פורמט לועזי לפי date-fns pattern.",
    params: "input: DualDateInput, pattern אופציונלי (ברירת מחדל yyyy-MM-dd).",
    returns: "string.",
    usage: `import { formatGregorian } from "hebrew-date-utils";

const s = formatGregorian(new Date(2026, 3, 10), "dd/MM/yyyy");`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי והצג פורמט מותאם",
    },
  },
  {
    name: "formatHebrew(input, options?)",
    summary: "פורמט עברי עם אפשרויות locale/showYear/gematriya/suppressNikud.",
    params: "input: DualDateInput, options מסוג HebrewFormatOptions.",
    returns: "string.",
    usage: `import { formatHebrew } from "hebrew-date-utils";

const s1 = formatHebrew(new Date(2026, 3, 10), { locale: "he" });
const s2 = formatHebrew(new Date(2026, 3, 10), { gematriya: true });`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ובדוק פורמטים שונים",
    },
  },
  {
    name: "formatDualDate(input, gregorianPattern?)",
    summary: "פורמט משולב: תאריך לועזי + תיאור עברי באותה מחרוזת.",
    params: "input: DualDateInput, gregorianPattern אופציונלי.",
    returns: "string בפורמט 'greg | heb'.",
    usage: `import { formatDualDate } from "hebrew-date-utils";

const s = formatDualDate(new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך והצג ייצוג משולב",
    },
  },
  {
    name: "formatHebrewDate(input)",
    summary: "קיצור דרך לפורמט עברי בגימטריה.",
    params: "input: DualDateInput.",
    returns: "string.",
    usage: `import { formatHebrewDate } from "hebrew-date-utils";

const s = formatHebrewDate(new Date(2026, 3, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת פורמט גימטריה",
    },
  },
  {
    name: "hebrewYearGematriya(year)",
    summary: 'מחזירה שנה עברית בכתיב גימטריה (למשל התשפ"ו).',
    params: "year: שנה עברית.",
    returns: "string.",
    usage: `import { hebrewYearGematriya } from "hebrew-date-utils";

const y = hebrewYearGematriya(5786);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והפק גימטריה של השנה",
    },
  },
  {
    name: "hebrewDayGematriya(input)",
    summary: "מחזירה רק את היום בחודש בגימטריה.",
    params: "input: DualDateInput.",
    returns: "string.",
    usage: `import { hebrewDayGematriya } from "hebrew-date-utils";

const d = hebrewDayGematriya(new Date(2026, 3, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת יום בגימטריה",
    },
  },
  {
    name: "hebrewMonthGematriya(input)",
    summary:
      "מחזירה שם חודש עברי בגימטריה. מקבלת DualDate או מחרוזת חודש באנגלית.",
    params: "input: DualDate | string.",
    returns: "string.",
    usage: `import { hebrewMonthGematriya } from "hebrew-date-utils";

const m1 = hebrewMonthGematriya("Nisan");
const m2 = hebrewMonthGematriya("ADAR_II");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להצגת שם חודש בגימטריה",
    },
  },
  {
    name: "gregorianMonthNameHe(month)",
    summary: "מחזירה שם חודש לועזי בעברית לפי אינדקס חודש (0..11).",
    params: "month: מספר חודש לועזי.",
    returns: "string.",
    usage: `import { gregorianMonthNameHe } from "hebrew-date-utils";

const name = gregorianMonthNameHe(3);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להצגת שם החודש בעברית",
    },
  },
  {
    name: "gregorianMonthNameEn(month)",
    summary: "מחזירה שם חודש לועזי באנגלית לפי אינדקס חודש.",
    params: "month: מספר חודש לועזי.",
    returns: "string.",
    usage: `import { gregorianMonthNameEn } from "hebrew-date-utils";

const name = gregorianMonthNameEn(3);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להצגת שם החודש באנגלית",
    },
  },
  {
    name: "hebrewDayOfWeek(input)",
    summary: "מחזירה שם יום בשבוע בעברית (ראשון..שבת).",
    params: "input: DualDateInput.",
    returns: "string.",
    usage: `import { hebrewDayOfWeek } from "hebrew-date-utils";

const day = hebrewDayOfWeek(new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לבדיקת יום בשבוע בעברית",
    },
  },
  {
    name: "hebrewDayOfWeekFull(input)",
    summary: "מחזירה שם יום מלא (למשל 'יום שני', ובשבת 'שבת').",
    params: "input: DualDateInput.",
    returns: "string.",
    usage: `import { hebrewDayOfWeekFull } from "hebrew-date-utils";

const day = hebrewDayOfWeekFull(new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך להצגת שם יום מלא",
    },
  },
  {
    name: "isShabbat(input)",
    summary: "בודקת האם התאריך חל בשבת.",
    params: "input: DualDateInput.",
    returns: "boolean.",
    usage: `import { isShabbat } from "hebrew-date-utils";

const isSat = isShabbat(new Date(2026, 3, 11));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך ובדוק האם שבת",
    },
  },
  {
    name: "isErevShabbat(input)",
    summary: "בודקת האם התאריך חל ביום שישי.",
    params: "input: DualDateInput.",
    returns: "boolean.",
    usage: `import { isErevShabbat } from "hebrew-date-utils";

const isFri = isErevShabbat(new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך ובדוק האם ערב שבת",
    },
  },
  {
    name: "getWeekdayName(input, locale?, style?)",
    summary:
      "מחזירה שם יום מקומי (Intl) לפי locale וסגנון weekday (long/short/narrow).",
    params:
      "input: DualDateInput, locale אופציונלי (ברירת מחדל en-US), style אופציונלי.",
    returns: "string.",
    usage: `import { getWeekdayName } from "hebrew-date-utils";

const en = getWeekdayName(new Date(2026, 3, 10), "en-US", "long");
const he = getWeekdayName(new Date(2026, 3, 10), "he-IL", "short");`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לבדיקת Intl weekday locale",
    },
  },
  {
    name: "toIsoDate(input)",
    summary: "מחזירה תאריך בפורמט ISO-like של yyyy-MM-dd (ללא שעה).",
    params: "input: DualDateInput.",
    returns: "string.",
    usage: `import { toIsoDate } from "hebrew-date-utils";

const iso = toIsoDate(new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להצגת ISO מקומי",
    },
  },
];

export default function FormattingModulePage() {
  return (
    <ModuleDocPage
      moduleName="formatting"
      description="מודול עיצוב תאריכים להצגה בממשק: פורמט עברי/לועזי, גימטריה, שמות חודשים וימי שבוע."
      docs={DOCS}
    />
  );
}
