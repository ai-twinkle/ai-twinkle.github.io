# Twinkle AI Official Website

> [正體中文](README_zh-tw.md) | **English**

🌐 Official website for Twinkle AI - An open-source Traditional Chinese language model research community (致力於構建開源正體中文語言模型的研究社群).

This bilingual (Traditional Chinese and English) website showcases Twinkle AI's projects, research, and community initiatives.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Internationalization**: @nuxtjs/i18n (zh-TW default, English)

## Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Bun** package manager (recommended) - [Install Bun](https://bun.sh/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ai-twinkle/ai-twinkle.github.io.git
cd ai-twinkle.github.io
```

### 2. Install Dependencies

To install Bun, please visit to <https://bun.com> for more details.

Using Bun (recommended):

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Start Development Server

```bash
bun run dev
```

The site will be available at `http://localhost:3000`

## Development Commands

| Command | Description |
| ------- | ----------- |
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run generate` | Generate static site |
| `bun run preview` | Build and preview with Wrangler |
| `bun run deploy` | Deploy to Cloudflare Workers |
| `bun run lint:es:fix` | Auto-fix ESLint issues |
| `bun run lint:es:check` | Check ESLint (fails on warnings) |
| `bun run cf-typegen` | Generate Cloudflare types |

## Project Structure

```text
.
├── app/                    # Frontend Nuxt application
│   ├── pages/             # File-based routing
│   ├── components/        # Vue components
│   ├── layouts/           # Page layouts
│   ├── plugins/           # Nuxt plugins
│   ├── data/              # TypeScript types and data
│   └── assets/css/        # Global CSS
├── server/                # Server-side code (Nitro)
│   ├── api/              # API endpoints
│   ├── routes/           # Server routes (redirects)
│   └── utils/            # Server utilities
├── i18n/locales/         # Translation files (zh-TW, en)
├── public/               # Static assets
├── nuxt.config.ts        # Nuxt configuration
└── wrangler.jsonc        # Cloudflare Workers config
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Git Workflow

This project uses **conventional commits** enforced by commitlint:

```bash
# Commit message format
type(scope): description

# Examples
feat(components): add new hero section
fix(i18n): correct translation keys
docs(readme): update setup instructions
```

**Common types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Git Hooks

- **Pre-commit**: Runs ESLint on staged files
- **Commit-msg**: Validates commit message format

### Code Style

- **ESLint** with `eslint-config-nymph`
- **JSDoc** comments (without type annotations - use TypeScript types)
- Run `bun run lint:es:fix` before committing

## Key Features

### Internationalization (i18n)

- Default locale: **zh-TW** (Traditional Chinese)
- Secondary locale: **en** (English)
- URL strategy: `prefix_except_default`
  - Chinese: `/` (no prefix)
  - English: `/en`

### Icon System

The project uses `DynamicHeroIcon.vue` component that converts PascalCase heroicon names to Nuxt UI format:

- Input: `BeakerIcon` → Output: `i-heroicons-beaker`

### Server Routes

- `/github` - Redirects to GitHub organization
- `/discord` - Redirects to Discord server
- `/huggingface` - Redirects to HuggingFace organization
- API 404s return ASCII cat art via `useCat()` utility

## Deployment

The site is deployed to **Cloudflare Workers**:

```bash
bun run deploy
```

Configuration is managed in `wrangler.jsonc`.

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Community

- **GitHub**: [github.com/ai-twinkle](https://github.com/ai-twinkle)
- **HuggingFace**: [huggingface.co/twinkle-ai](https://huggingface.co/twinkle-ai)
- **Discord**: Join our community server

---

Built with ❤️ by the Twinkle AI community
