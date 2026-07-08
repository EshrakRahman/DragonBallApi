import { z } from 'zod';

// Schema for applying a coupon
export const ApplyCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code cannot be empty'),
  subtotal: z.number().min(0),
});

export type ApplyCouponInput = z.infer<typeof ApplyCouponSchema>;

// Coupon Response Schema
export const CouponResponseSchema = z.object({
  code: z.string(),
  type: z.enum(['percentage', 'fixed']),
  value: z.number(),
  discount_amount: z.number(),
  min_order_amount: z.number().nullable(),
  description: z.string().nullable(),
});

export type CouponData = z.infer<typeof CouponResponseSchema>;

// Checkout Form Schema
export const CheckoutSchema = z.object({
  items: z.array(z.object({
    product_id: z.number(),
    quantity: z.number().min(1),
    size_id: z.number().nullable().optional(),
  })).min(1, 'Your cart is empty'),
  coupon_code: z.string().optional(),
  notes: z.string().optional(),
  shipping_address: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(5, 'Zip code is invalid'),
    country: z.string().min(2, 'Country code is invalid'),
  }),
  payment_method: z.enum(['cash', 'stripe']),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
