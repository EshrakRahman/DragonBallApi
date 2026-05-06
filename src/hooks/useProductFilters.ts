import { useMemo } from "react";
import type { Product } from "@/schemas/productSchema";
import { applyFilters, paginate, type FilterState } from "@/lib/filters";

export function useProductFilters(products: Product[] | undefined, filters: FilterState) {
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return applyFilters(products, filters);
  }, [products, filters.category, filters.minPrice, filters.maxPrice, filters.size]);

  const paginated = useMemo(() => {
    return paginate(filtered, filters.page);
  }, [filtered, filters.page]);

  return {
    items: paginated.items,
    totalPages: paginated.totalPages,
    totalCount: paginated.totalCount,
    categories,
  };
}
