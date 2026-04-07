import type { DualDate } from "hebrew-date-utils";
import type { ReactNode } from "react";

export type DayModifierMatcher = (date: Date, dual: DualDate) => boolean;

export type DisabledMatcher = DayModifierMatcher | Date[];

export interface HebrewDatePickerClassNames {
  root: string;
  trigger: string;
  popoverContent: string;
  monthContainer: string;
  caption: string;
  navButton: string;
  monthLabel: string;
  weekdaysRow: string;
  weekdayCell: string;
  daysGrid: string;
  dayCell: string;
  dayButton: string;
  daySelected: string;
  dayToday: string;
  dayOutside: string;
  dayDisabled: string;
  dayInner: string;
  dayHebrew: string;
}

export interface HebrewDatePickerDayCellProps {
  date: Date;
  dual: DualDate;
  label: ReactNode;
  hebrewLabel: ReactNode;
  isSelected: boolean;
  isToday: boolean;
  isOutside: boolean;
  isDisabled: boolean;
  modifiers: string[];
  className: string;
  onSelect: () => void;
}

export interface HebrewDatePickerCaptionProps {
  month: Date;
  captionLabel: string;
  monthValue: string;
  yearValue: string;
  monthOptions: Array<{ value: string; label: string }>;
  yearOptions: Array<{ value: string; label: string }>;
  onMonthValueChange: (value: string) => void;
  onYearValueChange: (value: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  classNames: HebrewDatePickerClassNames;
}

export interface HebrewDatePickerFormatters {
  formatCaption?: (month: Date, locale: string) => string;
  formatWeekday?: (weekday: number, locale: string) => string;
  formatDayLabel?: (dual: DualDate) => ReactNode;
  formatHebrewDayLabel?: (dual: DualDate) => ReactNode;
}

export interface HebrewDatePickerComponents {
  DayCell?: (props: HebrewDatePickerDayCellProps) => ReactNode;
  Caption?: (props: HebrewDatePickerCaptionProps) => ReactNode;
}

export interface HebrewDatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  numberOfMonths?: number;
  placeholder?: string;
  closeOnSelect?: boolean;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  yearRange?: { from: number; to: number };
  showOutsideDays?: boolean;
  disabled?: DisabledMatcher;
  modifiers?: Record<string, DayModifierMatcher>;
  modifiersClassNames?: Record<string, string>;
  classNames?: Partial<HebrewDatePickerClassNames>;
  formatters?: HebrewDatePickerFormatters;
  components?: HebrewDatePickerComponents;
}
