<template>
  <header class="border-b border-gray-800 bg-gray-900/70 backdrop-blur-md sticky top-0 z-50 app-header">
    <UContainer class="flex h-16 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <NuxtImg src="/logo.png" alt="Logo" width="40" height="40" />
        <div class="leading-tight">
          <div class="font-bold text-lg text-twinkle">{{ title }}</div>
          <div class="text-xs text-gray-400">{{ subtitle }}</div>
        </div>
      </NuxtLink>

      <app-header-normal />

      <div class="flex items-center gap-3">
        <UButton to="https://discord.gg/Cx737yw4ed" target="_blank" color="secondary" variant="ghost" icon="i-simple-icons-discord" />
        <UButton class="md:hidden" icon="i-heroicons-bars-3" color="secondary" variant="ghost" @click="onClickMobileMenuBtnOpen" />
      </div>
    </UContainer>

    <app-header-mobile v-show="isMobileMenuOpened" @close="onClickMobileMenuBtnClose" />
  </header>
</template>


<script setup lang="ts">
import {ref, onMounted, onUnmounted, provide, type Ref} from "vue";

import {
  title,
  subtitle,
} from "../data/AppHeaderMenuData";

const isMobileMenuOpened = ref(false);

const parentMenuState: Ref<boolean> = ref(true);
provide("parent-menu-state", parentMenuState);

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
  if (!document.querySelector(".app-header")?.contains(target)) {
    parentMenuState.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>
