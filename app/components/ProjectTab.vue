<template>
  <div>
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-white">{{ title }}</h3>
      <p v-if="lead" class="mt-2 text-gray-400">{{ lead }}</p>
    </div>

    <div v-if="pending" class="flex justify-center items-center py-6">
      <LoadingCircleIcon class="h-6 w-6 text-gray-400 animate-spin" />
      <p class="ml-3 text-gray-400">{{ loadingText }}</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 rounded text-red-600">
      <p class="font-medium">{{ errorTitle }}</p>
      <p class="mt-2 text-sm text-red-600">{{ (error as any).message ?? error }}</p>
      <div class="mt-2">
        <UButton v-if="onRetry" @click="onRetry">{{ retryLabel }}</UButton>
      </div>
    </div>

    <div v-else-if="items && items.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <UCard v-for="item in items" :key="item.link" class="flex flex-col h-full hover:ring-primary-500 transition-all cursor-pointer" @click="open(item.link)">
        <div class="flex justify-between items-start mb-4">
          <h4 class="text-lg font-semibold text-white">{{ item.name }}</h4>
          <UBadge variant="soft" color="neutral" size="sm" class="border-twinkle/30">{{ item.stars }}</UBadge>
        </div>
        <p class="text-gray-300 text-sm grow mb-6">{{ item.desc }}</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          <UBadge v-for="t in item.tech" :key="t" color="neutral" variant="solid" size="xs" class="text-gray-300 bg-gray-800/40">{{ t }}</UBadge>
        </div>
      </UCard>
    </div>

    <div v-else class="p-6 text-gray-400">
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  lead?: string,
  items?: Array<{ name: string; desc: string; tech: string[]; stars: string; link: string }>,
  pending?: boolean,
  error?: any,
  onRetry?: (() => void) | null,
  emptyText?: string,
  loadingText?: string,
  retryLabel?: string,
  errorTitle?: string,
}>()

const open = (url: string) => {
  window.open(url, '_blank')
}
</script>
