"use client";

import * as React from "react";
import { HebrewDatePicker } from "hebrew-date-picker-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { ApiExportKind } from "./catalog-types";
import { FUNCTION_RUNNERS } from "./playground/function-runners";
import { formatPlaygroundOutput } from "./playground/serialize";

const DEFAULT_PRIMARY_DATE = new Date(2026, 8, 12);
const DEFAULT_SECONDARY_DATE = new Date(2026, 8, 27);

interface ApiFunctionPlaygroundProps {
  exportName: string;
  kind: ApiExportKind;
}

export function ApiFunctionPlayground({
  exportName,
  kind,
}: ApiFunctionPlaygroundProps) {
  const [primaryDate, setPrimaryDate] = React.useState(DEFAULT_PRIMARY_DATE);
  const [secondaryDate, setSecondaryDate] =
    React.useState(DEFAULT_SECONDARY_DATE);
  const [shiftAmount, setShiftAmount] = React.useState(1);
  const [locale, setLocale] = React.useState<"he" | "en">("he");
  const [inIsrael, setInIsrael] = React.useState(true);

  if (kind !== "function") {
    return (
      <p className="text-xs text-muted-foreground">
        זהו יצוא מסוג {kind}. אינטראקציית תאריכים מוצגת לפונקציות בלבד.
      </p>
    );
  }

  const runner = FUNCTION_RUNNERS[exportName];
  if (!runner) {
    return (
      <p className="text-xs text-muted-foreground">
        כרגע אין Playground ייעודי לפונקציה הזו. הדוגמה והפלט הסטטי עדיין תקפים.
      </p>
    );
  }

  let runResult;
  try {
    runResult = runner({
      primaryDate,
      secondaryDate,
      shiftAmount,
      locale,
      inIsrael,
    });
  } catch (error) {
    runResult = {
      invocation: `${exportName}(...)`,
      output: {
        error: error instanceof Error ? error.message : String(error),
      },
    };
  }

  return (
    <div className="mt-3 grid gap-3 rounded-xl border border-foreground/10 bg-background/60 p-3">
      <div className="grid gap-2 md:grid-cols-2">
        <label className="grid gap-1 text-xs text-muted-foreground">
          <span>תאריך בסיס</span>
          <HebrewDatePicker
            value={primaryDate}
            onChange={(value) => value && setPrimaryDate(value)}
            placeholder="בחר תאריך בסיס"
            locale="he-IL"
          />
        </label>

        <label className="grid gap-1 text-xs text-muted-foreground">
          <span>תאריך להשוואה</span>
          <HebrewDatePicker
            value={secondaryDate}
            onChange={(value) => value && setSecondaryDate(value)}
            placeholder="בחר תאריך להשוואה"
            locale="he-IL"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Offset</span>
          <Input
            type="number"
            className="h-7 w-20"
            value={shiftAmount}
            onChange={(event) => setShiftAmount(Number(event.target.value))}
          />
        </label>

        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Locale</span>
          <Select
            value={locale}
            onValueChange={(value) => setLocale(value as "he" | "en")}
          >
            <SelectTrigger className="h-7 w-24">
              <SelectValue placeholder="Locale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he">he</SelectItem>
              <SelectItem value="en">en</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>ישראל</span>
          <Switch checked={inIsrael} onCheckedChange={setInIsrael} />
        </label>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setPrimaryDate(DEFAULT_PRIMARY_DATE);
            setSecondaryDate(DEFAULT_SECONDARY_DATE);
            setShiftAmount(1);
            setLocale("he");
            setInIsrael(true);
          }}
        >
          איפוס
        </Button>
      </div>

      <div className="rounded-lg border border-foreground/10 bg-[#10241d] p-3 text-[#dcfff3]">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-[#9ad6c3]">Invocation</span>
          <Badge variant="secondary">Live</Badge>
        </div>
        <pre className="overflow-x-auto text-xs leading-relaxed">
          {runResult.invocation}
        </pre>
      </div>

      <div className="rounded-lg border border-foreground/10 bg-[#0d1a16] p-3 text-[#d0ffef]">
        <span className="mb-2 block text-xs font-medium text-[#8bcfb8]">Output</span>
        <pre className="max-h-72 overflow-auto text-xs leading-relaxed">
          {formatPlaygroundOutput(runResult.output)}
        </pre>
      </div>

      {runResult.notes ? (
        <p className="text-xs text-muted-foreground">{runResult.notes}</p>
      ) : null}
    </div>
  );
}
