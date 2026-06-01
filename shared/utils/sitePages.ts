/**
 * Centralized site pages list.
 *
 * Used by server routes (sitemap, agent-discovery, api-catalog) and the
 * client-side WebMCP plugin to keep all page references in one place.
 */

export interface SitePage {
  /** URL path, e.g. "/" or "/en/models" */
  loc: string;
  /** Human-readable page name */
  name: string;
  /** Short description of the page */
  description: string;
  /** Sitemap priority (1.0 = highest) */
  priority: '0.0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' |
    '0.6' | '0.7' | '0.8' | '0.9' | '1.0';
  /** Sitemap change frequency */
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

export const sitePages: SitePage[] = [
  {
    loc: '/',
    name: 'Homepage',
    description: 'Twinkle AI community homepage',
    priority: '1.0',
    changefreq: 'daily',
  },
  {
    loc: '/about',
    name: 'About',
    description: 'About the Twinkle AI community',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/models',
    name: 'Models',
    description: 'Open-source Traditional Chinese language models',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    loc: '/datasets',
    name: 'Datasets',
    description: 'Traditional Chinese language datasets',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/education',
    name: 'Education',
    description: 'Educational resources for generative AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/projects',
    name: 'Repositories',
    description: 'Official open-source code repositories by Twinkle AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/constellation',
    name: 'Constellation',
    description: 'Co-created community projects built on Twinkle AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/news',
    name: 'News',
    description: 'Latest news from the Twinkle AI community',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    loc: '/media',
    name: 'Media',
    description: 'Media coverage and press releases',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    loc: '/sitcon-2026',
    name: 'SITCON 2026',
    description: 'Twinkle AI at SITCON 2026',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    loc: '/en',
    name: 'Homepage (English)',
    description: 'Twinkle AI community homepage in English',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    loc: '/en/about',
    name: 'About (English)',
    description: 'About the Twinkle AI community',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/en/models',
    name: 'Models (English)',
    description: 'Open-source Traditional Chinese language models',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    loc: '/en/datasets',
    name: 'Datasets (English)',
    description: 'Traditional Chinese language datasets',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/en/education',
    name: 'Education (English)',
    description: 'Educational resources for generative AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/en/projects',
    name: 'Repositories (English)',
    description: 'Official open-source code repositories by Twinkle AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/en/constellation',
    name: 'Constellation (English)',
    description: 'Co-created community projects built on Twinkle AI',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    loc: '/en/news',
    name: 'News (English)',
    description: 'Latest news from the Twinkle AI community',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    loc: '/en/media',
    name: 'Media (English)',
    description: 'Media coverage and press releases',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    loc: '/en/sitcon-2026',
    name: 'SITCON 2026 (English)',
    description: 'Twinkle AI at SITCON 2026',
    priority: '0.7',
    changefreq: 'monthly',
  },
];

/** Pages in the default locale (zh-TW, no `/en` prefix). */
export const defaultLocalePages = sitePages.filter(
    (p) => !p.loc.startsWith('/en'),
);

/** Pages in the English locale (prefixed with `/en`). */
export const enLocalePages = sitePages.filter(
    (p) => p.loc.startsWith('/en'),
);
