import Header from "@/components/header/Header.tsx";
import NewArrivals from "@/components/products/NewArrivals.tsx";
import BestSelling from "@/components/products/BestSelling.tsx";
import {Suspense} from "react";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton.tsx";
import CtgBrowse from "@/components/products/CtgBrowse.tsx";
import CtgSkeleton from "@/components/skeleton/CtgSkeleton.tsx";
import ReviewCardContainer from "@/components/reviews/ReviewCardContainer.tsx";
import SimilarProducts from "@/components/product details/SimilarProducts.tsx";

export default function Home() {
    return (
        <>
            <Header />
            <Suspense fallback={<ProductSkeleton />}>
                <NewArrivals />
            </Suspense>
            <Suspense fallback={<ProductSkeleton />}>
                <BestSelling />
            </Suspense>
            <Suspense fallback={<CtgSkeleton />}>
                <CtgBrowse />
            </Suspense>
            <ReviewCardContainer />
            <SimilarProducts />
        </>
    );
}
