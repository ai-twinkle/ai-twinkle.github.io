<template>
  <div class="sitcon-page">
    <div class="night-sky-gradient" />
    <div class="noise-overlay" />

    <!-- STARRY SKY (Small ambient stars) -->
    <div class="starry-sky">
      <div class="static-stars"/>
      <div class="static-stars-2"/>
    </div>

    <!-- SHOOTING STARS -->
    <div class="shooting-stars">
      <div class="star"/>
      <div class="star"/>
      <div class="star"/>
    </div>

    <main class="main-container" @touchstart.passive="() => {}">
      <!-- HERO -->
      <header class="hero anim-fade-up" style="--d: 0s">
        <h1 class="hero-title-row">
          <span class="twinkle-text">Twinkle AI</span>
          <div class="logo-x-wrapper">
            <div class="logo-glow" />
            <NuxtImg src="/logo.png" alt="x" width="24" height="24" class="hero-logo-x" />
          </div>
          <span class="sitcon-text">SITCON <span class="year-text">2026</span></span>
        </h1>
      </header>

      <!-- PROJECTS (Contribute Redesign) -->
      <section class="section anim-fade-up" style="--d: 0.1s">
        <div class="projects-grid">
          <NuxtLink
            v-for="link in projectLinks"
            :key="link.label"
            v-track="link.trackEvent"
            :to="link.to"
            target="_blank"
            class="project-card"
            :style="{ '--card-accent': link.accent, '--card-hover-bg': link.bgHover }"
          >
            <div class="project-content">
              <span class="project-title">{{ link.label }}</span>
              <span class="project-sub">{{ $t(link.subKey) }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- FREE LLM API (Redesign) -->
      <section class="section anim-fade-up" style="--d: 0.2s">
        <div class="api-box">
          <p class="api-box-title">{{ $t('sitcon2026.apiTitle') }}</p>
          <div class="api-actions">
            <NuxtLink v-track="'SITCON_API_Doc_Click'" to="https://litellm.lianghsun.dev/" target="_blank" class="btn btn--api-doc">
              <span class="btn-text">{{ $t('sitcon2026.apiDocBtn') }}</span>
            </NuxtLink>
            <button v-track="'SITCON_Copy_API_Key'" class="btn btn--api-copy" :class="{ 'is-copied': copied }" @click="copyApiInfo">
              <span class="btn-text">{{ copied ? $t('sitcon2026.copiedApiKey') : $t('sitcon2026.copyApiKey') }}</span>
              <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-key'" class="btn-icon-right" />
            </button>
          </div>
        </div>
      </section>

      <!-- MASCOT & CONNECT -->
      <section class="section anim-fade-up" style="--d: 0.3s">
        <div class="mascot-social-layout">
          <!-- Mascot -->
          <div class="mascot-wrapper">
            <img src="/mascot.png" alt="SITCON Mascot Leopard Cat" class="mascot-img" >
          </div>

          <!-- Socials -->
          <div class="social-list">
            <NuxtLink
              v-for="link in communityLinks"
              :key="link.label"
              v-track="link.trackEvent"
              :to="link.to"
              target="_blank"
              class="social-btn"
              :style="{ '--hover-color': link.accent }"
            >
              <UIcon :name="link.icon" class="social-icon" />
              <span class="social-text">{{ link.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- BACK BUTTON -->
      <div class="anim-fade-up" style="--d: 0.4s; display: flex; justify-content: center; width: 100%;">
        <NuxtLink to="/" class="btn-back-gorgeous">
          <UIcon name="i-heroicons-arrow-left" class="btn-icon-left" />
          <span class="btn-text">{{ $t('sitcon2026.backHome') }}</span>
        </NuxtLink>
      </div>

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
      href: 'https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700&display=swap',
    },
  ],
});

const runtimeConfig = useRuntimeConfig();
const apiKey = runtimeConfig.public.sitconApiKey || 'None';

const copied = ref(false);

const communityLinks = [
  {to: 'https://discord.com/servers/twinkle-ai-1310544431983759450', icon: 'i-simple-icons-discord', label: 'Discord', accent: '#5865F2', trackEvent: 'SITCON_Discord_Click'},
  {to: 'https://github.com/ai-twinkle', icon: 'i-simple-icons-github', label: 'GitHub', accent: '#24292F', trackEvent: 'SITCON_GitHub_Click'},
  {to: 'https://huggingface.co/twinkle-ai', icon: 'i-simple-icons-huggingface', label: 'HuggingFace', accent: '#1F1712', trackEvent: 'SITCON_HuggingFace_Click'},
];

