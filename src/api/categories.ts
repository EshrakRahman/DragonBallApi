import {
  CategorySchema,
  CategoryWithProductsSchema,
} from "@/schemas/productSchema.ts";
import { apiFetch } from "@/api/client.ts";
import { z } from "zod";

export async function getCategories() {
  const raw = await apiFetch<{ data: unknown }>("/v1/categories");
  return z.array(CategorySchema).parse(raw.data);
}

export async function getCategory(id: number) {
  const raw = await apiFetch<{ data: unknown }>(`/v1/categories/${id}`);
  return CategoryWithProductsSchema.parse(raw.data);
}
