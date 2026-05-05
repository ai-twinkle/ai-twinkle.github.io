const BASE_URL = 'https://www.twinkleai.tw';

interface LinkRelation {
  href: string;
  type?: string;
}

interface LinksetEntry {
  anchor: string;
  [rel: string]: string | LinkRelation[];
}

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/linkset+json');

  const linkset: LinksetEntry[] = [
    {
      'anchor': BASE_URL,
      'service-doc': [{href: `${BASE_URL}/api/healthz`, type: 'text/plain'}],
      'status': [{href: `${BASE_URL}/api/healthz`}],
    },
  ];

  return {linkset};
});
