import { z } from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    image: z.string().url(),
});

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    price: z.number(),
    description: z.string(),
    images: z.array(z.string().url()),
    category: CategorySchema,
});