export type ApiExportKind =
  | "function"
  | "const"
  | "type"
  | "interface"
  | "re-export";

export interface ApiExportDoc {
  name: string;
  kind: ApiExportKind;
  signature: string;
  description: string;
  usage: string;
  output: string;
}

export interface ApiModuleDoc {
  slug: string;
  title: string;
  sourcePath: string;
  summary: string;
  notes: string[];
  exports: ApiExportDoc[];
}
