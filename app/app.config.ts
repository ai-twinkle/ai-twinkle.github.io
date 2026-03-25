export default defineAppConfig({
  ui: {
    // Reference the primary colour scale registered via @theme in main.css
    colors: {
      primary: 'primary',
      neutral: 'zinc',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
  },
});
