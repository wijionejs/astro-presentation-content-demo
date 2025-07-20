import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localPosts = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

const remotePosts = defineCollection({
  loader: async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_start=1&_limit=5"
    );
    const data = await response.json();

    return data.map((post: any) => ({ ...post, id: post.id.toString() }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
  }),
});

export const collections = { localPosts, remotePosts };
