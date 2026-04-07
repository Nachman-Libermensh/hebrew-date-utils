import { describe, expect, it } from "vitest";
import {
  getDaysInGregorianMonth,
  getDaysInHebrewMonth,
} from "../src/month-utils.js";
import { months } from "../src/hebcal-compat.js";

describe("month-utils", () => {
  it("returns Gregorian month lengths", () => {
    expect(getDaysInGregorianMonth(2024, 1)).toBe(29);
    expect(getDaysInGregorianMonth(2025, 1)).toBe(28);
  });

  it("returns Hebrew month lengths", () => {
    expect(getDaysInHebrewMonth(5785, months.TISHREI)).toBe(30);
  });
});
