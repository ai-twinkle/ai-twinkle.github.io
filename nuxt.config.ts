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
    },
  },

  // prefer dark by default for the Twinkle (starry) theme
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'zh-TW',
        iso: 'zh-TW',
        file: 'zh-TW.json',
        name: '中文 (繁體)',
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
    },
    externalUrls: {
      discord: 'https://discord.gg/Cx737yw4ed',
      github: 'https://github.com/ai-twinkle',
      huggingface: 'https://huggingface.co/twinkle-ai',
    },
  },
});
