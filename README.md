# Nuxt Content + SEO Zod Version Conflict - Minimal Reproduction

> **⚠️ This is a minimal reproduction repository for a bug report.**

This repository demonstrates a critical issue where using `asSeoCollection` from `@nuxtjs/seo` with `@nuxt/content` crashes when different Zod versions are installed.

## 🐛 The Problem

When you have:

- `@nuxt/content@3.9.0` (which depends on `zod@3.25.76`)
- `@nuxtjs/seo@3.2.2` using `asSeoCollection` (integrates `asOgImageCollection`, `asSchemaOrgCollection`, `asRobotsCollection`, `asSitemapCollection`)
- `zod@4.x` installed at root level

The application crashes with:

```
ERROR  Zod toJSONSchema error for schema: ZodObject Cannot read properties of undefined (reading 'def')
```

## 🔍 Root Cause

`asSeoCollection` wraps four collection helpers. When root installs `zod@4.x`, these helpers can build schemas with zod v4 while `@nuxt/content` provides zod v3 and `zod-to-json-schema@3.25.0`. Mixing zod v3 and v4 schemas leads to serialization failure and the crash above.

See [HOW_TO_FILE_ISSUES.md](./HOW_TO_FILE_ISSUES.md) for the complete analysis and issue submission steps.

## 📦 How to Reproduce

### 1. Clone this repository

```bash
git clone https://github.com/andy820621/nuxt-content-bug-repo.git
cd nuxt-content-bug-repo
```

### 2. Install Dependencies

```bash
pnpm install
```

After installation, verify the Zod versions (optional):

```bash
pnpm list zod
# Should show:
# zod 3.25.76 (from @nuxt/content)
# zod 4.1.13 (root devDependency)
```

### 3. Run Dev Server (Will Show Error)

```bash
pnpm dev
```

You'll see the error during the postinstall script:

```
ERROR  Zod toJSONSchema error for schema: ZodObject Cannot read properties of undefined (reading 'def')
```

## 📄 Key Files

- **`content.config.ts`** - Minimal config that triggers the issue with `asSeoCollection`
- **`package.json`** - Shows the dependency setup that causes the conflict
- **`HOW_TO_FILE_ISSUES.md`** - **📋 Complete issue submission guide**
- **`ISSUE_TEMPLATE.md`** - Ready-to-copy issue content

## 🚀 How to Submit Issues

**See [HOW_TO_FILE_ISSUES.md](./HOW_TO_FILE_ISSUES.md)** for complete steps to submit:

1. Main issue to `@nuxtjs/seo`
2. Enhancement suggestion to `@nuxt/content` (optional)

## ✅ Verification Checklist

Before submitting an issue, verify:

```bash
# Check that both Zod versions are present
pnpm list zod

# Confirm the error occurs
pnpm dev  # Will fail during postinstall
```

## 📌 Environment Info

- **Node.js**: 18+
- **pnpm**: 10.24.0
- **@nuxt/content**: 3.9.0
- **@nuxtjs/seo**: 3.2.2
- **zod**: 3.25.76 (from @nuxt/content) + 4.1.13 (root)

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
