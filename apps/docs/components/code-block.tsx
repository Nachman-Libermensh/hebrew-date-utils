"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type TabSpec = {
  name: string;
  code: string;
  language?: string;
  highlightLines?: number[];
};

type CodeBlockProps = {
  language: string;
  filename?: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: TabSpec[];
    }
);

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function CodeBlock({
  language,
  filename,
  code,
  tabs = [],
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const tabsExist = tabs.length > 0;

  React.useEffect(() => {
    if (activeTab >= tabs.length && tabs.length > 0) {
      setActiveTab(0);
    }
  }, [activeTab, tabs.length]);

  const activeCode = tabsExist ? (tabs[activeTab]?.code ?? "") : code;
  const activeLanguage = tabsExist
    ? (tabs[activeTab]?.language ?? language)
    : language;
  const activeHighlightLines = tabsExist
    ? (tabs[activeTab]?.highlightLines ?? [])
    : highlightLines;

  const highlightedLines = React.useMemo(
    () => new Set(activeHighlightLines),
    [activeHighlightLines],
  );

  const copyToClipboard = async () => {
    if (!activeCode) {
      return;
    }
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        {tabsExist ? (
          <div className="docs-code-tabs" role="tablist" aria-label="Code tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                className={cx(
                  "docs-code-tab",
                  activeTab === index && "docs-code-tab-active",
                )}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="docs-code-filename">{filename}</div>
        )}

        <button
          type="button"
          className="docs-code-copy"
          onClick={copyToClipboard}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={activeLanguage}
        style={atomDark}
        showLineNumbers
        wrapLines
        customStyle={{
          margin: 0,
          padding: "0.85rem",
          background: "transparent",
          fontSize: "0.84rem",
          lineHeight: 1.55,
        }}
        lineProps={(lineNumber: number) => ({
          style: {
            display: "block",
            width: "100%",
            backgroundColor: highlightedLines.has(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            borderLeft: highlightedLines.has(lineNumber)
              ? "2px solid rgba(120, 230, 192, 0.85)"
              : "2px solid transparent",
            paddingLeft: "0.4rem",
          },
        })}
        PreTag="div"
      >
        {String(activeCode ?? "")}
      </SyntaxHighlighter>
    </div>
  );
}
