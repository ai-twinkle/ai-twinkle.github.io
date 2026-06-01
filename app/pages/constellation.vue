<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-16">

      <!-- Hero Section for Constellation Projects -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <UBadge variant="subtle" size="lg" class="mb-4 rounded-full badge-twinkle uppercase tracking-wider font-semibold">
          ✨ {{ $t('constellationProjects.subtitle') }}
        </UBadge>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          {{ $t('constellationProjects.title') }}
        </h1>
        <p class="mt-6 text-base md:text-lg leading-relaxed text-gray-300">
          {{ $t('constellationProjects.description') }}
        </p>
      </div>

      <!-- Constellation Grid Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in constellationProjectsList"
          :key="project.id"
          class="relative group rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-primary-500/50 hover:bg-gray-900/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary-950/20 overflow-hidden"
        >
          <!-- Glowing tailored background element -->
          <div
            class="absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            :class="project.glowClass"
          />

          <div class="relative z-10">
            <!-- Top badge + Creator -->
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full text-[#ffd500] bg-[#ffd500]/10 border border-[#ffd500]/20">
                👤 {{ project.creator }}
              </span>
              <span class="text-xs text-gray-400 font-medium px-2 py-0.5 bg-gray-800/60 rounded">
                {{ project.positioning }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-[#ffd500] transition-colors">
              {{ project.title }}
            </h3>

            <!-- Story Description -->
            <p class="text-gray-300 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {{ project.story }}
            </p>
          </div>

          <!-- Bottom Link Action -->
          <div v-if="project.url" class="relative z-10 mt-auto pt-2">
            <UButton
              v-track="project.trackEvent"
              :to="project.url"
              target="_blank"
              color="neutral"
              variant="outline"
              size="sm"
              class="group/btn w-full justify-center gap-1.5 hover:!text-gray-900 hover:!bg-[#ffd500] hover:!border-transparent transition-all duration-200"
            >
              {{ project.linkText || $t('actions.explore_projects') }}
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </UButton>
          </div>
        </div>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const constellationProjectsList = computed(() => {
  return [
    {
      id: 'hub',
      title: t('constellationProjects.projects.hub.title'),
      creator: t('constellationProjects.projects.hub.creator'),
      positioning: t('constellationProjects.projects.hub.positioning'),
      story: t('constellationProjects.projects.hub.story'),
      linkText: t('constellationProjects.projects.hub.linkText'),
      url: 'https://hub.twinkleai.tw/',
      glowClass: 'from-cyan-500/20 to-teal-500/20',
      trackEvent: 'Constellation_Hub_Click',
    },
    {
      id: 'costaff',
      title: t('constellationProjects.projects.costaff.title'),
      creator: t('constellationProjects.projects.costaff.creator'),
      positioning: t('constellationProjects.projects.costaff.positioning'),
      story: t('constellationProjects.projects.costaff.story'),
      linkText: t('constellationProjects.projects.costaff.linkText'),
      url: 'https://costaffs.app',
      glowClass: 'from-rose-500/20 to-red-500/20',
      trackEvent: 'Constellation_CoStaff_Click',
    },
    {
      id: 'cairn',
      title: t('constellationProjects.projects.cairn.title'),
      creator: t('constellationProjects.projects.cairn.creator'),
      positioning: t('constellationProjects.projects.cairn.positioning'),
      story: t('constellationProjects.projects.cairn.story'),
      linkText: t('constellationProjects.projects.cairn.linkText'),
      url: 'https://chichieh-huang.com',
      glowClass: 'from-sky-500/20 to-blue-500/20',
      trackEvent: 'Constellation_Cairn_Click',
    },
    {
      id: 'ailogora',
      title: t('constellationProjects.projects.ailogora.title'),
      creator: t('constellationProjects.projects.ailogora.creator'),
      positioning: t('constellationProjects.projects.ailogora.positioning'),
      story: t('constellationProjects.projects.ailogora.story'),
      linkText: t('constellationProjects.projects.ailogora.linkText'),
      url: 'https://ailogora.com',
      glowClass: 'from-amber-500/20 to-orange-500/20',
      trackEvent: 'Constellation_AILogora_Click',
    },
    {
      id: 'littlestar',
      title: t('constellationProjects.projects.littlestar.title'),
      creator: t('constellationProjects.projects.littlestar.creator'),
      positioning: t('constellationProjects.projects.littlestar.positioning'),
      story: t('constellationProjects.projects.littlestar.story'),
      linkText: t('constellationProjects.projects.littlestar.linkText'),
      url: 'https://github.com/ai-twinkle/little_star_app',
      glowClass: 'from-blue-500/20 to-indigo-500/20',
      trackEvent: 'Constellation_LittleStar_Click',
    },
    {
      id: 'leopardcat',
      title: t('constellationProjects.projects.leopardcat.title'),
      creator: t('constellationProjects.projects.leopardcat.creator'),
      positioning: t('constellationProjects.projects.leopardcat.positioning'),
      story: t('constellationProjects.projects.leopardcat.story'),
      url: '',
      glowClass: 'from-yellow-500/20 to-amber-500/20',
      trackEvent: '',
    },
    {
      id: 'website',
      title: t('constellationProjects.projects.website.title'),
      creator: t('constellationProjects.projects.website.creator'),
      positioning: t('constellationProjects.projects.website.positioning'),
      story: t('constellationProjects.projects.website.story'),
      linkText: t('constellationProjects.projects.website.linkText'),
      url: 'https://github.com/ai-twinkle/ai-twinkle.github.io',
      glowClass: 'from-purple-500/20 to-fuchsia-500/20',
      trackEvent: 'Constellation_Website_Click',
    },
    {
      id: 'aiyo',
      title: t('constellationProjects.projects.aiyo.title'),
      creator: t('constellationProjects.projects.aiyo.creator'),
      positioning: t('constellationProjects.projects.aiyo.positioning'),
      story: t('constellationProjects.projects.aiyo.story'),
      linkText: t('constellationProjects.projects.aiyo.linkText'),
      url: 'https://aiyo.app',
      glowClass: 'from-green-500/20 to-emerald-500/20',
      trackEvent: 'Constellation_Aiyo_Click',
    },
  ];
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
