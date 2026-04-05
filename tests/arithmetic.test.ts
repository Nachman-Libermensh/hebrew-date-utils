import { describe, expect, it } from "vitest";
import {
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
});
