<template>
  <UCard
    :id="slug"
    class="bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500/50 transition-all duration-300"
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
        :class="homePage ? 'hover:text-primary-400' : ''"
        :role="homePage ? 'button' : undefined"
        :tabindex="homePage ? 0 : undefined"
        :aria-expanded="homePage ? isOpen : undefined"
        @keydown.enter.prevent="toggle"
        @keydown.space.prevent="toggle"
    >
        {{ article.title }}
        <UIcon
            v-if="homePage"
            :name="isOpen ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 inline-block ml-2 text-gray-500"
        />
    </h3>

    <div
        class="grid transition-[grid-template-rows] duration-500 ease-out"
        :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
        <div class="overflow-hidden">
            <div class="text-gray-400 prose prose-invert prose-sm max-w-none mb-4">
                <ContentRenderer :value="article" />
            </div>
        </div>
    </div>

    <div v-if="homePage && !isOpen" class="mt-2">
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
const localePath = useLocalePath();

interface Article {
  title: string;
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
  // Generate a safe ID from the path or title
  const id = props.article.path || props.article._path;
  return id ? id.replace(/[^a-z0-9]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() : undefined;
});

const isOpen = ref(!props.homePage);

const toggle = () => {
  if (props.homePage) {
    isOpen.value = !isOpen.value;
  }
};

const handleCardClick = (e: MouseEvent) => {
  if (!props.homePage) return;

  // Prevent toggle if user is selecting text
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) return;

  const target = e.target as HTMLElement;
  // Prevent toggle if clicking on interactive elements (links, buttons)
  if (target.closest('a, button')) return;

  isOpen.value = !isOpen.value;
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
