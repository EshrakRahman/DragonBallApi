import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { getProducts } from "@/api/products";
import Container from "@/components/layout/Container";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import PaginationBar from "@/components/products/PaginationBar";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function NewArrivalsPage() {
  const { page: pageStr, category, minPrice: minPriceStr, maxPrice: maxPriceStr, size } = useSearch({ from: "/new-arrivals" });
  const navigate = useNavigate({ from: "/new-arrivals" });

  const filters = {
    category,
    minPrice: minPriceStr ? Number(minPriceStr) : undefined,
    maxPrice: maxPriceStr ? Number(maxPriceStr) : undefined,
    size,
    page: Number(pageStr),
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "latest"],
    queryFn: () => getProducts({ sort: "latest" }),
  });

  const { items, totalPages, totalCount, categories } = useProductFilters(products, filters);

  const setFilter = (key: string, value: string | undefined) => {
    navigate({ search: (prev: Record<string, string | undefined>) => ({ ...prev, [key]: value ?? undefined, page: "1" }) });
  };

  const goToPage = (p: number) => {
    navigate({ search: (prev: Record<string, string | undefined>) => ({ ...prev, page: String(p) }) });
  };

  const toggleCategory = (cat: string) => {
    setFilter("category", category === cat.toLowerCase() ? undefined : cat.toLowerCase());
  };

  const togglePrice = (min: string, max: string | undefined) => {
    const isActive = minPriceStr === min && maxPriceStr === (max ?? undefined);
    if (isActive) {
      setFilter("minPrice", undefined);
      setFilter("maxPrice", undefined);
    } else {
      navigate({ search: (prev: Record<string, string | undefined>) => ({ ...prev, minPrice: min, maxPrice: max ?? undefined, page: "1" }) });
    }
  };

  const toggleSize = (s: string) => {
    setFilter("size", size === s ? undefined : s);
  };

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Arrivals</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Loading..." : `Showing ${items.length} of ${totalCount} product${totalCount !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            categories={categories}
            activeCategory={category}
            activeMinPrice={minPriceStr}
            activeMaxPrice={maxPriceStr}
            activeSize={size}
            onToggleCategory={toggleCategory}
            onTogglePrice={togglePrice}
            onToggleSize={toggleSize}
          />

          <div className="flex-1">
            <ProductGrid products={items} isLoading={isLoading} />
            <PaginationBar currentPage={filters.page} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </div>
      </div>
    </Container>
  );
}
