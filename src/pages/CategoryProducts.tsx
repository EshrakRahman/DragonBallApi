import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch, useNavigate } from "@tanstack/react-router";
import { getProducts } from "@/api/products";
import Container from "@/components/layout/Container";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import PaginationBar from "@/components/products/PaginationBar";
import { useProductFilters } from "@/hooks/useProductFilters";

const CATEGORIES = [
  { name: "All Products", slug: "all" },
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Shirts", slug: "shirts" },
  { name: "Pants", slug: "pants" },
  { name: "Jackets", slug: "jackets" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
];

export default function CategoryProducts() {
  const { slug } = useParams({ from: "/categories/$slug" });
  const { q } = useSearch({ from: "/categories/$slug" });
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const queryKey = ["products", { q, slug, sort: "latest" }];

  const queryFn = () => {
    if (q) return getProducts({ search: q, sort: "latest" });
    if (slug !== "all") return getProducts({ category: slug });
    return getProducts();
  };

  const { data: products, isLoading } = useQuery({ queryKey, queryFn });

  const { items, totalPages, totalCount } = useProductFilters(products, {
    minPrice, maxPrice, size, page,
  });

  const title = q
    ? `Search results for "${q}"`
    : slug !== "all"
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "All Products";

  const sidebarCategories = CATEGORIES.map((c) => c.name);

  const handleCategoryClick = (name: string) => {
    const entry = CATEGORIES.find((c) => c.name === name);
    if (!entry) return;
    navigate({ to: `/categories/${entry.slug}` });
  };

  const togglePrice = (min: string, max: string | undefined) => {
    const minNum = Number(min);
    const maxNum = max !== undefined ? Number(max) : undefined;
    const isActive = minPrice === minNum && maxPrice === maxNum;
    setMinPrice(isActive ? undefined : minNum);
    setMaxPrice(isActive ? undefined : maxNum);
    setPage(1);
  };

  const toggleSize = (s: string) => {
    setSize(size === s ? undefined : s);
    setPage(1);
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Loading..." : `Showing ${items.length} of ${totalCount} product${totalCount !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            categories={sidebarCategories}
            activeCategory={slug}
            activeMinPrice={minPrice?.toString()}
            activeMaxPrice={maxPrice?.toString()}
            activeSize={size}
            onToggleCategory={handleCategoryClick}
            onTogglePrice={togglePrice}
            onToggleSize={toggleSize}
          />

          <div className="flex-1">
            <ProductGrid products={items} isLoading={isLoading} />
            <PaginationBar currentPage={page} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </div>
      </div>
    </Container>
  );
}
