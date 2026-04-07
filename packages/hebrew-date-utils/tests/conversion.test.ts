import { describe, expect, it } from "vitest";
import { HDate, months } from "../src/hebcal-compat.js";
import { toDualDate, toGregorian } from "../src/conversion.js";

describe("conversion", () => {
  it("creates dual date from Gregorian date", () => {
    const dual = toDualDate(new Date(2024, 0, 1));

    expect(dual.greg.getFullYear()).toBe(2024);
    expect(dual.greg.getMonth()).toBe(0);
    expect(dual.greg.getDate()).toBe(1);
    expect(dual.hebYear).toBeGreaterThan(5000);
    expect(dual.hebMonth).toBeGreaterThan(0);
  });

  it("converts Hebrew date to Gregorian date", () => {
    const greg = toGregorian({ day: 1, month: months.TISHREI, year: 5785 });
    const expected = new HDate(1, months.TISHREI, 5785).greg();

    expect(greg.getFullYear()).toBe(expected.getFullYear());
    expect(greg.getMonth()).toBe(expected.getMonth());
    expect(greg.getDate()).toBe(expected.getDate());
  });
});
