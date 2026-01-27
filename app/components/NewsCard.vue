<template>
  <UCard class="bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500/50 transition-all duration-300">
    <template #header>
      <div class="flex items-center justify-between">
        <UBadge v-if="article.category" :label="article.category" variant="subtle" size="sm" />
        <span class="text-sm text-gray-500">{{ formatDate(article.date) }}</span>
      </div>
    </template>

    <h3 class="text-xl font-bold text-white mb-2">{{ article.title }}</h3>

    <div class="text-gray-400 prose prose-invert prose-sm max-w-none mb-4">
      <ContentRenderer :value="article" />
    </div>

    <template v-if="article.links && article.links.length > 0" #footer>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="link in article.links"
          :key="link.url"
          :to="link.url"
          target="_blank"
          variant="ghost"
          size="xs"
          icon="i-heroicons-arrow-top-right-on-square"
          color="neutral"
        >
          {{ link.title }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Article {
  title: string;
  date?: string;
  category?: string;
  links?: { title: string; url: string }[];
  [key: string]: unknown;
}

defineProps<{
  article: Article;
}>();

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
