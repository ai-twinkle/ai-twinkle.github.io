export default defineEventHandler(() => {
  const {public: {externalUrls: {github: url}}} = useRuntimeConfig();
  return Response.redirect(url, 302);
});

