import { describe, expect, it } from "vitest";
import { toDualDate } from "../src/conversion.js";
import { hebrewMonthGematriya } from "../src/formatting.js";
import { months } from "../src/hebcal-compat.js";
import type { DualDate } from "../src/types.js";

describe("formatting", () => {
  it("returns Hebrew month for English month input", () => {
    expect(hebrewMonthGematriya("Nisan")).toBe("ניסן");
    expect(hebrewMonthGematriya("NISAN")).toBe("ניסן");
    expect(hebrewMonthGematriya("adar")).toBe("אדר");
    expect(hebrewMonthGematriya("ADAR_I")).toBe("אדר א׳");
    expect(hebrewMonthGematriya("ADAR_II")).toBe("אדר ב׳");
  });

  it("uses the Hebrew year from DualDate for Adar month names", () => {
    const adarInCommonYear = toDualDate({ day: 1, month: months.ADAR_I, year: 5785 });
    const adarIInLeapYear = toDualDate({ day: 1, month: months.ADAR_I, year: 5784 });
    const adarIIInLeapYear = toDualDate({ day: 1, month: months.ADAR_II, year: 5784 });

    expect(hebrewMonthGematriya(adarInCommonYear)).toBe("אדר");
    expect(hebrewMonthGematriya(adarIInLeapYear)).toBe("אדר א׳");
    expect(hebrewMonthGematriya(adarIIInLeapYear)).toBe("אדר ב׳");
  });

  it("throws for invalid input", () => {
    expect(() => hebrewMonthGematriya("")).toThrow(TypeError);
    expect(() => hebrewMonthGematriya(12 as unknown as DualDate)).toThrow(
      TypeError,
    );
  });
});
