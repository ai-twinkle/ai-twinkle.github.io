export default defineAppConfig({
  ui: {
    // Brand colours: use exact HEX for consistent branding
    primary: '#ffd500',
    gray: 'zinc',
    colors: {
      // explicit hex primary so Nuxt UI and any consumers get the exact tint
      primary: '#ffd500',
      secondary: 'white',
      neutral: 'zinc',
    },
    notifications: {position: 'top-0 bottom-auto'},
  },
});
