import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Noto_Sans_Hebrew } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DirectionProvider } from "@/components/ui/direction";

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
      dir="rtl"
      lang="he-IL"
      className={cn(hebrewFont.variable, "font-sans")}
    >
      <body>
        <DirectionProvider dir="rtl">
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
