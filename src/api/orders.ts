import { apiFetch } from "@/api/client.ts";
import { z } from "zod";
import {OrderSchema, type PlaceOrderPayload} from "@/schemas/productSchema.ts";

type Order = z.infer<typeof OrderSchema>;



export async function getOrders(): Promise<Order[]> {
  const raw = await apiFetch<{ data: unknown }>("/v1/orders");
  return z.array(OrderSchema).parse(raw.data);
}

export async function getOrder(id: number): Promise<Order> {
  const raw = await apiFetch<{ data: unknown }>(`/v1/orders/${id}`);
  return OrderSchema.parse(raw.data);
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
  const raw = await apiFetch<{ data: unknown }>("/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return OrderSchema.parse(raw.data);
}
