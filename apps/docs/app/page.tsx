import Link from "next/link";

const featureCards = [
  {
    title: "Core Library",
    text: "Date-only Hebrew/Gregorian helpers powered by @hebcal/core and date-fns.",
    href: "/docs/api",
    cta: "Explore API",
  },
  {
    title: "React Date Picker",
    text: "Customizable picker package with a react-day-picker-style extension API.",
    href: "/docs/react-picker",
    cta: "View Components",
  },
  {
    title: "Quick Setup",
    text: "Monorepo workspace with static docs export and GitHub Pages deployment.",
    href: "/docs/getting-started",
    cta: "Start Here",
  },
];

export default function HomePage() {
  return (
    <section className="hero-wrap">
      <div className="hero-panel">
        <p className="eyebrow">Official Documentation</p>
        <h1>Hebrew Calendar Utilities for Serious Product Work</h1>
        <p>
          Build reliable date workflows without touching zmanim: conversions,
          ranges, boundaries, holidays, and a customizable React date picker.
        </p>
        <div className="hero-actions">
          <Link href="/docs/getting-started" className="primary-action">
            Read Getting Started
          </Link>
          <Link href="/docs/api" className="secondary-action">
            Core API Reference
          </Link>
        </div>
      </div>
      <div className="cards-grid">
        {featureCards.map((card) => (
          <article key={card.title} className="feature-card">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <Link href={card.href} className="card-link">
              {card.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
