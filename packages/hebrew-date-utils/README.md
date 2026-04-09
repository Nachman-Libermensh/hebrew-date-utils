# hebrew-date-utils

Date-only Hebrew/Gregorian utility toolkit built on top of `@hebcal/core` and `date-fns`.

EN: Practical extension layer for Hebrew and Gregorian date workflows.
HE: שכבת הרחבה פרקטית לחישובי תאריכים עבריים ולועזיים.

## Scope | תחום הספריה

Included:

- Hebrew <-> Gregorian conversions
- Month boundaries, day listing, and range splitting
- Day/month/year differences (Gregorian + Hebrew)
- Date arithmetic (add days/months/years)
- Month and year metadata
- Membership/comparison helpers
- Holiday queries (Israel / Diaspora)
- Birthday and yahrzeit helpers

Excluded:

- Zmanim (sunrise/sunset/candle-lighting)
- UI components

## Installation | התקנה

```bash
npm install hebrew-date-utils
```

Requirements:

- Node.js 18+
- ESM runtime

## Core Conventions

- Gregorian month arguments are **zero-based** (`0=January`, `11=December`).
- All `Date` outputs are normalized to local date-only boundaries.
- Most APIs accept `DualDateInput`:
  `Date | HDate | DualDate | { day, month, year }`

## Data Model

`DualDate` includes both calendars in one object:

```ts
type DualDate = {
  greg: Date;
  heb: HDate;
  hebDay: number;
  hebMonth: number;
  hebYear: number;
  hebMonthName: string;
  hebString: string;
  hebDisplay: string;
};
```

## Quick Start

```ts
import {
  toDualDate,
  getHebrewMonthInfo,
  getHolidaysOn,
  differenceInDualMonths,
  addGregorianYears,
  formatDualDate,
} from "hebrew-date-utils";

const dual = toDualDate(new Date(2026, 3, 5));
// => DualDate

const monthInfo = getHebrewMonthInfo(5786, dual.hebMonth);
// => { name, daysInMonth, firstDay, lastDay, ... }

const holidays = getHolidaysOn(new Date(2026, 8, 12), { il: true });
// => HolidayInfo[]

const monthGap = differenceInDualMonths(
  new Date(2026, 6, 1),
  new Date(2026, 0, 1),
);
// => 6

const inTwoYears = addGregorianYears(dual, 2);
// => DualDate

console.log(formatDualDate(inTwoYears));
// => "2028-04-05 | ..."
```

## Full Function Catalog (Usage + Expected Output)

### Module: `conversion`

| Function                           | Usage                                                   | Expected Output |
| ---------------------------------- | ------------------------------------------------------- | --------------- |
| `toHDate(input)`                   | `toHDate(new Date(2026, 3, 5))`                         | `HDate`         |
| `toGregorian(input)`               | `toGregorian({ day: 1, month: "Tishrei", year: 5787 })` | `Date`          |
| `toDualDate(input)`                | `toDualDate(new Date(2026, 3, 5))`                      | `DualDate`      |
| `fromGregorianDate(date)`          | `fromGregorianDate(new Date(2026, 3, 5))`               | `DualDate`      |
| `fromHebrewDate(day, month, year)` | `fromHebrewDate(1, "Tishrei", 5787)`                    | `DualDate`      |
| `todayDualDate(referenceDate?)`    | `todayDualDate()`                                       | `DualDate`      |

### Module: `month-utils`

| Function                               | Usage                                   | Expected Output                |
| -------------------------------------- | --------------------------------------- | ------------------------------ |
| `normalizeHebrewMonth(month)`          | `normalizeHebrewMonth("Cheshvan")`      | `8` (month number)             |
| `isHebrewLeapYear(year)`               | `isHebrewLeapYear(5784)`                | `boolean`                      |
| `getMonthsInHebrewYear(year)`          | `getMonthsInHebrewYear(5784)`           | `12` or `13`                   |
| `getDaysInGregorianMonth(year, month)` | `getDaysInGregorianMonth(2024, 1)`      | `29`                           |
| `getDaysInHebrewMonth(year, month)`    | `getDaysInHebrewMonth(5785, "Tishrei")` | `29` or `30`                   |
| `getHebrewMonthName(month, year)`      | `getHebrewMonthName(7, 5785)`           | e.g. `"Tishrei"`               |
| `getHebrewMonthNameHe(month, year)`    | `getHebrewMonthNameHe(7, 5785)`         | Hebrew-style month label       |
| `getHebrewMonthNameEn(month, year)`    | `getHebrewMonthNameEn(7, 5785)`         | English transliteration        |
| `getHebrewYearMonths(year)`            | `getHebrewYearMonths(5785)`             | `Array<{ month, name, days }>` |

