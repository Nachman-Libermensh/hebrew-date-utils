import type { Metadata } from "next";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Noto_Sans_Hebrew } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/components/theme-provider";

const hebrewFont = Noto_Sans_Hebrew({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  subsets: ["hebrew", "latin"],
  variable: "--font-hebrew",
});

export const metadata: Metadata = {
  title: "hebrew-date-utils | כלי לוח עברי",
  description:
    "Core-first documentation for hebrew-date-utils, with practical Node.js and react-day-picker integration guides, כלי עזר לחישובי לוח עברי.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      dir="rtl"
      lang="he-IL"
      className={cn(hebrewFont.variable, "font-sans")}
    >
      <body>
        <DirectionProvider dir="rtl">
          <ThemeProvider>
            <TooltipProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background/85 px-3 backdrop-blur-sm">
                    <SidebarTrigger />
                    <span className="me-2 text-sm font-semibold text-muted-foreground">
                      תיעוד מודולים
                    </span>
                  </header>
                  <section className="flex-1 p-4 md:p-6">{children}</section>
                </SidebarInset>
              </SidebarProvider>
            </TooltipProvider>
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
