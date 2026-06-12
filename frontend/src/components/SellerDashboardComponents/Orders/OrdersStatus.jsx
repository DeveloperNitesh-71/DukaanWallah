import React from "react";
import OrderDetails from "./OrderDetails";

const OrdersStatus = () => {
  return (
    <div className="w-full flex flex-col px-20 rounded-lg">
      <ul className="flex gap-4 text-sm font-medium text-gray-600">
        <li>New</li>
        <li>All</li>
        <li>Pending</li>
        <li>Confirmed</li>
        <li>Out for Delivery</li>
        <li>Delivered</li>
        <li>Cancelled</li>
      </ul>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4 py-6">
            <OrderDetails />
        </div>
    </div>
  );
};

export default OrdersStatus;
