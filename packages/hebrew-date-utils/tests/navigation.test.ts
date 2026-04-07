import { describe, expect, it } from "vitest";
import { addGregorianMonths, addGregorianYears } from "../src/navigation.js";

describe("navigation", () => {
  it("adds Gregorian years", () => {
    const shifted = addGregorianYears(new Date(2024, 0, 15), 2);

    expect(shifted.greg.getFullYear()).toBe(2026);
    expect(shifted.greg.getMonth()).toBe(0);
    expect(shifted.greg.getDate()).toBe(15);
  });

  it("adds Gregorian months", () => {
    const shifted = addGregorianMonths(new Date(2024, 0, 31), 1);

    expect(shifted.greg.getFullYear()).toBe(2024);
    expect(shifted.greg.getMonth()).toBe(1);
    expect(shifted.greg.getDate()).toBe(29);
  });
});
