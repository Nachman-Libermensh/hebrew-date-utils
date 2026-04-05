# hebrew-date-utils

Date-only Hebrew/Gregorian utility toolkit built on top of @hebcal/core and date-fns.

EN: This package is an extension layer for practical date workflows.
HE: החבילה היא שכבת הרחבה נוחה לעבודה עם תאריכים עבריים ולועזיים.

## Why This Package

- Focused, composable helpers for Hebrew/Gregorian date logic
- Consistent DualDate model for working with both calendars at once
- Practical APIs for month boundaries, ranges, holidays, birthday, and yahrzeit
- Built on stable upstream rules from @hebcal/core

## Scope

Included:

- Hebrew <-> Gregorian conversions
- Hebrew/Gregorian month boundaries and date ranges
- Month metadata and navigation
- Holiday queries (Israel and Diaspora)
- Birthday and yahrzeit helpers

Excluded:

- Zmanim calculations (sunrise/sunset/candle-lighting)
- UI components (React package is out of scope for this core package)

## Installation | התקנה

```bash
npm install hebrew-date-utils
```

Requirements:

- Node.js 18+
- ESM runtime

## Quick Start

```ts
import {
  toDualDate,
  getHebrewMonthInfo,
  getHolidaysOn,
  getBirthdayInHebrewYear,
  formatDualDate,
} from "hebrew-date-utils";

const dual = toDualDate(new Date(2026, 3, 5));
console.log(dual.hebString);
console.log(formatDualDate(dual));

const monthInfo = getHebrewMonthInfo(5786, dual.hebMonth);
console.log(monthInfo.name, monthInfo.daysInMonth);

const holidays = getHolidaysOn(new Date(2026, 8, 12), { il: true });
console.log(holidays.map((h) => h.displayName));

const birthday = getBirthdayInHebrewYear(new Date(2014, 2, 2), 5787);
console.log(birthday?.hebString);
```

## Common Usage Patterns

### 1. Convert and normalize input dates

```ts
import { toDualDate, toGregorian, toHDate } from "hebrew-date-utils";

const dual = toDualDate({ day: 1, month: "Tishrei", year: 5787 });
const greg = toGregorian(dual);
const heb = toHDate(greg);
```

### 2. Split ranges by Hebrew months

```ts
import { splitRangeByHebrewMonth } from "hebrew-date-utils";

const segments = splitRangeByHebrewMonth(
  new Date(2026, 8, 1),
  new Date(2026, 10, 15),
);
```

### 3. Query holidays for Israel vs Diaspora

```ts
import { getHolidaysOn } from "hebrew-date-utils";

const date = new Date(2026, 4, 23);
const il = getHolidaysOn(date, { il: true });
const diaspora = getHolidaysOn(date, { il: false });
```

## API Modules

- types
- constants
- conversion
- month-utils
- boundaries
- ranges
- info
- membership
- navigation
- formatting
- holidays
- year
- arithmetic

Detailed function reference: see docs/API.md

## Core Compatibility Exports

```ts
import { HDate, months, HebrewCalendar } from "hebrew-date-utils";
```

## Time Behavior

- The library uses local system time for date boundary behavior.
- All Date outputs are normalized to local date boundaries.
- Around midnight and timezone transitions, verify behavior with your runtime locale.

## Development

```bash
npm run typecheck
npm test
npm run build
```

## Publish Readiness

```bash
npm run release:check
```

Publishing guide: see docs/PUBLISHING.md

## Versioning

- Current line is 0.x for API stabilization.
- Breaking changes may occur between minor versions while API is hardening.
