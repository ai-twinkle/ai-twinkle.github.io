<template>
  <div :class="props.variant === 'mobile' ? '' : 'relative'">
    <button
      :aria-expanded="isDropdownOpened"
      :class="buttonClass"
      type="button"
      @click="onClickDropdown"
    >
      <span>{{ props.name }}</span>
      <UIcon
        name="i-heroicons-chevron-down"
        class="ml-2 h-5 w-5 transition-transform duration-200"
        :class="[
          isDropdownOpened ? 'rotate-180 text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
        ]"
      />
    </button>

    <!-- Mobile: Collapse/Accordion style -->
    <div
      v-if="props.variant === 'mobile'"
      ref="collapseContent"
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="{ maxHeight: collapseMaxHeight }"
    >
      <div class="pt-2 pl-4">
        <div class="border-l-2 border-gray-700 pl-4 space-y-3">
          <app-header-menu-dropdown-item
            v-for="(child, index) in props.children"
            :key="index"
            :name="$t(child.name)"
            :description="$t(child.description)"
            :icon="child.icon"
            :to="child.to"
            :variant="props.variant"
            @click="onClickItem(child)"
          />
        </div>
      </div>
    </div>

    <!-- Desktop: Absolute positioned dropdown -->
    <div
      v-else
      :class="dropdownContainerClass"
    >
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-1"
      >
        <div
          v-show="isDropdownOpened"
          class="rounded-lg shadow-lg overflow-hidden bg-gray-900 ring-1 ring-gray-800"
        >
          <div class="relative grid gap-4 px-4 py-4 sm:gap-6 sm:p-6">
            <app-header-menu-dropdown-item
              v-for="(child, index) in props.children"
              :key="index"
              :name="$t(child.name)"
              :description="$t(child.description)"
              :icon="child.icon"
              :to="child.to"
              :variant="props.variant"
              @click="onClickItem(child)"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject, watch, computed, type Ref, nextTick} from 'vue';

import type {
  MenuDropdownChild,
} from '../data/AppHeaderMenuData';

const props = defineProps<{
  name: string;
  children: MenuDropdownChild[];
  variant?: 'mobile' | 'normal';
}>();

const isDropdownOpened = ref(false);
const collapseContent = ref<HTMLElement | null>(null);
const collapseMaxHeight = ref('0px');

const parentMenuState = inject<Ref<boolean>>('parent-menu-state')!;
const activeDropdown = inject<Ref<string | null>>('active-dropdown')!;

// Close this dropdown when parent menu closes
watch(parentMenuState, (value) => {
  if (!value) {
    isDropdownOpened.value = false;
    collapseMaxHeight.value = '0px';
  }
});

// Close this dropdown when another dropdown becomes active (desktop only)
watch(activeDropdown, (newActiveDropdown) => {
  if (props.variant !== 'mobile' && newActiveDropdown !== props.name && isDropdownOpened.value) {
    isDropdownOpened.value = false;
  }
});

const updateCollapseHeight = async () => {
  if (props.variant === 'mobile') {
    await nextTick();
    if (isDropdownOpened.value && collapseContent.value) {
      collapseMaxHeight.value = `${collapseContent.value.scrollHeight}px`;
    } else {
      collapseMaxHeight.value = '0px';
    }
  }
};

const onClickDropdown = (): void => {
  isDropdownOpened.value = !isDropdownOpened.value;
  if (isDropdownOpened.value) {
    parentMenuState.value = true;
    // Set this dropdown as the active one (for desktop coordination)
    if (props.variant !== 'mobile') {
      activeDropdown.value = props.name;
    }
  } else {
    // Clear active dropdown when closing
    if (props.variant !== 'mobile' && activeDropdown.value === props.name) {
      activeDropdown.value = null;
    }
  }
  updateCollapseHeight();
};

const onClickItem = (item: MenuDropdownChild): void => {
  parentMenuState.value = false;
  if (item.onClick) {
    item.onClick();
  }
};

const buttonClass = computed(() => {
  const baseDesktop = [
    'text-gray-300',
    'group',
    'px-3',
    'rounded-md',
    'inline-flex',
    'items-center',
    'text-base',
    'font-medium',
    'hover:text-gray-200',
    'hover:bg-gray-800',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-primary-500',
    'cursor-pointer',
  ];

  if (props.variant === 'mobile') {
    return [
      '-m-3',
      'p-3',
      'flex',
      'items-center',
      'w-full',
      'rounded-md',
      'text-gray-200',
      'hover:text-gray-100',
      'cursor-pointer',
      'text-base',
      'font-medium',
      isDropdownOpened.value ? 'bg-gray-800/50' : '',
    ];
  }

  return [
    'h-8',
    ...baseDesktop,
  ];
});

const dropdownContainerClass = computed(() => {
  return [
    'absolute',
    'z-10',
    'mt-3',
    'transform',
    'w-screen',
    'max-w-xs',
    'left-1/2',
    '-translate-x-1/2',
  ];
});
</script>
