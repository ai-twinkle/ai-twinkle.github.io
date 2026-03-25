<template>
  <div class="page" :class="{ 'page--light': isLight }">

    <div class="hero-glow" />
    <div class="green-glow" />

    <button class="theme-toggle" :title="isLight ? '切換深色模式' : '切換淺色模式'" @click="isLight = !isLight">
      <UIcon :name="isLight ? 'i-heroicons-moon' : 'i-heroicons-sun'" class="theme-toggle__icon" />
    </button>

    <main class="main">

      <!-- ── HERO ── -->
      <header class="hero anim-in" style="--d:0s">
        <NuxtImg src="/logo.png" alt="Twinkle AI" width="100" height="100" class="hero__logo" />
        <h1 class="hero__headline">
          <span class="hero__brand">Twinkle AI</span>
          <span class="hero__x"> × </span>
          <span class="hero__sitcon-name">SITCON</span>
          <span class="hero__year"> 2026</span>
        </h1>
        <p class="hero__tagline">正體中文開源語言模型社群</p>
      </header>

      <!-- ── CONTRIBUTE ── -->
      <section class="section anim-in" style="--d:0.12s">
        <p class="section__label section__label--yellow">Contribute</p>
        <p class="section__desc">這兩個專案需要大家貢獻語音與視覺資料。</p>
        <div class="rows">
          <NuxtLink
            v-for="link in projectLinks"
            :key="link.label"
            :to="link.to"
            target="_blank"
            class="row row--featured"
          >
            <UIcon :name="link.icon" class="row__icon" />
            <span class="row__name">{{ link.label }}</span>
            <span class="row__circle row__circle--yellow">↗</span>
          </NuxtLink>
        </div>
      </section>

      <!-- ── FREE LLM API ── -->
      <section class="section anim-in" style="--d:0.22s">
        <p class="section__label section__label--green">Free LLM API</p>
        <div class="rows">
          <NuxtLink to="https://litellm.lianghsun.dev/" target="_blank" class="row row--green">
            <UIcon name="i-heroicons-cpu-chip" class="row__icon" />
            <span class="row__name">免費 LLM API</span>
            <span class="api-badge">有效至四月底</span>
            <span class="row__circle row__circle--green">↗</span>
          </NuxtLink>
          <div class="api-key-row">
            <samp class="api-key-value">{{ apiKey }}</samp>
            <button class="copy-btn" :class="{ copied }" @click="copyApiInfo">
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ── CONNECT ── -->
      <section class="section anim-in" style="--d:0.32s">
        <p class="section__label">Connect</p>
        <div class="rows">
          <NuxtLink
            v-for="link in communityLinks"
            :key="link.label"
            :to="link.to"
            target="_blank"
            class="row"
            :style="{ '--row-accent': link.accent }"
          >
            <UIcon :name="link.icon" class="row__icon" />
            <span class="row__name">{{ link.label }}</span>
            <span class="row__circle">↗</span>
          </NuxtLink>
        </div>
      </section>

      <NuxtLink to="/" class="back-link anim-in" style="--d:0.40s">← 回到 Twinkle AI 官網</NuxtLink>

    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: false});

useHead({
  link: [
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,700;1,400&display=swap',
    },
  ],
});

const runtimeConfig = useRuntimeConfig();
const apiKey = runtimeConfig.public.sitconApiKey || 'None';

const copied = ref(false);
const isLight = ref(false);

const communityLinks = [
  {to: 'https://discord.com/servers/twinkle-ai-1310544431983759450', icon: 'i-simple-icons-discord', label: 'Discord 社群', accent: '#7289DA'},
  {to: 'https://github.com/ai-twinkle', icon: 'i-simple-icons-github', label: 'GitHub', accent: '#94a3b8'},
  {to: 'https://huggingface.co/twinkle-ai', icon: 'i-simple-icons-huggingface', label: 'HuggingFace', accent: '#ff9d00'},
];

const projectLinks = [
  {to: 'https://twinkle-voice.vercel.app/?utm_source=twinkleai&utm_campaign=2026&utm_medium=referral&utm_content=sitcon-page', icon: 'i-heroicons-microphone', label: 'Twinkle Voice'},
  {to: 'https://huggingface.co/spaces/lianghsun/fine-vision-album', icon: 'i-heroicons-eye', label: 'Twinkle Vision'},
];

/**
 *
 */
function copyApiInfo() {
  navigator.clipboard.writeText(apiKey);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<style scoped>
/* ── Base ── */
.page {
  min-height: 100svh;
  background: #0e0e10;
  color: #e2e2e2;
  font-family: 'Cabin', system-ui, sans-serif;
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

/* ── Theme toggle ── */
.theme-toggle {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.13);
  border-color: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.85);
}

.theme-toggle__icon {
  width: 18px;
  height: 18px;
}

