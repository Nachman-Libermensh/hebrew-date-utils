import { HDate } from "./hebcal-compat.js";
import type { DualDate, DualDateInput, HebrewDateParts } from "./types.js";

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

function isDualDate(value: unknown): value is DualDate {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "greg" in value && "heb" in value;
}

function isHebrewDateParts(value: unknown): value is HebrewDateParts {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "day" in value && "month" in value && "year" in value;
}

function normalizeLocalDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Converts any supported input into a normalized Hebrew date (HDate).
 */
export function toHDate(input: DualDateInput): HDate {
  if (isDualDate(input)) {
    return new HDate(input.heb);
  }

  if (HDate.isHDate(input)) {
    return new HDate(input);
  }

  if (isDate(input)) {
    return new HDate(normalizeLocalDate(input));
  }

  if (isHebrewDateParts(input)) {
    return new HDate(input.day, input.month, input.year);
  }

  return new HDate();
}

/**
 * Converts any supported input into a normalized Gregorian Date.
 */
export function toGregorian(input: DualDateInput): Date {
  if (isDualDate(input)) {
    return normalizeLocalDate(input.greg);
  }

  if (isDate(input)) {
    return normalizeLocalDate(input);
  }

  return normalizeLocalDate(toHDate(input).greg());
}

/**
 * Creates a DualDate object that includes Hebrew and Gregorian views.
 */
export function toDualDate(input: DualDateInput): DualDate {
  const heb = toHDate(input);
  const greg = normalizeLocalDate(heb.greg());

  return {
    greg,
    heb,
    hebDay: heb.getDate(),
    hebMonth: heb.getMonth(),
    hebYear: heb.getFullYear(),
    hebMonthName: heb.getMonthName(),
    hebString: heb.toString(),
    hebDisplay: heb.renderGematriya(true),
  };
}

/**
 * Alias for creating a DualDate from a Gregorian Date.
 */
export function fromGregorianDate(date: Date): DualDate {
  return toDualDate(date);
}

/**
 * Creates a DualDate from Hebrew date parts.
 */
export function fromHebrewDate(
  day: number,
  month: number | string,
  year: number,
): DualDate {
  return toDualDate({ day, month, year });
}

/**
 * Returns today's date as a DualDate (or for a supplied reference date).
 */
export function todayDualDate(referenceDate: Date = new Date()): DualDate {
  return toDualDate(referenceDate);
}
