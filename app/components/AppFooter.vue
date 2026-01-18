<template>
  <footer class="mt-16 pb-12 text-sm leading-6 text-gray-300 bg-transparent">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div class="text-white font-semibold"><span class="text-twinkle">Twinkle AI</span></div>
          <div class="text-xs text-gray-400">正體中文開源語言模型社群 • 開源 • 協作 • 教學</div>
          <div class="mt-3 flex gap-3">
            <a class="text-gray-400 hover:text-twinkle transition-colors" href="/github" target="_blank">GitHub</a>
            <a class="text-gray-400 hover:text-twinkle transition-colors" href="/huggingface" target="_blank">Hugging Face</a>
            <a class="text-gray-400 hover:text-twinkle transition-colors" href="/discord" target="_blank">Discord</a>
          </div>
        </div>

        <div class="text-sm text-gray-400">
          <div>推薦：查看
            <NuxtLink to="/projects" class="text-white hover:underline">開源專案</NuxtLink> 與
            <a class="text-white hover:underline" href="/">教學文章</a>
          </div>
          <div class="mt-3">&copy; {{ year }} Twinkle AI</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
