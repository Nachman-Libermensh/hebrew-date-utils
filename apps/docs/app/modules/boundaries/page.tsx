import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "getGregorianMonthFirstDay(year, month)",
    summary: "מחזירה את היום הראשון בחודש לועזי כ-DualDate.",
    params: "year: שנה לועזית, month: מספר חודש לועזי (0..11).",
    returns: "DualDate.",
    usage: `import { getGregorianMonthFirstDay } from "hebrew-date-utils";

const first = getGregorianMonthFirstDay(2026, 3);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי לזיהוי תחילת החודש",
    },
  },
  {
    name: "getGregorianMonthLastDay(year, month)",
    summary: "מחזירה את היום האחרון בחודש לועזי כ-DualDate.",
    params: "year: שנה לועזית, month: מספר חודש לועזי (0..11).",
    returns: "DualDate.",
    usage: `import { getGregorianMonthLastDay } from "hebrew-date-utils";

const last = getGregorianMonthLastDay(2026, 3);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי לזיהוי סוף החודש",
    },
  },
  {
    name: "getGregorianMonthBoundaries(year, month)",
    summary: "מחזירה אובייקט טווח עם start/end לחודש לועזי.",
    params: "year: שנה לועזית, month: מספר חודש לועזי (0..11).",
    returns: "DualDateRange עם start ו-end.",
    usage: `import { getGregorianMonthBoundaries } from "hebrew-date-utils";

const boundaries = getGregorianMonthBoundaries(2026, 3);
console.log(boundaries.start, boundaries.end);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח לועזי להשוואה מול גבולות חודש",
    },
  },
  {
    name: "getHebrewMonthFirstDay(year, month)",
    summary: "מחזירה את היום הראשון בחודש עברי כ-DualDate.",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "DualDate.",
    usage: `import { getHebrewMonthFirstDay } from "hebrew-date-utils";

const first = getHebrewMonthFirstDay(5786, "Nisan");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי לזיהוי תחילת החודש העברי",
    },
  },
  {
    name: "getHebrewMonthLastDay(year, month)",
    summary: "מחזירה את היום האחרון בחודש עברי כ-DualDate.",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "DualDate.",
    usage: `import { getHebrewMonthLastDay } from "hebrew-date-utils";

const last = getHebrewMonthLastDay(5786, "Nisan");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי לזיהוי סוף החודש העברי",
    },
  },
  {
    name: "getHebrewMonthBoundaries(year, month)",
    summary: "מחזירה start/end לחודש עברי נתון.",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "DualDateRange.",
    usage: `import { getHebrewMonthBoundaries } from "hebrew-date-utils";

const boundaries = getHebrewMonthBoundaries(5786, "Nisan");`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח עברי ובדוק התאמה לגבולות חודש",
    },
  },
];

export default function BoundariesModulePage() {
  return (
    <ModuleDocPage
      moduleName="boundaries"
      description="מודול גבולות תקופה (תחילת/סוף חודש) בלוח לועזי ובעברי עם פלט אחיד."
      docs={DOCS}
    />
  );
}
