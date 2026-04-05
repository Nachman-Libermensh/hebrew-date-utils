# Publishing Guide

This guide describes how to publish hebrew-date-utils to npm.

## 1) Pre-flight checks

Run all validation steps:

```bash
npm run release:check
```

This executes:

- typecheck
- tests
- production build
- npm pack --dry-run

## 2) Verify npm authentication

```bash
npm whoami
```

If not logged in:

```bash
npm login
```

## 3) Confirm package name availability

```bash
npm view hebrew-date-utils version
```

If the package already exists and you do not own it, publish under a scope, for example:

- @your-scope/hebrew-date-utils

Then update package.json name accordingly.

## 4) Update metadata before first publish

Ensure package.json has correct values for:

- name
- version
- author
- repository
- bugs
- homepage

## 5) Bump version (when needed)

```bash
npm version patch
```

or:

```bash
npm version minor
npm version major
```

## 6) Publish

Unscoped package:

```bash
npm publish
```

Scoped public package:

```bash
npm publish --access public
```

## 7) Post-publish verification

```bash
npm view hebrew-date-utils
```

Then test install in a clean folder:

```bash
npm init -y
npm install hebrew-date-utils
```

## Recommended release checklist

- README is up to date
- API reference is up to date (docs/API.md)
- tests pass locally
- package tarball includes expected files only
- changelog updated
