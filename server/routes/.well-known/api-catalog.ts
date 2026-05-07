interface LinkRelation {
  href: string;
  type?: string;
}

interface LinksetEntry {
  anchor: string;
  [rel: string]: string | LinkRelation[];
}

export default defineEventHandler((event) => {
  const {public: {siteUrl}} = useRuntimeConfig();
  setHeader(event, 'Content-Type', 'application/linkset+json');

  const linkset: LinksetEntry[] = [
    {
      'anchor': siteUrl,
      'service-doc': [{href: `${siteUrl}/api/healthz`, type: 'text/plain'}],
      'status': [{href: `${siteUrl}/api/healthz`}],
    },
  ];

  return {linkset};
});

