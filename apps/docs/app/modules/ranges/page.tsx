import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "makeDualDateRange(start, end)",
    summary:
      "בונה טווח כולל start/end בסדר כרונולוגי, גם אם הקלטים ניתנו הפוך.",
    params: "start, end: DualDateInput.",
    returns: "DualDateRange עם start <= end.",
    usage: `import { makeDualDateRange } from "hebrew-date-utils";

const range = makeDualDateRange(new Date(2026, 0, 5), new Date(2026, 0, 1));`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח לועזי לבניית DualDateRange",
    },
  },
  {
    name: "listDualDatesInRange(start, end)",
    summary: "מחזירה רשימת כל הימים בטווח כולל, כאשר כל יום מיוצג כ-DualDate.",
    params: "start, end: DualDateInput.",
    returns: "DualDate[] לכל יום בטווח.",
    usage: `import { listDualDatesInRange } from "hebrew-date-utils";

const days = listDualDatesInRange(new Date(2026, 0, 1), new Date(2026, 0, 3));`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח לועזי להצגת כל הימים בטווח",
    },
  },
  {
    name: "listDaysInGregorianMonth(year, month)",
    summary: "מחזירה את כל ימי החודש הלועזי הנתון כ-DualDate[].",
    params: "year: שנה לועזית, month: חודש לועזי 0..11.",
    returns: "DualDate[].",
    usage: `import { listDaysInGregorianMonth } from "hebrew-date-utils";

const days = listDaysInGregorianMonth(2026, 1);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי כדי לבחור את החודש שלו",
    },
  },
  {
    name: "listDaysInHebrewMonth(year, month)",
    summary: "מחזירה את כל ימי החודש העברי הנתון כ-DualDate[].",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "DualDate[].",
    usage: `import { listDaysInHebrewMonth } from "hebrew-date-utils";

const days = listDaysInHebrewMonth(5786, "Iyyar");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי לבחור את החודש שלו",
    },
  },
  {
    name: "splitRangeByHebrewMonth(start, end)",
    summary:
      "מפצל טווח כולל לסגמנטים רציפים לפי חודשי הלוח העברי (MonthSegment[]).",
    params: "start, end: DualDateInput.",
    returns: "MonthSegment[].",
    usage: `import { splitRangeByHebrewMonth } from "hebrew-date-utils";

const segments = splitRangeByHebrewMonth(
  new Date(2026, 8, 1),
  new Date(2026, 9, 15)
);`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח עברי לפיצול לפי חודשי לוח עברי",
    },
  },
  {
    name: "splitRangeByGregorianMonth(start, end)",
    summary: "מפצל טווח לסגמנטים לפי חודשים לועזיים רציפים.",
    params: "start, end: DualDateInput.",
    returns: "DualDateRange[].",
    usage: `import { splitRangeByGregorianMonth } from "hebrew-date-utils";

const segments = splitRangeByGregorianMonth(
  new Date(2026, 8, 1),
  new Date(2026, 10, 15)
);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח לועזי לפיצול לפי חודשים לועזיים",
    },
  },
  {
    name: "getHebrewMonthRange(year, month)",
    summary: "Alias נוח לקבלת טווח מלא של חודש עברי (start/end).",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "DualDateRange.",
    usage: `import { getHebrewMonthRange } from "hebrew-date-utils";

const range = getHebrewMonthRange(5786, "Sivan");`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להדגים טווח חודש",
    },
  },
];

export default function RangesModulePage() {
  return (
    <ModuleDocPage
      moduleName="ranges"
      description="מודול טווחים ואיטרציה יומית. כאן מנהלים טווחים, פיצול לפי חודשים, ורשימות ימים מוכנות לעבודה."
      docs={DOCS}
    />
  );
}
