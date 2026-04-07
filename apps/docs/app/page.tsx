import Link from "next/link";

const featureCards = [
  {
    title: "hebrew-date-utils (Core)",
    text: "Framework-agnostic Node.js library for Hebrew/Gregorian conversions, ranges, arithmetic, boundaries, and holidays.",
    href: "/docs/api",
    cta: "Explore Core API",
  },
  {
    title: "Start in Any Node Project",
    text: "Install only the core package and use it in scripts, APIs, services, queues, or serverless functions.",
    href: "/docs/getting-started",
    cta: "Quick Setup",
  },
  {
    title: "React Picker Add-on",
    text: "Optional UI layer built on top of the core package, with extensible classNames, modifiers, formatters, and components.",
    href: "/docs/react-picker",
    cta: "View React Add-on",
  },
];

export default function HomePage() {
  return (
    <section className="hero-wrap">
      <div className="hero-panel">
        <p className="eyebrow">Core-First Documentation</p>
        <h1>Build on hebrew-date-utils Core, Then Add UI If You Need It</h1>
        <p>
          The primary package in this monorepo is{" "}
          <strong>hebrew-date-utils</strong>. It is environment-agnostic and
          fits any Node.js workflow. The React picker is documented as an
          optional integration layer.
        </p>
        <div className="hero-actions">
          <Link href="/docs/api" className="primary-action">
            Read Core API
          </Link>
          <Link href="/docs/getting-started" className="secondary-action">
            Install in Node.js
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
