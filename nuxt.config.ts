// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  app: {
    head: {
      title: 'Twinkle AI - 正體中文開源語言模型社群',
      meta: [
        { name: 'description', content: '致力於構建開源正體中文語言模型的研究社群，推動台灣生成式 AI 發展。' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }]
    }
  },

  // prefer dark by default for the Twinkle (starry) theme
  colorMode: { preference: 'dark', fallback: 'dark' },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxt/image'],
})
