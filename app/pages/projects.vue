<template>
  <UContainer class="py-16">
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-white">開源專案</h2>
      <p class="mt-2 text-gray-400">我們致力於開源所有研究成果，包含模型權重、訓練數據與評測工具。</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard 
        v-for="project in projects" 
        :key="project.name"
        class="flex flex-col h-full hover:ring-primary-500 transition-all cursor-pointer"
        @click="openProject(project.link)"
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
const projects = [
  {
    name: 'Twinkle Eval',
    desc: '高效且準確的 AI 評測工具，專為正體中文模型設計。',
    tech: ['Python', 'Evaluation'],
    stars: '84',
    link: 'https://github.com/ai-twinkle/eval'
  },
  {
    name: 'llm-lab',
    desc: '繁中模型研究與實作的 Lab，包含大量 Jupyter Notebook 教學。',
    tech: ['Jupyter', 'Tutorial'],
    stars: '52',
    link: 'https://github.com/ai-twinkle/llm-lab'
  },
  {
    name: 'TwinRAD',
    desc: '多代理紅隊測試框架 (Multi-agent red teaming framework)，測試 LLM 安全性。',
    tech: ['Python', 'Security'],
    stars: '6',
    link: 'https://github.com/ai-twinkle/TwinRAD'
  },
  {
    name: 'AiyoDesk',
    desc: '以最低硬體成本打造的專用 AI 伺服器整合軟體 (C#)。',
    tech: ['C#', 'Desktop App'],
    stars: '10',
    link: 'https://github.com/ai-twinkle/AiyoDesk'
  },
  {
    name: 'tw-leetcode',
    desc: 'LeetCode 正體中文解題資料集。',
    tech: ['TypeScript', 'Dataset'],
    stars: '8',
    link: 'https://github.com/ai-twinkle/tw-leetcode'
  }
]

const openProject = (url: string) => {
  // explicitly use window in a method so template type-checking is happy
  window.open(url, '_blank')
}
</script>
