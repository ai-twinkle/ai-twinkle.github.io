<template>
  <UCard
    :id="slug"
    class="bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500/50 transition-all duration-300 flex flex-col h-full"
    :ui="{ body: 'flex-1 flex flex-col' }"
    :class="{ 'cursor-pointer': homePage }"
    @click="handleCardClick"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <UBadge v-if="article.category" :label="article.category" variant="subtle" size="sm" />
        <span class="text-sm text-gray-500">{{ formatDate(article.date) }}</span>
      </div>
    </template>

    <h3
        class="text-xl font-bold text-white mb-2 transition-colors outline-none focus-visible:text-primary-400"
        :class="homePage ? 'hover:text-primary-400 line-clamp-2 h-[3.5rem] overflow-hidden' : ''"
    >
        {{ article.title }}
    </h3>

    <div
        v-if="homePage"
        class="mb-4 text-gray-400 text-sm overflow-hidden h-[6rem]"
    >
        <div class="line-clamp-4 prose prose-sm prose-invert max-w-none prose-p:my-0 prose-headings:hidden prose-img:hidden prose-hr:hidden">
            <ContentRenderer :value="article" />
        </div>
    </div>

    <div
        v-else
        class="text-gray-400 prose prose-invert prose-sm max-w-none mb-4"
    >
        <ContentRenderer :value="article" />
    </div>

    <div v-if="homePage" class="mt-2 pt-2">
         <UButton
            :to="`${localePath('/news')}#${slug}`"
            variant="link"
            size="sm"
            class="p-0 text-primary-400 hover:text-primary-300"
            icon="i-heroicons-arrow-right"
        >
            {{ $t('actions.read_more') }}
        </UButton>
    </div>

    <div v-if="homePage" class="flex-1"/>

    <template v-if="article.links && article.links.length > 0" #footer>
      <div class="flex flex-wrap gap-2 overflow-hidden">
        <UButton
          v-for="link in article.links"
          :key="link.url"
          :to="link.url"
          target="_blank"
          variant="ghost"
          size="xs"
          icon="i-heroicons-arrow-top-right-on-square"
          color="neutral"
          class="max-w-full"
        >
          <span class="truncate">{{ link.title }}</span>
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const router = useRouter();

interface Article {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  links?: { title: string; url: string }[];
  path?: string;
  _path?: string;
}


const props = defineProps<{
  article: Article;
  homePage?: boolean;
}>();

const slug = computed(() => {
  // Generate a safe ID from the path, _path or title fallback
  const id = props.article.path || props.article._path || props.article.title;
  return id ?
    id.replace(/[^a-z0-9]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() :
    'unknown-article';
});

const handleCardClick = (e: MouseEvent) => {
  if (!props.homePage) return;

  // Prevent navigation if user is selecting text
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) return;

  const target = e.target as HTMLElement;
  // Prevent if clicking on interactive elements
  if (target.closest('a, button')) return;

  // Navigate to news page
  router.push(`${localePath('/news')}#${slug.value}`);
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>
