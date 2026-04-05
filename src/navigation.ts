import { addDays, addMonths } from "date-fns";
import { HDate } from "./hebcal-compat.js";
import { toDualDate, toHDate, toGregorian } from "./conversion.js";
import type { DualDate, DualDateInput } from "./types.js";

export function addGregorianDays(
  input: DualDateInput,
  amount: number,
): DualDate {
  return toDualDate(addDays(toGregorian(input), amount));
}

export function addGregorianMonths(
  input: DualDateInput,
  amount: number,
): DualDate {
  return toDualDate(addMonths(toGregorian(input), amount));
}

export function addHebrewDays(input: DualDateInput, amount: number): DualDate {
  const hd = toHDate(input).add(amount, "day");
  return toDualDate(hd);
}

export function addHebrewMonths(
  input: DualDateInput,
  amount: number,
): DualDate {
  const hd = toHDate(input).add(amount, "month");
  return toDualDate(hd);
}

export function addHebrewYears(input: DualDateInput, amount: number): DualDate {
  const hd = toHDate(input).add(amount, "year");
  return toDualDate(hd);
}

export function nextHebrewMonth(input: DualDateInput): DualDate {
  const next = toHDate(input).add(1, "month");
  return toDualDate(new HDate(1, next.getMonth(), next.getFullYear()));
}

export function previousHebrewMonth(input: DualDateInput): DualDate {
  const previous = toHDate(input).add(-1, "month");
  return toDualDate(new HDate(1, previous.getMonth(), previous.getFullYear()));
}

export function shiftHebrewMonth(
  month: number,
  year: number,
  offset: number,
): { month: number; year: number; name: string } {
  const shifted = new HDate(1, month, year).add(offset, "month");
  return {
    month: shifted.getMonth(),
    year: shifted.getFullYear(),
    name: shifted.getMonthName(),
  };
}
