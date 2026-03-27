declare global {
  interface Window {
    umami?: { track: (event: string) => void };
    rybbit?: { event: (event: string) => void };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('track', {
    mounted(el: HTMLElement, binding: { value: string }) {
      const eventName = binding.value;
      if (!eventName) return;

      el.addEventListener('click', () => {
        // Umami
        window.umami?.track(eventName);
        // Rybbit
        window.rybbit?.event(eventName);
      });
    },
  });
});
