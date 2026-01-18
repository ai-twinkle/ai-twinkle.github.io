<template>
  <div class="relative starry-bg text-white">
    <UContainer class="py-24 sm:py-32">
      <div class="text-center">
        <UBadge variant="subtle" size="lg" class="mb-4 rounded-full badge-twinkle">
          🌟 台灣生成式 AI 開源社群
        </UBadge>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          點亮 <span class="text-twinkle">正體中文 AI</span> 的星空
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          Twinkle AI 是一個專注於構建開源正體中文語言模型的研究社群。
          我們匯聚各界熱情夥伴，透過實作與分享，共同推動 AI 技術在台灣的落地與發展。
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton 
            size="xl" 
            to="/discord" 
            target="_blank"
            icon="i-simple-icons-discord"
            class="btn-twinkle-filled shadow-lg"
          >
            加入 Discord 社群
          </UButton>
          <UButton 
            size="xl" 
            variant="ghost" 
            to="/projects"
            trailing-icon="i-heroicons-arrow-right"
          >
            探索專案
          </UButton>
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

    <div class="bg-gray-900/30 py-24">
      <UContainer>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <UCard v-for="feat in features" :key="feat.title" class="hover:border-primary-500/50 transition-all duration-300 bg-gray-900 ring-1 ring-gray-800">
            <template #header>
              <UIcon :name="feat.icon" class="w-8 h-8 text-primary-400" />
            </template>
            <h3 class="text-xl font-semibold text-white mb-2">{{ feat.title }}</h3>
            <p class="text-gray-400">{{ feat.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    title: '正體中文最佳化',
    description: '專注於收集繁中語料庫並微調 LLaMA 類模型，打造最適合台灣在地文化的語言模型。',
    icon: 'i-heroicons-language'
  },
  {
    title: '開源與協作',
    description: '從 Dataset 到 Model 訓練權重完全開源，致力於降低 AI 研究門檻並促進社群貢獻。',
    icon: 'i-heroicons-code-bracket-square'
  },
  {
    title: '實戰評測工具',
    description: '開發 Twinkle Eval 與 TwinRAD，提供高效且準確的模型評測與紅隊測試框架。',
    icon: 'i-heroicons-chart-bar'
  }
]

const socialLinks = [
  { label: 'Discord', icon: 'i-simple-icons-discord', to: '/discord', color: 'primary' },
  { label: 'Hugging Face', icon: 'i-simple-icons-huggingface', to: '/huggingface', color: 'yellow' },
  { label: 'GitHub', icon: 'i-simple-icons-github', to: '/github', color: 'white' },
]
</script>

<style scoped>
.relative.starry-bg {
  background-color: #0b1220; /* deep night */
}
</style>
