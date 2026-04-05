import { format as formatGregorianDateFn } from "date-fns";
import { DEFAULT_GREGORIAN_LOCALE } from "./constants.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
import type { DualDateInput } from "./types.js";

export interface HebrewFormatOptions {
  locale?: string;
  showYear?: boolean;
  gematriya?: boolean;
  suppressNikud?: boolean;
}

export function formatGregorian(
  input: DualDateInput,
  pattern = "yyyy-MM-dd",
): string {
  return formatGregorianDateFn(toGregorian(input), pattern);
}

export function formatHebrew(
  input: DualDateInput,
  options: HebrewFormatOptions = {},
): string {
  const {
    locale = "en",
    showYear = true,
    gematriya = false,
    suppressNikud = true,
  } = options;

  const hebDate = toHDate(input);

  if (gematriya) {
    return hebDate.renderGematriya(suppressNikud, !showYear);
  }

  return hebDate.render(locale, showYear);
}

export function formatDualDate(
  input: DualDateInput,
  gregorianPattern = "yyyy-MM-dd",
): string {
  const dual = toDualDate(input);
  return `${formatGregorianDateFn(dual.greg, gregorianPattern)} | ${dual.hebString}`;
}

export function getWeekdayName(
  input: DualDateInput,
  locale = DEFAULT_GREGORIAN_LOCALE,
  style: Intl.DateTimeFormatOptions["weekday"] = "long",
): string {
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(
    toGregorian(input),
  );
}

export function toIsoDate(input: DualDateInput): string {
  return formatGregorian(input, "yyyy-MM-dd");
}
