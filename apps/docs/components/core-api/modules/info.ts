import type { ApiModuleDoc } from "../catalog-types";

export const infoModule: ApiModuleDoc = {
  slug: "info",
  title: "info.ts",
  sourcePath: "packages/hebrew-date-utils/src/info.ts",
  summary: "Metadata עשיר עבור חודש עברי או לועזי.",
  notes: [
    "getGregorianMonthInfo כולל גם אילו חודשים עבריים נוגעים בחודש הלועזי.",
  ],
  exports: [
    {
      name: "getHebrewMonthInfo",
      kind: "function",
      signature:
        "getHebrewMonthInfo(year: number, month: HebrewMonthInput): HebrewMonthInfo",
      description: "מידע מלא על חודש עברי: גבולות, שם, ימים ודגל שנה מעוברת.",
      usage: 'getHebrewMonthInfo(5787, "Tishrei");',
      output: "HebrewMonthInfo.",
    },
    {
      name: "getGregorianMonthInfo",
      kind: "function",
      signature: "getGregorianMonthInfo(year: number, month: number): GregorianMonthInfo",
      description: "מידע מלא על חודש לועזי + החודשים העבריים הנכללים בו.",
      usage: "getGregorianMonthInfo(2026, 8);",
      output: "GregorianMonthInfo.",
    },
  ],
};
