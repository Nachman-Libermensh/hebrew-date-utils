# hebrew-date-picker-react

Customizable React date picker built for Hebrew/Gregorian date workflows.

## Features

- Built on top of `hebrew-date-utils`
- Extension points inspired by `react-day-picker`
- shadcn-style primitives (`Button`, `Popover`, `Card`, `Select`)
- Supports custom day modifiers, class overrides, and custom render components

## Install

```bash
npm install hebrew-date-picker-react hebrew-date-utils
```

## Basic Usage

```tsx
import { useState } from "react";
import { HebrewDatePicker } from "hebrew-date-picker-react";

export function Example() {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <HebrewDatePicker
      value={value}
      onChange={setValue}
      placeholder="Select a date"
    />
  );
}
```

## Custom Modifiers

```tsx
<HebrewDatePicker
  modifiers={{
    friday: (date) => date.getDay() === 5,
  }}
  modifiersClassNames={{
    friday: "my-friday-class",
  }}
/>
```

## Exports

- `HebrewDatePicker`
- `defaultHebrewDatePickerClassNames`
- all type exports from `types`