### Module: `boundaries`

| Function                                   | Usage                                     | Expected Output                      |
| ------------------------------------------ | ----------------------------------------- | ------------------------------------ |
| `getGregorianMonthFirstDay(year, month)`   | `getGregorianMonthFirstDay(2026, 3)`      | `DualDate` (1st of month)            |
| `getGregorianMonthLastDay(year, month)`    | `getGregorianMonthLastDay(2026, 3)`       | `DualDate` (last day)                |
| `getGregorianMonthBoundaries(year, month)` | `getGregorianMonthBoundaries(2026, 3)`    | `{ start: DualDate, end: DualDate }` |
| `getHebrewMonthFirstDay(year, month)`      | `getHebrewMonthFirstDay(5786, "Nisan")`   | `DualDate`                           |
| `getHebrewMonthLastDay(year, month)`       | `getHebrewMonthLastDay(5786, "Nisan")`    | `DualDate`                           |
| `getHebrewMonthBoundaries(year, month)`    | `getHebrewMonthBoundaries(5786, "Nisan")` | `{ start: DualDate, end: DualDate }` |

### Module: `ranges`

| Function                                 | Usage                                                          | Expected Output                   |
| ---------------------------------------- | -------------------------------------------------------------- | --------------------------------- |
| `makeDualDateRange(start, end)`          | `makeDualDateRange(d1, d2)`                                    | ordered `DualDateRange`           |
| `listDualDatesInRange(start, end)`       | `listDualDatesInRange(new Date(2026,0,1), new Date(2026,0,3))` | `DualDate[]` of length `3`        |
| `listDaysInGregorianMonth(year, month)`  | `listDaysInGregorianMonth(2026, 1)`                            | all days in month as `DualDate[]` |
| `listDaysInHebrewMonth(year, month)`     | `listDaysInHebrewMonth(5786, "Iyyar")`                         | all days in Hebrew month          |
| `splitRangeByHebrewMonth(start, end)`    | `splitRangeByHebrewMonth(d1, d2)`                              | `MonthSegment[]`                  |
| `splitRangeByGregorianMonth(start, end)` | `splitRangeByGregorianMonth(d1, d2)`                           | `DualDateRange[]`                 |
| `getHebrewMonthRange(year, month)`       | `getHebrewMonthRange(5786, "Sivan")`                           | `DualDateRange`                   |

### Module: `info`

| Function                             | Usage                                 | Expected Output      |
| ------------------------------------ | ------------------------------------- | -------------------- |
| `getHebrewMonthInfo(year, month)`    | `getHebrewMonthInfo(5786, "Tishrei")` | `HebrewMonthInfo`    |
| `getGregorianMonthInfo(year, month)` | `getGregorianMonthInfo(2026, 8)`      | `GregorianMonthInfo` |

### Module: `membership`

| Function                                     | Usage                                      | Expected Output                  |
| -------------------------------------------- | ------------------------------------------ | -------------------------------- |
| `isDateInHebrewMonth(input, month, year)`    | `isDateInHebrewMonth(date, "Nisan", 5786)` | `boolean`                        |
| `isDateInGregorianMonth(input, month, year)` | `isDateInGregorianMonth(date, 3, 2026)`    | `boolean`                        |
| `isSameHebrewDate(a, b)`                     | `isSameHebrewDate(a, b)`                   | `boolean`                        |
| `isSameGregorianDate(a, b)`                  | `isSameGregorianDate(a, b)`                | `boolean`                        |
| `compareDualDates(a, b)`                     | `compareDualDates(a, b)`                   | signed day difference (`number`) |
| `isWithinDualDateRange(input, range)`        | `isWithinDualDateRange(date, range)`       | `boolean`                        |

### Module: `navigation`

| Function                                | Usage                          | Expected Output                                 |
| --------------------------------------- | ------------------------------ | ----------------------------------------------- |
| `addGregorianDays(input, amount)`       | `addGregorianDays(date, 10)`   | `DualDate`                                      |
| `addGregorianMonths(input, amount)`     | `addGregorianMonths(date, 2)`  | `DualDate`                                      |
| `addGregorianYears(input, amount)`      | `addGregorianYears(date, 1)`   | `DualDate`                                      |
| `addHebrewDays(input, amount)`          | `addHebrewDays(date, 10)`      | `DualDate`                                      |
| `addHebrewMonths(input, amount)`        | `addHebrewMonths(date, 2)`     | `DualDate`                                      |
| `addHebrewYears(input, amount)`         | `addHebrewYears(date, 1)`      | `DualDate`                                      |
| `nextHebrewMonth(input)`                | `nextHebrewMonth(date)`        | first day of next Hebrew month (`DualDate`)     |
| `previousHebrewMonth(input)`            | `previousHebrewMonth(date)`    | first day of previous Hebrew month (`DualDate`) |
| `shiftHebrewMonth(month, year, offset)` | `shiftHebrewMonth(7, 5786, 1)` | `{ month, year, name }`                         |