/* ── Light mode ── */
/* Palette:
   bg         #fffef7  warm white
   text       #1c1a14  warm near-black
   gold       #b07d00  amber (readable on light)
   green      #3a7a1e  forest green
   card-bg    #f2efe8  warm stone
   card-hover #e8e4db
*/
.page--light {
  background: #fffef7;
  color: #1c1a14;
}

.page--light .hero-glow {
  background: radial-gradient(circle, rgba(255, 213, 0, 0.07) 0%, transparent 60%);
}

.page--light .green-glow {
  background: radial-gradient(circle, rgba(100, 170, 60, 0.07) 0%, transparent 60%);
}

.page--light .theme-toggle {
  border-color: #d6d2c8;
  background: #f2efe8;
  color: #7a7060;
}

.page--light .theme-toggle:hover {
  background: #e8e4db;
  border-color: #bfbab0;
  color: #3a3528;
}

/* Hero */
.page--light .hero__brand {
  background: linear-gradient(110deg, #b07d00 0%, #c85500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page--light .hero__sitcon-name {
  color: #4a9420;
}

.page--light .hero__x {
  color: rgba(28, 26, 20, 0.45);
}

.page--light .hero__year {
  color: rgba(28, 26, 20, 0.6);
}

.page--light .hero__tagline {
  color: rgba(28, 26, 20, 0.65);
}

.page--light .hero__logo {
  filter: drop-shadow(0 0 22px rgba(255, 200, 0, 0.55));
}

/* Section labels */
.page--light .section__label {
  color: rgba(28, 26, 20, 0.3);
}

.page--light .section__label::after {
  background: rgba(28, 26, 20, 0.1);
}

.page--light .section__label--yellow {
  color: #b07d00;
}

.page--light .section__label--yellow::after {
  background: rgba(176, 125, 0, 0.22);
}

.page--light .section__label--green {
  color: #3a7a1e;
}

.page--light .section__label--green::after {
  background: rgba(58, 122, 30, 0.2);
}

.page--light .section__desc {
  color: rgba(28, 26, 20, 0.72);
}

/* Rows */
.page--light .row {
  background: #f2efe8;
  border-color: #dedad1;
  color: #2e2b22;
}

.page--light .row:hover {
  background: #e8e4db;
  border-color: #ccc8be;
  color: #1c1a14;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
}

.page--light .row--featured {
  background: #fff8d6;
  border-color: #e8c800;
  color: #2e2b22;
}

.page--light .row--featured:hover {
  background: #fff3b8;
  border-color: #d4b400;
  color: #1c1a14;
  box-shadow: 0 4px 20px rgba(200, 160, 0, 0.15);
}

.page--light .row__icon {
  color: var(--row-accent, rgba(28, 26, 20, 0.32));
}

.page--light .row:hover .row__icon {
  color: var(--row-accent, rgba(28, 26, 20, 0.6));
  filter: brightness(0.85);
}

.page--light .row--featured .row__icon {
  color: #b07d00;
}

.page--light .row--featured:hover .row__icon {
  color: #8a6000;
}

/* Circles */
.page--light .row__circle {
  background: #e2dfd6;
  color: #6a6558;
}

.page--light .row:hover .row__circle {
  background: #d4d0c6;
  color: #3a3528;
}

.page--light .row__circle--yellow {
  background: #ffe066;
  color: #7a5a00;
}

.page--light .row--featured:hover .row__circle--yellow {
  background: #ffd200;
  color: #5a4000;
}

.page--light .row__circle--green {
  background: #c0e0a0;
  color: #2a6010;
}

.page--light .row:hover .row__circle--green {
  background: #a8d484;
  color: #1e4e0c;
}

/* Green row */
.page--light .row--green {
  background: #eef8e6;
  border-color: #7ab85a;
  color: #2e2b22;
}

.page--light .row--green:hover {
  background: #e2f4d6;
  border-color: #5a9e3a;
  color: #1c1a14;
  box-shadow: 0 4px 20px rgba(80, 160, 40, 0.14);
}

.page--light .row--green .row__icon       { color: #3a7a1e; }
.page--light .row--green:hover .row__icon { color: #2a5c14; filter: none; }

/* API section */
.page--light .api-badge {
  background: #d0edb8;
  color: #2a6010;
}

.page--light .api-key-row {
  background: #eaf7de;
  border-color: #acd888;
}

.page--light .api-key-value {
  color: #2a6010;
}

.page--light .copy-btn {
  border-color: #d6d2c8;
  color: #6a6558;
  background: #f2efe8;
}

.page--light .copy-btn:hover {
  border-color: #bfbab0;
  color: #2e2b22;
  background: #e8e4db;
}

.page--light .copy-btn.copied {
  border-color: #7ab85a;
  color: #2a6010;
  background: #d8f0c0;
}

/* Back link */
.page--light .back-link {
  color: rgba(28, 26, 20, 0.55);
}

.page--light .back-link:hover {
  color: rgba(28, 26, 20, 0.85);
}

.hero-glow {
  position: fixed;
  top: -160px;
  left: -160px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(255, 213, 0, 0.09) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.green-glow {
  position: fixed;
  bottom: -120px;
  right: -120px;
  width: 440px;
  height: 440px;
  background: radial-gradient(circle, rgba(119, 181, 90, 0.07) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.main {
  position: relative;
  z-index: 1;
  max-width: 420px;
  margin: 0 auto;
  padding: 48px 22px 68px;
  display: flex;
  flex-direction: column;
  gap: 44px;
}

/* ── Entrance animation ── */
.anim-in {
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0s);
}

@keyframes fadeUp {
  to { opacity: 1; transform: none; }
}

/* ── Hero ── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}

.hero__logo {
  filter: drop-shadow(0 0 22px rgba(255, 213, 0, 0.4));
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}

.hero__headline {
  font-size: clamp(22px, 6.2vw, 28px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.hero__brand {
  color: #ffd500;
}

.hero__x {
  color: rgba(255, 255, 255, 0.35);
  font-weight: 400;
}

.hero__sitcon-name {
  color: #77B55A;
}

.hero__year {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.hero__tagline {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.38);
  letter-spacing: 0.03em;
}

/* ── Section ── */
.section__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section__label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
}

.section__label--yellow { color: rgba(255, 213, 0, 0.7); }
.section__label--yellow::after { background: rgba(255, 213, 0, 0.18); }

.section__label--green  { color: rgba(119, 181, 90, 0.7); }
.section__label--green::after  { background: rgba(119, 181, 90, 0.18); }

.section__desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.42);
  margin-bottom: 14px;
  line-height: 1.65;
}

/* ── Pill rows ── */
.rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 11px 11px 20px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: rgba(255, 255, 255, 0.78);
  font-size: 17px;
  font-weight: 500;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.row:hover {
  background: rgba(255, 255, 255, 0.13);
  border-color: rgba(255, 255, 255, 0.18);
  color: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.row--featured {
  background: rgba(255, 213, 0, 0.14);
  border: 1px solid rgba(255, 213, 0, 0.28);
  color: rgba(255, 255, 255, 0.9);
}

.row--featured:hover {
  background: rgba(255, 213, 0, 0.22);
  border-color: rgba(255, 213, 0, 0.45);
  color: #fff;
  box-shadow: 0 4px 24px rgba(255, 213, 0, 0.12);
}

.row--green {
  background: rgba(119, 181, 90, 0.14);
  border: 1px solid rgba(119, 181, 90, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.row--green:hover {
  background: rgba(119, 181, 90, 0.22);
  border-color: rgba(119, 181, 90, 0.5);
  color: #fff;
  box-shadow: 0 4px 24px rgba(119, 181, 90, 0.18);
}

.row--green .row__icon       { color: rgba(119, 181, 90, 0.8); }
.row--green:hover .row__icon { color: #77B55A; filter: none; }

.row__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--row-accent, rgba(255, 255, 255, 0.4));
  transition: color 0.15s ease;
}

.row:hover .row__icon           { color: var(--row-accent, rgba(255, 255, 255, 0.75)); filter: brightness(1.2); }
.row--featured .row__icon       { color: rgba(255, 213, 0, 0.7); }
.row--featured:hover .row__icon { color: #ffd500; filter: none; }

.row__name { flex: 1; }

/* Circle arrow */
.row__circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.55);
  transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.row:hover .row__circle {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  transform: translate(1px, -1px);
}

.row__circle--yellow {
  background: rgba(255, 213, 0, 0.25);
  color: rgba(255, 213, 0, 0.9);
}

.row--featured:hover .row__circle--yellow {
  background: rgba(255, 213, 0, 0.42);
  color: #ffd500;
  transform: translate(1px, -1px);
}

.row__circle--green {
  background: rgba(119, 181, 90, 0.25);
  color: rgba(119, 181, 90, 0.9);
}

.row:hover .row__circle--green {
  background: rgba(119, 181, 90, 0.42);
  color: #77B55A;
  transform: translate(1px, -1px);
}

/* ── API badge ── */
.api-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 100px;
  background: rgba(119, 181, 90, 0.25);
  color: rgba(119, 181, 90, 0.95);
  white-space: nowrap;
}

/* ── API key row ── */
.api-key-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 11px 11px 20px;
  border-radius: 100px;
  background: rgba(119, 181, 90, 0.1);
  border: 1px solid rgba(119, 181, 90, 0.22);
}

.api-key-value {
  font-family: 'Courier New', Courier, monospace;
  font-size: 13.5px;
  color: rgba(119, 181, 90, 0.8);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Copy button ── */
.copy-btn {
  font-family: 'Cabin', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.copy-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.05);
}

.copy-btn.copied {
  border-color: rgba(119, 181, 90, 0.5);
  color: #77B55A;
  background: rgba(119, 181, 90, 0.08);
}

/* ── Back link ── */
.back-link {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: color 0.15s;
}

.back-link:hover {
  color: rgba(255, 255, 255, 0.5);
}
</style>
