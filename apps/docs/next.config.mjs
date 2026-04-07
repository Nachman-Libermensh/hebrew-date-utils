import createMDX from "@next/mdx";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages && repoName ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["hebrew-date-utils", "hebrew-date-picker-react"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
