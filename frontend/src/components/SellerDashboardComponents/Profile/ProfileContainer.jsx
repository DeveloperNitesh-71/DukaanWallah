import React from "react";
import dp from "../../../assets/edited-image.png";
import { LuLogOut } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
const ProfileContainer = () => {
  return (
    <div className="h-max min-w-90 border-1 border-gray-400 rounded-xl bg-white shadow-xl p-5 flex flex-col justify-between gap-5">
      <img src={dp} alt="display picture" className="rounded-full h-15 w-15" />
      <div className="flex flex-col justify-start gap-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Name</span>
          <span className="font-medium">Nitesh</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Sell</span>
          <span className="font-medium">Dairy products</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium">Seller@gmail.com</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium">+91 5362485732</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Address</span>
          <span className="font-medium">Kursi road lucknow</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Bond Code</span>
          <span className="font-medium">jdkff54asdfsd</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Status</span>
          <span className="font-medium">Active</span>
        </div>
        <hr className="text-gray-500" />
        <div className="flex items-center justify-between gap-2 mt-2 w-full">
          <button className="bg-blue-400 py-1 font-medium rounded w-full flex items-center justify-center gap-5"><FaEdit /> Edit</button>
          <button className="bg-red-400 py-1 font-medium rounded w-full flex items-center justify-center gap-5">
            <LuLogOut />
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
