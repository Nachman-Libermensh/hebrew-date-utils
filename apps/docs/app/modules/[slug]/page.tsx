import { notFound } from "next/navigation";

import { MODULE_DOCS, MODULE_DOCS_BY_SLUG } from "@/lib/module-catalog";

export function generateStaticParams() {
  return MODULE_DOCS.map((moduleDoc) => ({ slug: moduleDoc.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleDoc = MODULE_DOCS_BY_SLUG.get(slug);

  if (!moduleDoc) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {moduleDoc.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          עמוד תיעוד למודול {moduleDoc.name}. מכאן אפשר להתחיל לבנות את התיעוד
          הרשמי פונקציה-אחרי-פונקציה.
        </p>
      </header>
    </div>
  );
}
