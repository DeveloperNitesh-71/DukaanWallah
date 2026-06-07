import React from "react";
import _170ml from "../../../assets/170ml.jpeg";
import { IoMdAdd } from "react-icons/io";
const ProductCard = () => {
  return (
    <div className="w-55 border-1 border-gray-400 rounded px-5 py-3 bg-white shadow-xl gap-2 flex flex-col">
      <img
        src={_170ml}
        alt="Amul Milk 170 ml"
        className="h-30 object-cover rounded"
      />
      <div className="flex flex-col">
        <span className="font-medium ">Amul milk 170ml</span>
        <span className="font-medium text-gray-600 text-sm">
          Dairy • per ml
        </span>
        <div className="flex w-full justify-between items-center">
          <span className="text-green-700 font-medium">₹10</span>
          <span className="text-gray-500 text-sm">stock: 50</span>
        </div>
        <button className="w-max self-center mt-2 border-1 border-green-600 bg-green-300 px-2 rounded flex items-center justify-center gap-3">
          <IoMdAdd /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
