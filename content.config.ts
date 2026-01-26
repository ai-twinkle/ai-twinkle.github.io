import {defineContentConfig, defineCollection} from '@nuxt/content';
import {z} from 'zod';

export default defineContentConfig({
  collections: {
    // News articles collection
    news: defineCollection({
      source: '*/news/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        category: z.string().optional(),
        image: z.string().optional(),
        links: z.array(z.object({
          title: z.string(),
          url: z.string(),
          source: z.string().optional(),
        })).optional(),
      }),
    }),

    // Education content collection
    education: defineCollection({
      source: '*/education/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        icon: z.string().optional(),
      }),
    }),

    // Pages collection (home, media, etc.)
    pages: defineCollection({
      source: '*/pages/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
});
