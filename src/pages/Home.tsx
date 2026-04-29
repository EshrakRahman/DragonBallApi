import Navbar from "@/components/navbar/Navbar";
import DesktopNav from "@/components/navbar/DesktopNav";
import Header from "@/components/header/Header.tsx";
import NewArrivals from "@/components/products/NewArrivals.tsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <DesktopNav />
            <Header />
        {/*    product section */}
            <NewArrivals />
        </>
    );
}
