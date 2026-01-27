<template>
  <footer class="mt-16 text-sm leading-6 text-gray-300 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">

      <!-- Mobile Layout: Centered brand + horizontal link groups -->
      <div class="md:hidden">
        <!-- Brand Section - Centered on Mobile -->
        <div class="text-center mb-8">
          <NuxtLinkLocale to="/" class="inline-flex items-center gap-3 group">
            <NuxtImg src="/logo.png" alt="Logo" width="36" height="36" class="group-hover:scale-105 transition-transform" />
            <div class="font-bold text-lg text-twinkle">{{ $t('site.title') }}</div>
          </NuxtLinkLocale>
          <p class="mt-2 text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
            {{ $t('footer.tagline') }}
          </p>

          <!-- Social Links - Centered -->
          <div class="mt-4 flex justify-center gap-2">
            <UButton
              v-for="link in socialLinks"
              :key="link.id"
              :to="link.href"
              :icon="link.icon"
              target="_blank"
              color="neutral"
              variant="ghost"
              size="sm"
              :aria-label="$t(link.labelKey)"
              class="hover:text-twinkle hover:bg-gray-800/50 transition-all"
            />
          </div>
        </div>

        <!-- Quick Links - 2 columns on mobile -->
        <div class="grid grid-cols-2 gap-6 text-center">
          <div>
            <h3 class="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
              {{ $t('footer.navigation') }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in navigationLinks" :key="link.to">
                <a
                  v-if="link.external"
                  :href="getExternalUrl(link.to)"
                  class="text-gray-400 hover:text-twinkle transition-colors text-sm"
                >
                  {{ $t(link.name) }}
                </a>
                <NuxtLinkLocale
                  v-else
                  :to="link.to"
                  class="text-gray-400 hover:text-twinkle transition-colors text-sm"
                >
                  {{ $t(link.name) }}
                </NuxtLinkLocale>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
              {{ $t('footer.resources') }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in resourceLinks" :key="link.to">
                <NuxtLinkLocale
                  :to="link.to"
                  class="text-gray-400 hover:text-twinkle transition-colors text-sm"
                >
                  {{ $t(link.name) }}
                </NuxtLinkLocale>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Desktop Layout: 4-column grid -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <NuxtLinkLocale to="/" class="flex items-center gap-3 group">
            <NuxtImg src="/logo.png" alt="Logo" width="40" height="40" class="group-hover:scale-105 transition-transform" />
            <div class="leading-tight">
              <div class="font-bold text-lg text-twinkle">{{ $t('site.title') }}</div>
            </div>
          </NuxtLinkLocale>
          <p class="mt-3 text-gray-400 text-sm leading-relaxed">
            {{ $t('footer.tagline') }}
          </p>

          <!-- Social Links -->
          <div class="mt-5 flex gap-2">
            <UButton
              v-for="link in socialLinks"
              :key="link.id"
              :to="link.href"
              :icon="link.icon"
              target="_blank"
              color="neutral"
              variant="ghost"
              size="sm"
              :aria-label="$t(link.labelKey)"
              class="hover:text-twinkle hover:bg-gray-800/50 transition-all"
            />
          </div>
        </div>

        <!-- Navigation Column -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {{ $t('footer.navigation') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in navigationLinks" :key="link.to">
              <a
                v-if="link.external"
                :href="getExternalUrl(link.to)"
                class="text-gray-400 hover:text-twinkle transition-colors inline-flex items-center gap-1"
              >
                {{ $t(link.name) }}
              </a>
              <NuxtLinkLocale
                v-else
                :to="link.to"
                class="text-gray-400 hover:text-twinkle transition-colors inline-flex items-center gap-1"
              >
                {{ $t(link.name) }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <!-- Resources Column -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {{ $t('footer.resources') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in resourceLinks" :key="link.to">
              <NuxtLinkLocale
                :to="link.to"
                class="text-gray-400 hover:text-twinkle transition-colors"
              >
                {{ $t(link.name) }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <!-- Connect Column -->
        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
            {{ $t('footer.connect') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in connectLinks" :key="link.id">
              <NuxtLink
                :to="link.href"
                target="_blank"
                class="text-gray-400 hover:text-twinkle transition-colors inline-flex items-center gap-2"
              >
                <UIcon :name="link.icon" class="w-4 h-4" />
                {{ $t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800/50 bg-gray-900/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-gray-500 text-xs order-2 sm:order-1">
            {{ $t('footer.copyright', { year }) }}
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-500 order-1 sm:order-2">
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
              {{ $t('footer.open_source') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {locale} = useI18n();

const year = new Date().getFullYear();

const getExternalUrl = (path: string): string => {
  return `${path}?lang=${locale.value}`;
};

const socialLinks = [
  {id: 'huggingface', href: '/huggingface', labelKey: 'social.huggingface', icon: 'i-simple-icons-huggingface'},
  {id: 'github', href: '/github', labelKey: 'social.github', icon: 'i-simple-icons-github'},
  {id: 'discord', href: '/discord', labelKey: 'social.discord', icon: 'i-simple-icons-discord'},
] as const;

const navigationLinks = [
  {name: 'nav.models', to: '/models', external: false},
  {name: 'nav.leaderboard', to: '/leaderboard', external: true},
  {name: 'nav.news', to: '/news', external: false},
] as const;

const resourceLinks = [
  {name: 'nav.education', to: '/education'},
  {name: 'nav.media', to: '/media'},
] as const;

const connectLinks = [
  {id: 'discord', href: '/discord', labelKey: 'social.discord', icon: 'i-simple-icons-discord'},
  {id: 'github', href: '/github', labelKey: 'social.github', icon: 'i-simple-icons-github'},
  {id: 'huggingface', href: '/huggingface', labelKey: 'social.huggingface', icon: 'i-simple-icons-huggingface'},
] as const;
</script>
