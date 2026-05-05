/**
 * Agent discovery middleware.
 *
 * 1. Adds RFC 8288 Link response headers so agents can discover key resources.
 * 2. Returns a Markdown representation of the site when the client sends
 *    `Accept: text/markdown` (Markdown for Agents).
 */

const SITE_MARKDOWN = `\
# Twinkle AI — 正體中文開源語言模型社群

> Twinkle AI is an open-source Traditional Chinese language model research
> community dedicated to advancing generative AI in Taiwan.

## Pages

- [Home](/)
- [About](/about)
- [Models](/models)
- [Datasets](/datasets)
- [Education](/education)
- [Projects](/projects)
- [News](/news)
- [Media](/media)
- [SITCON 2026](/sitcon-2026)

## English Pages

- [Home (English)](/en)
- [About](/en/about)
- [Models](/en/models)
- [Datasets](/en/datasets)
- [Education](/en/education)
- [Projects](/en/projects)
- [News](/en/news)
- [Media](/en/media)

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

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

export default defineEventHandler((event) => {
  // Add RFC 8288 Link headers to every response.
  appendResponseHeader(event, 'Link', LINK_HEADERS);

  // Markdown for Agents: return Markdown when Accept: text/markdown.
  const accept = getRequestHeader(event, 'accept') ?? '';
  if (!accept.includes('text/markdown')) return;

  const requestPath = event.path ?? '';
  // Only intercept HTML pages — skip API, assets, and well-known files.
  if (
    requestPath.startsWith('/api/') ||
    requestPath.startsWith('/_nuxt/') ||
    requestPath.startsWith('/.well-known/') ||
    requestPath.includes('.')
  ) return;

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
  return SITE_MARKDOWN;
});
