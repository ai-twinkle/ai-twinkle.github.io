<template>
  <footer class="mt-16 pb-12 text-sm leading-6 text-gray-300 bg-transparent">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div class="text-white font-semibold"><span class="text-twinkle">{{ $t('site.title') }}</span></div>
          <div class="text-xs text-gray-400">{{ $t('footer.tagline') }}</div>
          <div class="mt-3 flex gap-3">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              class="text-gray-400 hover:text-twinkle transition-colors"
              :href="link.href"
              target="_blank"
            >
              {{ $t(link.labelKey) }}
            </a>
          </div>
        </div>

        <div class="text-sm text-gray-400">
          <div>{{ $t('footer.recommendedPrefix') }}
            <NuxtLink to="/huggingface" class="text-white hover:underline">
              {{ $t('social.huggingface') }}
            </NuxtLink>
            <span class="mx-2 border-l border-gray-600/50"></span>
            <NuxtLink to="/github" class="text-white hover:underline">
              {{ $t('social.github') }}
            </NuxtLink>
          </div>
          <div class="mt-3">{{ $t('footer.copyright', { year }) }}</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const socialLinks = [
  { id: 'huggingface', href: '/huggingface', labelKey: 'social.huggingface' },
  { id: 'github', href: '/github', labelKey: 'social.github' },
  { id: 'discord', href: '/discord', labelKey: 'social.discord' },
] as const;
</script>
