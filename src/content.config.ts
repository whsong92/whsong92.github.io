import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        category: z.enum(['dev', 'ai', 'etc']),
        readTime: z.string().default('05 MIN READ'),
    }),
});

export const collections = { posts };