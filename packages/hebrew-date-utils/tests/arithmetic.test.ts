import { describe, expect, it } from "vitest";
import { HDate, months } from "../src/hebcal-compat.js";
import {
  differenceInDualMonths,
  differenceInDualYears,
  differenceInHebrewMonths,
  differenceInHebrewYears,
  getBirthdayInHebrewYear,
  getYahrzeitInHebrewYear,
} from "../src/arithmetic.js";

describe("arithmetic", () => {
  it("calculates birthday anniversary in target Hebrew year", () => {
    const original = new Date(2014, 2, 2);
    const birthday = getBirthdayInHebrewYear(original, 5780);

    expect(birthday).not.toBeNull();
    expect(birthday?.hebYear).toBe(5780);
  });

  it("calculates yahrzeit in target Hebrew year", () => {
    const original = new Date(2014, 2, 2);
    const yahrzeit = getYahrzeitInHebrewYear(original, 5780);

    expect(yahrzeit).not.toBeNull();
    expect(yahrzeit?.hebYear).toBe(5780);
  });

  it("calculates Gregorian calendar month and year differences", () => {
    expect(
      differenceInDualMonths(new Date(2026, 6, 1), new Date(2026, 0, 1)),
    ).toBe(6);
    expect(
      differenceInDualYears(new Date(2028, 0, 1), new Date(2026, 0, 1)),
    ).toBe(2);
  });

  it("calculates Hebrew month and year differences", () => {
    const tishrei5784 = new HDate(1, months.TISHREI, 5784);
    const tishrei5785 = new HDate(1, months.TISHREI, 5785);
    const cheshvan5785 = new HDate(1, months.CHESHVAN, 5785);
    const tishrei5786 = new HDate(1, months.TISHREI, 5786);

    expect(differenceInHebrewMonths(tishrei5785, tishrei5784)).toBe(13);
    expect(differenceInHebrewMonths(cheshvan5785, tishrei5785)).toBe(1);
    expect(differenceInHebrewYears(tishrei5786, tishrei5785)).toBe(1);
  });
});
