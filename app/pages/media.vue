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
            <div class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700 flex flex-col justify-between">
                <div>
                    <h3 class="text-lg font-bold text-white mb-4">{{ $t('news.press_kit.press_release') }}</h3>
                    <p class="text-sm text-gray-400 mb-6 leading-relaxed">{{ $t('media.pressReleaseDesc') }}</p>
                </div>
                <div>
                    <UButton
                        v-track="'Press_Kit_Drive_Click'"
                        to="https://drive.google.com/drive/folders/1TI4na86Vs1PkKZM9IO1tWy6JeaDelot3?usp=sharing"
                        target="_blank"
                        icon="i-heroicons-arrow-top-right-on-square"
                        variant="soft"
                        color="white"
                        class="w-full justify-center py-2.5 font-bold hover:!bg-[#ffd500] hover:!text-gray-900 hover:!border-transparent transition-all duration-200"
                    >
                        {{ $t('actions.download_press_release') }}
                    </UButton>
                </div>
            </div>

            <!-- Brand Identity -->
            <div class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700">
                <h3 class="text-lg font-bold text-white mb-4">{{ $t('news.press_kit.identity') }}</h3>
                <div class="space-y-3">
                    <UButton
                        to="/resources/brands/Twinkle%20AI%20-%20Star%20Logo.zip"
                        target="_blank"
                        icon="i-heroicons-photo"
                        variant="soft"
                        color="primary"
                        class="w-full justify-start"
                    >
                        Twinkle AI Logo (Star Icon)
                    </UButton>
                    <UButton
                        to="/resources/brands/Twinkle%20AI%20-%20Title.zip"
                        target="_blank"
                        icon="i-heroicons-photo"
                        variant="soft"
                        color="primary"
                        class="w-full justify-start"
                    >
                        Twinkle AI Logo (With Title)
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
