import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DirectionProvider } from "@/components/ui/direction";
import { TodayHebrewGematriya } from "@/components/today-hebrew-gematria";

const hebrewFont = Noto_Sans_Hebrew({
  weight: ["300", "400", "500", "700"],
  display: "swap",
  subsets: ["hebrew", "latin"],
  variable: "--font-hebrew",
});

export const metadata: Metadata = {
  title: "Hebrew Date Utils Docs",
  description:
    "Core-first documentation for hebrew-date-utils with an optional React picker add-on",
};

const links = [
  { href: "/", label: "Home" },
  { href: "/docs/api", label: "Core API (Main)" },
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/react-picker", label: "React Picker (Optional)" },
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
                <Link href="/" className="brand">
                  hebrew-date-utils
                </Link>
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
                <p>Built for date-only Hebrew and Gregorian workflows.</p>
                <TodayHebrewGematriya />
              </footer>
            </div>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
