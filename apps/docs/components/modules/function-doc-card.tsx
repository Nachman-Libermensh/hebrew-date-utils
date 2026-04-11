import { FunctionPickerDemo } from "@/components/modules/function-picker-demo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function toFunctionAnchor(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type FunctionDocCardModel = {
  id?: string;
  name: string;
  syntax?: string;
  signature?: string;
  summary: string;
  params: string;
  returns: string;
  usage: string;
  picker?: {
    calendar: "hebrew" | "gregorian";
    mode: "single" | "range";
    title: string;
  };
};

export function FunctionDocCard({
  id,
  name,
  syntax,
  signature,
  summary,
  params,
  returns,
  usage,
  picker,
}: FunctionDocCardModel) {
  const displaySyntax = syntax ?? name;
  const anchor = id ?? toFunctionAnchor(displaySyntax);
  const displaySignature = signature ?? `function ${displaySyntax}: ${returns}`;

  const activePicker = picker ?? {
    calendar: "gregorian" as const,
    mode: "single" as const,
    title: "בחר תאריך לדוגמת שימוש",
  };

  return (
    <article id={anchor} className="scroll-mt-24">
      <Card size="sm" className="overflow-hidden rounded-2xl border-border/80">
        <CardHeader className="border-b border-border/80 pb-3">
          <CardTitle className="text-base font-semibold tracking-tight">
            {displaySyntax}
          </CardTitle>

          <p className="text-[11px] text-muted-foreground font-mono">
            {displaySignature}
          </p>

          <CardDescription className="text-xs leading-relaxed text-muted-foreground">
            {summary}
          </CardDescription>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span>
              <strong className="text-foreground">קלט:</strong> {params}
            </span>
            <span>
              <strong className="text-foreground">פלט:</strong> {returns}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-3">
          <div className="grid gap-3 md:grid-cols-2">
            <section className="rounded-xl border bg-card p-2.5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                קוד שימוש
              </h3>

              <pre className="overflow-x-auto rounded-md bg-muted p-2 text-[11px] leading-relaxed">
                <code>{usage}</code>
              </pre>
            </section>

            <section className="rounded-xl border bg-card p-2.5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                בורר תאריך
              </h3>

              <FunctionPickerDemo
                calendar={activePicker.calendar}
                mode={activePicker.mode}
                title={activePicker.title}
              />
            </section>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
