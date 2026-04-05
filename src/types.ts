import type { HDate } from "./hebcal-compat.js";

export type HebrewMonthInput = number | string;

export interface HebrewDateParts {
  day: number;
  month: HebrewMonthInput;
  year: number;
}

export interface DualDate {
  greg: Date;
  heb: HDate;
  hebDay: number;
  hebMonth: number;
  hebYear: number;
  hebMonthName: string;
  hebString: string;
  hebDisplay: string;
}

export type DualDateInput = Date | HDate | DualDate | HebrewDateParts;

export interface DualDateRange {
  start: DualDate;
  end: DualDate;
}

export interface MonthSegment {
  hebMonth: number;
  hebMonthName: string;
  hebYear: number;
  gregMonth: number;
  gregYear: number;
  start: DualDate;
  end: DualDate;
  days: number;
}

export interface HebrewMonthInfo {
  month: number;
  name: string;
  nameHe: string;
  daysInMonth: number;
  year: number;
  isLeapYear: boolean;
  firstDay: DualDate;
  lastDay: DualDate;
}

export interface GregorianMonthInfo {
  month: number;
  year: number;
  name: string;
  daysInMonth: number;
  firstDay: DualDate;
  lastDay: DualDate;
  hebrewMonths: Array<{ month: number; year: number; name: string }>;
}

export interface HolidayInfo {
  id: string;
  name: string;
  displayName: string;
  date: DualDate;
  categories: string[];
  flags: number;
  observedInIsrael: boolean;
  observedInDiaspora: boolean;
  url?: string;
}

export interface HolidayQueryOptions {
  il?: boolean;
  locale?: string;
  noMinorFast?: boolean;
  noModern?: boolean;
  noRoshChodesh?: boolean;
  noSpecialShabbat?: boolean;
}

export interface HebrewYearInfo {
  year: number;
  isLeapYear: boolean;
  monthsInYear: number;
  daysInYear: number;
  longCheshvan: boolean;
  shortKislev: boolean;
  firstDay: DualDate;
  lastDay: DualDate;
}