### Module: `formatting`

| Function                                   | Usage                                  | Expected Output           |
| ------------------------------------------ | -------------------------------------- | ------------------------- | ---------- |
| `formatGregorian(input, pattern?)`         | `formatGregorian(date, "yyyy-MM-dd")`  | formatted `string`        |
| `formatHebrew(input, options?)`            | `formatHebrew(date, { locale: "he" })` | Hebrew formatted `string` |
| `formatDualDate(input, gregorianPattern?)` | `formatDualDate(date)`                 | `"yyyy-MM-dd              | <hebrew>"` |
| `hebrewMonthGematriya(month)`              | `hebrewMonthGematriya("Nisan")`        | Hebrew month gematria     |
| `getWeekdayName(input, locale?, style?)`   | `getWeekdayName(date, "en-US")`        | weekday name (`string`)   |
| `toIsoDate(input)`                         | `toIsoDate(date)`                      | `"yyyy-MM-dd"`            |

### Module: `holidays`

| Function                                   | Usage                                           | Expected Output |
| ------------------------------------------ | ----------------------------------------------- | --------------- |
| `getHolidaysOn(date, options?)`            | `getHolidaysOn(date, { il: true })`             | `HolidayInfo[]` |
| `getHolidaysForHebrewYear(year, options?)` | `getHolidaysForHebrewYear(5786, { il: false })` | `HolidayInfo[]` |
| `getHolidaysBetween(start, end, options?)` | `getHolidaysBetween(d1, d2, { locale: "he" })`  | `HolidayInfo[]` |
| `isHoliday(date, options?)`                | `isHoliday(date)`                               | `boolean`       |

### Module: `year`

| Function                                       | Usage                                 | Expected Output  |
| ---------------------------------------------- | ------------------------------------- | ---------------- |
| `getCurrentDualDate(referenceDate?)`           | `getCurrentDualDate()`                | `DualDate`       |
| `getCurrentHebrewYear(referenceDate?)`         | `getCurrentHebrewYear()`              | `number`         |
| `getHebrewYearInfo(year)`                      | `getHebrewYearInfo(5786)`             | `HebrewYearInfo` |
| `getHebrewYearForGregorianYear(gregorianYear)` | `getHebrewYearForGregorianYear(2026)` | `number`         |

### Module: `arithmetic`

| Function                                                  | Usage                                                            | Expected Output                           |
| --------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- |
| `differenceInDualDays(left, right)`                       | `differenceInDualDays(d2, d1)`                                   | signed day difference (`number`)          |
| `differenceInDualMonths(left, right)`                     | `differenceInDualMonths(new Date(2026,6,1), new Date(2026,0,1))` | `6`                                       |
| `differenceInDualYears(left, right)`                      | `differenceInDualYears(new Date(2028,0,1), new Date(2026,0,1))`  | `2`                                       |
| `differenceInHebrewMonths(left, right)`                   | `differenceInHebrewMonths(h2, h1)`                               | signed Hebrew month difference (`number`) |
| `differenceInHebrewYears(left, right)`                    | `differenceInHebrewYears(h2, h1)`                                | signed Hebrew year difference (`number`)  |
| `getBirthdayInHebrewYear(originalDate, targetHebrewYear)` | `getBirthdayInHebrewYear(birth, 5788)`                           | `DualDate \| null`                        |
| `getYahrzeitInHebrewYear(dateOfDeath, targetHebrewYear)`  | `getYahrzeitInHebrewYear(dateOfDeath, 5788)`                     | `DualDate \| null`                        |
| `getGregorianAge(birthDate, atDate?)`                     | `getGregorianAge(new Date(2000,0,1), new Date(2026,0,1))`        | `26`                                      |
| `getHebrewAge(originalDate, atDate?)`                     | `getHebrewAge(birthDate, atDate)`                                | non-negative `number`                     |

## Compatibility Exports

You can directly import Hebcal core primitives:

```ts
import { HDate, months, HebrewCalendar } from "hebrew-date-utils";
```

## Development

```bash
npm run typecheck
npm test
npm run build
```

## Release Check

```bash
npm run release:check
```

Publishing guide: see `docs/PUBLISHING.md`

## Detailed API Document

Extended reference: `docs/API.md`

## Versioning

- Current line is `0.x` for API stabilization.
- Minor versions may still include breaking changes while hardening API contracts.
