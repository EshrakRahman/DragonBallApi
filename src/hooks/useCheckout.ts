import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import type { ApplyCouponInput, CouponData, CheckoutInput } from '../schemas/checkout';
import type { Order } from '../schemas/productSchema';

interface ApiValidationError {
  message: string;
  errors: Record<string, string[]>;
}

// Configured Axios client for fetching backend APIs
const apiBase = import.meta.env.VITE_API_BASE ?? '/api';
const baseURL = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;

export const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hook to validate and apply a coupon code
export function useApplyCoupon() {
  return useMutation<CouponData, AxiosError<ApiValidationError>, ApplyCouponInput>({
    mutationFn: async (data) => {
      const response = await apiClient.post<CouponData>('/api/v1/coupons/apply', data);
      return response.data;
    },
  });
}

// Hook to submit checkout
export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, AxiosError<ApiValidationError>, CheckoutInput>({
    mutationFn: async (data) => {
      const response = await apiClient.post<{ data: Order }>('/api/v1/orders', data);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate active orders query
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
