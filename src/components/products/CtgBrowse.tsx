import Container from "@/components/layout/Container.tsx";
import CtgCard from "@/components/products/CtgCard.tsx";

export default function CtgBrowse() {
    return (
        <Container>
            <section className="bg-[#F0F0F0] px-4 lg:px-6 py-10 rounded-xl flex items-center flex-col gap-4">
                <p className="title capitalize text-black text-3xl font-primary font-bold leading-9">
                    browse by dress style
                </p>
                <div className="card-container pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    <CtgCard className="lg:col-span-5" />
                    <CtgCard className="lg:col-span-7" />
                    <CtgCard className="lg:col-span-7" />
                    <CtgCard className="lg:col-span-5" />
                </div>
            </section>
        </Container>
    )
}