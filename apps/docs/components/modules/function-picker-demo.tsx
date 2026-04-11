"use client";

import * as React from "react";

import { addDays, format } from "date-fns";
import { formatHebrewDate } from "hebrew-date-utils";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { HebrewCalendar } from "@/components/ui/hebrew-calendar";

export type PickerCalendarKind = "hebrew" | "gregorian";
export type PickerSelectionMode = "single" | "range";

export function FunctionPickerDemo({
  calendar,
  mode,
  title,
}: {
  calendar: PickerCalendarKind;
  mode: PickerSelectionMode;
  title: string;
}) {
  const [singleValue, setSingleValue] = React.useState<Date | undefined>(
    new Date(2026, 3, 10),
  );
  const [rangeValue, setRangeValue] = React.useState<DateRange | undefined>({
    from: new Date(2026, 3, 10),
    to: addDays(new Date(2026, 3, 10), 7),
  });

  const formatByCalendar = React.useCallback(
    (value: Date | undefined) => {
      if (!value) {
        return "-";
      }

      if (calendar === "hebrew") {
        return formatHebrewDate(value);
      }

      return format(value, "dd/MM/yyyy");
    },
    [calendar],
  );

  const selectedValue =
    mode === "single"
      ? formatByCalendar(singleValue)
      : rangeValue?.from
        ? rangeValue.to
          ? `${formatByCalendar(rangeValue.from)} -> ${formatByCalendar(rangeValue.to)}`
          : formatByCalendar(rangeValue.from)
        : "-";

  const compactCalendarClass =
    "rounded-xl border border-border/70 bg-background p-1 [--cell-size:--spacing(6)]";

  return (
    <div className="space-y-2 rounded-xl border bg-card p-2.5">
      <p className="text-[11px] font-medium text-muted-foreground">{title}</p>

      {calendar === "hebrew" ? (
        mode === "single" ? (
          <HebrewCalendar
            mode="single"
            selected={singleValue}
            onSelect={setSingleValue}
            className={compactCalendarClass}
            captionLayout="dropdown"
          />
        ) : (
          <HebrewCalendar
            mode="range"
            selected={rangeValue}
            onSelect={setRangeValue}
            className={compactCalendarClass}
            captionLayout="dropdown"
          />
        )
      ) : mode === "single" ? (
        <Calendar
          mode="single"
          selected={singleValue}
          onSelect={setSingleValue}
          className={compactCalendarClass}
          captionLayout="dropdown"
        />
      ) : (
        <Calendar
          mode="range"
          selected={rangeValue}
          onSelect={setRangeValue}
          className={compactCalendarClass}
          captionLayout="dropdown"
        />
      )}

      <div className="rounded-md bg-muted px-2 py-1.5 text-[11px] text-muted-foreground">
        נבחר: <span className="font-medium text-foreground">{selectedValue}</span>
      </div>
    </div>
  );
}
