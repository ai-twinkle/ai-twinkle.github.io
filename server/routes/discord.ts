const {
  externalUrls: {discord: url},
} = useRuntimeConfig();

export default defineEventHandler(
    () => Response.redirect(url, 302),
);
