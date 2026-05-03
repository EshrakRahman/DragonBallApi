import { CategorySchema, ProductSchema } from "@/schemas/productSchema.ts";
import { z } from "zod";

/**
 * Automatically infer TypeScript types from your Zod schemas
 * to keep your types and validation in sync.
 */
type Product = z.infer<typeof ProductSchema>;
type Category = z.infer<typeof CategorySchema>;

const API_BASE_URL = 'http://ecom-api.test/api/v1';

export async function getNewArrivalsProduct(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/products`);
    const json = await res.json();

    // Pass json.data to Zod because Laravel wraps the array in a 'data' key
    return z.array(ProductSchema).parse(json.data);
}

export async function getBestSellingProduct(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/products`);
    const json = await res.json();

    return z.array(ProductSchema).parse(json.data);
}

export async function getCategoryData(): Promise<Category[]> {
    const res = await fetch(`${API_BASE_URL}/categories`);
    const json = await res.json();

    return z.array(CategorySchema).parse(json.data);
}