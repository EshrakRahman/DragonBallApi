import { apiFetch } from "@/api/client.ts";
import { z } from "zod";
import { OrderSchema } from "@/schemas/productSchema.ts";

type Order = z.infer<typeof OrderSchema>;

type PlaceOrderPayload = {
  items: { product_id: number; size_id?: number | null; quantity: number }[];
  shipping_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billing_address?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  notes?: string;
};

export async function getOrders(): Promise<Order[]> {
  const data = await apiFetch<{ data: unknown }>("/v1/orders");
  return z.array(OrderSchema).parse(data.data);
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
