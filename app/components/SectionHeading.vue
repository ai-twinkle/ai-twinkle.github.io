<template>
  <div class="mb-12 text-center">
    <div v-if="icon" class="flex justify-center mb-4">
      <div class="p-3 rounded-full bg-primary-500/10 ring-1 ring-primary-500/30">
        <UIcon :name="icon" class="w-8 h-8 text-primary-400" />
      </div>
    </div>

    <h2 v-if="title" class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
      {{ title }}
    </h2>

    <p v-if="description" class="max-w-2xl mx-auto text-lg text-gray-400">
      {{ description }}
    </p>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  icon?: string;
}>();
</script>
