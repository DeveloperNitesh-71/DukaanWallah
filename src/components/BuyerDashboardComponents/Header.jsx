import React from "react";
import { IoMdSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="flex px-10 py-5 bg-white items-center gap-20">
      <div className="  font-medium text-xl">🛍️ Dukaan Wallah</div>
      <input type="text" placeholder='search product' className="px-5 py-2 border-1 border-gray-400 w-100 rounded-lg outline-none "/>
    </div>
  );
};

export default Header;
