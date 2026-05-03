import { z } from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    created_at: z.string(),
});
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.string(), // Matches "899.99"
    quantity: z.number(),
    image: z.string().url(),
    category: z.string().optional().nullable(),
    created_at: z.string(),
});