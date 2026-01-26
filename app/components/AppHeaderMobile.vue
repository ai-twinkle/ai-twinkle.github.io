<template>
  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
    <div class="rounded-lg shadow-lg divide-y-2 divide-gray-800 bg-gray-900 ring-1 ring-gray-800 max-h-[calc(100vh-1rem)] overflow-y-auto">
      <div class="pt-5 pb-6 px-5">
        <div
          class="flex items-center justify-between"
          @click="onClickMobileMenuClose"
        >
          <div>
            <h1 class="flex-auto text-lg font-semibold text-gray-300">
              {{ $t('site.title') }}
            </h1>
          </div>
            <div class="-mr-2">
            <button
              class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 cursor-pointer"
              type="button"
            >
              <span class="sr-only">Close menu</span>
              <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
            </button>
          </div>
        </div>
        <div class="mt-6">
          <nav class="grid gap-y-6">
            <div
              v-for="(item, index) in menuItems"
              :key="index"
            >
              <app-header-menu-dropdown
                v-if="item.type === 'dropdown'"
                :name="$t(item.name)"
                :children="item.children"
                variant="mobile"
              />
              <a
                v-else-if="item.type === 'link' && item.external"
                :href="getExternalUrl(item.to)"
                class="-m-3 p-3 flex items-center rounded-md text-gray-200 hover:text-gray-100 cursor-pointer"
                @click="onClickMobileMenuClose"
              >
                <span class="text-base font-medium">{{ $t(item.name) }}</span>
              </a>
              <NuxtLinkLocale
                v-else-if="item.type === 'link'"
                :to="item.to"
                class="-m-3 p-3 flex items-center rounded-md text-gray-200 hover:text-gray-100 cursor-pointer"
                @click="onClickMobileMenuClose"
              >
                <span class="text-base font-medium">{{ $t(item.name) }}</span>
              </NuxtLinkLocale>
              <app-header-menu-item
                v-else
                :name="$t(item.name)"
                :icon="item.icon"
                variant="mobile"
                @click="onClickItem(item)"
              />
            </div>
          </nav>
        </div>
        <div class="mt-6 border-t border-gray-700 pt-6">
          <div class="flex flex-col gap-4">
            <UButton
              to="/discord"
              target="_blank"
              color="primary"
              variant="solid"
              block
              icon="i-simple-icons-discord"
              :label="$t('actions.join_discord')"
              class="bg-twinkle on-primary-dark"
              @click="onClickMobileMenuClose"
            />
            <div class="flex items-center justify-between px-2">
              <span class="text-base font-medium text-gray-300">Language</span>
              <div class="flex items-center space-x-2">
                <button
                  v-for="l in localeCodes"
                  :key="l"
                  class="text-sm px-3 py-1.5 rounded transition-colors"
                  :class="currentLocale === l ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
                  @click="setLocale(l)"
                >
                  {{ l === 'zh-TW' ? '中文' : 'English' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, watch, type Ref, computed} from 'vue';
import {useI18n} from 'vue-i18n';

import {
  menuItems,
  type MenuFunctionItem,
} from '../data/AppHeaderMenuData';

const emit = defineEmits<{
  close: [];
}>();

const {locale, localeCodes, setLocale} = useI18n();
const currentLocale = computed(() => locale.value);

const parentMenuState = inject<Ref<boolean>>('parent-menu-state')!;
watch(parentMenuState, (value) => {
  if (!value) {
    emit('close');
  }
});

const getExternalUrl = (path: string): string => {
  return `${path}?lang=${locale.value}`;
};

const onClickMobileMenuClose = (): void => {
  emit('close');
};

const onClickItem = (item: MenuFunctionItem): void => {
  parentMenuState.value = false;
  item.onClick();
};

</script>
