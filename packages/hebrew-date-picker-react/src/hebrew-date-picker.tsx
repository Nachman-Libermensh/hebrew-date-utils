"use client";

import * as React from "react";
import {
  addGregorianMonths,
  listDaysInGregorianMonth,
  toDualDate,
  toIsoDate,
  type DualDate,
} from "hebrew-date-utils";
import { Button } from "./components/ui/button.js";
import { Card, CardContent } from "./components/ui/card.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select.js";
import { cn } from "./lib/cn.js";
import type {
  DayModifierMatcher,
  HebrewDatePickerCaptionProps,
  HebrewDatePickerClassNames,
  HebrewDatePickerDayCellProps,
  HebrewDatePickerProps,
} from "./types.js";

interface CalendarCell {
  date: Date;
  outside: boolean;
}

const HEBREW_WEEKDAY_LETTERS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

function isHebrewLocale(locale: string): boolean {
  const normalized = locale.toLowerCase();
  return normalized === "he" || normalized.startsWith("he-");
}

function getDefaultWeekdayLabel(weekday: number, locale: string): string {
  if (isHebrewLocale(locale)) {
    return HEBREW_WEEKDAY_LETTERS[weekday] ?? "";
  }

  const date = new Date(2024, 0, 7 + weekday);
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
  }).format(date);
}

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date | undefined, b: Date | undefined): boolean {
  if (!a || !b) {
    return false;
  }
  return toIsoDate(a) === toIsoDate(b);
}

function buildMonthCells(
  month: Date,
  weekStartsOn: number,
  showOutsideDays: boolean,
): Array<CalendarCell | null> {
  const days = listDaysInGregorianMonth(
    month.getFullYear(),
    month.getMonth(),
  ).map((item) => normalizeDate(item.greg));

  const firstWeekday = (days[0]!.getDay() - weekStartsOn + 7) % 7;
  const cells: Array<CalendarCell | null> = [];

  if (showOutsideDays) {
    for (let i = firstWeekday; i > 0; i -= 1) {
      const d = new Date(month.getFullYear(), month.getMonth(), 1 - i);
      cells.push({ date: normalizeDate(d), outside: true });
    }
  } else {
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null);
    }
  }

  for (const day of days) {
    cells.push({ date: day, outside: false });
  }

  const remainder = cells.length % 7;
  const trailingSlots = remainder === 0 ? 0 : 7 - remainder;

  if (showOutsideDays) {
    for (let i = 1; i <= trailingSlots; i += 1) {
      const d = new Date(
        month.getFullYear(),
        month.getMonth(),
        days.length + i,
      );
      cells.push({ date: normalizeDate(d), outside: true });
    }
  } else {
    for (let i = 0; i < trailingSlots; i += 1) {
      cells.push(null);
    }
  }

  return cells;
}

function matchDisabled(
  date: Date,
  dual: DualDate,
  disabled: HebrewDatePickerProps["disabled"],
  disabledIsoSet: Set<string> | null,
): boolean {
  if (!disabled) {
    return false;
  }

  if (Array.isArray(disabled)) {
    return Boolean(disabledIsoSet?.has(toIsoDate(date)));
  }

  return disabled(date, dual);
}

function getDayModifiers(
  date: Date,
  dual: DualDate,
  modifiers: Record<string, DayModifierMatcher>,
): string[] {
  const names: string[] = [];
  for (const [name, matcher] of Object.entries(modifiers)) {
    if (matcher(date, dual)) {
      names.push(name);
    }
  }
  return names;
}

function getWeekdayOrder(weekStartsOn: number): number[] {
  return Array.from({ length: 7 }, (_, idx) => (idx + weekStartsOn) % 7);
}

function DefaultDayCell({
  label,
  hebrewLabel,
  className,
  onSelect,
  isDisabled,
}: HebrewDatePickerDayCellProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      disabled={isDisabled}
    >
      <span className="hdp-day-label">{label}</span>
      <span className="hdp-hebrew-label">{hebrewLabel}</span>
    </button>
  );
}

function DefaultCaption({
  monthValue,
  yearValue,
  monthOptions,
  yearOptions,
  onMonthValueChange,
  onYearValueChange,
  onPreviousMonth,
  onNextMonth,
  classNames,
}: HebrewDatePickerCaptionProps) {
  return (
    <div className={classNames.caption}>
      <Button
        variant="outline"
        size="sm"
        className={classNames.navButton}
        onClick={onPreviousMonth}
      >
        Prev
      </Button>
      <div className="hdp-caption-controls">
        <Select value={monthValue} onValueChange={onMonthValueChange}>
          <SelectTrigger className="hdp-caption-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={yearValue} onValueChange={onYearValueChange}>
          <SelectTrigger className="hdp-caption-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        size="sm"
        className={classNames.navButton}
        onClick={onNextMonth}
      >
        Next
      </Button>
    </div>
  );
}

