import { calendarCalculationRunners } from "./runners/calendar-calculations";
import { dateCoreRunners } from "./runners/date-core";
import { rangeHolidayRunners } from "./runners/range-holidays";

export const FUNCTION_RUNNERS = {
  ...dateCoreRunners,
  ...calendarCalculationRunners,
  ...rangeHolidayRunners,
};
