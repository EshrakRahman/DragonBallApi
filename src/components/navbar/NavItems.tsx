import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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
                <a href="http://">Sub-item 1</a>
              </li>
              <li className="hover:text-orange-400 cursor-pointer">
                <a href="http://">Sub-item 2</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="http://">On Sale</a>
        </li>
        <li>
          <a href="http://">New Arrivals</a>
        </li>
        <li>
          <a href="http://">Brands</a>
        </li>
      </ul>
    </div>
  );
}
