import { describe, expect, it } from "vitest";
import { HDate, months } from "../src/hebcal-compat.js";
import { getHolidaysOn } from "../src/holidays.js";

describe("holidays", () => {
  it("returns holidays for known Rosh Hashana date", () => {
    const roshHashanaDate = new HDate(1, months.TISHREI, 5785).greg();
    const holidays = getHolidaysOn(roshHashanaDate);

    expect(holidays.length).toBeGreaterThan(0);
    expect(
      holidays.some((h) => h.name.toLowerCase().includes("rosh hashana")),
    ).toBe(true);
  });
});
