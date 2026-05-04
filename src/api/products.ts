import { ProductSchema } from "@/schemas/productSchema.ts";
import { apiFetch } from "@/api/client.ts";
import { z } from "zod";

export async function getProducts(
  params?: { search?: string; category?: string; sort?: string; featured?: boolean; limit?: number; page?: number }
) {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.category) query.set("category", params.category);
  if (params?.sort) query.set("sort", params.sort);
  if (params?.featured) query.set("featured", "true");
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.page) query.set("page", String(params.page));
  const qs = query.toString();
  const path = qs ? `/v1/products?${qs}` : "/v1/products";
  const raw = await apiFetch<{ data: unknown }>(path);
  return z.array(ProductSchema).parse(raw.data);
}

export async function getProduct(id: number) {
  const raw = await apiFetch<{ data: unknown }>(`/v1/products/${id}`);
  return ProductSchema.parse(raw.data);
}

export async function getProductBySlug(slug: string) {
  const raw = await apiFetch<{ data: unknown }>(
    `/v1/products/by-slug/${slug}`
  );
  return ProductSchema.parse(raw.data);
}
