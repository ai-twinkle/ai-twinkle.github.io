import {defaultLocalePages} from '../../../../shared/utils/sitePages';

export default defineEventHandler((event) => {
  const {public: {siteUrl}} = useRuntimeConfig();

  setHeader(event, 'Content-Type', 'application/json; charset=utf-8');

  const resources = defaultLocalePages.map((page) => ({
    uri: `${siteUrl}${page.loc}`,
    name: page.name,
    description: page.description,
  }));

  return {
    serverInfo: {
      name: 'Twinkle AI Website',
      version: '1.0.0',
      description:
        'Twinkle AI official community website — open-source Traditional ' +
        'Chinese language model research.',
    },
    transport: {
      type: 'http',
      url: siteUrl,
    },
    capabilities: {
      tools: false,
      resources: true,
      prompts: false,
    },
    resources,
  };
});
