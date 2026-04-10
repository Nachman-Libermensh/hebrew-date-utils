import Link from "next/link";

const featureCards = [
  {
    title: "Core API לפי מודולים",
    text: "מיפוי מלא לכל מודולי הליבה: signatures, usage, expected output ו-playground אינטראקטיבי.",
    href: "/docs/api",
    cta: "Open API Docs",
  },
  {
    title: "התחלה מהירה ב-Node.js",
    text: "התקנה נקייה של hebrew-date-utils, מבנה עבודה מומלץ ודוגמת קוד ראשונה להפעלה מיידית.",
    href: "/docs/getting-started",
    cta: "Start Here",
  },
  {
    title: "Date Picker עם react-day-picker",
    text: "מדריך step-by-step להטמעת בורר תאריכים עברי/לועזי כולל מצב טווח, עם קטעי קוד להעתקה.",
    href: "/docs/date-picker",
    cta: "Read Picker Guide",
  },
];

export default function HomePage() {
  return (
    <section className="hero-wrap">
      <div className="hero-panel">
        <p className="eyebrow">Official Documentation</p>
        <h1>תיעוד מסודר ל-hebrew-date-utils, עם דגש על Core API ו-React Date Picker</h1>
        <p>
          כאן תמצאו תיעוד מלא לספריית <strong>hebrew-date-utils</strong>, כולל
          פונקציות ליבה, דוגמאות שימוש, ועמוד ייעודי לבניית בורר תאריכים נוח על
          בסיס react-day-picker עם קומפוננטות עברי/לועזי.
        </p>
        <div className="hero-actions">
          <Link href="/docs/getting-started" className="primary-action">
            התחלה מהירה
          </Link>
          <Link href="/docs/api" className="secondary-action">
            Core API
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
