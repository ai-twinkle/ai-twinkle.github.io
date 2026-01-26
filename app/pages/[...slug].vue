<template>
  <div class="mt-10 mx-auto py-10 max-w-7xl px-12">
    <div class="sm:text-center lg:text-left">
      <h1 class="text-4xl tracking-tight font-bold text-gray-200">
        <span class="block text-primary-600 xl:inline md:mr-3">{{ $t('notFound.title') }}</span>
        <span class="block xl:inline">{{ $t('notFound.heading') }}</span>
      </h1>
      <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        {{ $t('notFound.message') }}
      </p>
      <div class="mt-5 sm:mt-16 sm:flex sm:justify-center lg:justify-start">
        <div class="mt-3 sm:mt-0 sm:ml-3">
          <nuxt-link
            class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-amber-500 hover:bg-amber-400 md:py-4 md:text-lg md:px-10"
            to="/"
          >
            {{ $t('notFound.home') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
