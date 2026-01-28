<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <!-- Header -->
      <SectionHeading
        :title="$t('datasets.title')"
        :description="$t('datasets.description')"
        icon="i-heroicons-circle-stack"
      />

      <!-- Philosophy -->
      <div class="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
           <h2 class="text-2xl font-bold text-white mb-4">{{ $t('datasets.philosophy.title') }}</h2>
           <div class="text-gray-300 whitespace-pre-line leading-relaxed">
             {{ $t('datasets.philosophy.content') }}
           </div>
        </div>
        <div class="bg-gray-800/50 p-8 rounded-xl ring-1 ring-gray-700 flex items-center justify-center aspect-video">
           <UIcon name="i-heroicons-funnel" class="w-24 h-24 text-primary-500/50" />
        </div>
      </div>

      <!-- Formosa Vision -->
      <div class="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="md:order-2">
           <h2 class="text-2xl font-bold text-white mb-4">{{ $t('datasets.vision.title') }}</h2>
           <div class="text-gray-300 whitespace-pre-line leading-relaxed">
             {{ $t('datasets.vision.content') }}
           </div>
        </div>
        <div class="md:order-1 bg-gray-800/50 p-8 rounded-xl ring-1 ring-gray-700 flex items-center justify-center aspect-video">
           <UIcon name="i-heroicons-photo" class="w-24 h-24 text-primary-500/50" />
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-24 flex justify-center">
         <UButton
            to="https://huggingface.co/twinkle-ai/datasets"
            target="_blank"
            size="xl"
            icon="i-simple-icons-huggingface"
            class="btn-twinkle-filled"
         >
            {{ $t('actions.explore_datasets') }}
         </UButton>
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
