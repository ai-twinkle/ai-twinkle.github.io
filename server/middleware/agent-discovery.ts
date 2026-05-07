import {defaultLocalePages, enLocalePages} from '../../shared/utils/sitePages';

/**
 * Agent discovery middleware.
 *
 * 1. Adds RFC 8288 Link response headers so agents can discover key resources.
 * 2. Returns a Markdown representation of the site when the client sends
 *    `Accept: text/markdown` (Markdown for Agents).
 *
 * Both behaviours are scoped to HTML page routes only — static assets,
 * API endpoints, and /.well-known/* files are left untouched.
 */

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

/**
 * Build the site markdown overview from the centralized pages list.
 * @returns The full site overview in Markdown format.
 */
function buildMarkdown(): string {
  const zhPages = defaultLocalePages
      .map((p) => `- [${p.name}](${p.loc})`)
      .join('\n');
  const enPages = enLocalePages
      .map((p) => `- [${p.name}](${p.loc})`)
      .join('\n');

  return `\
# Twinkle AI — 正體中文開源語言模型社群

> Twinkle AI is an open-source Traditional Chinese language model research
> community dedicated to advancing generative AI in Taiwan.

## Pages

${zhPages}

## English Pages

${enPages}

## Community Links

- [Discord](https://discord.com/servers/twinkle-ai-1310544431983759450)
- [HuggingFace](https://huggingface.co/twinkle-ai)
- [GitHub](https://github.com/ai-twinkle)

## API

- Health check: \`GET /api/healthz\` — Returns a 200 OK ping response.

## Discovery

- [Sitemap](/sitemap.xml)
- [API Catalog](/.well-known/api-catalog)
- [Agent Skills](/.well-known/agent-skills/index.json)
- [MCP Server Card](/.well-known/mcp/server-card.json)
`;
}

const SITE_MARKDOWN = buildMarkdown();

export default defineEventHandler((event) => {
  const requestPath = event.path ?? '';

  // Only target HTML pages — skip API, assets, and well-known files.
  if (
    requestPath.startsWith('/api/') ||
    requestPath.startsWith('/_nuxt/') ||
    requestPath.startsWith('/.well-known/') ||
    /\.[a-z0-9]+$/.test(requestPath.split('?')[0])
  ) return;

  // Add RFC 8288 Link headers to page responses.
  appendResponseHeader(event, 'Link', LINK_HEADERS);

  // Markdown for Agents: return Markdown when Accept: text/markdown.
  const accept = getRequestHeader(event, 'accept') ?? '';
  if (accept.includes('text/markdown')) {
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
    return SITE_MARKDOWN;
  }
});

