import {FiShoppingCart, FiHeart} from "react-icons/fi";
import {CgProfile} from "react-icons/cg";
import {MdLogout, MdPerson, MdReceipt} from "react-icons/md";
import Container from "@/components/layout/Container.tsx";
import {IoMdArrowDropdown} from "react-icons/io";
import SearchInput from "@/components/ui/SearchInput.tsx";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext.tsx";
import { useCart } from "@/context/CartContext.tsx";

export default function DesktopNav() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { count } = useCart();

    return (
        <section className="px-4 py-4 hidden lg:block ">
            <Container>
                <nav className="mobile-nav flex justify-between items-center">
                    <div className="mob-left flex items-center gap-4">
                        <div className="logo">
                            <Link to="/">
                                <span className="font-heading font-bold text-2xl uppercase text-black">
                                  shop.co
                                </span>
                            </Link>
                        </div>
                        <div className="">
                            <ul className="flex gap-6 relative">
                                <li className="relative group">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <a href="#">Shop</a>
                                        <IoMdArrowDropdown />
                                    </div>
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
                                <li><Link to="/" className="cursor-pointer">New Arrivals</Link></li>
                                <li><a href="#">Brands</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <SearchInput />
                    </div>

                    <div className="mob-right flex items-center gap-3">
                        <Link to="/cart" className="relative">
                          <FiShoppingCart className="text-2xl" />
                          {count > 0 && <span className="absolute -top-2 -right-2 w-4.5 h-4.5 flex items-center justify-center bg-black text-white text-[10px] font-bold rounded-full">{count}</span>}
                        </Link>
                        <Link to="/wishlist" className="relative">
                          <FiHeart className="text-2xl" />
                        </Link>
                        {user ? (
                          <div className="relative">
                            <button onClick={() => setIsProfileOpen((prev) => !prev)} className="hover:cursor-pointer">
                              <CgProfile className="text-2xl" />
                            </button>
                            {isProfileOpen && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                  <p className="text-sm font-medium text-black truncate">{user.name}</p>
                                  <p className="text-xs text-black/40 truncate">{user.email}</p>
                                </div>
                                <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-black/60 hover:text-black hover:bg-gray-50 transition-colors">
                                  <MdPerson className="text-lg" />
                                  My Account
                                </Link>
                                <Link to="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-black/60 hover:text-black hover:bg-gray-50 transition-colors">
                                  <MdReceipt className="text-lg" />
                                  Orders
                                </Link>
                                <button
                                  onClick={logout}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full transition-colors hover:cursor-pointer"
                                >
                                  <MdLogout className="text-lg" />
                                  Logout
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link to="/login"><CgProfile className="text-2xl" /></Link>
                        )}
                    </div>
                </nav>
            </Container>
        </section>
    )
}
