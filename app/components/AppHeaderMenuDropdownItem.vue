<template>
  <a
    v-if="props.to && props.external"
    :href="localizedExternalUrl"
    :class="buttonClass"
  >
    <div v-if="props.icon" class="shrink-0">
      <dynamic-hero-icon
        v-if="isHeroIcon"
        :name="props.icon"
        class="rounded-full w-6 h-6 mr-3"
      />
      <UIcon
        v-else
        :name="props.icon"
        class="w-6 h-6 mr-3 text-primary-400"
      />
    </div>
    <slot name="prepend" />
    <div class="text-left">
      <div class="text-base font-medium text-gray-200">
        {{ props.name }}
      </div>
      <div class="mt-1 text-sm text-gray-400">
        {{ props.description }}
      </div>
    </div>
  </a>
  <NuxtLinkLocale
    v-else-if="props.to"
    :to="props.to"
    :class="buttonClass"
  >
    <div v-if="props.icon" class="shrink-0">
      <dynamic-hero-icon
        v-if="isHeroIcon"
        :name="props.icon"
        class="rounded-full w-6 h-6 mr-3"
      />
      <UIcon
        v-else
        :name="props.icon"
        class="w-6 h-6 mr-3 text-primary-400"
      />
    </div>
    <slot name="prepend" />
    <div class="text-left">
      <div class="text-base font-medium text-gray-200">
        {{ props.name }}
      </div>
      <div class="mt-1 text-sm text-gray-400">
        {{ props.description }}
      </div>
    </div>
  </NuxtLinkLocale>
  <button
    v-else
    :class="buttonClass"
    type="button"
  >
    <div v-if="props.icon" class="shrink-0">
      <dynamic-hero-icon
        v-if="isHeroIcon"
        :name="props.icon"
        class="rounded-full w-6 h-6 mr-3"
      />
      <UIcon
        v-else
        :name="props.icon"
        class="w-6 h-6 mr-3 text-primary-400"
      />
    </div>
    <slot name="prepend" />
    <div class="text-left">
      <div class="text-base font-medium text-gray-200">
        {{ props.name }}
      </div>
      <div class="mt-1 text-sm text-gray-400">
        {{ props.description }}
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {locale} = useI18n();

const props = defineProps<{
  name: string;
  description: string;
  icon?: string;
  to?: string;
  variant?: 'mobile' | 'normal';
  external?: boolean;
}>();

const localizedExternalUrl = computed(() => {
  if (!props.to) return '';
  // If it's a full URL, return as is
  if (props.to.startsWith('http')) return props.to;
  // If it's a relative path (likely server route), append locale
  const separator = props.to.includes('?') ? '&' : '?';
  return `${props.to}${separator}lang=${locale.value}`;
});

const isHeroIcon = props.icon?.endsWith('Icon') ||
  props.icon?.startsWith('i-heroicons-') ||
  false;

const buttonClass = computed(() => ([
  'p-2',
  'flex',
  'w-full',
  'items-start',
  'rounded-lg',
  'hover:bg-gray-800',
  'cursor-pointer',
  'transition-colors',
  'md:py-5',
  'md:px-4',
]));
</script>
