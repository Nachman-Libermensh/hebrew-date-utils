"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ApiExportDoc } from "./catalog-types";
import { ApiFunctionPlayground } from "./api-function-playground";

interface ApiExportCardProps {
  apiExport: ApiExportDoc;
}

const KIND_LABELS: Record<ApiExportDoc["kind"], string> = {
  function: "Function",
  const: "Const",
  type: "Type",
  interface: "Interface",
  "re-export": "Re-export",
};

export function ApiExportCard({ apiExport }: ApiExportCardProps) {
  return (
    <Card className="rounded-2xl border border-foreground/10 bg-white/75">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{apiExport.name}</CardTitle>
          <Badge variant="outline">{KIND_LABELS[apiExport.kind]}</Badge>
        </div>
        <CardDescription className="font-mono text-xs text-foreground/80">
          {apiExport.signature}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Tabs defaultValue="about" className="w-full">
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="about">תיאור</TabsTrigger>
            <TabsTrigger value="usage">שימוש ופלט</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-2 pt-2">
            <p className="text-sm leading-relaxed text-foreground/90">
              {apiExport.description}
            </p>
            <div className="rounded-lg border border-foreground/10 bg-background/70 p-3 text-xs text-muted-foreground">
              {apiExport.output}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-2 pt-2">
            <div className="rounded-lg border border-foreground/10 bg-[#0d1d18] p-3 text-[#d8fff1]">
              <span className="mb-2 block text-xs text-[#9ad4c2]">Example</span>
              <pre className="overflow-x-auto text-xs leading-relaxed">
                {apiExport.usage}
              </pre>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-background/70 p-3 text-xs text-muted-foreground">
              <strong>Expected output:</strong> {apiExport.output}
            </div>
          </TabsContent>

          <TabsContent value="playground" className="pt-1">
            <ApiFunctionPlayground
              exportName={apiExport.name}
              kind={apiExport.kind}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
