<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          {{ $t('nav.news') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          {{ $t('pages.coming_soon') }}
        </p>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
