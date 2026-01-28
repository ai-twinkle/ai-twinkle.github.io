<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('nav.education')"
        :description="$t('education.description')"
        icon="i-heroicons-academic-cap"
      />

      <div v-if="items && items.length > 0" class="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="item in items"
          :key="item.path"
          :class="['relative overflow-hidden rounded-2xl ring-1 ring-gray-800 transition-all hover:ring-primary-500 group bg-gray-900/50',
                   item.path.includes('podcast') ? 'lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800' : '']"
        >

          <div class="p-8 md:p-10 h-full flex flex-col">
             <div class="flex items-center gap-4 mb-6">
                <div v-if="item.icon" class="p-3 rounded-xl bg-gray-800 ring-1 ring-gray-700 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-all">
                  <UIcon :name="item.icon" class="w-8 h-8" />
                </div>
                <h3 class="text-2xl font-bold text-white">{{ item.title }}</h3>
             </div>

             <div class="prose prose-invert prose-lg max-w-none prose-primary prose-a:text-primary-400 flex-grow">
                 <ContentRenderer :value="item" />
             </div>

             <div class="mt-6 pt-6 border-t border-gray-700/50 flex justify-end">
                <UButton
                  to="/discord"
                  target="_blank"
                  variant="ghost"
                  color="neutral"
                  class="group-hover:text-primary-400 transition-colors"
                  icon="i-simple-icons-discord"
                >
                  {{ $t('education.join') }}
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
             </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-24 text-gray-400">
        {{ $t('projects.loading') }}
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const {locale} = useI18n();

const {data: items} = await useAsyncData(`education-${locale.value}`, () => {
  const pathPrefix = locale.value === 'en' ? '/en/education' : '/zh-TW/education';
  return queryCollection('education')
      .where('path', 'LIKE', `${pathPrefix}%`)
      .order('order', 'ASC')
      .all();
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
