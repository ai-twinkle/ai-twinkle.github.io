const {
  externalUrls: {github: url},
} = useRuntimeConfig();

export default defineEventHandler(
    () => Response.redirect(url, 302),
);
