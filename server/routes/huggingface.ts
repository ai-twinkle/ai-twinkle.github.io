export default defineEventHandler(() => {
  const {public: {externalUrls: {huggingface: url}}} = useRuntimeConfig();
  return Response.redirect(url, 302);
});

