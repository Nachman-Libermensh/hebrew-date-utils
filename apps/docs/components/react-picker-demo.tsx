"use client";

import * as React from "react";
import {
  HebrewDatePicker,
  type HebrewDatePickerFormatters,
} from "hebrew-date-picker-react";
import { CodeBlock } from "@/components/code-block";

type DemoMode = "single" | "range";

interface DateRangeValue {
  from?: Date;
  to?: Date;
}

const HEB_DAY_LETTERS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

const weekdayLetterFormatters: HebrewDatePickerFormatters = {
  formatWeekday: (weekday) => HEB_DAY_LETTERS[weekday] ?? "",
};

const singleCode = String.raw`const [value, setValue] = useState<Date | undefined>();

<HebrewDatePicker
  value={value}
  onChange={setValue}
  locale="he-IL"
  formatters={{
    formatWeekday: (weekday) => ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"][weekday] ?? "",
  }}
/>
`;

const rangeCode = String.raw`const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

<HebrewDatePicker
  value={range.from}
  onChange={(from) => setRange((prev) => ({ ...prev, from }))}
/>

<HebrewDatePicker
  value={range.to}
  onChange={(to) => {
    setRange((prev) => {
      if (!to) return { ...prev, to: undefined };
      if (!prev.from || to.getTime() >= prev.from.getTime()) {
        return { ...prev, to };
      }
      return { from: to, to: prev.from };
    });
  }}
/>
`;

function formatDate(value?: Date): string {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "medium",
  }).format(value);
}

export function ReactPickerDemo() {
  const [mode, setMode] = React.useState<DemoMode>("single");
  const [singleDate, setSingleDate] = React.useState<Date | undefined>();
  const [range, setRange] = React.useState<DateRangeValue>({});

  const handleRangeFromChange = React.useCallback((from: Date | undefined) => {
    setRange((prev) => {
      if (!from) {
        return { from: undefined, to: undefined };
      }
      if (prev.to && prev.to.getTime() < from.getTime()) {
        return { from, to: undefined };
      }
      return { from, to: prev.to };
    });
  }, []);

  const handleRangeToChange = React.useCallback((to: Date | undefined) => {
    setRange((prev) => {
      if (!to) {
        return { ...prev, to: undefined };
      }
      if (!prev.from) {
        return { from: to, to: undefined };
      }
      if (to.getTime() < prev.from.getTime()) {
        return { from: to, to: prev.from };
      }
      return { from: prev.from, to };
    });
  }, []);

  const isRangeMode = mode === "range";

  return (
    <div className="picker-demo">
      <div
        className="picker-mode-switch"
        role="tablist"
        aria-label="Selection mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={!isRangeMode}
          className={`picker-mode-button ${!isRangeMode ? "picker-mode-button-active" : ""}`}
          onClick={() => setMode("single")}
        >
          Single Date
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isRangeMode}
          className={`picker-mode-button ${isRangeMode ? "picker-mode-button-active" : ""}`}
          onClick={() => setMode("range")}
        >
          Date Range
        </button>
      </div>

      {!isRangeMode && (
        <div className="picker-card">
          <HebrewDatePicker
            value={singleDate}
            onChange={setSingleDate}
            placeholder="בחר תאריך"
            locale="he-IL"
            formatters={weekdayLetterFormatters}
            modifiers={{
              weekend: (date) => date.getDay() === 5 || date.getDay() === 6,
            }}
            modifiersClassNames={{
              weekend: "hdp-day-weekend",
            }}
          />
          <p className="picker-summary">
            <strong>Selected:</strong> {formatDate(singleDate)}
          </p>
        </div>
      )}

      {isRangeMode && (
        <div className="picker-card picker-range-card">
          <div className="picker-range-grid">
            <label className="picker-range-field">
              <span>From</span>
              <HebrewDatePicker
                value={range.from}
                onChange={handleRangeFromChange}
                placeholder="תאריך התחלה"
                locale="he-IL"
                formatters={weekdayLetterFormatters}
              />
            </label>
            <label className="picker-range-field">
              <span>To</span>
              <HebrewDatePicker
                value={range.to}
                onChange={handleRangeToChange}
                placeholder="תאריך סיום"
                locale="he-IL"
                formatters={weekdayLetterFormatters}
              />
            </label>
          </div>

          <p className="picker-summary">
            <strong>Range:</strong> {formatDate(range.from)} -{" "}
            {formatDate(range.to)}
          </p>

          <div className="picker-added-row">
            <span className="picker-added-badge">
              Added for range integration
            </span>
            <span className="picker-added-hint">
              Added data: <code>from</code>, <code>to</code>, and boundary
              guards.
            </span>
          </div>
        </div>
      )}

      <CodeBlock
        language="tsx"
        filename={isRangeMode ? "range-picker.tsx" : "single-picker.tsx"}
        sourcePath="apps/docs/components/react-picker-demo.tsx"
        code={isRangeMode ? rangeCode : singleCode}
        highlightLines={isRangeMode ? [1, 4, 5, 9, 10, 12, 15] : [1, 4, 5, 8]}
      />
    </div>
  );
}
