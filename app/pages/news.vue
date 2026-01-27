<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('nav.news')"
        :description="$t('news.description')"
        icon="i-heroicons-newspaper"
      />

      <div class="mt-16 space-y-8 relative">
        <!-- Timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block" />

        <div v-if="news && news.length > 0" class="space-y-12">
          <div v-for="item in news" :key="item.path" class="relative">
            <!-- Timeline dot -->
            <div class="absolute left-8 -translate-x-1/2 mt-6 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-gray-900 hidden md:block" />

            <div class="md:pl-20">
              <NewsCard :article="item" />
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-400 py-12">
          No news found ({{ news ? news.length : 'null' }})
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const {locale} = useI18n();

const {data: news} = await useAsyncData(`news-${locale.value}`, async () => {
  const pathPrefix = locale.value === 'en' ? '/en/news' : '/zh-TW/news';
  const result = await queryCollection('news')
      .where('path', 'LIKE', `${pathPrefix}%`)
      .order('date', 'DESC')
      .all();
  return result;
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
