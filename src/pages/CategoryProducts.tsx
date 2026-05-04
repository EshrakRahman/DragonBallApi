import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import Container from "@/components/layout/Container.tsx";
import ProductCard from "@/components/products/ProductCard.tsx";
import { getProducts } from "@/api/products.ts";

export default function CategoryProducts() {
  const { slug } = useParams({ from: "/categories/$slug" });
  const { q } = useSearch({ from: "/categories/$slug" });

  const queryKey = q ? ["products", "search", q] : ["products", "category", slug];
  const queryFn = q
    ? () => getProducts({ search: q, sort: "latest" })
    : slug !== "all"
    ? () => getProducts({ category: slug })
    : () => getProducts();

  const { data: products, isLoading } = useQuery({ queryKey, queryFn });

  const title = q
    ? `Search results for "${q}"`
    : slug !== "all"
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "All Products";

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Loading..." : `Showing ${products?.length ?? 0} product${(products?.length ?? 0) !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {["T-Shirts", "Shirts", "Pants", "Jackets", "Shoes", "Accessories"].map((cat) => (
                    <li key={cat} className="cursor-pointer hover:text-black transition-colors">
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="flex flex-wrap gap-2">
                  {["$0–$50", "$50–$100", "$100–$150", "$150+"].map((range) => (
                    <button
                      key={range}
                      className="px-3 py-1.5 text-xs rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="w-9 h-9 text-sm rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2">
              {["T-Shirts", "Shirts", "Pants", "Jackets"].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 text-sm rounded-full border border-gray-200 whitespace-nowrap hover:border-gray-400 transition-colors"
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
            ) : products?.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => {
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

            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Prev
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
                    page === 1
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
