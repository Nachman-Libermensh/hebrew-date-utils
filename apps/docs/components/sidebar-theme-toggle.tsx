"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function SidebarThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode = isMounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full justify-between"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      <span className="text-sm">{isDarkMode ? "עיצוב בהיר" : "עיצוב כהה"}</span>
      {isDarkMode ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  );
}
