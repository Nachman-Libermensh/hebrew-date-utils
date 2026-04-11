import Link from "next/link";

import {
  FunctionDocCard,
  type FunctionDocCardModel,
  toFunctionAnchor,
} from "@/components/modules/function-doc-card";

function shortLabel(value: string): string {
  const head = value.trim().split("(")[0] ?? value;
  return head.trim();
}

export function ModuleDocPage({
  moduleName,
  description,
  docs,
}: {
  moduleName: string;
  description: string;
  docs: FunctionDocCardModel[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{moduleName}</h1>
        <p className="text-xs text-muted-foreground">{description}</p>
      </header>

      <section className="space-y-2 rounded-2xl border bg-card p-3">
        <h2 className="text-base font-semibold tracking-tight">
          פונקציות זמינות במודול
        </h2>

        {docs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {docs.map((doc) => {
              const syntax = doc.syntax ?? doc.name;
              const anchor = doc.id ?? toFunctionAnchor(syntax);

              return (
                <Link
                  key={anchor}
                  href={`?fn=${encodeURIComponent(anchor)}#${anchor}`}
                  className="rounded-full border bg-muted px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-accent"
                >
                  {shortLabel(syntax)}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            במודול זה אין פונקציות runtime. העמוד מציג טיפוסים/קבועים בלבד.
          </p>
        )}
      </section>

      <section className="space-y-3">
        {docs.map((doc) => (
          <FunctionDocCard key={doc.id ?? doc.name} {...doc} />
        ))}
      </section>
    </div>
  );
}
