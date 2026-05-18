export default defineEventHandler(() => {
  const {public: {externalUrls: {discord: url}}} = useRuntimeConfig();
  return Response.redirect(url, 302);
});

