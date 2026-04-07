import type { ApiModuleDoc } from "../catalog-types";

export const hebcalCompatModule: ApiModuleDoc = {
  slug: "hebcal-compat",
  title: "hebcal-compat.ts",
  sourcePath: "packages/hebrew-date-utils/src/hebcal-compat.ts",
  summary: "Re-exports של אובייקטי Hebcal לשימוש מתקדם.",
  notes: [
    "מאפשר לצרוך API מתקדם של Hebcal בלי תלות ישירה נוספת אצל המשתמש.",
  ],
  exports: [
    {
      name: "HDate",
      kind: "re-export",
      signature: "re-export from @hebcal/core",
      description: "חשיפה ישירה של מחלקת HDate המקורית.",
      usage: "const h = new HDate(new Date());",
      output: "מופע HDate.",
    },
    {
      name: "HebrewCalendar",
      kind: "re-export",
      signature: "re-export from @hebcal/core",
      description: "מנוע חגים/אירועים עבריים של Hebcal.",
      usage: "HebrewCalendar.getHolidaysForYearArray(5787, true);",
      output: "מערך אירועים.",
    },
    {
      name: "months",
      kind: "re-export",
      signature: "re-export from @hebcal/core",
      description: "קבועי חודשי הלוח העברי.",
      usage: "months.TISHREI",
      output: "מספר חודש.",
    },
    {
      name: "flags",
      kind: "re-export",
      signature: "re-export from @hebcal/core",
      description: "דגלי סיווג אירועי Hebcal.",
      usage: "flags.CHAG",
      output: "מספר ביטמאסק.",
    },
    {
      name: "CalOptions",
      kind: "re-export",
      signature: "type re-export from @hebcal/core",
      description: "טיפוס אפשרויות עבור HebrewCalendar.calendar.",
      usage: "const options: CalOptions = { il: true };",
      output: "טיפוס compile-time.",
    },
    {
      name: "Event",
      kind: "re-export",
      signature: "type re-export from @hebcal/core",
      description: "טיפוס אירוע בסיסי.",
      usage: "const events: Event[] = [];",
      output: "טיפוס compile-time.",
    },
    {
      name: "HolidayEvent",
      kind: "re-export",
      signature: "type re-export from @hebcal/core",
      description: "טיפוס אירוע חג.",
      usage: "const holidayEvents: HolidayEvent[] = [];",
      output: "טיפוס compile-time.",
    },
  ],
};
