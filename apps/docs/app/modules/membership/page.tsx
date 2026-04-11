import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "isDateInHebrewMonth(input, month, year)",
    summary: "בודקת אם תאריך שייך לחודש עברי ושנה עברית מסוימים.",
    params: "input: DualDateInput, month: HebrewMonthInput, year: שנה עברית.",
    returns: "boolean.",
    usage: `import { isDateInHebrewMonth } from "hebrew-date-utils";

const ok = isDateInHebrewMonth(new Date(2026, 3, 10), "Nisan", 5786);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והשווה מול חודש/שנה יעד",
    },
  },
  {
    name: "isDateInGregorianMonth(input, month, year)",
    summary: "בודקת אם תאריך נמצא בחודש לועזי ושנה לועזית נתונים.",
    params: "input: DualDateInput, month: 0..11, year: שנה לועזית.",
    returns: "boolean.",
    usage: `import { isDateInGregorianMonth } from "hebrew-date-utils";

const ok = isDateInGregorianMonth(new Date(2026, 3, 10), 3, 2026);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי ובדוק שייכות חודשית",
    },
  },
  {
    name: "isSameHebrewDate(a, b)",
    summary: "בודקת שוויון עברי מלא (יום+חודש+שנה עברית) בין שני קלטים.",
    params: "a, b: DualDateInput.",
    returns: "boolean.",
    usage: `import { isSameHebrewDate } from "hebrew-date-utils";

const same = isSameHebrewDate(new Date(2026, 3, 10), new Date(2026, 3, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח כדי להשוות בין שני תאריכים בעברית",
    },
  },
  {
    name: "isSameGregorianDate(a, b)",
    summary: "בודקת אם שני קלטים מייצגים את אותו יום לועזי.",
    params: "a, b: DualDateInput.",
    returns: "boolean.",
    usage: `import { isSameGregorianDate } from "hebrew-date-utils";

const same = isSameGregorianDate(new Date(2026, 3, 10), new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר שני תאריכים להשוואת יום לועזי",
    },
  },
  {
    name: "compareDualDates(a, b)",
    summary: "מחזירה הפרש ימים חתום בין a לבין b (לפי לוח לועזי).",
    params: "a, b: DualDateInput.",
    returns: "number (חיובי/שלילי/0).",
    usage: `import { compareDualDates } from "hebrew-date-utils";

const diff = compareDualDates(new Date(2026, 3, 11), new Date(2026, 3, 10));`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר שני תאריכים להצגת הפרש ימים",
    },
  },
  {
    name: "isWithinDualDateRange(input, range)",
    summary: "בודקת אם תאריך נתון נופל בתוך טווח כולל (inclusive).",
    params: "input: DualDateInput, range: DualDateRange.",
    returns: "boolean.",
    usage: `import { isWithinDualDateRange, makeDualDateRange } from "hebrew-date-utils";

const range = makeDualDateRange(new Date(2026, 3, 1), new Date(2026, 3, 30));
const inside = isWithinDualDateRange(new Date(2026, 3, 10), range);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח ויום בדיקה כדי לאמת membership",
    },
  },
];

export default function MembershipModulePage() {
  return (
    <ModuleDocPage
      moduleName="membership"
      description="מודול הבדיקות הבוליאניות: שייכות, השוואה, וטווחים. מתאים לסינון, הדגשה, ואימות תנאי תצוגה."
      docs={DOCS}
    />
  );
}
