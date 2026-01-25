<template>
  <UContainer class="py-16">
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-white">{{ $t('projects.title') }}</h2>
      <p class="mt-2 text-gray-400">{{ $t('projects.lead') }}</p>
    </div>

    <!-- Source tabs (framework UTabs) -->
    <div class="mb-6">
      <UTabs :items="activeSource" color="warning">
        <template #huggingface>
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
        </template>
        <template #github>
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
        </template>
      </UTabs>
    </div>
  </UContainer>
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
      // GitHub requires a User-Agent header for API requests
      if (import.meta.server) {
        headers['User-Agent'] = 'curl/8.14.1';
      }
      // Add Authorization header if access token is provided
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
      // Hugging Face requires a User-Agent header for API requests
      if (import.meta.server) {
        headers['User-Agent'] = 'curl/8.14.1';
      }
      // Add Authorization header if access token is provided
      if (huggingfaceAccessToken && import.meta.server) {
        headers['Authorization'] = `Bearer ${huggingfaceAccessToken}`;
      }
      const url = `https://huggingface.co/api/models?author=${hfOrgName}&sort=likes&limit=${HF_LIMIT}`;
      return $fetch<HuggingFaceModel[]>(url, {headers});
    },
);

const hfProjects = computed(() => {
  console.log('HF Models:', hfModels?.value);
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
            // return up to three unique keywords as a short sentence
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

// Click handler to retry fetching data
const onClickRetry = async () => {
  try {
    await refresh?.();
  } catch (e) {
    console.error('Retry failed', e);
  }
};
</script>
