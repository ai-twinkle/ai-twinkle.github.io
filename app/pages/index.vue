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
        <SectionHeading :title="$t('home.about.title')" :description="$t('home.about.description')" />
        <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
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
          <template v-for="(item, index) in $tm('home.models.items')" :key="index">
            <!-- Active Model Card -->
            <NuxtLink
              v-if="modelLinks[index]"
              :to="modelLinks[index]"
              target="_blank"
              class="flex flex-col p-6 rounded-xl bg-gray-900 ring-1 ring-gray-800 transition-all h-full cursor-pointer group hover:ring-primary-500 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div class="flex justify-between items-start mb-6">
                <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5 text-gray-600 group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary-200 transition-colors">
                {{ $rt(item.title) }}
              </h3>
              <p class="text-gray-400 leading-relaxed">
                {{ $rt(item.description) }}
              </p>
            </NuxtLink>

            <!-- Coming Soon Card -->
            <div
              v-else
              class="flex flex-col p-6 rounded-xl bg-gray-900 ring-1 ring-gray-800 transition-all h-full opacity-75 cursor-not-allowed"
            >
              <div class="flex justify-between items-start mb-6">
                <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-primary-400" />
                <UBadge variant="subtle" color="neutral" size="md" class="font-bold">
                  {{ $t('pages.coming_soon_badge') }}
                </UBadge>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">
                {{ $rt(item.title) }}
              </h3>
              <p class="text-gray-400 leading-relaxed">
                {{ $rt(item.description) }}
              </p>
            </div>
          </template>
        </div>
        <div class="mt-8 flex justify-center gap-4">
          <UButton
            :to="localePath('/models')"
            size="lg"
            variant="soft"
            icon="i-heroicons-squares-2x2"
          >
            {{ $t('actions.explore_models') }}
          </UButton>
          <UButton
            to="https://huggingface.co/twinkle-ai/models"
            target="_blank"
            size="lg"
            variant="ghost"
            icon="i-simple-icons-huggingface"
          >
            {{ $t('actions.huggingface') }}
          </UButton>
        </div>
      </UContainer>
    </div>

    <!-- Datasets -->
    <div class="py-24 bg-gray-900/50">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-row-reverse">
           <div class="lg:order-2">
             <h2 class="text-3xl font-bold text-white mb-6">{{ $t('home.datasets.title') }}</h2>
             <div class="text-gray-300 whitespace-pre-line mb-6">
               {{ $t('home.datasets.content') }}
             </div>
             <UButton
                to="https://huggingface.co/twinkle-ai/datasets"
                target="_blank"
                variant="outline"
                icon="i-simple-icons-huggingface"
             >
                {{ $t('actions.explore_datasets') }}
             </UButton>
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
           <NuxtLink
              v-for="(item, index) in $tm('home.eval.items')"
              :key="index"
              :to="evalLinks[index]"
              target="_blank"
              class="p-6 rounded-xl bg-gray-800/50 ring-1 ring-gray-700 hover:bg-gray-800 hover:ring-primary-500/50 transition-all block"
           >
             <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 text-primary-400" />
                <h3 class="text-lg font-bold text-white">{{ $rt(item.title) }}</h3>
             </div>
             <p class="text-gray-400 text-sm">{{ $rt(item.description) }}</p>
           </NuxtLink>
        </div>
      </UContainer>
    </div>

    <!-- Teasers -->
    <div class="py-24 bg-primary-900/10 border-t border-gray-800">
      <UContainer>
        <SectionHeading :title="$t('home.teaser.title')" :description="$t('home.teaser.description')" />
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <NuxtLink :to="localePath('/education')" class="group p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block">
             <UIcon name="i-heroicons-academic-cap" class="w-12 h-12 text-primary-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
             <div class="w-full py-3 rounded-xl bg-primary-500/20 text-primary-300 font-semibold group-hover:bg-primary-500 group-hover:text-white transition-colors">
               {{ $t('home.teaser.education') }}
             </div>
          </NuxtLink>
          <NuxtLink :to="localePath('/news')" class="group p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block">
             <UIcon name="i-heroicons-newspaper" class="w-12 h-12 text-primary-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
             <div class="w-full py-3 rounded-xl bg-primary-500/20 text-primary-300 font-semibold group-hover:bg-primary-500 group-hover:text-white transition-colors">
               {{ $t('home.teaser.media') }}
             </div>
          </NuxtLink>
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

const modelLinks = [
  'https://huggingface.co/collections/twinkle-ai/t1-series',
  'https://huggingface.co/collections/twinkle-ai/formosa-1-series',
  null,
];

const evalLinks = [
  'https://github.com/ai-twinkle/Eval',
  'https://github.com/ai-twinkle/eval-analyzer',
  'https://github.com/ai-twinkle/tw-eval-leaderboard/',
];
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
