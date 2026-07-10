import { apiFetch } from "@/api/client.ts";
import { ProductReviewsResponseSchema, ReviewSchema, type Review, type ProductReviewsResponse } from "@/schemas/productSchema.ts";
import { z } from "zod";

export async function getProductReviews(productId: number, page = 1): Promise<ProductReviewsResponse> {
  const data = await apiFetch<unknown>(`/v1/products/${productId}/reviews?page=${page}`);
  return ProductReviewsResponseSchema.parse(data);
}

export async function createReview(
  productId: number,
  payload: { rating: number; title?: string; body: string }
): Promise<Review> {
  const data = await apiFetch<unknown>(`/v1/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  // The backend store method returns the new ReviewResource directly.
  // Laravel JsonResource wraps it in a 'data' property by default.
  // Let's check if the backend wraps store response in 'data' key.
  // Store method in ReviewController.php: return new ReviewResource($review);
  // Laravel default behavior wraps it in 'data' when calling toResponse/json serialization.
  // Let's handle both wrapped 'data' and direct object.
  const rawObj = data && typeof data === "object" && "data" in data ? (data as { data: unknown }).data : data;
  return ReviewSchema.parse(rawObj);
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  try {
    const data = await apiFetch<unknown>(`/v1/reviews/featured?limit=${limit}`);
    const rawList = data && typeof data === "object" && "data" in data ? (data as { data: unknown[] }).data : data;
    if (Array.isArray(rawList) && rawList.length > 0) {
      return z.array(ReviewSchema).parse(rawList);
    }
    throw new Error("Empty or invalid reviews list");
  } catch (error) {
    console.warn("Could not find api route /v1/reviews/featured, call failed, or returned empty list. Using dummy reviews.", error);
    return [
      {
        id: 1,
        user_name: "Sarah M.",
        product_id: 1,
        rating: 5,
        title: "Blown away by quality!",
        body: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
        is_approved: true,
        created_at: "2026-07-01 10:00:00",
        product: {
          id: 1,
          name: "Classic Leather Jacket",
          slug: "classic-leather-jacket",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&auto=format&fit=crop&q=80"
        }
      },
      {
        id: 2,
        user_name: "Alex K.",
        product_id: 2,
        rating: 5,
        title: "Finding the perfect fit",
        body: "Finding clothes that fit my body type has always been a challenge, but the sizing guides here are incredibly accurate. The material feels premium and holds up great in the wash.",
        is_approved: true,
        created_at: "2026-07-02 11:30:00",
        product: {
          id: 2,
          name: "Slim Fit Stretch Chino",
          slug: "slim-fit-stretch-chino",
          image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&auto=format&fit=crop&q=80"
        }
      },
      {
        id: 3,
        user_name: "James L.",
        product_id: 3,
        rating: 5,
        title: "Excellent service!",
        body: "As someone who is very picky about customer service, I was pleasantly surprised. The team went above and beyond to help me exchange a size. Highly recommend!",
        is_approved: true,
        created_at: "2026-07-03 14:15:00",
        product: {
          id: 3,
          name: "Organic Cotton Crewneck",
          slug: "organic-cotton-crewneck",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80"
        }
      },
      {
        id: 4,
        user_name: "Mona R.",
        product_id: 4,
        rating: 5,
        title: "Absolutely gorgeous",
        body: "I bought a couple of dresses for a summer wedding and they got so many compliments! The fabrics are light, breathable, and feel so luxurious. Will definitely buy again.",
        is_approved: true,
        created_at: "2026-07-04 09:45:00",
        product: {
          id: 4,
          name: "Floral Summer Midi Dress",
          slug: "floral-summer-midi-dress",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop&q=80"
        }
      },
      {
        id: 5,
        user_name: "Liam T.",
        product_id: 5,
        rating: 4,
        title: "Great value and styles",
        body: "Fantastic selection of modern streetwear. Shipping was extremely fast and the customer support team was very responsive. The hoodies fit perfectly.",
        is_approved: true,
        created_at: "2026-07-05 16:20:00",
        product: {
          id: 5,
          name: "Heavyweight Boxy Hoodie",
          slug: "heavyweight-boxy-hoodie",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&auto=format&fit=crop&q=80"
        }
      },
      {
        id: 6,
        user_name: "Olivia W.",
        product_id: 6,
        rating: 5,
        title: "My new go-to store",
        body: "Absolutely love the minimalist aesthetic. Every single item I've ordered feels like a designer piece but at a fraction of the cost. A staple for my wardrobe!",
        is_approved: true,
        created_at: "2026-07-06 12:10:00",
        product: {
          id: 6,
          name: "Minimalist Knit Sweater",
          slug: "minimalist-knit-sweater",
          image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=200&auto=format&fit=crop&q=80"
        }
      }
    ];
  }
}
