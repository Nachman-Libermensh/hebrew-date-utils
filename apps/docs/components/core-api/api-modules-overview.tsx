import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ApiModuleDoc } from "./catalog-types";

interface ApiModulesOverviewProps {
  modules: ApiModuleDoc[];
}

export function ApiModulesOverview({ modules }: ApiModulesOverviewProps) {
  return (
    <section className="docs-content space-y-6">
      <div className="rounded-2xl border border-foreground/10 bg-white/75 p-5">
        <h1 className="mb-2">Core API Modules</h1>
        <p className="m-0 max-w-3xl text-sm leading-relaxed text-foreground/85">
          עמוד זה מחולק לפי קבצי המקור של החבילה
          <strong> hebrew-date-utils</strong>. כל נתיב מציג את כל ה-exportים של
          המודול, דוגמאות שימוש, פלט צפוי ו-Playground אינטראקטיבי עם בוררי
          תאריכים.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((moduleDoc) => {
          const functions = moduleDoc.exports.filter((item) => item.kind === "function");
          return (
            <Card
              key={moduleDoc.slug}
              className="rounded-2xl border border-foreground/10 bg-white/78"
            >
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle>{moduleDoc.title}</CardTitle>
                  <Badge variant="outline">{moduleDoc.exports.length} exports</Badge>
                </div>
                <CardDescription>{moduleDoc.summary}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <p className="m-0 text-xs text-muted-foreground">
                  Source: {moduleDoc.sourcePath}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {functions.slice(0, 4).map((item) => (
                    <Badge key={item.name} variant="secondary">
                      {item.name}
                    </Badge>
                  ))}
                  {functions.length > 4 ? (
                    <Badge variant="outline">+{functions.length - 4} more</Badge>
                  ) : null}
                </div>
              </CardContent>

              <CardFooter className="justify-end">
                <Button asChild size="sm">
                  <Link href={`/docs/api/${moduleDoc.slug}`}>כניסה למודול</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
