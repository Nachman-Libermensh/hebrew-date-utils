import type { Metadata } from "next";
import Link from "next/link";
import {
  Noto_Sans_Hebrew,
  Space_Grotesk,
  Geist,
  Inter,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DirectionProvider } from "@/components/ui/direction";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const hebrewFont = Noto_Sans_Hebrew({
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
      lang="en"
      className={cn(
        displayFont.variable,
        hebrewFont.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body>
        <DirectionProvider dir="ltr">
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
              </footer>
            </div>
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
