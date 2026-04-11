import type { FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "HebrewMonthInput",
    syntax: "HebrewMonthInput",
    signature: "type HebrewMonthInput = number | string;",
    summary: "טיפוס קלט לחודש עברי: מספר חודש או שם חודש.",
    params: "ללא.",
    returns: "Type alias.",
    usage: `import type { HebrewMonthInput } from "hebrew-date-utils";

const monthByName: HebrewMonthInput = "Nisan";
const monthByNumber: HebrewMonthInput = 1;`,
  },
  {
    name: "HebrewDateParts",
    syntax: "HebrewDateParts",
    signature:
      "interface HebrewDateParts { day: number; month: HebrewMonthInput; year: number; }",
    summary: "מבנה חלקי תאריך עברי ידני.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { HebrewDateParts } from "hebrew-date-utils";

const parts: HebrewDateParts = { day: 1, month: "Tishrei", year: 5787 };`,
  },
  {
    name: "DualDate",
    syntax: "DualDate",
    signature:
      "interface DualDate { greg: Date; heb: HDate; hebDay: number; hebMonth: number; hebYear: number; ... }",
    summary: "האובייקט המרכזי שמחזיק ייצוג עברי ולועזי ביחד.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { DualDate } from "hebrew-date-utils";

function renderDual(value: DualDate) {
  return value.hebDisplay + " | " + value.greg.toISOString().slice(0, 10);
}`,
  },
  {
    name: "DualDateInput",
    syntax: "DualDateInput",
    signature:
      "type DualDateInput = Date | HDate | DualDate | HebrewDateParts;",
    summary: "איחוד כל סוגי הקלט שהספרייה יודעת להמיר לתאריך כפול.",
    params: "ללא.",
    returns: "Type alias.",
    usage: `import type { DualDateInput } from "hebrew-date-utils";

const input: DualDateInput = new Date();`,
  },
  {
    name: "DualDateRange",
    syntax: "DualDateRange",
    signature: "interface DualDateRange { start: DualDate; end: DualDate; }",
    summary: "טווח תאריכים כולל עם התחלה וסיום.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { DualDateRange } from "hebrew-date-utils";

function isRangeValid(range: DualDateRange) {
  return range.start.greg <= range.end.greg;
}`,
  },
  {
    name: "MonthSegment",
    syntax: "MonthSegment",
    signature:
      "interface MonthSegment { hebMonth: number; hebYear: number; start: DualDate; end: DualDate; days: number; ... }",
    summary: "מקטע טווח שמייצג חיתוך לפי חודש.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { MonthSegment } from "hebrew-date-utils";

const renderSegment = (segment: MonthSegment) =>
  segment.hebMonthName + " " + segment.hebYear + ": " + segment.days + " ימים";`,
  },
  {
    name: "HebrewMonthInfo",
    syntax: "HebrewMonthInfo",
    signature:
      "interface HebrewMonthInfo { month: number; name: string; daysInMonth: number; firstDay: DualDate; lastDay: DualDate; ... }",
    summary: "מבנה metadata מלא עבור חודש עברי.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { HebrewMonthInfo } from "hebrew-date-utils";

const monthLabel = (info: HebrewMonthInfo) =>
  info.name + " (" + info.daysInMonth + ")";`,
  },
  {
    name: "GregorianMonthInfo",
    syntax: "GregorianMonthInfo",
    signature:
      "interface GregorianMonthInfo { month: number; year: number; name: string; daysInMonth: number; hebrewMonths: Array<...>; ... }",
    summary: "מבנה metadata מלא עבור חודש לועזי.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { GregorianMonthInfo } from "hebrew-date-utils";

const totalHebMonths = (info: GregorianMonthInfo) => info.hebrewMonths.length;`,
  },
  {
    name: "HolidayInfo",
    syntax: "HolidayInfo",
    signature:
      "interface HolidayInfo { id: string; name: string; date: DualDate; categories: string[]; flags: number; ... }",
    summary: "מבנה פריט חג יחיד המוחזר משאילתות holidays.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { HolidayInfo } from "hebrew-date-utils";

const holidayTitle = (holiday: HolidayInfo) => holiday.displayName;`,
  },
  {
    name: "HolidayQueryOptions",
    syntax: "HolidayQueryOptions",
    signature:
      "interface HolidayQueryOptions { il?: boolean; locale?: string; noMinorFast?: boolean; ... }",
    summary: "אופציות סינון ותצוגה לשאילתות חגים.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { HolidayQueryOptions } from "hebrew-date-utils";

const options: HolidayQueryOptions = { il: true, noMinorFast: true };`,
  },
  {
    name: "HebrewYearInfo",
    syntax: "HebrewYearInfo",
    signature:
      "interface HebrewYearInfo { year: number; isLeapYear: boolean; monthsInYear: number; daysInYear: number; ... }",
    summary: "מבנה מידע שנתי עברי לצרכי חישוב ודוחות.",
    params: "ללא.",
    returns: "Interface.",
    usage: `import type { HebrewYearInfo } from "hebrew-date-utils";

const leapLabel = (info: HebrewYearInfo) =>
  info.isLeapYear ? "Leap year" : "Common year";`,
  },
];

export default function TypesModulePage() {
  return (
    <ModuleDocPage
      moduleName="types"
      description="מודול טיפוסים שמגדיר את חוזה הנתונים של הספרייה בשכבת TypeScript."
      docs={DOCS}
    />
  );
}
