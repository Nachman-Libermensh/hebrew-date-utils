import { addDays, eachDayOfInterval } from "date-fns";
import {
  JewishMonth,
  calcDaysInMonth,
  formatJewishDateInHebrew,
  isLeapYear as isJewishLeapYear,
  toGregorianDate,
  toJewishDate,
  type BasicJewishDate,
  type JewishMonthType,
} from "jewish-date";
import { isShabbat } from "jewish-holidays";

export const months = {
  NISAN: 1,
  IYYAR: 2,
  SIVAN: 3,
  TAMUZ: 4,
  AV: 5,
  ELUL: 6,
  TISHREI: 7,
  CHESHVAN: 8,
  KISLEV: 9,
  TEVET: 10,
  SHVAT: 11,
  ADAR_I: 12,
  ADAR_II: 13,
} as const;

export const flags = {
  CHAG: 1 << 0,
  MINOR_FAST: 1 << 1,
  CHOL_HAMOED: 1 << 2,
  EREV: 1 << 3,
  CHANUKAH: 1 << 4,
  PURIM: 1 << 5,
} as const;

const HEBREW_MONTH_ORDER_LEAP = [7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6];
const HEBREW_MONTH_ORDER_COMMON = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

const MONTH_NAME_BY_NUMBER = {
  [months.NISAN]: "Nisan",
  [months.IYYAR]: "Iyyar",
  [months.SIVAN]: "Sivan",
  [months.TAMUZ]: "Tamuz",
  [months.AV]: "Av",
  [months.ELUL]: "Elul",
  [months.TISHREI]: "Tishrei",
  [months.CHESHVAN]: "Cheshvan",
  [months.KISLEV]: "Kislev",
  [months.TEVET]: "Tevet",
  [months.SHVAT]: "Sh'vat",
  [months.ADAR_I]: "Adar",
  [months.ADAR_II]: "Adar II",
} as const;

const MONTH_TOKEN_TO_NUMBER: Record<string, number> = {
  nisan: months.NISAN,
  nissan: months.NISAN,
  iyyar: months.IYYAR,
  iyar: months.IYYAR,
  sivan: months.SIVAN,
  tamuz: months.TAMUZ,
  tammuz: months.TAMUZ,
  av: months.AV,
  elul: months.ELUL,
  tishrei: months.TISHREI,
  tishri: months.TISHREI,
  cheshvan: months.CHESHVAN,
  heshvan: months.CHESHVAN,
  marcheshvan: months.CHESHVAN,
  marheshvan: months.CHESHVAN,
  kislev: months.KISLEV,
  tevet: months.TEVET,
  teves: months.TEVET,
  shvat: months.SHVAT,
  shevat: months.SHVAT,
  adar: months.ADAR_I,
  adari: months.ADAR_I,
  adar1: months.ADAR_I,
  adarrishon: months.ADAR_I,
  adarishon: months.ADAR_I,
  adarii: months.ADAR_II,
  adar2: months.ADAR_II,
  adarsheni: months.ADAR_II,
  adarsheini: months.ADAR_II,
};

const JEWISH_MONTH_BY_NUMBER_LEAP: Record<number, JewishMonthType> = {
  [months.NISAN]: "Nisan",
  [months.IYYAR]: "Iyyar",
  [months.SIVAN]: "Sivan",
  [months.TAMUZ]: "Tammuz",
  [months.AV]: "Av",
  [months.ELUL]: "Elul",
  [months.TISHREI]: "Tishri",
  [months.CHESHVAN]: "Cheshvan",
  [months.KISLEV]: "Kislev",
  [months.TEVET]: "Tevet",
  [months.SHVAT]: "Shevat",
  [months.ADAR_I]: "AdarI",
  [months.ADAR_II]: "AdarII",
};

const JEWISH_MONTH_BY_NUMBER_COMMON: Record<number, JewishMonthType> = {
  ...JEWISH_MONTH_BY_NUMBER_LEAP,
  [months.ADAR_I]: "Adar",
};

const MONTH_NUMBER_BY_JEWISH_MONTH: Record<JewishMonthType, number> = {
  None: months.NISAN,
  Nisan: months.NISAN,
  Iyyar: months.IYYAR,
  Sivan: months.SIVAN,
  Tammuz: months.TAMUZ,
  Av: months.AV,
  Elul: months.ELUL,
  Tishri: months.TISHREI,
  Cheshvan: months.CHESHVAN,
  Kislev: months.KISLEV,
  Tevet: months.TEVET,
  Shevat: months.SHVAT,
  Adar: months.ADAR_I,
  AdarI: months.ADAR_I,
  AdarII: months.ADAR_II,
};

