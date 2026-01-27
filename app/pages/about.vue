<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <!-- Vision -->
      <SectionHeading
        :title="$t('about.vision.title')"
        :description="$t('about.vision.content')"
        icon="i-heroicons-light-bulb"
      />

      <!-- Story -->
      <div class="mt-24 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">{{ $t('about.story.title') }}</h2>
        <div class="text-gray-300 whitespace-pre-line text-lg leading-relaxed bg-gray-900/50 p-8 rounded-2xl ring-1 ring-gray-800">
            {{ $t('about.story.content') }}
        </div>
      </div>

      <!-- Timeline -->
      <div class="mt-24">
        <h2 class="text-3xl font-bold text-white mb-16 text-center">{{ $t('about.timeline.title') }}</h2>
        <div class="relative max-w-4xl mx-auto">
            <!-- Vertical Line -->
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800 md:left-1/2 md:-ml-0.5"/>

            <div v-for="(event, index) in $tm('about.timeline.events')" :key="index" class="relative mb-12 last:mb-0 group">
                <!-- Dot -->
                <div class="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-gray-900 md:left-1/2 z-10 mt-6 md:mt-0"/>

                <div class="ml-12 md:ml-0 md:flex md:justify-between md:items-center w-full">
                     <!-- Content Wrapper -->
                    <div
:class="[
                        'md:w-[45%]',
                        index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    ]">
                        <div class="bg-gray-900/80 p-6 rounded-xl ring-1 ring-gray-800 hover:ring-primary-500/50 transition-all">
                             <div class="text-primary-400 font-bold mb-1">{{ $rt(event.date) }}</div>
                             <h3 class="text-xl font-bold text-white mb-2">{{ $rt(event.title) }}</h3>
                             <p class="text-gray-400">{{ $rt(event.description) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
