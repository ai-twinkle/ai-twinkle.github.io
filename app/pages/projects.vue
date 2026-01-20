<template>
  <UContainer class="py-16">
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-white">{{ $t('projects.title') }}</h2>
      <p class="mt-2 text-gray-400">{{ $t('projects.lead') }}</p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center items-center py-12">
      <LoadingCircleIcon class="h-8 w-8 text-gray-400 animate-spin" />
      <p class="ml-3 text-gray-400">{{ $t('projects.loading') }}</p> 
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-6 bg-red-50 rounded text-red-600">
      <p class="font-medium">{{ $t('projects.errorTitle') }}</p>
      <p class="mt-2 text-sm text-red-600">{{ error.message ?? error }}</p>
      <div class="mt-4">
        <UButton @click="onClickRetry">{{ $t('projects.retry') }}</UButton>
      </div> 
    </div>

    <!-- No projects -->
    <div v-else-if="!projects.length" class="p-6 text-gray-400">
      {{ $t('projects.noProjects') }}
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
      <UCard 
        v-for="project in projects" 
        :key="project.name"
        class="flex flex-col h-full hover:ring-primary-500 transition-all cursor-pointer"
        @click="onClickLink(project.link)"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-twinkle">{{ project.name }}</h3>
          <UBadge variant="soft" color="neutral" size="sm" class="border-twinkle/30">
            <UIcon name="i-heroicons-star" class="mr-1 text-twinkle" /> {{ project.stars }}
          </UBadge>
        </div>
        
        <p class="text-gray-300 text-sm grow mb-6">
          {{ project.desc }}
        </p>

        <div class="flex flex-wrap gap-2 mt-auto">
          <UBadge v-for="t in project.tech" :key="t" color="neutral" variant="solid" size="xs" class="text-gray-300 bg-gray-800/40">
            {{ t }}
          </UBadge>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const {
  githubAccessToken,
  githubOrgName,
} = useRuntimeConfig()

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
}

const { data: repositories, pending, error, refresh } = useAsyncData<GitHubRepository[]>(
  'githubRepos',
  () => {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    }
    if (githubAccessToken && import.meta.server) {
      headers['Authorization'] = `Bearer ${githubAccessToken}`
    }

    return $fetch<GitHubRepository[]>(toGitHubReposUrl(githubOrgName), { headers })
  }
)

const projects = computed(() => {
  const repos = repositories?.value ?? []
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
          const s = new Set<string>()
          if (r.language) s.add(String(r.language).trim())
          if (r.topics && r.topics.length) {
            for (const t of r.topics) {
              if (t) s.add(String(t).trim())
            }
          }
          return Array.from(s)
        })(),
        stars: String(r.stargazers_count ?? 0),
        link: r.html_url
      }))
  }
  return []
})

// Click handler to retry fetching data
const onClickRetry = async () => {
  try {
    await refresh?.()
  } catch (e) {
    console.error('Retry failed', e)
  }
}

// Click handler to open project link
const onClickLink = (url: string) => {
  window.open(url, '_blank')
}
</script>
