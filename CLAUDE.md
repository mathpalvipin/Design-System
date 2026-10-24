# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Early-stage UI component library monorepo: pnpm workspaces + Turborepo. Currently only the design-token package does real work; `@UI-lib/ui` and `docs` have placeholder `build` scripts that just `console.log`. There are no tests, linters, or TypeScript sources yet.

## Commands

Run from the repo root (pnpm is pinned via `packageManager`):

- `pnpm install`
- `pnpm build` — `turbo run build` across all packages (dependencies build first via `^build`)
- `pnpm dev` / `pnpm test` / `pnpm lint` — wired through Turbo, but no package defines these scripts yet
- `pnpm format` — `prettier --write .`
- Single package: `pnpm turbo run build --filter=@UI-lib/tokens` (or `pnpm --filter @UI-lib/tokens build`)

## Architecture

Dependency chain: `docs` → `@UI-lib/ui` → `@UI-lib/tokens` (all `workspace:*`). Turbo caches `dist/**` and `storybook-static/**` as build outputs.

### Tokens (`packages/token`, published as `@UI-lib/tokens`)

Built with Style Dictionary v5 via `build.mjs`, using DTCG-format JSON (`$value` / `$type`, references like `{color.gray.900}`).

- `src/primitives/` — raw values (color palette, space, radius, font). Shared by both themes.
- `src/themes/light.json` / `dark.json` — semantic tokens (`color.bg.*`, `color.text.*`, `color.border.*`, `color.action.*`, `color.focus.*`) that reference primitives. Both theme files must define the same semantic keys.
- Output:
  - `dist/light.css` — primitives **and** light semantics on `:root`, with `outputReferences: true` (semantics emit as `var(--color-gray-…)`).
  - `dist/dark.css` — **only** the dark semantic overrides (filtered by `filePath.includes('dark')`) on `[data-theme="dark"]`. It relies on `light.css` being loaded for primitive variables, so consumers must import both.
- Exported subpaths: `@UI-lib/tokens/light.css`, `@UI-lib/tokens/dark.css`.

## Known config quirks

- `pnpm-workspace.yaml` globs `apps/*`, but the docs app lives in `app/docs`, so it is **not** currently part of the workspace.
- The shared TS config is named `tsconifg.base.json` (misspelled); nothing extends it yet.
- The token package directory is `packages/token` while its package name is `@UI-lib/tokens`.