type HolidayRule = {
  day: number;
  monthName: JewishMonthType;
  name: string;
  categories: string[];
  flags: number;
  observedInIsrael: boolean;
  observedInDiaspora: boolean;
};

const YOM_TOV_ISRAEL: HolidayRule[] = [
  {
    day: 1,
    monthName: "Tishri",
    name: "Rosh Hashanah",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 2,
    monthName: "Tishri",
    name: "Rosh Hashanah",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 10,
    monthName: "Tishri",
    name: "Yom Kippur",
    categories: ["yom-tov", "fast"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 15,
    monthName: "Tishri",
    name: "Sukkot",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 22,
    monthName: "Tishri",
    name: "Simchat Torah",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 15,
    monthName: "Nisan",
    name: "Pesach",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 21,
    monthName: "Nisan",
    name: "Shevii Shel Pesach",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 6,
    monthName: "Sivan",
    name: "Shavuot",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const YOM_TOV_DIASPORA_ONLY: HolidayRule[] = [
  {
    day: 16,
    monthName: "Tishri",
    name: "Sukkot",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: false,
    observedInDiaspora: true,
  },
  {
    day: 23,
    monthName: "Tishri",
    name: "Simchat Torah",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: false,
    observedInDiaspora: true,
  },
  {
    day: 16,
    monthName: "Nisan",
    name: "Pesach",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: false,
    observedInDiaspora: true,
  },
  {
    day: 22,
    monthName: "Nisan",
    name: "Pesach Shel Pesach",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: false,
    observedInDiaspora: true,
  },
  {
    day: 7,
    monthName: "Sivan",
    name: "Shavuot",
    categories: ["yom-tov"],
    flags: flags.CHAG,
    observedInIsrael: false,
    observedInDiaspora: true,
  },
];

const EREV_YOM_TOV: HolidayRule[] = [
  {
    day: 29,
    monthName: "Elul",
    name: "Erev Rosh Hashanah",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 9,
    monthName: "Tishri",
    name: "Erev Yom Kippur",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 14,
    monthName: "Tishri",
    name: "Erev Sukkot",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 21,
    monthName: "Tishri",
    name: "Erev Simchat Torah",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 14,
    monthName: "Nisan",
    name: "Erev Pesach",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 20,
    monthName: "Nisan",
    name: "Erev Shvi'i Shel Pesach",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 5,
    monthName: "Sivan",
    name: "Erev Shavuot",
    categories: ["erev-yom-tov"],
    flags: flags.EREV,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const CHOL_HAMOED_ISRAEL: HolidayRule[] = [
  {
    day: 16,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: false,
  },
  {
    day: 17,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 18,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 19,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 20,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 21,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 16,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: false,
  },
  {
    day: 17,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 18,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 19,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 20,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const CHOL_HAMOED_DIASPORA: HolidayRule[] = [
  {
    day: 17,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 18,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 19,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 20,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 21,
    monthName: "Tishri",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 17,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 18,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 19,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 20,
    monthName: "Nisan",
    name: "Chol HaMoed",
    categories: ["chol-hamoed"],
    flags: flags.CHOL_HAMOED,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const PURIM: HolidayRule[] = [
  {
    day: 14,
    monthName: "Adar",
    name: "Purim",
    categories: ["minor-holiday"],
    flags: flags.PURIM,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 15,
    monthName: "Adar",
    name: "Shushan Purim",
    categories: ["minor-holiday"],
    flags: flags.PURIM,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 14,
    monthName: "AdarII",
    name: "Purim",
    categories: ["minor-holiday"],
    flags: flags.PURIM,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 15,
    monthName: "AdarII",
    name: "Shushan Purim",
    categories: ["minor-holiday"],
    flags: flags.PURIM,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const FAST_DAYS: HolidayRule[] = [
  {
    day: 3,
    monthName: "Tishri",
    name: "Tzom Gdalia",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 10,
    monthName: "Tevet",
    name: "Asara BeTevet",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 13,
    monthName: "Adar",
    name: "Taanit Esther",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 13,
    monthName: "AdarII",
    name: "Taanit Esther",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 14,
    monthName: "Nisan",
    name: "Taanit Bechorot",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 17,
    monthName: "Tammuz",
    name: "Shiva Asar BeTamuz",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
  {
    day: 9,
    monthName: "Av",
    name: "Tisha BeAv",
    categories: ["fast", "minor-fast"],
    flags: flags.MINOR_FAST,
    observedInIsrael: true,
    observedInDiaspora: true,
  },
];

const DELAYABLE_FASTS = new Set([
  "Tishri-3",
  "Adar-13",
  "AdarII-13",
  "Tammuz-17",
  "Av-9",
]);

function normalizeLocalDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function normalizeHebrewPunctuation(value: string): string {
  return value
    .replace(/'/g, "\u05F3")
    .replace(/"/g, "\u05F4")
    .replace(/(\u05D0\u05D3\u05E8\s[\u05D0\u05D1])(?![\u05F3'])/g, "$1\u05F3");
}

function normalizeMonthToken(month: string): string {
  return month
    .trim()
    .toLowerCase()
    .replace(/["'`]/g, "")
    .replace(/[\s_-]+/g, "");
}

function isLeapYear(year: number): boolean {
  return isJewishLeapYear(year);
}

function monthsInYear(year: number): number {
  return isLeapYear(year) ? 13 : 12;
}

function getMonthsInOrder(year: number): number[] {
  return isLeapYear(year)
    ? [...HEBREW_MONTH_ORDER_LEAP]
    : [...HEBREW_MONTH_ORDER_COMMON];
}

function getJewishMonthFromNumber(month: number, year: number): JewishMonthType {
  const map = isLeapYear(year)
    ? JEWISH_MONTH_BY_NUMBER_LEAP
    : JEWISH_MONTH_BY_NUMBER_COMMON;
  const resolved = map[month];

  if (!resolved) {
    throw new RangeError(`Unsupported Hebrew month number: ${month}`);
  }

  return resolved;
}

function getMonthNumberFromJewishMonth(monthName: JewishMonthType): number {
  const number = MONTH_NUMBER_BY_JEWISH_MONTH[monthName];

  if (!number) {
    throw new RangeError(`Unsupported Hebrew month name: ${monthName}`);
  }

  return number;
}

function normalizeMonthForYear(month: number, year: number): number {
  if (month === months.ADAR_II && !isLeapYear(year)) {
    return months.ADAR_I;
  }

  return month;
}

function resolveMonthNumber(month: number | string, year?: number): number {
  if (typeof month === "number") {
    if (!Number.isInteger(month) || month < 1 || month > 13) {
      throw new RangeError(`Invalid Hebrew month number: ${month}`);
    }

    if (typeof year === "number") {
      return normalizeMonthForYear(month, year);
    }

    return month;
  }

  const trimmed = month.trim();
  if (!trimmed) {
    throw new TypeError("Month name cannot be empty.");
  }

  const enumKey = trimmed.toUpperCase().replace(/[\s-]+/g, "_");
  const enumMatch = (months as Record<string, number | undefined>)[enumKey];
  if (typeof enumMatch === "number") {
    return typeof year === "number"
      ? normalizeMonthForYear(enumMatch, year)
      : enumMatch;
  }

  const normalized = normalizeMonthToken(trimmed);
  const match = MONTH_TOKEN_TO_NUMBER[normalized];

  if (typeof match !== "number") {
    throw new RangeError(`Unknown Hebrew month name: ${month}`);
  }

  return typeof year === "number" ? normalizeMonthForYear(match, year) : match;
}

function getDaysInMonth(month: number, year: number): number {
  return calcDaysInMonth(year, getJewishMonthFromNumber(month, year));
}

function getDaysInYear(year: number): number {
  return getMonthsInOrder(year).reduce(
    (sum, month) => sum + getDaysInMonth(month, year),
    0,
  );
}

function toGregorianFromHebrewParts(day: number, month: number, year: number): Date {
  const normalizedMonth = resolveMonthNumber(month, year);
  const clampedDay = Math.min(day, getDaysInMonth(normalizedMonth, year));
  return normalizeLocalDate(
    toGregorianDate({
      day: clampedDay,
      monthName: getJewishMonthFromNumber(normalizedMonth, year),
      year,
    }),
  );
}

function getHebrewPartsFromGregorian(date: Date): {
  day: number;
  month: number;
  year: number;
  monthName: JewishMonthType;
} {
  const jd = toJewishDate(normalizeLocalDate(date));
  return {
    day: jd.day,
    month: getMonthNumberFromJewishMonth(jd.monthName),
    year: jd.year,
    monthName: jd.monthName,
  };
}

function shiftHebrewMonth(month: number, year: number, offset: number): {
  month: number;
  year: number;
} {
  if (!Number.isInteger(offset)) {
    throw new TypeError(`Month offset must be an integer: ${offset}`);
  }

  let currentYear = year;
  let currentMonth = normalizeMonthForYear(month, year);
  let remaining = offset;

  while (remaining !== 0) {
    const currentOrder = getMonthsInOrder(currentYear);
    const currentIndex = currentOrder.indexOf(currentMonth);

    if (currentIndex === -1) {
      throw new RangeError(
        `Unsupported Hebrew month number in ${currentYear}: ${currentMonth}`,
      );
    }

    if (remaining > 0) {
      if (currentIndex === currentOrder.length - 1) {
        currentYear += 1;
        currentMonth = getMonthsInOrder(currentYear)[0]!;
      } else {
        currentMonth = currentOrder[currentIndex + 1]!;
      }

      remaining -= 1;
      continue;
    }

    if (currentIndex === 0) {
      currentYear -= 1;
      const previousOrder = getMonthsInOrder(currentYear);
      currentMonth = previousOrder[previousOrder.length - 1]!;
    } else {
      currentMonth = currentOrder[currentIndex - 1]!;
    }

    remaining += 1;
  }

  return {
    month: currentMonth,
    year: currentYear,
  };
}

function monthDisplayName(month: number, year: number): string {
  if (month === months.ADAR_I && isLeapYear(year)) {
    return "Adar I";
  }

  if (month === months.ADAR_II) {
    return "Adar II";
  }

  return MONTH_NAME_BY_NUMBER[month as keyof typeof MONTH_NAME_BY_NUMBER] ?? "";
}

function toBasicJewishDate(date: Date): BasicJewishDate {
  const jd = toJewishDate(normalizeLocalDate(date));
  return {
    day: jd.day,
    monthName: jd.monthName,
    year: jd.year,
  };
}

function matchesHolidayRule(date: BasicJewishDate, rule: HolidayRule): boolean {
  return date.day === rule.day && date.monthName === rule.monthName;
}

function getChanukahRules(year: number): HolidayRule[] {
  const list: HolidayRule[] = [
    {
      day: 25,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 26,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 27,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 28,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 29,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 30,
      monthName: "Kislev",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 1,
      monthName: "Tevet",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
    {
      day: 2,
      monthName: "Tevet",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    },
  ];

  if (getDaysInMonth(months.KISLEV, year) === 29) {
    list.push({
      day: 3,
      monthName: "Tevet",
      name: "Chanukah",
      categories: ["chanukah", "minor-holiday"],
      flags: flags.CHANUKAH,
      observedInIsrael: true,
      observedInDiaspora: true,
    });
  }

  return list;
}

function delayedFastName(baseName: string): string {
  return `${baseName} (delayed)`;
}

function getFastsOnDate(date: BasicJewishDate): HolidayRule[] {
  const direct = FAST_DAYS.filter((rule) => matchesHolidayRule(date, rule));
  if (direct.length > 0 && !isShabbat(date)) {
    return direct;
  }

  if (date.day <= 1) {
    return [];
  }

  const previousDay: BasicJewishDate = {
    ...date,
    day: date.day - 1,
  };

  if (!isShabbat(previousDay)) {
    return [];
  }

  const previousKey = `${previousDay.monthName}-${previousDay.day}`;
  if (!DELAYABLE_FASTS.has(previousKey)) {
    return [];
  }

  return FAST_DAYS.filter((rule) => matchesHolidayRule(previousDay, rule)).map(
    (rule) => ({
      ...rule,
      name: delayedFastName(rule.name),
    }),
  );
}

function computeHolidayRulesForDate(date: BasicJewishDate, il = false): HolidayRule[] {
  const diaspora = !il;
  const list: HolidayRule[] = [
    ...YOM_TOV_ISRAEL,
    ...EREV_YOM_TOV,
    ...(diaspora ? YOM_TOV_DIASPORA_ONLY : []),
    ...(diaspora ? CHOL_HAMOED_DIASPORA : CHOL_HAMOED_ISRAEL),
    ...PURIM,
    ...getChanukahRules(date.year),
    ...getFastsOnDate(date),
  ];

  return list.filter((rule) => matchesHolidayRule(date, rule));
}

function applyCalendarFilters(events: Event[], options: CalOptions): Event[] {
  return events.filter((event) => {
    const categories = event.getCategories();

    if (options.noMinorFast && categories.includes("minor-fast")) {
      return false;
    }

    if (options.noModern && categories.includes("modern")) {
      return false;
    }

    if (options.noRoshChodesh && categories.includes("rosh-chodesh")) {
      return false;
    }

    if (options.noSpecialShabbat && categories.includes("special-shabbat")) {
      return false;
    }

    return true;
  });
}

function adjustAdarAcrossLeapYears(
  sourceMonth: number,
  sourceYear: number,
  targetYear: number,
): number {
  const sourceLeap = isLeapYear(sourceYear);
  const targetLeap = isLeapYear(targetYear);

  if (sourceLeap && !targetLeap && sourceMonth === months.ADAR_II) {
    return months.ADAR_I;
  }

  if (!sourceLeap && targetLeap && sourceMonth === months.ADAR_I) {
    return months.ADAR_II;
  }

  return normalizeMonthForYear(sourceMonth, targetYear);
}

export class HDate {
  private readonly value: Date;

  constructor();
  constructor(value: Date | HDate | BasicJewishDate);
  constructor(day: number, month: number | string, year: number);
  constructor(
    dayOrValue?: number | Date | HDate | BasicJewishDate,
    month?: number | string,
    year?: number,
  ) {
    if (typeof dayOrValue === "number") {
      if (typeof month === "undefined" || typeof year !== "number") {
        throw new TypeError(
          "HDate(day, month, year) requires both month and year arguments.",
        );
      }

      const normalizedMonth = resolveMonthNumber(month, year);
      this.value = toGregorianFromHebrewParts(dayOrValue, normalizedMonth, year);
      return;
    }

    if (dayOrValue instanceof HDate) {
      this.value = dayOrValue.greg();
      return;
    }

    if (dayOrValue instanceof Date) {
      this.value = normalizeLocalDate(dayOrValue);
      return;
    }

    if (dayOrValue && typeof dayOrValue === "object") {
      const basic = dayOrValue as BasicJewishDate;
      this.value = toGregorianFromHebrewParts(
        basic.day,
        getMonthNumberFromJewishMonth(basic.monthName),
        basic.year,
      );
      return;
    }

    this.value = normalizeLocalDate(new Date());
  }

  static isHDate(value: unknown): value is HDate {
    return value instanceof HDate;
  }

  static monthNum(month: number | string): number {
    return resolveMonthNumber(month);
  }

  static monthFromName(month: string): number {
    return resolveMonthNumber(month);
  }

  static isLeapYear(year: number): boolean {
    return isLeapYear(year);
  }

  static monthsInYear(year: number): number {
    return monthsInYear(year);
  }

  static daysInMonth(month: number, year: number): number {
    return getDaysInMonth(resolveMonthNumber(month, year), year);
  }

  static getMonthName(month: number, year: number): string {
    return monthDisplayName(resolveMonthNumber(month, year), year);
  }

  static daysInYear(year: number): number {
    return getDaysInYear(year);
  }

  static longCheshvan(year: number): boolean {
    return getDaysInMonth(months.CHESHVAN, year) === 30;
  }

  static shortKislev(year: number): boolean {
    return getDaysInMonth(months.KISLEV, year) === 29;
  }

  greg(): Date {
    return normalizeLocalDate(this.value);
  }

  getDate(): number {
    return getHebrewPartsFromGregorian(this.value).day;
  }

  getMonth(): number {
    return getHebrewPartsFromGregorian(this.value).month;
  }

  getFullYear(): number {
    return getHebrewPartsFromGregorian(this.value).year;
  }

  getMonthName(): string {
    const parts = getHebrewPartsFromGregorian(this.value);
    return monthDisplayName(parts.month, parts.year);
  }

  add(amount: number, unit: "day" | "month" | "year"): HDate {
    if (!Number.isInteger(amount)) {
      throw new TypeError(`Amount must be an integer: ${amount}`);
    }

    if (unit === "day") {
      return new HDate(addDays(this.value, amount));
    }

    const current = getHebrewPartsFromGregorian(this.value);

    if (unit === "month") {
      const shifted = shiftHebrewMonth(current.month, current.year, amount);
      const day = Math.min(current.day, getDaysInMonth(shifted.month, shifted.year));
      return new HDate(day, shifted.month, shifted.year);
    }

    if (unit === "year") {
      const targetYear = current.year + amount;
      const targetMonth = adjustAdarAcrossLeapYears(
        current.month,
        current.year,
        targetYear,
      );
      const day = Math.min(current.day, getDaysInMonth(targetMonth, targetYear));
      return new HDate(day, targetMonth, targetYear);
    }

    throw new TypeError(`Unsupported add unit: ${unit}`);
  }

  toString(): string {
    return `${this.getDate()} ${this.getMonthName()} ${this.getFullYear()}`;
  }

  render(locale = "en", showYear = true): string {
    const datePart = `${this.getDate()} ${this.getMonthName()}`;

    if (locale.toLowerCase().startsWith("he")) {
      return normalizeHebrewPunctuation(
        formatJewishDateInHebrew(
          toBasicJewishDate(this.value),
          showYear ? "D MMMM YYYY" : "D MMMM",
        ),
      );
    }

    return showYear ? `${datePart} ${this.getFullYear()}` : datePart;
  }

  renderGematriya(_suppressNikud = true, noYear = false): string {
    return normalizeHebrewPunctuation(
      formatJewishDateInHebrew(
        toBasicJewishDate(this.value),
        noYear ? "D MMMM" : "D MMMM YYYY",
      ),
    );
  }
}

export interface CalOptions {
  il?: boolean;
  noMinorFast?: boolean;
  noModern?: boolean;
  noRoshChodesh?: boolean;
  noSpecialShabbat?: boolean;
  candlelighting?: boolean;
  start?: Date;
  end?: Date;
}

export class Event {
  constructor(
    private readonly date: HDate,
    private readonly desc: string,
    private readonly categories: string[],
    private readonly flagValue: number,
    private readonly inIsrael: boolean,
    private readonly inDiaspora: boolean,
    private readonly eventUrl?: string,
  ) {}

  getDate(): HDate {
    return new HDate(this.date);
  }

  getDesc(): string {
    return this.desc;
  }

  render(_locale = "en"): string {
    return this.desc;
  }

  getCategories(): string[] {
    return [...this.categories];
  }

  getFlags(): number {
    return this.flagValue;
  }

  observedInIsrael(): boolean {
    return this.inIsrael;
  }

  observedInDiaspora(): boolean {
    return this.inDiaspora;
  }

  url(): string | undefined {
    return this.eventUrl;
  }
}

export type HolidayEvent = Event;

function createEventsForDate(date: HDate, il = false): Event[] {
  const basicDate = toBasicJewishDate(date.greg());
  const rules = computeHolidayRulesForDate(basicDate, il);
  const seen = new Set<string>();
  const events: Event[] = [];

  for (const rule of rules) {
    const key = `${basicDate.year}-${basicDate.monthName}-${basicDate.day}-${rule.name}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    events.push(
      new Event(
        date,
        rule.name,
        rule.categories,
        rule.flags,
        rule.observedInIsrael,
        rule.observedInDiaspora,
      ),
    );
  }

  return events;
}

export const HebrewCalendar = {
  getBirthdayOrAnniversary(targetHebrewYear: number, original: HDate): HDate | null {
    const month = adjustAdarAcrossLeapYears(
      original.getMonth(),
      original.getFullYear(),
      targetHebrewYear,
    );
    const day = Math.min(
      original.getDate(),
      HDate.daysInMonth(month, targetHebrewYear),
    );
    return new HDate(day, month, targetHebrewYear);
  },

  getYahrzeit(targetHebrewYear: number, original: HDate): HDate | null {
    const month = adjustAdarAcrossLeapYears(
      original.getMonth(),
      original.getFullYear(),
      targetHebrewYear,
    );
    const day = Math.min(
      original.getDate(),
      HDate.daysInMonth(month, targetHebrewYear),
    );
    return new HDate(day, month, targetHebrewYear);
  },

  getHolidaysOnDate(date: HDate, il = false): Event[] {
    return createEventsForDate(date, il);
  },

  getHolidaysForYearArray(year: number, il = false): Event[] {
    const start = new HDate(1, months.TISHREI, year).greg();
    const lastDayOfElul = HDate.daysInMonth(months.ELUL, year);
    const end = new HDate(lastDayOfElul, months.ELUL, year).greg();

    return this.calendar({
      il,
      start,
      end,
    });
  },

  calendar(options: CalOptions): Event[] {
    if (!options.start || !options.end) {
      return [];
    }

    const start = normalizeLocalDate(options.start);
    const end = normalizeLocalDate(options.end);
    const allEvents: Event[] = [];

    for (const day of eachDayOfInterval({ start, end })) {
      allEvents.push(...createEventsForDate(new HDate(day), options.il ?? false));
    }

    return applyCalendarFilters(allEvents, options);
  },
};
