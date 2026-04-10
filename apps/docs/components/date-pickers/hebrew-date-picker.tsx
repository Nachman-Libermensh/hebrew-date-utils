"use client"

import * as React from "react"

import { formatHebrewDate } from "hebrew-date-utils"
import { CalendarIcon } from "lucide-react"

import type { ReusablePickerSelectionProps } from "@/components/date-pickers/types"
import { Button } from "@/components/ui/button"
import { HebrewCalendar } from "@/components/ui/hebrew-calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type HebrewDatePickerProps = ReusablePickerSelectionProps &
  Omit<
    React.ComponentProps<typeof HebrewCalendar>,
    "mode" | "selected" | "onSelect"
  > & {
    placeholder?: string
    triggerClassName?: string
    contentClassName?: string
    closeOnSelect?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    align?: React.ComponentProps<typeof PopoverContent>["align"]
  }

function buildTriggerLabel(
  props: ReusablePickerSelectionProps,
  placeholder: string
) {
  if (props.mode === "multiple") {
    const selected = props.selected

    if (!selected || selected.length === 0) {
      return placeholder
    }

    if (selected.length === 1) {
      return formatHebrewDate(selected[0])
    }

    return `${selected.length} תאריכים נבחרו`
  }

  if (props.mode === "range") {
    const selected = props.selected

    if (!selected?.from) {
      return placeholder
    }

    if (!selected.to) {
      return formatHebrewDate(selected.from)
    }

    return `${formatHebrewDate(selected.from)} - ${formatHebrewDate(selected.to)}`
  }

  if (!props.selected) {
    return placeholder
  }

  return formatHebrewDate(props.selected)
}

function HebrewDatePicker({
  placeholder = "בחר/י תאריך עברי",
  triggerClassName,
  contentClassName,
  closeOnSelect,
  open: openProp,
  onOpenChange,
  align = "start",
  ...props
}: HebrewDatePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const open = openProp ?? internalOpen
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [openProp, onOpenChange]
  )

  const triggerLabel = buildTriggerLabel(props, placeholder)
  const isEmpty = triggerLabel === placeholder
  const shouldAutoClose = closeOnSelect ?? props.mode !== "multiple"

  const trigger = (
    <Button
      type="button"
      variant="outline"
      dir="rtl"
      className={cn(
        "w-full justify-between gap-2 text-right font-normal",
        isEmpty && "text-muted-foreground",
        triggerClassName
      )}
    >
      <span className="truncate">{triggerLabel}</span>
      <CalendarIcon className="size-4 opacity-70" />
    </Button>
  )

  const renderWithPopover = (calendarNode: React.ReactNode) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent
        dir="rtl"
        className={cn("w-auto p-0", contentClassName)}
        align={align}
      >
        {calendarNode}
      </PopoverContent>
    </Popover>
  )

  if (props.mode === "multiple") {
    const { mode, selected, onSelect, ...calendarProps } = props

    return renderWithPopover(
      <HebrewCalendar
        {...calendarProps}
        captionLayout={calendarProps.captionLayout ?? "dropdown"}
        mode={mode}
        selected={selected}
        onSelect={(next) => {
          onSelect?.(next as Date[] | undefined)

          if (shouldAutoClose && next && next.length > 0) {
            setOpen(false)
          }
        }}
      />
    )
  }

  if (props.mode === "range") {
    const { mode, selected, onSelect, ...calendarProps } = props

    return renderWithPopover(
      <HebrewCalendar
        {...calendarProps}
        captionLayout={calendarProps.captionLayout ?? "dropdown"}
        mode={mode}
        selected={selected}
        onSelect={(next) => {
          onSelect?.(next)

          if (shouldAutoClose && next?.from && next.to) {
            setOpen(false)
          }
        }}
      />
    )
  }

  const { selected, onSelect, ...calendarProps } = props

  return renderWithPopover(
    <HebrewCalendar
      {...calendarProps}
      captionLayout={calendarProps.captionLayout ?? "dropdown"}
      mode="single"
      selected={selected}
      onSelect={(next) => {
        onSelect?.(next as Date | undefined)

        if (shouldAutoClose && next) {
          setOpen(false)
        }
      }}
    />
  )
}

export { HebrewDatePicker }
