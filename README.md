# hebrew-date-utils Monorepo

Official monorepo for:

- `hebrew-date-utils` core date-only Hebrew/Gregorian utility package
- `@hebrew-date-utils/docs` static-export Next.js documentation site

## Workspace Layout

- `packages/hebrew-date-utils` - core date utilities package
- `apps/docs` - official documentation site (Next.js static export)

## Development

```bash
pnpm install
pnpm build
pnpm test
```

Run docs locally:

```bash
pnpm dev:docs
```

## Publish Notes

Core package is published from:

- `packages/hebrew-date-utils`
