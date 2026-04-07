const REPO_SOURCE_BASE_URL =
  "https://github.com/Nachman-Libermensh/hebrew-date-utils/blob/main";

export function getSourceFileUrl(sourcePath: string): string {
  const normalizedPath = sourcePath.replace(/^\/+/, "");
  return `${REPO_SOURCE_BASE_URL}/${normalizedPath}`;
}
