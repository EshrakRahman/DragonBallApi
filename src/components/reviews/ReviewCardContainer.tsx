import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedReviews } from "@/api/reviews.ts";
import ReviewCard from "@/components/reviews/ReviewCard.tsx";
import Container from "@/components/layout/Container.tsx";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function ReviewCardContainer() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { data: reviews, isLoading, isError } = useQuery({
        queryKey: ["featuredReviews"],
        queryFn: () => getFeaturedReviews(6),
    });

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const target = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollContainerRef.current.scrollTo({
                left: target,
                behavior: "smooth"
            });
        }
    };

    return (
        <Container className="py-16 md:py-24 border-t border-zinc-100">
            <style dangerouslySetInnerHTML={{__html: `
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}} />
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-14">
                <div className="space-y-2">
                    <h3 className="font-primary font-bold text-3xl md:text-4xl tracking-tight uppercase text-zinc-950">
                        OUR HAPPY CUSTOMERS
                    </h3>
                    <p className="text-zinc-500 text-sm md:text-base font-normal">
                        Here's what our community thinks about their favorite products.
                    </p>
                </div>

                {/* Arrow Navigation */}
                {!isLoading && !isError && reviews && reviews.length > 0 && (
                    <div className="flex gap-2.5">
                        <button
                            onClick={() => scroll("left")}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col justify-between rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm h-56 space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-24 rounded bg-zinc-200/60" />
                                    <Skeleton className="h-4 w-12 rounded bg-zinc-200/60" />
                                </div>
                                <Skeleton className="h-6 w-3/4 rounded bg-zinc-200/60" />
                                <Skeleton className="h-4 w-full rounded bg-zinc-200/60" />
                                <Skeleton className="h-4 w-5/6 rounded bg-zinc-200/60" />
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-50">
                                <Skeleton className="h-9 w-9 rounded-full bg-zinc-200/60" />
                                <div className="space-y-1.5 flex-grow">
                                    <Skeleton className="h-4 w-24 rounded bg-zinc-200/60" />
                                    <Skeleton className="h-3.5 w-16 rounded bg-zinc-200/60" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 border border-red-100 text-red-700 rounded-2xl">
                    <p className="font-semibold">Failed to load happy customer reviews.</p>
                </div>
            ) : !reviews || reviews.length === 0 ? (
                <div className="text-center py-16 bg-zinc-50 border border-zinc-100 rounded-2xl">
                    <MessageSquare className="mx-auto h-12 w-12 text-zinc-300 mb-3" />
                    <h4 className="text-lg font-semibold text-zinc-900">No reviews yet</h4>
                </div>
            ) : (
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6 px-1 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 xl:px-12"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {/* Spacer for alignment */}
                    <div className="w-2 shrink-0 sm:w-4 lg:w-6 xl:hidden" />
                    
                    {reviews.map((review) => (
                        <div key={review.id} className="w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[28vw] shrink-0 snap-start snap-always">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                    
                    {/* Spacer for alignment */}
                    <div className="w-2 shrink-0 sm:w-4 lg:w-6 xl:hidden" />
                </div>
            )}
        </Container>
    );
}