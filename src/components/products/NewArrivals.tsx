import ProductCard from "@/components/products/ProductCard.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getNewArrivalsProduct,} from "@/api.ts";
import {Button} from "@/components/ui/button.tsx";
import Container from "@/components/layout/Container.tsx";
import {useRef} from "react";


export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;    // Changed to string to match API "899.99"
    quantity?: number;
    image: string;
    category?: string | null;
    createdAt?: string; // API returns string "2026-05-02..."
};
export default function NewArrivals() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const {data} = useSuspenseQuery<Product[]>({
        queryKey: ['product'],
        queryFn: getNewArrivalsProduct

    });
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -320, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: 320, behavior: 'smooth'});
        }
    };
    return (
        <Container>
            <section aria-labelledby="new-arrivals-title" className="pl-4 py-8 flex flex-col items-center gap-4">
                <h2 id="new-arrivals-title" className="font-bold text-3xl lg:text-5xl py-6 text-black">
                    New Arrivals
                </h2>

                <div className="relative w-full">
                    <button
                        aria-label="Scroll left"
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer hover:cursor-pointer"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 18l-6-6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide w-full">
                        {data.map((product: Product) => (
                            <div
                                key={product.id}
                                className="min-w-55 shrink-0"
                            >
                                <ProductCard
                                    prdImg={product.image}
                                    title={product.name}
                                    ratings={4.5}
                                    price={product.price}
                                    discount={false}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        aria-label="Scroll right"
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer hover:cursor-pointer"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 6l6 6-6 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <Button className="px-8 py-4 rounded-full bg-background border-gray-400  mt-6 text-black/50 hover:text-black hover:border-black/90 hover:cursor-pointer transition-all duration-300">
                    View All
                </Button>
            </section>
        </Container>
    )
}
