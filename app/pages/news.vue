<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('nav.news')"
        :description="$t('news.description')"
        icon="i-heroicons-newspaper"
      />

      <!-- Filter -->
      <div class="mt-12 flex flex-wrap gap-4 justify-center">
         <UButton
            v-for="filter in filters"
            :key="filter.value"
            :label="$t(`news.filters.${filter.value}`)"
            :variant="activeFilter === filter.value ? 'solid' : 'ghost'"
            :color="activeFilter === filter.value ? 'primary' : 'white'"
            @click="activeFilter = filter.value"
         />
      </div>

      <div class="mt-16 space-y-8 relative">
        <!-- Timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block" />

        <div v-if="filteredNews && filteredNews.length > 0" class="space-y-12">
          <div v-for="item in filteredNews" :key="item.path" class="relative">
            <!-- Timeline dot -->
            <div class="absolute left-8 -translate-x-1/2 mt-6 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-gray-900 hidden md:block" />

            <div class="md:pl-20">
              <NewsCard :article="item" />
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-400 py-12">
           {{ $t('news.noNews') }}
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const {locale} = useI18n();

const activeFilter = ref('all');
const filters = [
  {value: 'all'},
  {value: 'media'},
  {value: 'event'},
  {value: 'tech'},
  {value: 'award'},
];

const categoryMap: Record<string, string[]> = {
  media: ['Media'],
  event: ['Event', 'Community', 'Talk'],
  tech: ['Product', 'Project'],
  award: ['Awards'],
};

const {data: news} = await useAsyncData(`news-${locale.value}`, async () => {
  const pathPrefix = locale.value === 'en' ? '/en/news' : '/zh-TW/news';
  const result = await queryCollection('news')
      .where('path', 'LIKE', `${pathPrefix}%`)
      .order('date', 'DESC')
      .all();
  return result;
});

const filteredNews = computed(() => {
  if (!news.value) return [];
  if (activeFilter.value === 'all') return news.value;

  const targetCategories = categoryMap[activeFilter.value] || [];
  return news.value.filter((item) => {
    return item.category && targetCategories.includes(item.category);
  });
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
