import { type FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "toHDate(input)",
    summary:
      "ממיר כל קלט נתמך לאובייקט HDate אחיד. זהו שער הכניסה המרכזי לכל לוגיקה עברית במודול.",
    params:
      "DualDateInput: יכול להיות Date לועזי, HDate קיים, DualDate, או אובייקט parts { day, month, year }.",
    returns: "HDate עם יום/חודש/שנה עבריים ופונקציות עזר.",
    usage: `import { toHDate } from "hebrew-date-utils";

const heb = toHDate(new Date(2026, 3, 5));
console.log(heb.getFullYear(), heb.getMonth(), heb.getDate());`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי והעבר אותו ל-toHDate",
    },
  },
  {
    name: "toGregorian(input)",
    summary:
      "ממיר כל קלט נתמך לתאריך לועזי Date מנורמל (תאריך בלבד, ללא תלות בשעה).",
    params: "DualDateInput: כולל גם קלט עברי בצורת parts וגם DualDate.",
    returns: "Date לועזי מנורמל ליום המקומי.",
    usage: `import { toGregorian } from "hebrew-date-utils";

const greg = toGregorian({ day: 1, month: "Tishrei", year: 5787 });
console.log(greg.toISOString().slice(0, 10));`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והמר ל-Date לועזי",
    },
  },
  {
    name: "toDualDate(input)",
    summary:
      "יוצר מבנה DualDate שמחזיק יחד את שתי התצוגות: לועזית ועברית, כולל שדות עזר להצגה.",
    params: "DualDateInput מכל סוג נתמך.",
    returns:
      "DualDate הכולל greg, heb, hebDay, hebMonth, hebYear, hebMonthName, hebString, hebDisplay.",
    usage: `import { toDualDate } from "hebrew-date-utils";

const dual = toDualDate(new Date(2026, 3, 5));
console.log(dual.hebYear, dual.hebMonthName, dual.greg);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי להצגת שני הלוחות יחד",
    },
  },
  {
    name: "fromGregorianDate(date)",
    summary: "Alias נוח ל-toDualDate כאשר מקור הקלט הוא Date לועזי בלבד.",
    params: "date: Date לועזי.",
    returns: "DualDate מלא.",
    usage: `import { fromGregorianDate } from "hebrew-date-utils";

const dual = fromGregorianDate(new Date(2026, 0, 1));
console.log(dual.hebDisplay);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך לועזי וראה DualDate",
    },
  },
  {
    name: "fromHebrewDate(day, month, year)",
    summary:
      "יוצר DualDate ישירות מחלקי תאריך עברי. מתאים במיוחד לקלט ידני/טפסים.",
    params:
      "day: מספר יום בחודש, month: שם חודש או מספר חודש עברי, year: שנה עברית.",
    returns: "DualDate עם תצוגה עברית ולועזית.",
    usage: `import { fromHebrewDate } from "hebrew-date-utils";

const dual = fromHebrewDate(1, "Tishrei", 5787);
console.log(dual.greg, dual.hebString);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך עברי והמר ל-DualDate",
    },
  },
  {
    name: "todayDualDate(referenceDate?)",
    summary:
      "מחזיר את היום הנוכחי כ-DualDate, או יום ייחוס שתספק לבדיקה/סימולציה.",
    params: "referenceDate אופציונלי מסוג Date.",
    returns: "DualDate של היום או יום הייחוס.",
    usage: `import { todayDualDate } from "hebrew-date-utils";

const now = todayDualDate();
const simulated = todayDualDate(new Date(2030, 0, 1));
console.log(now.hebYear, simulated.hebYear);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך ייחוס חלופי עבור todayDualDate",
    },
  },
];

export default function ConversionModulePage() {
  return (
    <ModuleDocPage
      moduleName="conversion"
      description="מודול ההמרות הוא הבסיס לכל המעבר בין קלט עברי/לועזי. בכל פונקציה כאן יש הדגמת בורר תאריכים כדי לראות איך קלט אמיתי זורם לפונקציה."
      docs={DOCS}
    />
  );
}
