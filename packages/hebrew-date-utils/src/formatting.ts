import { format as formatGregorianDateFn } from "date-fns";
import {
  DEFAULT_GREGORIAN_LOCALE,
  GREG_MONTH_NAMES_EN,
  GREG_MONTH_NAMES_HE,
} from "./constants.js";
import { HDate, months } from "./hebcal-compat.js";
import { toDualDate, toGregorian, toHDate } from "./conversion.js";
import type { DualDate, DualDateInput } from "./types.js";

const HEBREW_WEEKDAY_NAMES = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
] as const;

const GEMATRIYA_REFERENCE_LEAP_YEAR = 5784;
const GEMATRIYA_REFERENCE_COMMON_YEAR = 5785;
const EXPLICIT_ADAR_I_PATTERN = /^adar\s+(i|1|rishon)$/;
const EXPLICIT_ADAR_II_PATTERN = /^adar\s+(ii|2|sheni|sheini)$/;

function isDualDate(value: unknown): value is DualDate {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "greg" in value && "heb" in value;
}

function normalizeEnglishMonthName(monthName: string): string {
  return monthName
    .trim()
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/[\s_-]+/g, " ");
}

function extractMonthFromRenderedGematriya(renderedDate: string): string {
  const firstSpace = renderedDate.indexOf(" ");
  if (firstSpace === -1) {
    return renderedDate;
  }

  return renderedDate.slice(firstSpace + 1);
}

function hebrewMonthFromMonthAndYear(month: number, year: number): string {
  return extractMonthFromRenderedGematriya(
    toHDate({
      day: 1,
      month,
      year,
    }).renderGematriya(true, true),
  );
}

function hebrewMonthFromEnglishName(monthName: string): string {
  const trimmedMonth = monthName.trim();
  if (!trimmedMonth) {
    throw new TypeError("Month name cannot be empty.");
  }

  const normalizedMonth = normalizeEnglishMonthName(trimmedMonth);
  if (normalizedMonth === "adar") {
    return hebrewMonthFromMonthAndYear(
      months.ADAR_I,
      GEMATRIYA_REFERENCE_COMMON_YEAR,
    );
  }

  const enumKey = trimmedMonth.toUpperCase().replace(/[\s-]+/g, "_");
  const enumMonth = (months as Record<string, number | undefined>)[enumKey];
  const monthNumber =
    typeof enumMonth === "number" ? enumMonth : HDate.monthNum(trimmedMonth);

  const useLeapYearReference =
    monthNumber === months.ADAR_II ||
    EXPLICIT_ADAR_I_PATTERN.test(normalizedMonth) ||
    EXPLICIT_ADAR_II_PATTERN.test(normalizedMonth);

  return hebrewMonthFromMonthAndYear(
    monthNumber,
    useLeapYearReference
      ? GEMATRIYA_REFERENCE_LEAP_YEAR
      : GEMATRIYA_REFERENCE_COMMON_YEAR,
  );
}

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
 * Formats input as a Hebrew gematria date string.
 */
export function formatHebrewDate(input: DualDateInput): string {
  return toHDate(input).renderGematriya(true);
}

/**
 * Returns Hebrew year represented in gematria letters.
 */
export function hebrewYearGematriya(year: number): string {
  const parts = toHDate({
    day: 1,
    month: months.TISHREI,
    year,
  })
    .renderGematriya(true)
    .split(" ");

  return parts[parts.length - 1] ?? String(year);
}

/**
 * Returns only Hebrew day-of-month gematria letters.
 */
export function hebrewDayGematriya(input: DualDateInput): string {
  const [day] = toHDate(input).renderGematriya(true).split(" ");
  return day ?? "";
}

/**
 * Returns Hebrew month represented in gematria letters.
 * Accepts DualDate or English Hebrew month name strings.
 */
export function hebrewMonthGematriya(input: DualDate | string): string {
  if (typeof input === "string") {
    return hebrewMonthFromEnglishName(input);
  }

  if (!isDualDate(input)) {
    throw new TypeError(
      "hebrewMonthGematriya expects a DualDate or English month name.",
    );
  }

  const hebDate = toHDate(input);
  return hebrewMonthFromMonthAndYear(hebDate.getMonth(), hebDate.getFullYear());
}

/**
 * Returns the Gregorian month name in Hebrew.
 */
export function gregorianMonthNameHe(month: number): string {
  return GREG_MONTH_NAMES_HE[month] ?? "";
}

/**
 * Returns the Gregorian month name in English.
 */
export function gregorianMonthNameEn(month: number): string {
  return GREG_MONTH_NAMES_EN[month] ?? "";
}

/**
 * Returns Hebrew day-of-week name.
 */
export function hebrewDayOfWeek(input: DualDateInput): string {
  return HEBREW_WEEKDAY_NAMES[toGregorian(input).getDay()] ?? "";
}

/**
 * Returns Hebrew day-of-week in full form ("יום X"), except for שבת.
 */
export function hebrewDayOfWeekFull(input: DualDateInput): string {
  const day = hebrewDayOfWeek(input);
  if (day === "שבת") {
    return day;
  }

  return `יום ${day}`;
}

/**
 * Checks if input resolves to Saturday.
 */
export function isShabbat(input: DualDateInput): boolean {
  return toGregorian(input).getDay() === 6;
}

/**
 * Checks if input resolves to Friday.
 */
export function isErevShabbat(input: DualDateInput): boolean {
  return toGregorian(input).getDay() === 5;
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
