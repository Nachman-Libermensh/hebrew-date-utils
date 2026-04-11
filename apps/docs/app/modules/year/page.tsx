import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "getCurrentDualDate(referenceDate?)",
    summary: "מחזירה את התאריך הנוכחי כ-DualDate, או תאריך ייחוס נתון.",
    params: "referenceDate: Date אופציונלי.",
    returns: "DualDate.",
    usage: `import { getCurrentDualDate } from "hebrew-date-utils";

const current = getCurrentDualDate();
const simulated = getCurrentDualDate(new Date(2030, 0, 1));`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך ייחוס לקבלת DualDate",
    },
  },
  {
    name: "getCurrentHebrewYear(referenceDate?)",
    summary: "מחזירה שנה עברית עבור תאריך ייחוס (או היום).",
    params: "referenceDate: Date אופציונלי.",
    returns: "number.",
    usage: `import { getCurrentHebrewYear } from "hebrew-date-utils";

const y = getCurrentHebrewYear();
const y2 = getCurrentHebrewYear(new Date(2030, 0, 1));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי להפקת השנה שלו",
    },
  },
  {
    name: "getHebrewYearInfo(year)",
    summary:
      "מחזירה מידע שנתי מלא: leap year, מספר חודשים, מספר ימים, גבולות שנה ועוד.",
    params: "year: שנה עברית.",
    returns: "HebrewYearInfo.",
    usage: `import { getHebrewYearInfo } from "hebrew-date-utils";

const info = getHebrewYearInfo(5786);
console.log(info.monthsInYear, info.daysInYear);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי להפיק שנת מידע",
    },
  },
  {
    name: "getHebrewYearForGregorianYear(gregorianYear)",
    summary: "מחזירה את השנה העברית שמכילה את 1 בינואר של השנה הלועזית הנתונה.",
    params: "gregorianYear: number.",
    returns: "number.",
    usage: `import { getHebrewYearForGregorianYear } from "hebrew-date-utils";

const hebYear = getHebrewYearForGregorianYear(2026);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להמחשת year mapping",
    },
  },
];

export default function YearModulePage() {
  return (
    <ModuleDocPage
      moduleName="year"
      description="מודול ברמת שנה: מידע שנתי, גבולות שנה עברית ומיפוי בין שנים לועזיות לעבריות."
      docs={DOCS}
    />
  );
}
