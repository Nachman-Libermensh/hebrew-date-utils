import { describe, expect, it } from "vitest";
import {
  listDualDatesInRange,
  splitRangeByHebrewMonth,
} from "../src/ranges.js";

describe("ranges", () => {
  it("lists inclusive date range", () => {
    const days = listDualDatesInRange(
      new Date(2024, 0, 1),
      new Date(2024, 0, 5),
    );
    expect(days).toHaveLength(5);
  });

  it("splits range by Hebrew month", () => {
    const segments = splitRangeByHebrewMonth(
      new Date(2024, 8, 20),
      new Date(2024, 9, 20),
    );

    expect(segments.length).toBeGreaterThan(0);
    const total = segments.reduce((sum, seg) => sum + seg.days, 0);
    expect(total).toBe(31);
  });
});
