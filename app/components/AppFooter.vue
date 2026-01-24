<template>
  <footer class="mt-16 pb-12 text-sm leading-6 text-gray-300 bg-transparent">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
        <div class="flex flex-col items-center md:items-start">
          <div class="text-white font-semibold flex items-center gap-2">
             <NuxtImg src="/logo.png" alt="Logo" width="24" height="24" class="inline-block md:hidden opacity-80" />
             <span class="text-twinkle">{{ $t('site.title') }}</span>
          </div>
          <div class="text-xs text-gray-400 mt-1">{{ $t('footer.tagline') }}</div>
          
          <div class="mt-4 flex gap-3">
            <UButton
              v-for="link in socialLinks"
              :key="link.id"
              :to="link.href"
              target="_blank"
              color="neutral"
              variant="ghost"
              :icon="link.icon"
              :aria-label="$t(link.labelKey)"
              class="hover:text-twinkle transition-colors"
            />
          </div>
        </div>

        <div class="text-sm text-gray-400 flex flex-col items-center md:items-end">
          <div class="flex items-center gap-2 justify-center md:justify-end flex-wrap">
            <span>{{ $t('footer.recommendedPrefix') }}</span>
            <div class="flex items-center gap-2">
               <NuxtLink to="/huggingface" class="text-white hover:text-twinkle transition-colors">
                  {{ $t('social.huggingface') }}
               </NuxtLink>
               <span class="text-gray-600">|</span>
               <NuxtLink to="/github" class="text-white hover:text-twinkle transition-colors">
                  {{ $t('social.github') }}
               </NuxtLink>
            </div>
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
  { id: 'huggingface', href: '/huggingface', labelKey: 'social.huggingface', icon: 'i-simple-icons-huggingface' },
  { id: 'github', href: '/github', labelKey: 'social.github', icon: 'i-simple-icons-github' },
  { id: 'discord', href: '/discord', labelKey: 'social.discord', icon: 'i-simple-icons-discord' },
] as const;
</script>
