import type { Product } from "@/schemas/productSchema";

export const PER_PAGE = 12;

export const PRICE_RANGES = [
  { label: "$0–$50", min: "0", max: "50" },
  { label: "$50–$100", min: "50", max: "100" },
  { label: "$100–$150", min: "100", max: "150" },
  { label: "$150+", min: "150", max: undefined as string | undefined },
] as const;

export const SIZES = [
  { label: "S", value: "Small" },
  { label: "M", value: "Medium" },
  { label: "L", value: "Large" },
  { label: "XL", value: "X-Large" },
] as const;

export type FilterState = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  page: number;
};

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.category?.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.size) {
    result = result.filter((p) => p.sizes.some((s) => s.name === filters.size));
  }

  return result;
}

export function paginate(products: Product[], page: number, perPage = PER_PAGE) {
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const start = (page - 1) * perPage;
  return { items: products.slice(start, start + perPage), totalPages, totalCount };
}
