<template>
  <div class="relative starry-bg text-white min-h-[calc(100vh-4rem)]">
    <UContainer class="py-16">

      <!-- Core Open Source Repositories Section -->
      <div class="mb-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <UBadge variant="subtle" size="lg" class="mb-4 rounded-full badge-twinkle uppercase tracking-wider font-semibold">
            💻 {{ $t('projects.title') }}
          </UBadge>
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            {{ $t('projects.title') }}
          </h1>
          <p class="mt-6 text-base md:text-lg leading-relaxed text-gray-300">
            {{ $t('projects.lead') }}
          </p>
        </div>

        <!-- Source tabs (framework UTabs) -->
        <UTabs :items="activeSource" color="warning" class="w-full">
          <template #huggingface>
            <div class="mt-6">
              <ProjectTab
                :title="$t('projects.hf.title')"
                :lead="$t('projects.hf.lead')"
                :items="hfProjects"
                :pending="hfPending"
                :error="hfError"
                :on-retry="onClickRetryHF"
                :empty-text="$t('projects.hf.noModels')"
                :loading-text="$t('projects.hf.loading')"
                :retry-label="$t('projects.hf.retry')"
                :error-title="$t('projects.hf.errorTitle')"
              />
            </div>
          </template>
          <template #github>
            <div class="mt-6">
              <ProjectTab
                :title="$t('projects.github.title')"
                :lead="$t('projects.github.lead')"
                :items="projects"
                :pending="pending"
                :error="error"
                :on-retry="onClickRetry"
                :empty-text="$t('projects.github.noProjects')"
                :loading-text="$t('projects.github.loading')"
                :retry-label="$t('projects.github.retry')"
                :error-title="$t('projects.github.errorTitle')"
              />
            </div>
          </template>
        </UTabs>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import ProjectTab from '~/components/ProjectTab.vue';

const {
  githubAccessToken,
  huggingfaceAccessToken,
  public: {
    githubOrgName,
    hfOrgName,
  },
} = useRuntimeConfig();

const activeSource = [
  {
    label: 'GitHub',
    icon: 'i-lucide-github',
    slot: 'github',
  },
  {
    label: 'Hugging Face',
    icon: 'i-lucide-smile',
    slot: 'huggingface',
  },
];

interface GitHubRepository {
  name: string;
  stargazers_count: number;
  html_url: string;
  language?: string | null;
  topics?: string[];
  description?: string | null;
}

const toGitHubReposUrl = (username: string, perPage: number = 100) => {
  return `https://api.github.com/users/${username}/repos?sort=stars&per_page=${perPage}`;
};

const {data: repositories, pending, error, refresh} = useAsyncData<GitHubRepository[]>(
    'githubRepos',
    () => {
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
      };
      if (import.meta.server) {
        headers['User-Agent'] = 'curl/8.14.1';
      }
      if (githubAccessToken && import.meta.server) {
        headers['Authorization'] = `Bearer ${githubAccessToken}`;
      }
      return $fetch<GitHubRepository[]>(toGitHubReposUrl(githubOrgName), {headers});
    },
);

interface HuggingFaceModel {
  id: string;
  likes?: number;
  tags?: string[];
  pipeline_tag?: string | null;
}

const HF_LIMIT = 10;

const {data: hfModels, pending: hfPending, error: hfError, refresh: hfRefresh} = useAsyncData<HuggingFaceModel[]>(
    'hfModels',
    () => {
      const headers: Record<string, string> = {'Accept': 'application/json'};
      if (import.meta.server) {
        headers['User-Agent'] = 'curl/8.14.1';
      }
      if (huggingfaceAccessToken && import.meta.server) {
        headers['Authorization'] = `Bearer ${huggingfaceAccessToken}`;
      }
      const url = `https://huggingface.co/api/models?author=${hfOrgName}&sort=likes&limit=${HF_LIMIT}`;
      return $fetch<HuggingFaceModel[]>(url, {headers});
    },
);

const hfProjects = computed(() => {
  const models = hfModels?.value ?? [];
  if (models.length) {
    return models
        .slice()
        .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
        .map((m) => ({
          name: m.id.split('/').pop() ?? m.id,
          desc: (() => {
            const parts: string[] = [];
            if (m.pipeline_tag) parts.push(String(m.pipeline_tag).trim());
            if (m.tags && m.tags.length) {
              for (const t of m.tags) {
                if (t) parts.push(String(t).trim());
              }
            }
            const keywords = Array.from(new Set(parts)).slice(0, 3);
            return keywords.length ? `Supports ${keywords.join(', ')}.` : '';
          })(),
          tech: (() => {
            const s = new Set<string>();
            if (m.pipeline_tag) s.add(String(m.pipeline_tag).trim());
            if (m.tags && m.tags.length) for (const t of m.tags) if (t) s.add(String(t).trim());
            return Array.from(s).slice(0, 5);
          })(),
          stars: String(m.likes ?? 0),
          link: `https://huggingface.co/${m.id}`,
        }));
  }
  return [];
});

const onClickRetryHF = async () => {
  try {
    await hfRefresh?.();
  } catch (e) {
    console.error('HF retry failed', e);
  }
};

const projects = computed(() => {
  const repos = repositories?.value ?? [];
  if (repos.length) {
    return repos
        .slice()
        .sort((a, b) => (
          (b.stargazers_count ?? 0) -
        (a.stargazers_count ?? 0)
        ))
        .map((r) => ({
          name: r.name,
          desc: r.description ?? '',
          tech: (() => {
            const s = new Set<string>();
            if (r.language) s.add(String(r.language).trim());
            if (r.topics && r.topics.length) {
              for (const t of r.topics) {
                if (t) s.add(String(t).trim());
              }
            }
            return Array.from(s).slice(0, 5);
          })(),
          stars: String(r.stargazers_count ?? 0),
          link: r.html_url,
        }));
  }
  return [];
});

const onClickRetry = async () => {
  try {
    await refresh?.();
  } catch (e) {
    console.error('Retry failed', e);
  }
};
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
