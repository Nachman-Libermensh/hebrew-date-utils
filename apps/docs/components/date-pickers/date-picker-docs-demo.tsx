"use client";

import * as React from "react";

import { addDays, format } from "date-fns";
import { formatHebrewDate } from "hebrew-date-utils";
import type { DateRange } from "react-day-picker";

import { DatePicker, HebrewDatePicker } from "@/components/date-pickers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarFlavor = "hebrew" | "gregorian";
type SelectionMode = "single" | "range";

const DEFAULT_DATE = new Date(2026, 3, 10);
const DEFAULT_RANGE: DateRange = {
  from: DEFAULT_DATE,
  to: addDays(DEFAULT_DATE, 6),
};

function formatSingle(date: Date | undefined, flavor: CalendarFlavor) {
  if (!date) {
    return "-";
  }

  if (flavor === "hebrew") {
    return formatHebrewDate(date);
  }

  return format(date, "dd/MM/yyyy");
}

function formatRange(range: DateRange | undefined, flavor: CalendarFlavor) {
  if (!range?.from) {
    return "-";
  }

  if (!range.to) {
    return formatSingle(range.from, flavor);
  }

  return `${formatSingle(range.from, flavor)} -> ${formatSingle(range.to, flavor)}`;
}

export function DatePickerDocsDemo() {
  const [flavor, setFlavor] = React.useState<CalendarFlavor>("hebrew");
  const [mode, setMode] = React.useState<SelectionMode>("single");
  const [singleValue, setSingleValue] = React.useState<Date | undefined>(
    DEFAULT_DATE,
  );
  const [rangeValue, setRangeValue] = React.useState<DateRange | undefined>(
    DEFAULT_RANGE,
  );

  const summary = React.useMemo(() => {
    if (mode === "single") {
      return {
        mode,
        flavor,
        selected: formatSingle(singleValue, flavor),
      };
    }

    return {
      mode,
      flavor,
      selected: formatRange(rangeValue, flavor),
      raw: rangeValue
        ? {
            from: rangeValue.from?.toISOString().slice(0, 10) ?? null,
            to: rangeValue.to?.toISOString().slice(0, 10) ?? null,
          }
        : null,
    };
  }, [mode, flavor, singleValue, rangeValue]);

  return (
    <div className="docs-demo-panel">
      <div className="docs-demo-toolbar">
        <div className="docs-demo-group">
          <span>לוח</span>
          <div className="docs-demo-switch">
            <Button
              type="button"
              size="sm"
              variant={flavor === "hebrew" ? "default" : "ghost"}
              className={cn("h-7 rounded-full px-3 text-xs")}
              onClick={() => setFlavor("hebrew")}
            >
              עברי
            </Button>
            <Button
              type="button"
              size="sm"
              variant={flavor === "gregorian" ? "default" : "ghost"}
              className={cn("h-7 rounded-full px-3 text-xs")}
              onClick={() => setFlavor("gregorian")}
            >
              לועזי
            </Button>
          </div>
        </div>

        <div className="docs-demo-group">
          <span>מצב בחירה</span>
          <div className="docs-demo-switch">
            <Button
              type="button"
              size="sm"
              variant={mode === "single" ? "default" : "ghost"}
              className={cn("h-7 rounded-full px-3 text-xs")}
              onClick={() => setMode("single")}
            >
              Single
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "range" ? "default" : "ghost"}
              className={cn("h-7 rounded-full px-3 text-xs")}
              onClick={() => setMode("range")}
            >
              Range
            </Button>
          </div>
        </div>
      </div>

      <div className="docs-demo-picker">
        {flavor === "hebrew" ? (
          mode === "single" ? (
            <HebrewDatePicker
              selected={singleValue}
              onSelect={setSingleValue}
              placeholder="בחר/י תאריך עברי"
            />
          ) : (
            <HebrewDatePicker
              mode="range"
              selected={rangeValue}
              onSelect={setRangeValue}
              placeholder="בחר/י טווח תאריכים"
            />
          )
        ) : mode === "single" ? (
          <DatePicker
            selected={singleValue}
            onSelect={setSingleValue}
            placeholder="Select date"
          />
        ) : (
          <DatePicker
            mode="range"
            selected={rangeValue}
            onSelect={setRangeValue}
            placeholder="Select range"
          />
        )}
      </div>

      <pre className="docs-demo-output">{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
}
