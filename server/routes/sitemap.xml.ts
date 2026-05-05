export default defineEventHandler((event) => {
  const {siteUrl} = useRuntimeConfig();
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = sitePages.map(({loc, priority, changefreq}) => `  <url>
    <loc>${siteUrl}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  return xml;
});
