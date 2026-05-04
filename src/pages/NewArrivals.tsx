import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import Container from "@/components/layout/Container.tsx";
import ProductCard from "@/components/products/ProductCard.tsx";
import { getProducts } from "@/api/products.ts";

const PER_PAGE = 12;

const PRICE_RANGES = [
  { label: "$0–$50", min: "0", max: "50" },
  { label: "$50–$100", min: "50", max: "100" },
  { label: "$100–$150", min: "100", max: "150" },
  { label: "$150+", min: "150", max: undefined },
] as const;

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function NewArrivalsPage() {
  const { page: pageStr, category, minPrice: minPriceStr, maxPrice: maxPriceStr, size } = useSearch({ from: "/new-arrivals" });
  const navigate = useNavigate({ from: "/new-arrivals" });

  const currentPage = Number(pageStr);
  const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "latest"],
    queryFn: () => getProducts({ sort: "latest" }),
  });

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  }, [products]);

  const { filtered, totalPages, totalCount } = useMemo(() => {
    if (!products) return { filtered: [], totalPages: 0, totalCount: 0 };

    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }
    if (size) {
      result = result.filter((p) => p.sizes.some((s) => s.name === size));
    }

    const totalCount = result.length;
    const totalPages = Math.ceil(result.length / PER_PAGE);
    const start = (currentPage - 1) * PER_PAGE;
    const filtered = result.slice(start, start + PER_PAGE);

    return { filtered, totalPages, totalCount };
  }, [products, currentPage, category, minPrice, maxPrice, size]);

  const setFilter = (key: string, value: string | undefined) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value ?? undefined, page: "1" }) });
  };

  const toggleCategory = (cat: string) => {
    setFilter("category", category === cat.toLowerCase() ? undefined : cat.toLowerCase());
  };

  const togglePriceRange = (rangeMin: string, rangeMax: string | undefined) => {
    const isActive = minPriceStr === rangeMin && maxPriceStr === (rangeMax ?? undefined);
    if (isActive) {
      setFilter("minPrice", undefined);
      setFilter("maxPrice", undefined);
    } else {
      navigate({ search: (prev) => ({ ...prev, minPrice: rangeMin, maxPrice: rangeMax ?? undefined, page: "1" }) });
    }
  };

  const toggleSize = (s: string) => {
    setFilter("size", size === s ? undefined : s);
  };

  const goToPage = (p: number) => {
    navigate({ search: (prev) => ({ ...prev, page: String(p) }) });
  };

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Arrivals</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading
              ? "Loading..."
              : `Showing ${filtered.length} of ${totalCount} product${totalCount !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => toggleCategory(cat)}
                        className={`w-full text-left cursor-pointer transition-colors ${
                          category === cat.toLowerCase()
                            ? "text-black font-semibold"
                            : "hover:text-black"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range) => {
                    const active = minPriceStr === range.min && maxPriceStr === (range.max ?? undefined);
                    return (
                      <button
                        key={range.label}
                        onClick={() => togglePriceRange(range.min, range.max)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors cursor-pointer ${
                          active
                            ? "bg-black text-white border-black"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-9 h-9 text-sm rounded-lg border transition-colors cursor-pointer ${
                        size === s
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors cursor-pointer ${
                    category === cat.toLowerCase()
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => {
                  const hasDiscount =
                    product.compare_price != null &&
                    product.compare_price > product.price;
                  const discountPercent = hasDiscount
                    ? Math.round(
                        ((product.compare_price! - product.price) /
                          product.compare_price!) *
                          100
                      )
                    : undefined;

                  return (
                    <ProductCard
                      key={product.id}
                      slug={product.slug}
                      title={product.name}
                      price={product.price}
                      ratings={4.5}
                      prdImg={product.image ?? undefined}
                      discountedPrice={
                        hasDiscount ? product.compare_price! : undefined
                      }
                      discount={discountPercent}
                    />
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 text-sm rounded-lg border transition-colors cursor-pointer ${
                      p === currentPage
                        ? "bg-black text-white border-black"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
