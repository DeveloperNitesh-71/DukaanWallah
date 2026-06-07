import React from "react";
import { IoHome } from "react-icons/io5";
import { FaShoppingCart, FaShippingFast } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="fixed bottom-0 bg-white w-full px-10  border-t-1 border-t-gray-400 grid grid-cols-5 place-items-center">
      <div className="flex items-center justify-center gap-3 py-5 border-t-2 border-t-green-500 w-full h-full">
        <IoHome /> Home
      </div>
      <div className="flex items-center justify-center gap-3 py-5">
        <FaShoppingCart /> Cart
      </div>
      <div className="flex items-center justify-center gap-3 py-5">
        <CiMemoPad /> Order
      </div>
      <div className="flex items-center justify-center gap-3 py-5">
        <FaShippingFast /> Suppliers
      </div>
      <div className="flex items-center justify-center gap-3 py-5">
        <CgProfile /> Profile
      </div>
    </div>
  );
};

export default Footer;
