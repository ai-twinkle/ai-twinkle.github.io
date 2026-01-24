<template>
  <div class="relative starry-bg text-white">
    <UContainer class="py-24 sm:py-32">
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
            to="/projects"
            trailing-icon="i-heroicons-arrow-right"
          >
            {{ $t('actions.explore_projects') }}
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

    <div class="bg-gray-900/30 py-24">
      <UContainer>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <UCard v-for="feat in features" :key="feat.title" class="hover:border-primary-500/50 transition-all duration-300 bg-gray-900 ring-1 ring-gray-800">
            <template #header>
              <UIcon :name="feat.icon" class="w-8 h-8 text-primary-400" />
            </template>
            <h3 class="text-xl font-semibold text-white mb-2">{{ feat.title }}</h3>
            <p class="text-gray-400">{{ feat.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const features = [
  {
    title: t('features.optimized.title'),
    description: t('features.optimized.description'),
    icon: 'i-heroicons-language',
  },
  {
    title: t('features.open_source.title'),
    description: t('features.open_source.description'),
    icon: 'i-heroicons-code-bracket-square',
  },
  {
    title: t('features.tools.title'),
    description: t('features.tools.description'),
    icon: 'i-heroicons-chart-bar',
  },
];

const socialLinks = [
  {label: t('social.discord'), icon: 'i-simple-icons-discord', to: '/discord', color: 'primary'},
  {label: t('social.huggingface'), icon: 'i-simple-icons-huggingface', to: '/huggingface', color: 'yellow'},
  {label: t('social.github'), icon: 'i-simple-icons-github', to: '/github', color: 'white'},
];
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
