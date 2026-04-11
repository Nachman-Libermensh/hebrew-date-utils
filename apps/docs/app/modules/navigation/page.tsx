import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "addGregorianDays(input, amount)",
    summary: "מזיזה תאריך במספר ימים לועזיים ומחזירה DualDate מנורמל.",
    params: "input: DualDateInput, amount: מספר ימים (חיובי/שלילי).",
    returns: "DualDate.",
    usage: `import { addGregorianDays } from "hebrew-date-utils";

const shifted = addGregorianDays(new Date(2026, 3, 10), 10);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי והזז ימים קדימה/אחורה",
    },
  },
  {
    name: "addGregorianMonths(input, amount)",
    summary: "מזיזה תאריך במספר חודשים לועזיים (עם נורמליזציה לימי קצה).",
    params: "input: DualDateInput, amount: מספר חודשים.",
    returns: "DualDate.",
    usage: `import { addGregorianMonths } from "hebrew-date-utils";

const shifted = addGregorianMonths(new Date(2026, 0, 31), 1);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי ובדוק הזזת חודשים",
    },
  },
  {
    name: "addGregorianYears(input, amount)",
    summary: "מזיזה תאריך במספר שנים לועזיות.",
    params: "input: DualDateInput, amount: מספר שנים.",
    returns: "DualDate.",
    usage: `import { addGregorianYears } from "hebrew-date-utils";

const shifted = addGregorianYears(new Date(2026, 3, 10), 2);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להזזת שנים",
    },
  },
  {
    name: "addHebrewDays(input, amount)",
    summary: "מזיזה תאריך במספר ימים לפי הלוח העברי.",
    params: "input: DualDateInput, amount: מספר ימים.",
    returns: "DualDate.",
    usage: `import { addHebrewDays } from "hebrew-date-utils";

const shifted = addHebrewDays(new Date(2026, 3, 10), 10);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להזזת ימים",
    },
  },
  {
    name: "addHebrewMonths(input, amount)",
    summary: "מזיזה תאריך במספר חודשי לוח עברי, כולל טיפול בשנה מעוברת.",
    params: "input: DualDateInput, amount: מספר חודשים.",
    returns: "DualDate.",
    usage: `import { addHebrewMonths } from "hebrew-date-utils";

const shifted = addHebrewMonths(new Date(2026, 3, 10), 2);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להזזת חודשים עבריים",
    },
  },
  {
    name: "addHebrewYears(input, amount)",
    summary:
      "מזיזה תאריך במספר שנים עבריות, כולל התאמות Adar בין שנים מעוברות/רגילות.",
    params: "input: DualDateInput, amount: מספר שנים.",
    returns: "DualDate.",
    usage: `import { addHebrewYears } from "hebrew-date-utils";

const shifted = addHebrewYears(new Date(2026, 3, 10), 1);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להזזת שנים עבריות",
    },
  },
  {
    name: "nextHebrewMonth(input)",
    summary: "מחזירה את היום הראשון של החודש העברי הבא.",
    params: "input: DualDateInput.",
    returns: "DualDate.",
    usage: `import { nextHebrewMonth } from "hebrew-date-utils";

const next = nextHebrewMonth(new Date(2026, 3, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי לקפוץ לראש החודש הבא",
    },
  },
  {
    name: "previousHebrewMonth(input)",
    summary: "מחזירה את היום הראשון של החודש העברי הקודם.",
    params: "input: DualDateInput.",
    returns: "DualDate.",
    usage: `import { previousHebrewMonth } from "hebrew-date-utils";

const prev = previousHebrewMonth(new Date(2026, 3, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי לקפוץ לראש החודש הקודם",
    },
  },
  {
    name: "shiftHebrewMonth(month, year, offset)",
    summary:
      "מזיזה זוג חודש/שנה עבריים במספר חודשי offset ומחזירה חודש+שנה+שם.",
    params: "month: מספר חודש עברי, year: שנה עברית, offset: מספר חודשים.",
    returns: "{ month, year, name }.",
    usage: `import { shiftHebrewMonth } from "hebrew-date-utils";

const shifted = shiftHebrewMonth(7, 5786, 1);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להמחשת הזזת חודש/שנה",
    },
  },
];

export default function NavigationModulePage() {
  return (
    <ModuleDocPage
      moduleName="navigation"
      description="מודול ניווט בזמן: הוספת ימים/חודשים/שנים בלוחות שונים וקפיצה חכמה בין חודשי הלוח העברי."
      docs={DOCS}
    />
  );
}
