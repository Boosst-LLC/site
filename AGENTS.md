# Repository Guidelines

## Project Structure & Module Organization
The site follows the standard Hugo layout: `content/` holds Markdown pages grouped by section, `layouts/` contains shared templates and shortcodes, and `assets/` stores SCSS or JS that runs through Hugo Pipes. Drop passthrough files (favicons, robots.txt) under `static/`. Store site-wide data in `data/` (TOML/JSON/YAML) and translation strings in `i18n/`. Archetype blueprints live in `archetypes/`; adjust `archetypes/default.md` before creating new pages with custom front matter. Global configuration resides in `hugo.toml` at the repo root.

## Build, Test, and Development Commands
- `hugo serve -D --bind 0.0.0.0 --port 1313`: Runs the dev server with drafts, enabling live reload for content and theme tweaks.
- `hugo --gc --minify`: Produces the optimized production bundle, removing unused cache entries and minifying outputs.
- `hugo new content/SECTION/name.md`: Scaffolds a page using the matching archetype so metadata stays consistent.

## Coding Style & Naming Conventions
Use TOML front matter with 2-space indentation for nested keys. Keep Markdown line lengths under ~100 characters and favor descriptive headings (e.g., `## Features`). Name content files with kebab-case (`case-studies/energy-audit.md`) to align with Hugo slug generation. Place reusable template logic in partials under `layouts/partials/` and prefix shortcodes with their scope (`cta-button.html`). When introducing SCSS, namespace variables, and lean on Hugo’s built-in `resources.Get` pipeline for bundling.

## Testing Guidelines
There is no automated test harness; rely on Hugo’s built-in checks. Run `hugo serve` to visually inspect pages, then `hugo --templateMetrics --templateMetricsHints` to catch slow or duplicate templates. Before merging, build with `HUGO_ENV=production hugo --gc --minify --printI18nWarnings` and spot-check the `public/` output for broken links, missing assets, and untranslated keys.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so default to concise, imperative commit subjects ("Add pricing hero layout") with optional wrapped body text explaining why, not what. Reference issue or ticket IDs in the body when applicable. Pull requests should describe the intent, list visible UI changes (include before/after screenshots for landing pages), link any related tracking tickets, and note the commands used for verification so reviewers can reproduce your results.

## Content Workflow Tips
Create draft pages with `hugo new --kind default` and leave `draft = true` until stakeholder approval. Use `weight` front-matter fields to control ordering in lists, and centralize repeated copy (pricing tiers, FAQs) under `data/` so updates propagate without redundant Markdown edits.
