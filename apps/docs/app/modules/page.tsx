import Link from "next/link";

import {
  COMPAT_MODULE_DOCS,
  CORE_MODULE_DOCS,
  type LibraryModuleDoc,
} from "@/lib/module-catalog";

function ModulesSection({
  title,
  modules,
}: {
  title: string;
  modules: LibraryModuleDoc[];
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <ul className="grid gap-2">
        {modules.map((moduleDoc) => (
          <li key={moduleDoc.slug}>
            <Link
              href={moduleDoc.href}
              className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 transition-colors hover:bg-accent"
            >
              <span className="font-semibold">{moduleDoc.name}</span>
              <span className="text-xs text-muted-foreground">
                {moduleDoc.href}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ModulesPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          מודולי הספרייה
        </h1>
      </header>

      <ModulesSection title="Core" modules={CORE_MODULE_DOCS} />
      <ModulesSection title="Compatibility" modules={COMPAT_MODULE_DOCS} />
    </div>
  );
}