export const defaultHebrewDatePickerClassNames: HebrewDatePickerClassNames = {
  root: "hdp-root",
  trigger: "hdp-trigger",
  popoverContent: "hdp-content",
  monthContainer: "hdp-month-panel",
  caption: "hdp-caption",
  navButton: "hdp-nav-button",
  monthLabel: "hdp-month-label",
  weekdaysRow: "hdp-weekdays",
  weekdayCell: "hdp-weekday-cell",
  daysGrid: "hdp-days-grid",
  dayCell: "hdp-day-cell",
  dayButton: "hdp-day-button",
  daySelected: "hdp-day-selected",
  dayToday: "hdp-day-today",
  dayOutside: "hdp-day-outside",
  dayDisabled: "hdp-day-disabled",
  dayInner: "hdp-day-inner",
  dayHebrew: "hdp-day-hebrew",
};

export function HebrewDatePicker({
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  numberOfMonths = 1,
  placeholder = "Select date",
  closeOnSelect = true,
  locale = "en-US",
  weekStartsOn = 0,
  yearRange,
  showOutsideDays = true,
  disabled,
  modifiers = {},
  modifiersClassNames = {},
  classNames,
  formatters,
  components,
}: HebrewDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const initialSelected = defaultValue
    ? normalizeDate(defaultValue)
    : undefined;
  const [internalSelected, setInternalSelected] = React.useState<
    Date | undefined
  >(initialSelected);

  const selected = value ? normalizeDate(value) : internalSelected;

  const initialMonth = normalizeDate(
    month ?? defaultMonth ?? value ?? defaultValue ?? new Date(),
  );
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );

  const visibleMonth = month
    ? new Date(month.getFullYear(), month.getMonth(), 1)
    : internalMonth;

  const mergedClassNames: HebrewDatePickerClassNames = {
    ...defaultHebrewDatePickerClassNames,
    ...classNames,
  };

  const disabledIsoSet = React.useMemo(() => {
    if (!Array.isArray(disabled)) {
      return null;
    }

    return new Set(disabled.map((d) => toIsoDate(normalizeDate(d))));
  }, [disabled]);

  const currentYear = visibleMonth.getFullYear();
  const yearFrom = yearRange?.from ?? currentYear - 7;
  const yearTo = yearRange?.to ?? currentYear + 7;
  const years = Array.from(
    { length: Math.max(yearTo - yearFrom + 1, 1) },
    (_, i) => yearFrom + i,
  );

  const weekdayOrder = getWeekdayOrder(weekStartsOn);

  const DayCellComponent = components?.DayCell ?? DefaultDayCell;
  const CaptionComponent = components?.Caption ?? DefaultCaption;

  const updateVisibleMonth = React.useCallback(
    (nextMonth: Date) => {
      const normalized = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1,
      );
      if (!month) {
        setInternalMonth(normalized);
      }
      onMonthChange?.(normalized);
    },
    [month, onMonthChange],
  );

  const triggerLabel = React.useMemo(() => {
    if (!selected) {
      return placeholder;
    }
    const greg = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
    }).format(selected);
    const heb = toDualDate(selected).hebString;
    return `${greg} | ${heb}`;
  }, [selected, placeholder, locale]);

  return (
    <div className={mergedClassNames.root}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={mergedClassNames.trigger}>
            {triggerLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={mergedClassNames.popoverContent}>
          <Card>
            <CardContent>
              <div className="hdp-months-wrap">
                {Array.from(
                  { length: Math.max(1, numberOfMonths) },
                  (_, monthIndex) => {
                    const panelMonth = new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + monthIndex,
                      1,
                    );

                    const cells = buildMonthCells(
                      panelMonth,
                      weekStartsOn,
                      showOutsideDays,
                    );

                    const captionLabel = formatters?.formatCaption
                      ? formatters.formatCaption(panelMonth, locale)
                      : new Intl.DateTimeFormat(locale, {
                          month: "long",
                          year: "numeric",
                        }).format(panelMonth);

                    const monthOptions = Array.from({ length: 12 }, (_, m) => ({
                      value: String(m),
                      label: new Intl.DateTimeFormat(locale, {
                        month: "long",
                      }).format(new Date(panelMonth.getFullYear(), m, 1)),
                    }));

                    const yearOptions = years.map((year) => ({
                      value: String(year),
                      label: String(year),
                    }));

                    const updatePanelMonth = (
                      nextYear: number,
                      nextMonth: number,
                    ) => {
                      const target = new Date(nextYear, nextMonth, 1);
                      target.setMonth(target.getMonth() - monthIndex);
                      updateVisibleMonth(target);
                    };

                    return (
                      <section
                        key={`${panelMonth.getFullYear()}-${panelMonth.getMonth()}`}
                        className={mergedClassNames.monthContainer}
                      >
                        <CaptionComponent
                          month={panelMonth}
                          captionLabel={captionLabel}
                          monthValue={String(panelMonth.getMonth())}
                          yearValue={String(panelMonth.getFullYear())}
                          monthOptions={monthOptions}
                          yearOptions={yearOptions}
                          onMonthValueChange={(value) =>
                            updatePanelMonth(
                              panelMonth.getFullYear(),
                              Number(value),
                            )
                          }
                          onYearValueChange={(value) =>
                            updatePanelMonth(
                              Number(value),
                              panelMonth.getMonth(),
                            )
                          }
                          onPreviousMonth={() =>
                            updateVisibleMonth(
                              addGregorianMonths(visibleMonth, -1).greg,
                            )
                          }
                          onNextMonth={() =>
                            updateVisibleMonth(
                              addGregorianMonths(visibleMonth, 1).greg,
                            )
                          }
                          classNames={mergedClassNames}
                        />

                        <div className={mergedClassNames.monthLabel}>
                          {captionLabel}
                        </div>

                        <div className={mergedClassNames.weekdaysRow}>
                          {weekdayOrder.map((weekday) => {
                            const label = formatters?.formatWeekday
                              ? formatters.formatWeekday(weekday, locale)
                              : getDefaultWeekdayLabel(weekday, locale);

                            return (
                              <div
                                key={weekday}
                                className={mergedClassNames.weekdayCell}
                              >
                                {label}
                              </div>
                            );
                          })}
                        </div>

                        <div className={mergedClassNames.daysGrid}>
                          {cells.map((cell, idx) => {
                            if (!cell) {
                              return (
                                <div
                                  key={`empty-${idx}`}
                                  className={mergedClassNames.dayCell}
                                />
                              );
                            }

                            const dual = toDualDate(cell.date);
                            const isSelected = sameDay(selected, cell.date);
                            const isToday = sameDay(
                              normalizeDate(new Date()),
                              cell.date,
                            );
                            const isDisabled = matchDisabled(
                              cell.date,
                              dual,
                              disabled,
                              disabledIsoSet,
                            );
                            const matchedModifiers = getDayModifiers(
                              cell.date,
                              dual,
                              modifiers,
                            );

                            const classes = cn(
                              mergedClassNames.dayButton,
                              isSelected && mergedClassNames.daySelected,
                              isToday && mergedClassNames.dayToday,
                              cell.outside && mergedClassNames.dayOutside,
                              isDisabled && mergedClassNames.dayDisabled,
                              ...matchedModifiers.map(
                                (name) => modifiersClassNames[name] ?? "",
                              ),
                            );

                            const dayLabel = formatters?.formatDayLabel
                              ? formatters.formatDayLabel(dual)
                              : cell.date.getDate();

                            const hebrewDayLabel =
                              formatters?.formatHebrewDayLabel
                                ? formatters.formatHebrewDayLabel(dual)
                                : dual.hebDay;

                            const selectDay = () => {
                              if (isDisabled) {
                                return;
                              }

                              const nextDate = normalizeDate(cell.date);
                              if (!value) {
                                setInternalSelected(nextDate);
                              }
                              onChange?.(nextDate);
                              if (closeOnSelect) {
                                setOpen(false);
                              }
                            };

                            return (
                              <div
                                key={`${toIsoDate(cell.date)}-${idx}`}
                                className={mergedClassNames.dayCell}
                              >
                                <DayCellComponent
                                  date={cell.date}
                                  dual={dual}
                                  label={dayLabel}
                                  hebrewLabel={hebrewDayLabel}
                                  isSelected={isSelected}
                                  isToday={isToday}
                                  isOutside={cell.outside}
                                  isDisabled={isDisabled}
                                  modifiers={matchedModifiers}
                                  className={classes}
                                  onSelect={selectDay}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  },
                )}
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
