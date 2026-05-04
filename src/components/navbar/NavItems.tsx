import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "@tanstack/react-router";

export default function NavItems() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className=" bg-black text-white mt-4 rounded-md w-full p-4">
      <ul className="flex gap-5 flex-col">
        <li className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <span className="">Shop</span>
            <IoMdArrowDropdown />
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-20 top-0 mt-2 flex flex-col gap-3 bg-gray-800 text-white p-3 rounded-md shadow-lg min-w-37.5">
              <li className="hover:text-orange-400 cursor-pointer">
                <Link to="/">Sub-item 1</Link>
              </li>
              <li className="hover:text-orange-400 cursor-pointer">
                <Link to="/">Sub-item 2</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/">On Sale</Link>
        </li>
        <li>
          <Link to="/">New Arrivals</Link>
        </li>
        <li>
          <Link to="/">Brands</Link>
        </li>
      </ul>
    </div>
  );
}
