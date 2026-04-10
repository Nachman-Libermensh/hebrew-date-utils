export type LibraryModuleDoc = {
  slug: string;
  name: string;
  href: string;
  category: "core" | "compat";
};

const moduleRows: Omit<LibraryModuleDoc, "href">[] = [
  {
    slug: "types",
    name: "types",
    category: "core",
  },
  {
    slug: "constants",
    name: "constants",
    category: "core",
  },
  {
    slug: "conversion",
    name: "conversion",
    category: "core",
  },
  {
    slug: "month-utils",
    name: "month-utils",
    category: "core",
  },
  {
    slug: "boundaries",
    name: "boundaries",
    category: "core",
  },
  {
    slug: "ranges",
    name: "ranges",
    category: "core",
  },
  {
    slug: "info",
    name: "info",
    category: "core",
  },
  {
    slug: "membership",
    name: "membership",
    category: "core",
  },
  {
    slug: "navigation",
    name: "navigation",
    category: "core",
  },
  {
    slug: "formatting",
    name: "formatting",
    category: "core",
  },
  {
    slug: "holidays",
    name: "holidays",
    category: "core",
  },
  {
    slug: "year",
    name: "year",
    category: "core",
  },
  {
    slug: "arithmetic",
    name: "arithmetic",
    category: "core",
  },
  {
    slug: "hebcal-compat",
    name: "hebcal-compat",
    category: "compat",
  },
];

export const MODULE_DOCS: LibraryModuleDoc[] = moduleRows.map((moduleRow) => ({
  ...moduleRow,
  href: `/modules/${moduleRow.slug}`,
}));

export const MODULE_DOCS_BY_SLUG = new Map(
  MODULE_DOCS.map((moduleDoc) => [moduleDoc.slug, moduleDoc]),
);

export const CORE_MODULE_DOCS = MODULE_DOCS.filter(
  (moduleDoc) => moduleDoc.category === "core",
);

export const COMPAT_MODULE_DOCS = MODULE_DOCS.filter(
  (moduleDoc) => moduleDoc.category === "compat",
);
