// Log which Nitro preset is being used
const isProduction = process.env.NODE_ENV === 'production';
const nitroPreset = process.env.NITRO_PRESET ?? (
  isProduction ? 'cloudflare-module' : 'bun'
);
console.info(`Using Nitro preset: ${nitroPreset}`);

// Tracing configuration
const dataSiteId = process.env.
    NUXT_PUBLIC_RYBBIT_SITE_ID || 'd841e3322e18';
const websiteId = process.env.
    NUXT_PUBLIC_UMAMI_WEBSITE_ID || 'a6aaac72-1b21-4b45-9d8f-192903e30299';
console.info(`Using Rybbit data-site-id: ${dataSiteId}`);
console.info(`Using Umami website-id: ${websiteId}`);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  future: {compatibilityVersion: 4},

  app: {
    head: {
      title: 'Twinkle AI - 正體中文開源語言模型社群',
      meta: [
        {name: 'description', content: '致力於構建開源正體中文語言模型的研究社群，推動台灣生成式 AI 發展。'},
      ],
      link: [{rel: 'icon', type: 'image/x-icon', href: '/logo.png'}],
      script: [
        {
          'src': 'https://rbt.w-w.club/api/script.js',
          'data-site-id': dataSiteId,
          'defer': true,
        },
        {
          'src': 'https://um.w-w.club/script.js',
          'data-website-id': websiteId,
          'defer': true,
        },
      ],
    },
  },

  // prefer dark by default for the Twinkle (starry) theme
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/content',
  ],

  nitro: {preset: nitroPreset},

  i18n: {
    locales: [
      {
        code: 'zh-TW',
        iso: 'zh-TW',
        file: 'zh-TW.json',
        name: '中文 (正體)',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
    ],
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      redirectOn: 'no prefix',
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },

  runtimeConfig: {
    githubAccessToken: '',
    public: {
      githubOrgName: 'ai-twinkle',
      hfOrgName: 'twinkle-ai',
      sitconApiKey: 'sk-ROyTlHXQ3AdBdO4SSQIvzA',
    },
    externalUrls: {
      discord: 'https://discord.com/servers/twinkle-ai-1310544431983759450',
      github: 'https://github.com/ai-twinkle',
      huggingface: 'https://huggingface.co/twinkle-ai',
    },
  },
});
