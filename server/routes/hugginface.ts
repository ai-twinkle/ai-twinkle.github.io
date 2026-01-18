const {
    externalUrls: { huggingface: url },
} = useRuntimeConfig();

export default defineEventHandler(
    () => Response.redirect(url, 302),
)
