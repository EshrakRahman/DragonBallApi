
import {Ratings} from "@/components/products/Ratings.tsx";

export default function ReviewCard() {
    return (
        <>
            <section className="card max-w-100 lg:h-60 md:h-50 ">
                <div className="reviews border-gray-400 border w-full rounded-xl shadow-md p-4 flex flex-col gap-2">
                    <Ratings ratings={5} />
                    <p className="text-black font-primary font-bold leading-6">Sarah M.</p>
                    <p className="font-primary text-base font-normal text-black/60">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</p>
                </div>
            </section>
        </>
    )
}