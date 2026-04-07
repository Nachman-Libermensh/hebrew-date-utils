import { toIsoDate, type DualDate } from "hebrew-date-utils";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isDualDate(value: unknown): value is DualDate {
  return (
    isRecord(value) &&
    value.greg instanceof Date &&
    typeof value.hebDay === "number" &&
    typeof value.hebMonth === "number" &&
    typeof value.hebYear === "number"
  );
}

function toPreview(value: unknown, depth = 0): unknown {
  if (depth > 4) {
    return "[depth-limit]";
  }

  if (value instanceof Date) {
    return toIsoDate(value);
  }

  if (isDualDate(value)) {
    return {
      greg: toIsoDate(value.greg),
      hebDay: value.hebDay,
      hebMonth: value.hebMonth,
      hebYear: value.hebYear,
      hebMonthName: value.hebMonthName,
      hebDisplay: value.hebDisplay,
    };
  }

  if (Array.isArray(value)) {
    const limit = 8;
    const preview = value
      .slice(0, limit)
      .map((item) => toPreview(item, depth + 1));
    if (value.length > limit) {
      return {
        total: value.length,
        preview,
      };
    }
    return preview;
  }

  if (!isRecord(value)) {
    return value;
  }

  const entries = Object.entries(value).slice(0, 20);
  return Object.fromEntries(
    entries.map(([key, entryValue]) => [key, toPreview(entryValue, depth + 1)]),
  );
}

export function formatPlaygroundOutput(output: unknown): string {
  return JSON.stringify(toPreview(output), null, 2);
}