const projectLinks = [
  {to: 'https://twinkle-voice.vercel.app/?utm_source=twinkleai&utm_campaign=2026&utm_medium=referral&utm_content=sitcon-page', label: 'Twinkle Voice', subKey: 'sitcon2026.voiceSub', accent: '#A3E4D7', bgHover: 'rgba(255,255,255,0.08)', trackEvent: 'SITCON_Voice_Click'},
  {to: 'https://huggingface.co/spaces/twinkle-ai/fine-vision-album', label: 'Twinkle Vision', subKey: 'sitcon2026.visionSub', accent: '#FFDCA8', bgHover: 'rgba(255,255,255,0.08)', trackEvent: 'SITCON_Vision_Click'},
];

/**
 *
 */
function copyApiInfo() {
  const keyToCopy = String(apiKey || '').trim();
  navigator.clipboard.writeText(keyToCopy);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<style scoped>
/* ── BASE & TYPOGRAPHY ── */
.sitcon-page {
  /* SITCON & Twinkle AI Mixed Aesthetic */
  --bg-color: #F8F5EF;
  --text-main: #33261D;
  --text-muted: #6B5B4F;
  --mustard: #D89C3A;
  --twinkle-yellow: #FFD500;
  --card-bg: #EFEBE0;
  --card-hover: #E8E2D3;
  --ticket-brown: #C9B8A0;
  --border-subtle: rgba(0,0,0,0.06);

  min-height: 100dvh;
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: 'Outfit', 'Noto Sans TC', system-ui, sans-serif;
  overflow-x: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.night-sky-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1200px;
  background: linear-gradient(205deg, #0C0805 0%, #0C0805 180px, #291D13 280px, rgba(248, 245, 239, 0) 1100px);
  z-index: 0;
  pointer-events: none;
}

.main-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  padding: 56px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── ANIMATIONS ── */
.anim-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUpSpring 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--d, 0s);
}

@keyframes fadeUpSpring {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ── HERO ── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  margin-bottom: 8px;
}

.hero-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: clamp(6px, 1.5vw, 12px);
  line-height: 1.2;
}

.twinkle-text {
  font-family: 'Cabin', sans-serif;
  font-size: clamp(22px, 6vw, 32px);
  font-weight: 800;
  color: var(--twinkle-yellow);
  text-shadow: 0 2px 6px rgba(0,0,0,0.6), 0 4px 24px rgba(255, 213, 0, 0.5);
  letter-spacing: -0.01em;
}

.logo-x-wrapper {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
}

.logo-glow {
  position: absolute;
  inset: -6px;
  background: var(--twinkle-yellow);
  filter: blur(8px);
  border-radius: 50%;
  opacity: 0.6;
  z-index: 0;
}

.hero-logo-x {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  vertical-align: middle;
}

.hero-logo-x:hover {
  transform: scale(1.15) rotate(15deg);
}

.sitcon-text {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(20px, 5.5vw, 28px);
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

.year-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9em;
  margin-left: 4px;
}


/* ── SECTIONS ── */
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.section-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
  line-height: 1.6;
  text-align: center;
}

/* ── PROJECTS GRID ── */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  width: 100%;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.08); /* frosty edge */
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(12,8,5,0.08);
  border-color: var(--card-accent);
  background: var(--card-hover-bg);
}

.project-card:active {
  transform: scale(0.98);
}

.project-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.project-title {
  color: var(--card-accent);
  font-family: 'Outfit', 'Noto Sans TC', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.project-sub {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  margin-top: 2px;
}


/* ── API BOX ── */
.api-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08); /* frosty edge */
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.api-box-title {
  color: #FFF;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.api-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: scale(0.98);
}

.btn-icon-right {
  width: 18px;
  height: 18px;
  margin-left: 4px;
}

.btn--api-doc {
  background: rgba(255, 255, 255, 0.1);
  color: #FFF;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn--api-doc:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn--api-copy {
  background: rgba(255, 255, 255, 0.15);
  color: #FFF;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn--api-copy:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}

.btn--api-copy.is-copied {
  background: var(--twinkle-yellow);
  color: #1F1712;
  border-color: transparent;
}

/* ── MASCOT & SOCIAL LAYOUT ── */
.mascot-social-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 32px;
  width: 100%;
  margin-top: 16px;
}

.mascot-wrapper {
  position: relative;
  flex-shrink: 0;
}

