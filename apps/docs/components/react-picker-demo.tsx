"use client";

import * as React from "react";
import { HebrewDatePicker } from "hebrew-date-picker-react";

export function ReactPickerDemo() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  return (
    <div className="picker-demo">
      <HebrewDatePicker
        value={selected}
        onChange={setSelected}
        placeholder="Pick Gregorian/Hebrew date"
        modifiers={{
          weekend: (date) => date.getDay() === 5 || date.getDay() === 6,
        }}
        modifiersClassNames={{
          weekend: "hdp-day-weekend",
        }}
      />
      <p>
        Selected: {selected ? selected.toDateString() : "No date selected yet"}
      </p>
    </div>
  );
}
