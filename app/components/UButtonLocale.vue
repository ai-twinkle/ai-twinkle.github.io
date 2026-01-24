<template>
    <UButton :to="localRoute">
        <slot />
    </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{
    to: string;
}>();

const localRoute = computed(() => {
  const localePath = useLocalePath();
  return localePath(props.to);
});
</script>
