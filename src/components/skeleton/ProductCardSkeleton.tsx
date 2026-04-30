
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function ProductCardSkeleton() {
    return (<>
            <section className="w-50">
                <div className="product-img rounded-2xl w-50 h-50 bg-[#F0EEED] p-4">
                    <Skeleton className="image w-42 h-42" />
                </div>
                <div className="desc flex flex-col pt-4 gap-2">
                    <Skeleton className="title w-50 h-10" />
                    <Skeleton className="ratings w-50 h-5" />
                    <div className="flex items-center gap-2 ">
                        <Skeleton className="ratings w-50 h-5" />
                        {/*<Skeleton />*/}
                        {/*<Skeleton />*/}
                    </div>
                </div>
            </section>
        </>
    )
}