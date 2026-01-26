<template>
  <div class="relative starry-bg text-white">
    <UContainer class="py-24 sm:py-32">
      <div class="text-center">
        <UBadge variant="subtle" size="lg" class="mb-4 rounded-full badge-twinkle">
          {{ $t('home.badge') }}
        </UBadge>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          {{ $t('home.titleStart') }}<span class="text-twinkle">{{ $t('home.titleHighlight') }}</span>{{ $t('home.titleEnd') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          {{ $t('home.lead') }}
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton
            size="xl"
            to="/discord"
            target="_blank"
            icon="i-simple-icons-discord"
            class="btn-twinkle-filled shadow-lg"
          >
            {{ $t('actions.join_discord') }}
          </UButton>
          <UButtonLocale
            size="xl"
            variant="ghost"
            to="/projects"
            trailing-icon="i-heroicons-arrow-right"
          >
            {{ $t('actions.explore_projects') }}
          </UButtonLocale>
        </div>

        <div class="mt-12 flex justify-center gap-6">
          <UButton
            v-for="social in socialLinks"
            :key="social.label"
            :to="social.to"
            target="_blank"
            variant="link"
            :icon="social.icon"
            class="text-gray-400 hover:text-white transition-colors"
          />
        </div>
      </div>
    </UContainer>

    <!-- About Twinkle AI -->
    <div class="py-24 bg-gray-900/50">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <h2 class="text-3xl font-bold text-white mb-6">{{ $t('home.about.title') }}</h2>
             <div class="text-gray-300 whitespace-pre-line">
               {{ $t('home.about.content') }}
             </div>
          </div>
          <div class="relative">
             <div class="aspect-video bg-gray-800 rounded-xl ring-1 ring-gray-700 flex items-center justify-center">
               <!-- Placeholder for Image 1 -->
               <div class="text-center">
                 <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-600 mb-2" />
                 <span class="text-gray-500 text-sm">Design Image 1</span>
               </div>
             </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Models -->
    <div class="py-24">
      <UContainer>
        <SectionHeading :title="$t('home.models.title')" :description="$t('home.models.description')" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <UCard v-for="(item, index) in $tm('home.models.items')" :key="index" class="bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500/50 transition-all">
            <template #header>
              <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-primary-400" />
            </template>
            <h3 class="text-xl font-bold text-white mb-2">{{ $rt(item.title) }}</h3>
            <p class="text-gray-400">{{ $rt(item.description) }}</p>
          </UCard>
        </div>
      </UContainer>
    </div>

    <!-- Datasets -->
    <div class="py-24 bg-gray-900/50">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-row-reverse">
           <div class="lg:order-2">
             <h2 class="text-3xl font-bold text-white mb-6">{{ $t('home.datasets.title') }}</h2>
             <div class="text-gray-300 whitespace-pre-line">
               {{ $t('home.datasets.content') }}
             </div>
          </div>
          <div class="lg:order-1 relative">
             <div class="aspect-video bg-gray-800 rounded-xl ring-1 ring-gray-700 flex items-center justify-center">
               <UIcon name="i-heroicons-circle-stack" class="w-16 h-16 text-primary-500/20" />
             </div>
          </div>
        </div>
      </UContainer>
    </div>

     <!-- Evaluation -->
    <div class="py-24">
      <UContainer>
        <SectionHeading :title="$t('home.eval.title')" :description="$t('home.eval.content')" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
           <div v-for="(item, index) in $tm('home.eval.items')" :key="index" class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700 hover:bg-gray-800 transition-colors">
             <h3 class="text-lg font-bold text-white mb-2">{{ $rt(item.title) }}</h3>
             <p class="text-gray-400 text-sm">{{ $rt(item.description) }}</p>
           </div>
        </div>
      </UContainer>
    </div>

    <!-- Teasers -->
    <div class="py-24 bg-primary-900/10 border-t border-gray-800">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div class="p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800">
             <UIcon name="i-heroicons-academic-cap" class="w-12 h-12 text-primary-400 mb-4 mx-auto" />
             <UButton :to="localePath('/education')" size="xl" variant="soft" block>
               {{ $t('home.teaser.education') }}
             </UButton>
          </div>
          <div class="p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800">
             <UIcon name="i-heroicons-newspaper" class="w-12 h-12 text-gray-400 mb-4 mx-auto" />
             <UButton :to="localePath('/news')" size="xl" variant="soft" color="neutral" block>
               {{ $t('home.teaser.media') }}
             </UButton>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const localePath = useLocalePath();


const socialLinks = [
  {label: t('social.discord'), icon: 'i-simple-icons-discord', to: '/discord', color: 'primary'},
  {label: t('social.huggingface'), icon: 'i-simple-icons-huggingface', to: '/huggingface', color: 'yellow'},
  {label: t('social.github'), icon: 'i-simple-icons-github', to: '/github', color: 'white'},
];
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
