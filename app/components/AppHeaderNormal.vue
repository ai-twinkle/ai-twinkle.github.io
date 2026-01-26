<template>
  <nav class="md:flex space-x-6 hidden items-center">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
    >
      <app-header-menu-dropdown
        v-if="item.type === 'dropdown'"
        :name="$t(item.name)"
        :children="item.children"
        variant="normal"
      />
      <a
        v-else-if="item.type === 'link' && item.external"
        :href="getExternalUrl(item.to)"
        class="h-8 px-3 text-gray-300 inline-flex items-center text-base font-medium rounded-md hover:text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
      >
        {{ $t(item.name) }}
      </a>
      <NuxtLinkLocale
        v-else-if="item.type === 'link'"
        :to="item.to"
        class="h-8 px-3 text-gray-300 inline-flex items-center text-base font-medium rounded-md hover:text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer"
      >
        {{ $t(item.name) }}
      </NuxtLinkLocale>
      <app-header-menu-item
        v-else
        :name="$t(item.name)"
        variant="normal"
        @click="onClickItem(item)"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import {inject, type Ref} from 'vue';
import {useI18n} from 'vue-i18n';

import {
  menuItems,
  type MenuFunctionItem,
} from '../data/AppHeaderMenuData';

const {locale} = useI18n();
const parentMenuState = inject<Ref<boolean>>('parent-menu-state')!;

const getExternalUrl = (path: string): string => {
  return `${path}?lang=${locale.value}`;
};

const onClickItem = (item: MenuFunctionItem): void => {
  parentMenuState.value = false;
  item.onClick();
};
</script>
