export interface PlaygroundContext {
  primaryDate: Date;
  secondaryDate: Date;
  shiftAmount: number;
  locale: "he" | "en";
  inIsrael: boolean;
}

export interface PlaygroundRunResult {
  invocation: string;
  output: unknown;
  notes?: string;
}

export type PlaygroundRunner = (
  context: PlaygroundContext,
) => PlaygroundRunResult;
