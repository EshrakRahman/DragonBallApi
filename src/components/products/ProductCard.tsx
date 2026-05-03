import {Ratings} from "@/components/products/Ratings.tsx";
import {Badge} from "@/components/ui/badge.tsx";

type Props = {
    title: string;
    ratings: number;
    price?: number | string;
    discountedPrice?: number;
    discount?: number | boolean;
    prdImg?: string;
}
export default function ProductCard({title, ratings, price, discount, discountedPrice, prdImg}: Props) {
    return (
        <>
            <section className="w-50">
                <div className="product-img rounded-2xl w-50 h-50 bg-[#F0EEED] p-4">
                    <img
                        className="w-full h-full object-cover"
                        src={prdImg}
                        alt="Product"
                    />
                </div>
                <div className="desc flex flex-col pt-4 gap-2">
                    <p className="text-black font-primary font-bold">{title}</p>
                    <Ratings ratings={ratings} />
                    <div className="flex items-center gap-2 ">
                        <p className="font-bold text-black text-lg§">
                            ${price ?? 0}
                        </p>
                        {discountedPrice && (
                            <>
                                <p className="font-bold text-black/40 text-lg">${discountedPrice}</p>
                                <Badge variant="destructive">-{discount}%</Badge>
                            </>
                        )}

                    </div>
                </div>
            </section>
        </>
    )
}