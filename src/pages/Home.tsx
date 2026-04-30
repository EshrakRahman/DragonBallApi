import Navbar from "@/components/navbar/Navbar";
import DesktopNav from "@/components/navbar/DesktopNav";
import Header from "@/components/header/Header.tsx";
import NewArrivals from "@/components/products/NewArrivals.tsx";
import BestSelling from "@/components/products/BestSelling.tsx";
import {Suspense} from "react";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton.tsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <DesktopNav />
            <Header />
            {/*    product section */}
            <Suspense fallback={<ProductSkeleton />}>
                <NewArrivals />
            </Suspense>
            <Suspense fallback={<ProductSkeleton />}>
                <BestSelling />
            </Suspense>
        </>
    );
}
