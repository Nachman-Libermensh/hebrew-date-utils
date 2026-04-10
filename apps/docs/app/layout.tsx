import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
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
  title: "hebrew-date-utils | Official Docs",
  description:
    "Core-first documentation for hebrew-date-utils, with practical Node.js and react-day-picker integration guides.",
};

const links = [
  { href: "/docs/getting-started", label: "התחלה מהירה" },
  { href: "/docs/date-picker", label: "Date Picker" },
  { href: "/docs/api", label: "Core API" },
];

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
            <div className="site-shell">
              <header className="site-header">
                <div className="brand-wrap">
                  <Link href="/" className="brand">
                    hebrew-date-utils
                  </Link>
                  <p className="brand-subtitle">
                    Core-first docs for Hebrew and Gregorian date workflows
                  </p>
                </div>
                <nav className="top-nav" aria-label="Main navigation">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="nav-link">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </header>
              <main className="page-content">{children}</main>
              <footer className="site-footer">
                <p>
                  Built for reliable Hebrew and Gregorian date-only workflows.
                </p>
              </footer>
            </div>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
