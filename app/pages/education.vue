<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('nav.education')"
        :description="$t('education.description')"
        icon="i-heroicons-academic-cap"
      />

      <div v-if="items && items.length > 0" class="mt-16 space-y-16">
        <div v-for="item in items" :key="item.path" class="relative">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <!-- Icon/Title Column -->
            <div class="md:col-span-4 lg:col-span-3">
              <div class="flex items-center gap-4 mb-4">
                <div v-if="item.icon" class="p-2 rounded-lg bg-gray-800 ring-1 ring-gray-700">
                  <UIcon :name="item.icon" class="w-6 h-6 text-primary-400" />
                </div>
                <h3 class="text-xl font-bold text-white">{{ item.title }}</h3>
              </div>
            </div>

            <!-- Content Column -->
            <div class="md:col-span-8 lg:col-span-9">
               <div class="prose prose-invert prose-lg max-w-none prose-primary bg-gray-900/50 p-6 rounded-xl ring-1 ring-gray-800 hover:ring-primary-500/30 transition-all">
                 <ContentRenderer :value="item" />
               </div>
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
