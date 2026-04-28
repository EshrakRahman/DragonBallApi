import {FiShoppingCart} from "react-icons/fi";
import {CgProfile} from "react-icons/cg";
import Container from "@/components/layout/Container.tsx";
import {IoMdArrowDropdown} from "react-icons/io";
import SearchInput from "@/components/ui/SearchInput.tsx";


export default function DesktopNav() {
    return (
        <section className="px-4 py-4 hidden lg:block ">
            <Container>

                <nav className="mobile-nav flex justify-between items-center">
                    <div className="mob-left flex items-center gap-4">
                        <div className="logo">
                            <span className="font-heading font-bold text-2xl uppercase text-black">
                              shop.co
                            </span>
                        </div>
                        <div className="">
                            <ul className="flex gap-6 relative">
                                <li className="relative group">
                                    {/* Trigger */}
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <a href="#">Shop</a>
                                        <IoMdArrowDropdown />
                                    </div>

                                    {/* Dropdown */}
                                    <ul className="absolute hidden left-0 top-full w-40 pt-2 flex-col gap-2 rounded-md bg-gray-600 shadow-md p-2 group-hover:flex z-50">
                                        <li>
                                            <a
                                                href="#"
                                                className="font-primary text-base text-black hover:text-black/50 transition duration-300"
                                            >Product one</a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="font-primary text-base text-black hover:text-black/50 transition duration-300"
                                            >Product two</a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="font-primary text-base text-black hover:text-black/50 transition duration-300"
                                            >Product three</a>
                                        </li>
                                    </ul>
                                </li>

                                <li><a href="#">On Sale</a></li>
                                <li><a href="#">New Arrivals</a></li>
                                <li><a href="#">Brands</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <SearchInput />
                    </div>

                    <div className="mob-right flex items-center gap-3">
                        <FiShoppingCart className="text-2xl" />
                        <CgProfile className="text-2xl" />
                    </div>
                </nav>
            </Container>
        </section>

    )
}