.mascot-img {
  display: block;
  width: 160px;
  height: auto;
  mix-blend-mode: multiply;
  filter: contrast(1.05) brightness(0.98);
  transform: scaleX(-1) rotate(12deg) translateY(4px);
  transform-origin: bottom center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mascot-wrapper:hover .mascot-img {
  transform: scaleX(-1) rotate(12deg) translateY(-8px) scale(1.05);
}

@media (max-width: 440px) {
  .mascot-social-layout {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .mascot-img {
    width: 130px;
    transform: scaleX(-1) rotate(8deg);
  }
  .mascot-wrapper:hover .mascot-img {
    transform: scaleX(-1) rotate(8deg) translateY(-6px) scale(1.05);
  }
  .social-list {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

/* ── SOCIAL LIST ── */
.social-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 100px;
  text-decoration: none;
  color: #FFF;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.social-btn:hover {
  transform: translateY(-2px);
  border-color: var(--hover-color, rgba(255,255,255,0.4));
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  background: rgba(255,255,255,0.12);
}

.social-btn:active {
  transform: scale(0.98);
}

.social-icon {
  width: 22px;
  height: 22px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.25s ease;
}

.social-btn:hover .social-icon {
  color: var(--hover-color, #FFF);
}

/* ── GORGEOUS BACK BUTTON ── */
.btn-back-gorgeous {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 36px;
  background: #FFFFFF;
  color: #4A3E36;
  font-weight: 700;
  font-size: 15px;
  border-radius: 100px;
  text-decoration: none;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 4px 16px rgba(12,8,5,0.03), 0 1px 3px rgba(12,8,5,0.02);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-icon-left {
  width: 18px;
  height: 18px;
  color: #8C7D70;
  transition: color 0.3s ease;
}

.btn-back-gorgeous:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(12,8,5,0.06);
  border-color: rgba(0,0,0,0.12);
  color: #1F1712;
}

.btn-back-gorgeous:hover .btn-icon-left {
  color: #1F1712;
}

.btn-back-gorgeous:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 2px 8px rgba(12,8,5,0.04);
}

/* ── SHOOTING STARS ── */
.shooting-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 16px 2px rgba(255, 255, 255, 0.4);
  animation: meteor 12s linear infinite;
  opacity: 0;
}

.star::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8));
  transform: translateY(-50%);
}

@keyframes meteor {
  0% {
    opacity: 0;
    transform: rotate(115deg) translateX(-100px);
  }
  5% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  20% {
    transform: rotate(115deg) translateX(900px);
  }
  100% {
    opacity: 0;
    transform: rotate(115deg) translateX(900px);
  }
}

/* ── STARRY SKY (Small Ambient Stars) ── */
.starry-sky {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 600px;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}
.static-stars {
  position: absolute;
  width: 1px; height: 1px;
  background: transparent;
  box-shadow:
    10vw 2vh #fff, 20vw 8vh rgba(255,255,255,0.5), 30vw 4vh #fff,
    40vw 12vh rgba(255,255,255,0.8), 50vw 1vh #fff, 60vw 15vh rgba(255,255,255,0.4),
    70vw 6vh #fff, 80vw 20vh rgba(255,255,255,0.9), 90vw 3vh #fff,
    95vw 25vh rgba(255,255,255,0.3), 5vw 30vh #fff, 15vw 18vh rgba(255,255,255,0.7),
    25vw 35vh #fff, 35vw 22vh rgba(255,255,255,0.6), 45vw 40vh #fff,
    55vw 28vh rgba(255,255,255,0.5), 65vw 45vh #fff, 75vw 32vh rgba(255,255,255,0.8),
    85vw 50vh #fff, 100vw 38vh rgba(255,255,255,0.4);
  animation: slowTwinkle 8s ease-in-out infinite alternate;
}
.static-stars-2 {
  position: absolute;
  width: 2px; height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    15vw 5vh #fff, 28vw 15vh rgba(255,255,255,0.6), 48vw 8vh #fff,
    68vw 22vh rgba(255,255,255,0.9), 88vw 10vh #fff, 92vw 40vh rgba(255,255,255,0.5),
    12vw 42vh #fff, 38vw 48vh rgba(255,255,255,0.7), 58vw 38vh #fff, 78vw 50vh rgba(255,255,255,0.8);
  animation: slowTwinkle 12s ease-in-out infinite alternate-reverse;
}
@keyframes slowTwinkle {
  0% { opacity: 0.15; transform: scale(0.8); }
  100% { opacity: 0.7; transform: scale(1.05); }
}

/* ── MOBILE TOUCH ACTIVE ── */
.sitcon-page .project-card:active,
.sitcon-page .btn:active,
.sitcon-page .social-btn:active,
.sitcon-page .btn-back-gorgeous:active {
  transform: translateY(1px) scale(0.95);
  box-shadow: 0 2px 8px rgba(12,8,5,0.06);
  transition: transform 0.08s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.08s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── SHOOTING STAR POSITIONS (nth-child) ── */
.shooting-stars .star:nth-child(1) {
  top: 10%;
  left: 80%;
  animation-delay: 0s;
}
.shooting-stars .star:nth-child(2) {
  top: -10%;
  left: 60%;
  animation-delay: 1.8s;
}
.shooting-stars .star:nth-child(3) {
  top: 30%;
  left: 110%;
  animation-delay: 3.5s;
}
</style>
