<template>
  <header class="border-b border-gray-800 bg-gray-900/70 backdrop-blur-md sticky top-0 z-50 app-header">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLinkLocale to="/" class="flex items-center gap-3">
        <NuxtImg src="/logo.png" alt="Logo" width="40" height="40" />
        <div class="leading-tight">
          <div class="font-bold text-lg text-twinkle">{{ $t('site.title') }}</div>
          <div class="text-xs text-gray-400 !hidden md:!block">{{ $t('site.subtitle') }}</div>
        </div>
      </NuxtLinkLocale>

      <app-header-normal />

      <div class="flex items-center gap-3">
        <UButton
          to="/discord"
          target="_blank"
          color="secondary"
          variant="ghost" icon="i-simple-icons-discord"
          :label="$t('actions.join_discord')"
          class="!hidden md:!inline-flex"
        />
        <div class="!hidden md:!flex items-center space-x-2">
          <button
            v-for="l in localeCodes"
            :key="l"
            class="text-sm px-2 py-1 rounded hover:brightness-90 active:brightness-75 cursor-pointer"
            :class="{ 'bg-gray-700': currentLocale === l }" @click="setLocale(l)"
          >
            {{ l === 'zh-TW' ? '中' : 'EN' }}
          </button>
        </div>
        <UButton
          to="/discord"
          target="_blank"
          color="secondary"
          variant="ghost"
          icon="i-simple-icons-discord"
          class="md:hidden"
          :aria-label="$t('actions.join_discord')"
        />
        <UButton class="md:hidden" icon="i-heroicons-bars-3" color="secondary" variant="ghost" @click="onClickMobileMenuBtnOpen" />
      </div>
    </UContainer>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <app-header-mobile v-if="isMobileMenuOpened" @close="onClickMobileMenuBtnClose" />
    </Transition>
  </header>
</template>


<script setup lang="ts">
import {ref, onMounted, onUnmounted, provide, type Ref, computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {locale, localeCodes, setLocale} = useI18n();
const currentLocale = computed(() => locale.value);

const isMobileMenuOpened = ref(false);

const parentMenuState: Ref<boolean> = ref(true);
provide('parent-menu-state', parentMenuState);

const onClickMobileMenuBtnOpen = (): void => {
  isMobileMenuOpened.value = true;
  parentMenuState.value = true;
};

const onClickMobileMenuBtnClose = (): void => {
  isMobileMenuOpened.value = false;
  parentMenuState.value = false;
};

const onDocumentClick = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  if (!document.querySelector('.app-header')?.contains(target)) {
    parentMenuState.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
