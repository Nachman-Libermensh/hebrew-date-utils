import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "getHolidaysOn(date, options?)",
    summary:
      'מחזירה רשימת אירועי חג שחלים על יום מסוים. תומכת בישראל/חו"ל ואופציות סינון.',
    params: "date: DualDateInput, options: HolidayQueryOptions אופציונלי.",
    returns: "HolidayInfo[].",
    usage: `import { getHolidaysOn } from "hebrew-date-utils";

const holidays = getHolidaysOn(new Date(2026, 8, 12), { il: true });`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי ובדוק אילו חגים חלים עליו",
    },
  },
  {
    name: "getHolidaysForHebrewYear(year, options?)",
    summary: "מחזירה את כל אירועי החגים עבור שנה עברית מלאה.",
    params: "year: שנה עברית, options אופציונלי.",
    returns: "HolidayInfo[].",
    usage: `import { getHolidaysForHebrewYear } from "hebrew-date-utils";

const list = getHolidaysForHebrewYear(5786, { il: false });`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להפיק שנת חגים מלאה",
    },
  },
  {
    name: "getHolidaysBetween(start, end, options?)",
    summary: "מחזירה אירועי חג בתוך טווח תאריכים כולל.",
    params: "start/end: DualDateInput, options אופציונלי.",
    returns: "HolidayInfo[].",
    usage: `import { getHolidaysBetween } from "hebrew-date-utils";

const list = getHolidaysBetween(
  new Date(2026, 8, 1),
  new Date(2026, 9, 1),
  { il: true }
);`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח עברי לאיתור חגים בטווח",
    },
  },
  {
    name: "isHoliday(date, options?)",
    summary: "בודקת האם יש לפחות חג אחד בתאריך הנתון.",
    params: "date: DualDateInput, options אופציונלי.",
    returns: "boolean.",
    usage: `import { isHoliday } from "hebrew-date-utils";

const yes = isHoliday(new Date(2026, 8, 12), { il: true });`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך ובדוק האם הוא חג",
    },
  },
];

export default function HolidaysModulePage() {
  return (
    <ModuleDocPage
      moduleName="holidays"
      description="מודול החגים מספק שאילתות יום/שנה/טווח ומחזיר מידע מובנה שמוכן להצגה בממשק או לשימוש עסקי."
      docs={DOCS}
    />
  );
}
