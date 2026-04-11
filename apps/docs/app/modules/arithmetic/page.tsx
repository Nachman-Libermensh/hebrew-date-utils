import type { FunctionDocCardModel } from "@/components/modules/function-doc-card";
import { ModuleDocPage } from "@/components/modules/module-doc-page";

const DOCS: FunctionDocCardModel[] = [
  {
    name: "differenceInDualDays(left, right)",
    summary: "מחזירה הפרש ימים חתום בין שני תאריכים מנורמלים.",
    params: "left/right: DualDateInput.",
    returns: "number.",
    usage: `import { differenceInDualDays } from "hebrew-date-utils";

const diff = differenceInDualDays(new Date(2026, 3, 12), new Date(2026, 3, 10));
console.log(diff); // 2`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר שני תאריכים להשוואת הפרש ימים",
    },
  },
  {
    name: "differenceInDualMonths(left, right)",
    summary: "מחזירה הפרש חודשים לועזיים חתום בין שני קלטים.",
    params: "left/right: DualDateInput.",
    returns: "number.",
    usage: `import { differenceInDualMonths } from "hebrew-date-utils";

const diff = differenceInDualMonths(new Date(2026, 8, 1), new Date(2026, 3, 1));
console.log(diff);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר טווח להשוואת חודשים",
    },
  },
  {
    name: "differenceInDualYears(left, right)",
    summary: "מחזירה הפרש שנים לועזיות חתום.",
    params: "left/right: DualDateInput.",
    returns: "number.",
    usage: `import { differenceInDualYears } from "hebrew-date-utils";

const diff = differenceInDualYears(new Date(2030, 0, 1), new Date(2026, 0, 1));
console.log(diff);`,
    picker: {
      calendar: "gregorian",
      mode: "range",
      title: "בחר שני תאריכים להשוואת שנים",
    },
  },
  {
    name: "differenceInHebrewMonths(left, right)",
    summary: "מחזירה הפרש חודשי לוח עברי בין שני קלטים.",
    params: "left/right: DualDateInput.",
    returns: "number.",
    usage: `import { differenceInHebrewMonths } from "hebrew-date-utils";

const diff = differenceInHebrewMonths(new Date(2026, 9, 1), new Date(2026, 3, 1));
console.log(diff);`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח עברי להשוואת חודשי לוח עברי",
    },
  },
  {
    name: "differenceInHebrewYears(left, right)",
    summary: "מחזירה הפרש שנים עבריות בין שני קלטים.",
    params: "left/right: DualDateInput.",
    returns: "number.",
    usage: `import { differenceInHebrewYears } from "hebrew-date-utils";

const diff = differenceInHebrewYears(new Date(2030, 0, 1), new Date(2026, 0, 1));
console.log(diff);`,
    picker: {
      calendar: "hebrew",
      mode: "range",
      title: "בחר טווח עברי להשוואת שנים עבריות",
    },
  },
  {
    name: "getBirthdayInHebrewYear(originalDate, targetHebrewYear)",
    summary: "מחשב יום הולדת/יום נישואין בשנה עברית יעד.",
    params: "originalDate: DualDateInput, targetHebrewYear: number.",
    returns: "DualDate | null.",
    usage: `import { getBirthdayInHebrewYear } from "hebrew-date-utils";

const birthday = getBirthdayInHebrewYear(new Date(1990, 3, 10), 5787);
console.log(birthday?.hebDisplay);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך לידה עברי והרץ חישוב לשנת יעד",
    },
  },
  {
    name: "getYahrzeitInHebrewYear(dateOfDeath, targetHebrewYear)",
    summary: "מחשב יארצייט בשנה עברית יעד.",
    params: "dateOfDeath: DualDateInput, targetHebrewYear: number.",
    returns: "DualDate | null.",
    usage: `import { getYahrzeitInHebrewYear } from "hebrew-date-utils";

const yahrzeit = getYahrzeitInHebrewYear(new Date(2010, 8, 18), 5787);
console.log(yahrzeit?.hebDisplay);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך פטירה וחישוב יארצייט לשנת יעד",
    },
  },
  {
    name: "getGregorianAge(birthDate, atDate?)",
    summary: "מחזירה גיל בשנים לועזיות לתאריך בדיקה.",
    params: "birthDate: Date, atDate?: Date.",
    returns: "number.",
    usage: `import { getGregorianAge } from "hebrew-date-utils";

const age = getGregorianAge(new Date(1990, 3, 10), new Date(2026, 3, 10));
console.log(age);`,
    picker: {
      calendar: "gregorian",
      mode: "single",
      title: "בחר תאריך בדיקה לגיל לועזי",
    },
  },
  {
    name: "getHebrewAge(originalDate, atDate?)",
    summary: "מחזירה גיל בשנים עבריות לפי יום הולדת עברי.",
    params: "originalDate: DualDateInput, atDate?: DualDateInput.",
    returns: "number.",
    usage: `import { getHebrewAge } from "hebrew-date-utils";

const age = getHebrewAge(new Date(1990, 3, 10), new Date(2026, 3, 10));
console.log(age);`,
    picker: {
      calendar: "hebrew",
      mode: "single",
      title: "בחר תאריך בדיקה לגיל עברי",
    },
  },
];

export default function ArithmeticModulePage() {
  return (
    <ModuleDocPage
      moduleName="arithmetic"
      description="מודול חישובים והשוואות: הפרשי זמן, גילים עבריים/לועזיים וחישובי ימי שנה אישיים."
      docs={DOCS}
    />
  );
}
