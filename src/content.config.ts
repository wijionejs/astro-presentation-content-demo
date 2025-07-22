import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { posts };
