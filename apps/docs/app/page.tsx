import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-3xl font-extrabold tracking-tight">
        hebrew-date-utils Docs
      </h1>
      <p className="text-sm text-muted-foreground">
        בחר מודול מהתפריט כדי להתחיל לכתוב תיעוד רשמי.
      </p>
      <Link
        href="/modules"
        className="w-fit text-sm font-semibold text-primary hover:underline"
      >
        מעבר לרשימת מודולים
      </Link>
    </div>
  );
}
