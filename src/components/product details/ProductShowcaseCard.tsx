import ProductImg from "@/assets/product_one.png";

type Props = { image?: string | null };

export default function ProductShowcaseCard({ image }: Props) {
    const src = image ?? ProductImg;

    return (
        <section className="flex flex-col md:flex-row gap-4">
            <div className="main-img w-90 h-72 md:w-85 md:h-100 lg:h-134 md:order-2 bg-[#F3F1EF] p-4 rounded-2xl">
                <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt="product"
                />
            </div>
            <div className="thumbs flex gap-4 md:flex-col">
                <div className="one w-28 h-26.5 md:w-25 md:h-30 lg:w-38 lg:h-42 bg-[#F3F1EF] border border-black p-4 rounded-xl">
                    <img
                        className="w-full h-full object-cover"
                        src={src}
                        alt="main product"
                    />
                </div>
                <div className="two w-28 h-26.5 md:w-25 md:h-30 lg:w-38 lg:h-42 bg-[#F3F1EF] p-4 rounded-xl">
                    <img
                        className="w-full h-full object-cover"
                        src={src}
                        alt="main product"
                    />
                </div>
                <div className="three w-28 h-26.5 md:w-25 md:h-30 lg:w-38 lg:h-42 bg-[#F3F1EF] p-4 rounded-xl">
                    <img
                        className="w-full h-full object-cover"
                        src={src}
                        alt="main product"
                    />
                </div>
            </div>
        </section>
    )
}