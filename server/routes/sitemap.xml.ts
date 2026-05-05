const BASE_URL = 'https://www.twinkleai.tw';

const pages = [
  {loc: '/', priority: '1.0', changefreq: 'daily'},
  {loc: '/about', priority: '0.8', changefreq: 'weekly'},
  {loc: '/datasets', priority: '0.8', changefreq: 'weekly'},
  {loc: '/education', priority: '0.8', changefreq: 'weekly'},
  {loc: '/media', priority: '0.7', changefreq: 'monthly'},
  {loc: '/models', priority: '0.9', changefreq: 'weekly'},
  {loc: '/news', priority: '0.9', changefreq: 'daily'},
  {loc: '/projects', priority: '0.8', changefreq: 'weekly'},
  {loc: '/sitcon-2026', priority: '0.7', changefreq: 'monthly'},
  {loc: '/en', priority: '0.9', changefreq: 'daily'},
  {loc: '/en/about', priority: '0.8', changefreq: 'weekly'},
  {loc: '/en/datasets', priority: '0.8', changefreq: 'weekly'},
  {loc: '/en/education', priority: '0.8', changefreq: 'weekly'},
  {loc: '/en/media', priority: '0.7', changefreq: 'monthly'},
  {loc: '/en/models', priority: '0.9', changefreq: 'weekly'},
  {loc: '/en/news', priority: '0.9', changefreq: 'daily'},
  {loc: '/en/projects', priority: '0.8', changefreq: 'weekly'},
  {loc: '/en/sitcon-2026', priority: '0.7', changefreq: 'monthly'},
];

export default defineEventHandler((event) => {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = pages.map(({loc, priority, changefreq}) => `  <url>
    <loc>${BASE_URL}${loc}</loc>
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
