import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "getHebrewMonthInfo(year, month)",
    summary:
      "מחזירה תמונת מצב מלאה על חודש עברי: שם, אורך החודש, גבולות ונתוני שנה מעוברת.",
    params: "year: שנה עברית, month: HebrewMonthInput.",
    returns: "HebrewMonthInfo.",
    usage: `import { getHebrewMonthInfo } from "hebrew-date-utils";

const info = getHebrewMonthInfo(5786, "Tishrei");
console.log(info.daysInMonth, info.firstDay, info.lastDay);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי כדי לחלץ מידע על החודש שלו",
    },
  },
  {
    name: "getGregorianMonthInfo(year, month)",
    summary: "מחזירה מידע מפורט לחודש לועזי כולל החודשים העבריים הנכללים בו.",
    params: "year: שנה לועזית, month: חודש לועזי (0..11).",
    returns: "GregorianMonthInfo.",
    usage: `import { getGregorianMonthInfo } from "hebrew-date-utils";

const info = getGregorianMonthInfo(2026, 8);
console.log(info.hebrewMonths);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי כדי לחלץ מידע על החודש שלו",
    },
  },
];

export default function InfoModulePage() {
  return (
    <ModuleDocPage
      moduleName="info"
      description='מודול metadata שמספק מידע עשיר על חודשים עבריים ולועזיים לצרכי UI, דו"חות, ופיצולי תקופה.'
      docs={DOCS}
    />
  );
}
