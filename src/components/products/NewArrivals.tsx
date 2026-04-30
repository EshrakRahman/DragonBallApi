import ProductCard from "@/components/products/ProductCard.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getNewArrivalsProduct,} from "@/api.ts";
import {Button} from "@/components/ui/button.tsx";


export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
};
export default function NewArrivals() {
    const {data} = useSuspenseQuery<Product[]>({
        queryKey: ['product'],
        queryFn: getNewArrivalsProduct

    });
    return (
        <>
            <section className="pl-4 py-8 flex flex-col items-center gap-4">
                <h2 className="font-bold text-3xl lg:text-5xl py-6 text-black">
                    New Arrivals
                </h2>

                <div
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide w-full">
                    {data.map((product: Product) => (
                        <div
                            key={product.id}
                            className="min-w-[220px] flex-shrink-0"
                        >
                            <ProductCard
                                prdImg={product.images[0]}
                                title={product.title}
                                ratings={4.5}
                                price={product.price}
                                discount={false}
                            />
                        </div>
                    ))}
                </div>

                <Button className="px-8 py-4 rounded-full bg-background border-gray-400  mt-6 text-black/50">
                    View All
                </Button>
            </section>
        </>
    )
}