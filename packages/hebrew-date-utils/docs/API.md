# API Reference

This document summarizes the public API exported by hebrew-date-utils.

For usage examples and expected outputs for every function, see README.md.

## Core Models

- DualDate: normalized Gregorian and Hebrew representations of the same date
- DualDateInput: Date | HDate | DualDate | HebrewDateParts
- DualDateRange: start/end DualDate
- MonthSegment: range segment split by Hebrew month
- HebrewMonthInfo, GregorianMonthInfo, HebrewYearInfo
- HolidayInfo, HolidayQueryOptions

## Module: conversion

- toHDate(input)
- toGregorian(input)
- toDualDate(input)
- fromGregorianDate(date)
- fromHebrewDate(day, month, year)
- todayDualDate(referenceDate?)

## Module: month-utils

- normalizeHebrewMonth(month)
- isHebrewLeapYear(year)
- getMonthsInHebrewYear(year)
- getDaysInGregorianMonth(year, month)
- getDaysInHebrewMonth(year, month)
- getHebrewMonthName(month, year)
- getHebrewMonthNameHe(month, year)
- getHebrewMonthNameEn(month, year)
- getHebrewYearMonths(year)

## Module: boundaries

- getGregorianMonthFirstDay(year, month)
- getGregorianMonthLastDay(year, month)
- getGregorianMonthBoundaries(year, month)
- getHebrewMonthFirstDay(year, month)
- getHebrewMonthLastDay(year, month)
- getHebrewMonthBoundaries(year, month)

## Module: ranges

- makeDualDateRange(start, end)
- listDualDatesInRange(start, end)
- listDaysInGregorianMonth(year, month)
- listDaysInHebrewMonth(year, month)
- splitRangeByHebrewMonth(start, end)
- splitRangeByGregorianMonth(start, end)
- getHebrewMonthRange(year, month)

## Module: info

- getHebrewMonthInfo(year, month)
- getGregorianMonthInfo(year, month)

## Module: membership

- isDateInHebrewMonth(input, month, year)
- isDateInGregorianMonth(input, month, year)
- isSameHebrewDate(a, b)
- isSameGregorianDate(a, b)
- compareDualDates(a, b)
- isWithinDualDateRange(input, range)

## Module: navigation

- addGregorianDays(input, amount)
- addGregorianMonths(input, amount)
- addGregorianYears(input, amount)
- addHebrewDays(input, amount)
- addHebrewMonths(input, amount)
- addHebrewYears(input, amount)
- nextHebrewMonth(input)
- previousHebrewMonth(input)
- shiftHebrewMonth(month, year, offset)

## Module: formatting

- formatGregorian(input, pattern?)
- formatHebrew(input, options?)
- formatDualDate(input, gregorianPattern?)
- hebrewMonthGematriya(month)
- getWeekdayName(input, locale?, style?)
- toIsoDate(input)

## Module: holidays

- getHolidaysOn(date, options?)
- getHolidaysForHebrewYear(year, options?)
- getHolidaysBetween(start, end, options?)
- isHoliday(date, options?)

Note:

- options.il toggles Israel (true) vs Diaspora (false/default)
- This package does not calculate zmanim

## Module: year

- getCurrentDualDate(referenceDate?)
- getCurrentHebrewYear(referenceDate?)
- getHebrewYearInfo(year)
- getHebrewYearForGregorianYear(gregorianYear)

## Module: arithmetic

- differenceInDualDays(left, right)
- differenceInDualMonths(left, right)
- differenceInDualYears(left, right)
- differenceInHebrewMonths(left, right)
- differenceInHebrewYears(left, right)
- getBirthdayInHebrewYear(originalDate, targetHebrewYear)
- getYahrzeitInHebrewYear(dateOfDeath, targetHebrewYear)
- getGregorianAge(birthDate, atDate?)
- getHebrewAge(originalDate, atDate?)

## Compatibility Exports

- HDate
- months
- HebrewCalendar

Imported from:

- @hebcal/core
