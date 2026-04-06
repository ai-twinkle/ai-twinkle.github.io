# Agent Development Guidelines

This repository follows a strict workflow. All AI agents (including assistants and coding agents) must adhere to these guidelines to ensure consistency and avoid common errors.

## Project Overview

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Development Runtime**: [Bun](https://bun.sh/)
- **Production Platform**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Content Management**: [Nuxt Content v3](https://content.nuxt.com/)
- **UI Framework**: [Nuxt UI](https://ui.nuxt.com/)

## Architecture

- `app/`: Main frontend application (Vue components, pages, composables).
- `server/`: Server-side logic and Nitro API routes.
- `content/`: Markdown and data files for the content engine.
- `i18n/`: Internationalization and localization files.
- `public/`: Static assets and images.
- `wrangler.jsonc`: Cloudflare Workers configuration.

## UI Implementation Guidelines

- **Nuxt UI First**: Always prioritize using [Nuxt UI](https://ui.nuxt.com/) components.
- **Consult Documentation**: Before implementing any UI components, check [https://ui.nuxt.com/llms.txt](https://ui.nuxt.com/llms.txt) to see if there are suitable components and follow the instructions in the linked documentation.
- **Follow Standard Patterns**: Adhere to the patterns and best practices described in the Nuxt UI documentation for theming, accessibility, and component usage.

## Development Workflow

- **Primary Branch**: `rolling`
- **Stable Branch**: `main`
- **PR Strategy**:
    - NEVER target `main` directly for features or refinements.
    - ALWAYS create a feature branch (e.g. `feat/lottie-sticker-support`) and target `rolling` as the base branch.
    - The repository follows a `rolling -> main` flow for deployments.

## Tool Usage and Code Editing

- **Atomic Edits**: Prefer `replace_file_content` or `multi_replace_file_content` over `write_to_file` for existing files to minimize unnecessary changes and avoid overwriting concurrent work.

## Commit Guidelines

- Follow Conventional Commits (as configured in `package.json`):
    - `feat:`: New features.
    - `fix:`: Bug fixes.
    - `docs:`: Documentation updates.
    - `refactor:`: Code restructuring.
    - `test:`: Adding or fixing tests.
    - `chore:`: Maintenance tasks or dependency updates.
    - `perf:`: Performance improvements.
    - `style:`: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
    - `ci:`: Changes to CI configuration scripts and tools.
    - `build:`: Changes that affect the build system or external dependencies.
