import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ApiModuleDoc } from "./catalog-types";
import { ApiExportCard } from "./api-export-card";

interface ApiModuleDetailsProps {
  moduleDoc: ApiModuleDoc;
}

export function ApiModuleDetails({ moduleDoc }: ApiModuleDetailsProps) {
  const functionsCount = moduleDoc.exports.filter(
    (item) => item.kind === "function",
  ).length;

  return (
    <section className="docs-content space-y-6">
      <div className="space-y-3 rounded-2xl border border-foreground/10 bg-white/70 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{moduleDoc.title}</Badge>
          <Badge variant="outline">{moduleDoc.exports.length} exports</Badge>
          <Badge variant="outline">{functionsCount} functions</Badge>
        </div>

        <h1 className="mb-0">{moduleDoc.title}</h1>
        <p className="mt-0 text-sm text-foreground/85">{moduleDoc.summary}</p>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-foreground/10 bg-background/70 px-2 py-1">
            Source: {moduleDoc.sourcePath}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/docs/api">חזרה לכל המודולים</Link>
          </Button>
        </div>
      </div>

      {moduleDoc.notes.length > 0 ? (
        <Card className="rounded-2xl border border-foreground/10 bg-white/70">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>דגשים חשובים לעבודה עם המודול</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground/90">
            {moduleDoc.notes.map((note) => (
              <p key={note} className="rounded-lg bg-background/60 px-3 py-2">
                {note}
              </p>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4">
        {moduleDoc.exports.map((apiExport) => (
          <ApiExportCard key={apiExport.name} apiExport={apiExport} />
        ))}
      </div>
    </section>
  );
}
