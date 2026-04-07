"use client";

import * as React from "react";
import { formatHebrewDate } from "hebrew-date-utils";

export function TodayHebrewGematriya() {
  const [todayText, setTodayText] = React.useState<string | null>(null);

  React.useEffect(() => {
    setTodayText(formatHebrewDate(new Date()));
  }, []);

  return (
    <p className="today-gematria">
      התאריך העברי היום: {todayText ?? "טוען..."}
    </p>
  );
}
