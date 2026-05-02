import Container from "@/components/layout/Container.tsx";
import CtgCard from "@/components/products/CtgCard.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getCategoryData} from "@/api.ts";

export default function CtgBrowse() {
    const spans = [
        "lg:col-span-5", // Index 0
        "lg:col-span-7", // Index 1
        "lg:col-span-7", // Index 2
        "lg:col-span-5"  // Index 3
    ];
    const {data} = useSuspenseQuery({
        queryKey: ['category'],
        queryFn: getCategoryData
    })
    return (
        <Container>
            <section className="bg-[#F0F0F0] px-4 lg:px-6 py-10 rounded-xl flex justify-center items-center flex-col gap-4">
                <p className="title capitalize text-black text-3xl font-primary font-bold leading-9">
                    browse by dress style
                </p>
                <div className="card-container pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {data.slice(0, 4).map((category, index) => (
                        <CtgCard
                            className={spans[index]}
                            title={category.name}
                            key={category.id}
                        />
                    ))}

                </div>
            </section>
        </Container>
    )
}