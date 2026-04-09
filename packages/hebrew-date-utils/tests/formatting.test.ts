import { describe, expect, it } from "vitest";
import { hebrewMonthGematriya } from "../src/formatting.js";

describe("formatting", () => {
  it("returns gematria month for Hebcal month names", () => {
    expect(hebrewMonthGematriya("Nisan")).toBe("ניסן");
    expect(hebrewMonthGematriya("NISAN")).toBe("ניסן");
    expect(hebrewMonthGematriya("Tishrei")).toBe("תשרי");
  });

  it("supports zero-based month indexes from 0 to 13", () => {
    expect(hebrewMonthGematriya(0)).toBe("ניסן");
    expect(hebrewMonthGematriya(6)).toBe("תשרי");
    expect(hebrewMonthGematriya(11)).toBe("אדר א׳");
    expect(hebrewMonthGematriya(12)).toBe("אדר ב׳");
    expect(hebrewMonthGematriya(13)).toBe("אדר ב׳");
  });

  it("throws for out-of-range month indexes", () => {
    expect(() => hebrewMonthGematriya(-1)).toThrow(RangeError);
    expect(() => hebrewMonthGematriya(14)).toThrow(RangeError);
  });
});
