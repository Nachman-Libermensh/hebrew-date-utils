import { months } from "./hebcal-compat.js";

export const DEFAULT_HEBREW_RENDER_LOCALE = "en";
export const DEFAULT_GREGORIAN_LOCALE = "en-US";

export const GREGORIAN_MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const GREGORIAN_MONTH_NAMES_HE = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
] as const;

// Backward-friendly aliases for consumers that prefer shorter constant names.
export const GREG_MONTH_NAMES_EN = GREGORIAN_MONTH_NAMES_EN;
export const GREG_MONTH_NAMES_HE = GREGORIAN_MONTH_NAMES_HE;

export const HEBREW_MONTH_NAMES_EN: Record<number, string> = {
  [months.NISAN]: "Nisan",
  [months.IYYAR]: "Iyyar",
  [months.SIVAN]: "Sivan",
  [months.TAMUZ]: "Tamuz",
  [months.AV]: "Av",
  [months.ELUL]: "Elul",
  [months.TISHREI]: "Tishrei",
  [months.CHESHVAN]: "Cheshvan",
  [months.KISLEV]: "Kislev",
  [months.TEVET]: "Tevet",
  [months.SHVAT]: "Sh'vat",
  [months.ADAR_I]: "Adar",
  [months.ADAR_II]: "Adar II",
};

export const HEBREW_MONTH_NAMES_HE: Record<number, string> = {
  [months.NISAN]: "Nisan",
  [months.IYYAR]: "Iyar",
  [months.SIVAN]: "Sivan",
  [months.TAMUZ]: "Tamuz",
  [months.AV]: "Av",
  [months.ELUL]: "Elul",
  [months.TISHREI]: "Tishrei",
  [months.CHESHVAN]: "Cheshvan",
  [months.KISLEV]: "Kislev",
  [months.TEVET]: "Tevet",
  [months.SHVAT]: "Shevat",
  [months.ADAR_I]: "Adar",
  [months.ADAR_II]: "Adar II",
};

export const HEBREW_MONTH_ORDER = [
  months.NISAN,
  months.IYYAR,
  months.SIVAN,
  months.TAMUZ,
  months.AV,
  months.ELUL,
  months.TISHREI,
  months.CHESHVAN,
  months.KISLEV,
  months.TEVET,
  months.SHVAT,
  months.ADAR_I,
  months.ADAR_II,
] as const;
