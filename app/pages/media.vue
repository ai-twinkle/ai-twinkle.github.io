<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <div v-if="page">
        <SectionHeading
          :title="page.title"
          :description="page.description"
          icon="i-heroicons-camera"
        />

        <div class="mt-16 prose prose-invert prose-lg max-w-none prose-primary px-4 sm:px-0">
          <ContentRenderer :value="page" />
        </div>
      </div>

      <div v-else class="text-center py-24">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-gray-500" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const {locale} = useI18n();

const {data: page} = await useAsyncData(`media-${locale.value}`, () => {
  const path = locale.value === 'en' ? '/en/pages/media' : '/zh-TW/pages/media';
  return queryCollection('pages').path(path).first();
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
