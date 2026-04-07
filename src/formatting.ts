import { format as formatGregorianDateFn } from "date-fns";
import { DEFAULT_GREGORIAN_LOCALE } from "./constants.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
import type { DualDateInput } from "./types.js";

/**
 * Options for Hebrew date rendering.
 */
export interface HebrewFormatOptions {
  locale?: string;
  showYear?: boolean;
  gematriya?: boolean;
  suppressNikud?: boolean;
}

/**
 * Formats input using a date-fns Gregorian format pattern.
 */
export function formatGregorian(
  input: DualDateInput,
  pattern = "yyyy-MM-dd",
): string {
  return formatGregorianDateFn(toGregorian(input), pattern);
}

/**
 * Formats input as a Hebrew date string.
 */
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

/**
 * Formats both Gregorian and Hebrew values in a single string.
 */
export function formatDualDate(
  input: DualDateInput,
  gregorianPattern = "yyyy-MM-dd",
): string {
  const dual = toDualDate(input);
  return `${formatGregorianDateFn(dual.greg, gregorianPattern)} | ${dual.hebString}`;
}

/**
 * Returns localized weekday name for the Gregorian date.
 */
export function getWeekdayName(
  input: DualDateInput,
  locale = DEFAULT_GREGORIAN_LOCALE,
  style: Intl.DateTimeFormatOptions["weekday"] = "long",
): string {
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(
    toGregorian(input),
  );
}

/**
 * Formats input as ISO-like local date string (yyyy-MM-dd).
 */
export function toIsoDate(input: DualDateInput): string {
  return formatGregorian(input, "yyyy-MM-dd");
}
