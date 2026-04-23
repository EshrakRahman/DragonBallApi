import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMenu } from "react-icons/md";
import NavItems from "./NavItems";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }
  return (
    <section className="px-4 py-4 h-15 ">
      <nav className="mobile-nav flex justify-between items-center">
        <div className="mob-left flex items-center gap-4">
          <button onClick={toggleMobileMenu} className="div">
            <MdOutlineMenu className="text-2xl" />
          </button>
          <div className="logo">
            <span className="font-heading font-bold text-2xl uppercase text-black">
              shop.co
            </span>
          </div>
        </div>
        <div className="mob-right flex items-center gap-3">
          <FaSearch className="text-2xl" />
          <FiShoppingCart className="text-2xl" />
          <CgProfile className="text-2xl" />
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="mobile-menu mt-4">
          <NavItems />
        </div>
      )}
    </section>
  );
}
