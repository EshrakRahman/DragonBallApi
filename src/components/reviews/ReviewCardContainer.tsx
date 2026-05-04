import ReviewCard from "@/components/reviews/ReviewCard.tsx";
import Container from "@/components/layout/Container.tsx";
export default function ReviewCardContainer() {
    return (
        <>
            <Container className="pt-12">
                <div className="top py-6 lg:py-10 text-center flex items-center justify-center">
                    <h3 className="font-primary font-bold text-3xl leading-9 w-1/2 uppercase text-black">Our happy customers</h3>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </section>

                {/*<Button className="px-8 py-4 mt-6 rounded-full bg-background border-gray-400 text-black/50 hover:text-black hover:border-black/90 hover:cursor-pointer transition-all duration-300">*/}
                {/*    View All*/}
                {/*</Button>*/}
            </Container>
        </>

    )
}