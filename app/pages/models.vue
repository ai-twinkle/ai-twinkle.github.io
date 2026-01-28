<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-24 sm:py-32">
      <SectionHeading
        :title="$t('models.title')"
        :description="$t('models.description')"
        icon="i-heroicons-cube"
      />

      <!-- Model Series Highlights -->
      <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
         <!-- T1 -->
         <a
           href="https://huggingface.co/collections/twinkle-ai/t1-series-67984f1807755057fe847253"
           target="_blank"
           class="p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block group"
         >
            <UIcon name="i-heroicons-cpu-chip" class="w-10 h-10 text-primary-400 mb-4" />
            <h3 class="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {{ $t('models.intro.t1.title') }}
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
            </h3>
            <p class="text-gray-400">{{ $t('models.intro.t1.description') }}</p>
         </a>
         <!-- Formosa -->
         <a
           href="https://huggingface.co/collections/twinkle-ai/formosa-1-series-67984f47f277a80b0647321e"
           target="_blank"
           class="p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800 hover:ring-primary-500 transition-all block group"
         >
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-10 h-10 text-primary-400 mb-4" />
            <h3 class="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {{ $t('models.intro.formosa.title') }}
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
            </h3>
            <p class="text-gray-400">{{ $t('models.intro.formosa.description') }}</p>
         </a>
         <!-- Voice -->
         <div class="relative p-8 rounded-2xl bg-gray-900 ring-1 ring-gray-800/50 cursor-not-allowed opacity-75">
            <UBadge label="Soon" color="neutral" variant="solid" class="absolute top-6 right-6" />
            <UIcon name="i-heroicons-microphone" class="w-10 h-10 text-primary-400 mb-4" />
            <h3 class="text-xl font-bold text-white mb-2">{{ $t('models.intro.voice.title') }}</h3>
            <p class="text-gray-400">{{ $t('models.intro.voice.description') }}</p>
         </div>
      </div>

      <!-- Eval System -->
      <div class="mt-24 bg-gray-900/50 p-12 rounded-2xl ring-1 ring-gray-800 text-center">
         <h2 class="text-3xl font-bold text-white mb-4">{{ $t('models.eval.title') }}</h2>
         <p class="text-gray-300 max-w-2xl mx-auto mb-8">{{ $t('models.eval.description') }}</p>
         <UButton
            :to="leaderboardLink"
            target="_blank"
            size="xl"
            icon="i-heroicons-chart-bar"
            variant="solid"
            class="!bg-[#ffd500] hover:!bg-[#e6c000] !text-gray-900 border-none font-bold ring-0"
         >
            {{ $t('models.eval.leaderboard_action') }}
         </UButton>
      </div>

      <UDivider class="my-24" />

      <!-- Explore on HuggingFace Button -->
      <div class="mt-8 flex justify-center">
        <UButton
          :label="$t('models.explore_hf')"
          :to="`https://huggingface.co/${hfOrgName}`"
          target="_blank"
          size="lg"
          icon="i-heroicons-arrow-top-right-on-square"
          trailing
          variant="ghost"
          color="secondary"
          class="font-bold"
        />
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-24">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-gray-500" />
        <p class="mt-4 text-gray-400">{{ $t('projects.loading') }}</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-400">{{ $t('projects.hf.errorTitle') }} {{ error.message }}</p>
        <UButton class="mt-4" color="primary" @click="refresh">
          {{ $t('projects.retry') }}
        </UButton>
      </div>

      <!-- Models Table -->
      <div v-else-if="groupedModels && Object.keys(groupedModels).length > 0" class="mt-16 overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden ring-1 ring-gray-800 rounded-xl">
            <table class="min-w-full divide-y divide-gray-800">
              <thead class="bg-gray-900/80">
                <tr>
                  <th scope="col" class="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                    {{ $t('models.table.name') }}
                  </th>
                  <th scope="col" class="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                    {{ $t('models.table.model_type') }}
                  </th>
                  <th scope="col" class="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                    {{ $t('models.table.parameters') }}
                  </th>
                  <th scope="col" class="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                    Tags
                  </th>
                  <th scope="col" class="py-4 px-6 text-center text-sm font-semibold text-gray-300">
                    <UIcon name="i-heroicons-heart" class="w-4 h-4 inline" />
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-800 bg-gray-900/30">
                <template v-for="group in groupedModels" :key="group.name">
                  <!-- Series Header Row -->
                  <tr class="bg-gray-800/50">
                    <td colspan="5" class="py-4 px-6">
                      <h3 class="text-lg font-bold text-primary-400">
                        {{ group.name }}
                      </h3>
                    </td>
                  </tr>
                  <!-- Model Rows -->
                  <tr
                    v-for="model in group.models"
                    :key="model.id"
                    class="hover:bg-gray-800/30 transition-colors"
                  >
                    <td class="py-4 px-6 text-sm">
                      <a
                        :href="`https://huggingface.co/${model.id}`"
                        target="_blank"
                        class="text-primary-400 hover:text-primary-300 underline decoration-dotted underline-offset-4 inline-flex items-center gap-1"
                      >
                        {{ model.modelName }}
                        <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
                      </a>
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-300">
                      {{ model.pipeline_tag || 'N/A' }}
                    </td>
                    <td class="py-4 px-6 text-sm text-primary-400 font-medium">
                      {{ model.parameters }}
                    </td>
                    <td class="py-4 px-6 text-sm">
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="tag in model.displayTags"
                          :key="tag"
                          class="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-sm text-center text-gray-300">
                      {{ model.likes || 0 }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 text-gray-400">
        {{ $t('projects.hf.noModels') }}
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const {
  huggingfaceAccessToken,
  public: {hfOrgName},
} = useRuntimeConfig();

const {locale} = useI18n();
const leaderboardLink = computed(() => `/leaderboard?lang=${locale.value}`);

interface HuggingFaceModel {
  id: string;
  likes?: number;
  tags?: string[];
  pipeline_tag?: string | null;
  modelId?: string;
}

const {data: hfModels, pending, error, refresh} = useAsyncData<HuggingFaceModel[]>(
    'hfModelsPage',
    () => {
      const headers: Record<string, string> = {'Accept': 'application/json'};
      if (import.meta.server) {
        headers['User-Agent'] = 'curl/8.14.1';
      }
      if (huggingfaceAccessToken && import.meta.server) {
        headers['Authorization'] = `Bearer ${huggingfaceAccessToken}`;
      }
      const url = `https://huggingface.co/api/models?author=${hfOrgName}&sort=likes&limit=50`;
      return $fetch<HuggingFaceModel[]>(url, {headers});
    },
);

// Extract parameters from model name or tags
const extractParameters = (modelName: string, tags?: string[]): string => {
  // Look for patterns like "3B", "4B", "70B", etc.
  const paramMatch = modelName.match(/(\d+\.?\d*[BMK])/i);
  if (paramMatch) return paramMatch[1].toUpperCase();

  // Check tags for size indicators
  if (tags) {
    const sizeTag = tags.find((t) => /\d+[bmk]/i.test(t));
    if (sizeTag) {
      const match = sizeTag.match(/(\d+\.?\d*[BMK])/i);
      if (match) return match[1].toUpperCase();
    }
  }

  return 'N/A';
};

// Determine series from model name
const getSeriesName = (modelId: string): string => {
  const name = modelId.split('/').pop() || modelId;

  if (name.toLowerCase().includes('t1')) return 'T1 Series';
  if (name.toLowerCase().includes('formosa') || name.toLowerCase().includes('f1')) return 'Formosa-1 Series';
  if (name.toLowerCase().includes('llama')) return 'Llama Series';
  if (name.toLowerCase().includes('gemma')) return 'Gemma Series';

  return 'Other Models';
};

const groupedModels = computed(() => {
  if (!hfModels.value) return [];

  const groups: Record<string, Array<HuggingFaceModel & {
    modelName: string;
    parameters: string;
    displayTags: string[];
  }>> = {};

  hfModels.value.forEach((model) => {
    const modelName = model.id.split('/').pop() || model.id;
    const series = getSeriesName(model.id);
    const parameters = extractParameters(modelName, model.tags);

    // Filter relevant tags (exclude common framework tags)
    const excludeTags = ['pytorch', 'safetensors', 'transformers', 'gguf', 'license:', 'arxiv:'];
    const displayTags = (model.tags || [])
        .filter((tag) => !excludeTags.some((ex) => tag.toLowerCase().includes(ex)))
        .slice(0, 4);

    if (!groups[series]) {
      groups[series] = [];
    }

    groups[series].push({
      ...model,
      modelName,
      parameters,
      displayTags,
    });
  });

  // Sort each group by likes
  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  });

  // Define priority order for display
  const priority = ['T1 Series', 'Formosa-1 Series', 'Llama Series', 'Gemma Series', 'Other Models'];

  // Convert to array and sort by priority
  return Object.entries(groups)
      .sort(([keyA], [keyB]) => {
        const idxA = priority.indexOf(keyA);
        const idxB = priority.indexOf(keyB);

        // If both in priority list, sort by index
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        // If only A in priority, A comes first
        if (idxA !== -1) return -1;
        // If only B in priority, B comes first
        if (idxB !== -1) return 1;

        // Otherwise sort alphabetically
        return keyA.localeCompare(keyB);
      })
      .map(([name, models]) => ({name, models}));
});
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220;
}
</style>
