import type { ComponentType, ReactNode } from "react";

type MDXComponents = Record<string, ComponentType<{ children?: ReactNode }>>;

interface WithChildren {
  children?: ReactNode;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: WithChildren) => <h1>{children}</h1>,
    h2: ({ children }: WithChildren) => <h2>{children}</h2>,
    h3: ({ children }: WithChildren) => <h3>{children}</h3>,
    p: ({ children }: WithChildren) => <p>{children}</p>,
    ul: ({ children }: WithChildren) => <ul>{children}</ul>,
    ol: ({ children }: WithChildren) => <ol>{children}</ol>,
    code: ({ children }: WithChildren) => <code>{children}</code>,
    pre: ({ children }: WithChildren) => <pre>{children}</pre>,
    ...components,
  };
}
