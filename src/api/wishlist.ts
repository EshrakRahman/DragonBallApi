import { apiFetch } from "@/api/client.ts";
import { ProductSchema } from "@/schemas/productSchema.ts";
import { z } from "zod";

type Product = z.infer<typeof ProductSchema>;

export async function getWishlist(): Promise<Product[]> {
  const raw = await apiFetch<{ data: unknown }>("/v1/wishlist");
  return z.array(ProductSchema).parse(raw.data);
}

export async function addToWishlist(productId: number): Promise<void> {
  await apiFetch("/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function removeFromWishlist(productId: number): Promise<void> {
  await apiFetch(`/v1/wishlist/${productId}`, {
    method: "DELETE",
  });
}
