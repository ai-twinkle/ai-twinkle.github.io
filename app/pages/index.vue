<template>
  <div class="relative starry-bg text-white">
    <UContainer class="py-24 sm:py-32">
      <!-- Hero -->
      <div class="text-center">
        <UBadge variant="subtle" size="lg" class="mb-4 rounded-full badge-twinkle">
          {{ $t('home.badge') }}
        </UBadge>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          {{ $t('home.titleStart') }}<span class="text-twinkle">{{ $t('home.titleHighlight') }}</span>{{ $t('home.titleEnd') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          {{ $t('home.lead') }}
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton
            size="xl"
            to="/discord"
            target="_blank"
            icon="i-simple-icons-discord"
            class="btn-twinkle-filled shadow-lg"
          >
            {{ $t('actions.join_discord') }}
          </UButton>
          <UButtonLocale
            size="xl"
            variant="ghost"
            to="/about"
            trailing-icon="i-heroicons-arrow-right"
          >
            {{ $t('actions.read_more') }}
          </UButtonLocale>
        </div>

        <div class="mt-12 flex justify-center gap-6">
          <UButton
            v-for="social in socialLinks"
            :key="social.label"
            :to="social.to"
            target="_blank"
            variant="link"
            :icon="social.icon"
            class="text-gray-400 hover:text-white transition-colors"
          />
        </div>
      </div>
    </UContainer>

    <!-- Highlights Grid -->
    <div class="py-24 bg-gray-900/50">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Models -->
            <NuxtLinkLocale to="/models" class="group p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block">
                <UIcon name="i-heroicons-cpu-chip" class="w-12 h-12 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 class="text-xl font-bold text-white mb-2">{{ $t('home.highlights.models') }}</h3>
                <p class="text-gray-400">{{ $t('models.description') }}</p>
            </NuxtLinkLocale>
            <!-- Datasets -->
            <NuxtLinkLocale to="/datasets" class="group p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block">
                <UIcon name="i-heroicons-circle-stack" class="w-12 h-12 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 class="text-xl font-bold text-white mb-2">{{ $t('home.highlights.datasets') }}</h3>
                <p class="text-gray-400">{{ $t('datasets.description') }}</p>
            </NuxtLinkLocale>
            <!-- Education -->
            <NuxtLinkLocale to="/education" class="group p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block">
                <UIcon name="i-heroicons-academic-cap" class="w-12 h-12 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 class="text-xl font-bold text-white mb-2">{{ $t('home.highlights.education') }}</h3>
                <p class="text-gray-400">{{ $t('education.description') }}</p>
            </NuxtLinkLocale>
        </div>
      </UContainer>
    </div>

    <!-- Latest News -->
    <div class="py-24">
      <UContainer>
        <div class="flex justify-between items-end mb-12">
            <div>
                 <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                    {{ $t('nav.news') }}
                 </h2>
                 <p class="text-lg text-gray-400">
                    {{ $t('news.description') }}
                 </p>
            </div>
            <UButtonLocale to="/news" variant="link" trailing-icon="i-heroicons-arrow-right" class="hidden md:flex">
                {{ $t('actions.read_more') }}
            </UButtonLocale>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <template v-if="latestNews && latestNews.length > 0">
                <NewsCard v-for="item in latestNews" :key="item.path" :article="item" :home-page="true" />
            </template>
            <div v-else class="col-span-3 text-center text-gray-400">
                {{ $t('news.noNews') }}
            </div>
        </div>

        <div class="mt-8 text-center md:hidden">
            <UButtonLocale to="/news" variant="link" trailing-icon="i-heroicons-arrow-right">
                {{ $t('actions.read_more') }}
            </UButtonLocale>
        </div>
      </UContainer>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n();

const socialLinks = [
  {label: t('social.discord'), icon: 'i-simple-icons-discord', to: '/discord', color: 'primary'},
  {label: t('social.huggingface'), icon: 'i-simple-icons-huggingface', to: '/huggingface', color: 'yellow'},
  {label: t('social.github'), icon: 'i-simple-icons-github', to: '/github', color: 'white'},
];

// Fetch latest 3 news
const {data: latestNews} = await useAsyncData(`latest-news-${locale.value}`, async () => {
  const pathPrefix = locale.value === 'en' ? '/en/news' : '/zh-TW/news';
  const result = await queryCollection('news')
      .where('path', 'LIKE', `${pathPrefix}%`)
      .order('date', 'DESC')
      .limit(3)
      .all();
  return result;
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
