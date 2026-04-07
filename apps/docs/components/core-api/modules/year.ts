import type { ApiModuleDoc } from "../catalog-types";

export const yearModule: ApiModuleDoc = {
  slug: "year",
  title: "year.ts",
  sourcePath: "packages/hebrew-date-utils/src/year.ts",
  summary: "פונקציות מידע ברמת שנה עברית ותאריך נוכחי.",
  notes: ["getHebrewYearInfo מחזיר גם longCheshvan/shortKislev."],
  exports: [
    {
      name: "getCurrentDualDate",
      kind: "function",
      signature: "getCurrentDualDate(referenceDate?: Date): DualDate",
      description: "התאריך הנוכחי (או תאריך ייחוס) בתצורת DualDate.",
      usage: "getCurrentDualDate();",
      output: "DualDate.",
    },
    {
      name: "getCurrentHebrewYear",
      kind: "function",
      signature: "getCurrentHebrewYear(referenceDate?: Date): number",
      description: "השנה העברית לפי תאריך ייחוס לועזי.",
      usage: "getCurrentHebrewYear(new Date(2026, 0, 1));",
      output: "number.",
    },
    {
      name: "getHebrewYearInfo",
      kind: "function",
      signature: "getHebrewYearInfo(year: number): HebrewYearInfo",
      description: "מידע מלא על שנה עברית, כולל גבולות ואריכות חודשים.",
      usage: "getHebrewYearInfo(5787);",
      output: "HebrewYearInfo.",
    },
    {
      name: "getHebrewYearForGregorianYear",
      kind: "function",
      signature: "getHebrewYearForGregorianYear(gregorianYear: number): number",
      description: "השנה העברית שמכילה את 1 בינואר של שנה לועזית.",
      usage: "getHebrewYearForGregorianYear(2026);",
      output: "number.",
    },
  ],
};
