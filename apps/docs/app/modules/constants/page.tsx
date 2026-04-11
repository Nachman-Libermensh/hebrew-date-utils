import type { FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "DEFAULT_HEBREW_RENDER_LOCALE",
    syntax: "DEFAULT_HEBREW_RENDER_LOCALE",
    signature: 'const DEFAULT_HEBREW_RENDER_LOCALE = "en";',
    summary: "ברירת המחדל לתצוגת תאריך עברי בפונקציות רינדור.",
    params: "ללא.",
    returns: "string.",
    usage: `import { DEFAULT_HEBREW_RENDER_LOCALE } from "hebrew-date-utils";

console.log(DEFAULT_HEBREW_RENDER_LOCALE);`,
  },
  {
    name: "DEFAULT_GREGORIAN_LOCALE",
    syntax: "DEFAULT_GREGORIAN_LOCALE",
    signature: 'const DEFAULT_GREGORIAN_LOCALE = "en-US";',
    summary: "ברירת המחדל ל-locale עבור תצוגה לועזית.",
    params: "ללא.",
    returns: "string.",
    usage: `import { DEFAULT_GREGORIAN_LOCALE } from "hebrew-date-utils";

console.log(DEFAULT_GREGORIAN_LOCALE);`,
  },
  {
    name: "GREGORIAN_MONTH_NAMES_EN",
    syntax: "GREGORIAN_MONTH_NAMES_EN",
    signature: "const GREGORIAN_MONTH_NAMES_EN: readonly string[];",
    summary: "מערך שמות חודשי הלוח הלועזי באנגלית.",
    params: "ללא.",
    returns: "readonly string[].",
    usage: `import { GREGORIAN_MONTH_NAMES_EN } from "hebrew-date-utils";

console.log(GREGORIAN_MONTH_NAMES_EN[0]); // January`,
  },
  {
    name: "GREGORIAN_MONTH_NAMES_HE",
    syntax: "GREGORIAN_MONTH_NAMES_HE",
    signature: "const GREGORIAN_MONTH_NAMES_HE: readonly string[];",
    summary: "מערך שמות חודשי הלוח הלועזי בעברית.",
    params: "ללא.",
    returns: "readonly string[].",
    usage: `import { GREGORIAN_MONTH_NAMES_HE } from "hebrew-date-utils";

console.log(GREGORIAN_MONTH_NAMES_HE[0]); // ינואר`,
  },
  {
    name: "GREG_MONTH_NAMES_EN",
    syntax: "GREG_MONTH_NAMES_EN",
    signature: "const GREG_MONTH_NAMES_EN = GREGORIAN_MONTH_NAMES_EN;",
    summary: "Alias תואם לאחור לשמות חודשים לועזיים באנגלית.",
    params: "ללא.",
    returns: "readonly string[].",
    usage: `import { GREG_MONTH_NAMES_EN } from "hebrew-date-utils";

console.log(GREG_MONTH_NAMES_EN[5]);`,
  },
  {
    name: "GREG_MONTH_NAMES_HE",
    syntax: "GREG_MONTH_NAMES_HE",
    signature: "const GREG_MONTH_NAMES_HE = GREGORIAN_MONTH_NAMES_HE;",
    summary: "Alias תואם לאחור לשמות חודשים לועזיים בעברית.",
    params: "ללא.",
    returns: "readonly string[].",
    usage: `import { GREG_MONTH_NAMES_HE } from "hebrew-date-utils";

console.log(GREG_MONTH_NAMES_HE[5]);`,
  },
  {
    name: "HEBREW_MONTH_NAMES_EN",
    syntax: "HEBREW_MONTH_NAMES_EN",
    signature: "const HEBREW_MONTH_NAMES_EN: Record<number, string>;",
    summary: "מיפוי מספר חודש עברי לשם אנגלי (כולל Adar I/II).",
    params: "ללא.",
    returns: "Record<number, string>.",
    usage: `import { HEBREW_MONTH_NAMES_EN } from "hebrew-date-utils";

console.log(HEBREW_MONTH_NAMES_EN[7]); // Tishrei`,
  },
  {
    name: "HEBREW_MONTH_NAMES_HE",
    syntax: "HEBREW_MONTH_NAMES_HE",
    signature: "const HEBREW_MONTH_NAMES_HE: Record<number, string>;",
    summary: "מיפוי מספר חודש עברי לתצוגת שם ידידותית בעברית/תעתיק.",
    params: "ללא.",
    returns: "Record<number, string>.",
    usage: `import { HEBREW_MONTH_NAMES_HE } from "hebrew-date-utils";

console.log(HEBREW_MONTH_NAMES_HE[7]);`,
  },
  {
    name: "HEBREW_MONTH_ORDER",
    syntax: "HEBREW_MONTH_ORDER",
    signature: "const HEBREW_MONTH_ORDER: readonly number[];",
    summary: "סדר חודשי בסיסי במיפוי החודשים של הספרייה.",
    params: "ללא.",
    returns: "readonly number[].",
    usage: `import { HEBREW_MONTH_ORDER } from "hebrew-date-utils";

console.log(HEBREW_MONTH_ORDER);`,
  },
];

export default function ConstantsModulePage() {
  return (
    <ModuleDocPage
      moduleName="constants"
      description="מודול קבועים גלובליים של הספרייה: שמות חודשים, locale ברירת-מחדל ומיפויי עזר."
      docs={DOCS}
    />
  );
}
