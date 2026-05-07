export default defineEventHandler((event) => {
  const {public: {siteUrl}} = useRuntimeConfig();

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
});
