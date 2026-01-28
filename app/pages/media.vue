<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('nav.media')"
        :description="$t('media.description')"
        icon="i-heroicons-photo"
      />

      <!-- Press Kit Section (Structured) -->
      <div class="mt-16 bg-gray-900/50 p-8 rounded-2xl ring-1 ring-gray-800">
         <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-down-tray" class="text-primary-400" />
            {{ $t('news.press_kit.title') }}
         </h2>
         <p class="text-gray-400 mb-8">{{ $t('news.press_kit.description') }}</p>

         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Press Release -->
            <div class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700">
                <h3 class="text-lg font-bold text-white mb-4">{{ $t('news.press_kit.press_release') }}</h3>
                <div class="space-y-3">
                    <UButton
                        to="#"
                        target="_blank"
                        icon="i-heroicons-document-text"
                        variant="soft"
                        color="white"
                        class="w-full justify-start"
                    >
                        {{ $t('actions.download_pdf_zh') }}
                    </UButton>
                    <UButton
                        to="#"
                        target="_blank"
                        icon="i-heroicons-document-text"
                        variant="soft"
                        color="white"
                        class="w-full justify-start"
                    >
                        {{ $t('actions.download_pdf_en') }}
                    </UButton>
                </div>
            </div>

            <!-- Brand Identity -->
            <div class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700">
                <h3 class="text-lg font-bold text-white mb-4">{{ $t('news.press_kit.identity') }}</h3>
                <div class="space-y-3">
                    <UButton
                        to="#"
                        target="_blank"
                        icon="i-heroicons-photo"
                        variant="soft"
                        color="primary"
                        class="w-full justify-start"
                    >
                        Twinkle AI Logo (SVG)
                    </UButton>
                    <UButton
                        to="#"
                        target="_blank"
                        icon="i-heroicons-photo"
                        variant="soft"
                        color="primary"
                        class="w-full justify-start"
                    >
                        Twinkle AI Logo (PNG)
                    </UButton>
                </div>
            </div>
         </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// No script needed if using static i18n
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
