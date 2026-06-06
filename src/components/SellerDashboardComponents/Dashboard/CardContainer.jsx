import React from "react";
import Card from "./Card";
import DashboardFilter from "./DashboardFilter";

const CardContainer = () => {
  return (
    <div>
      <DashboardFilter />
      <div className="w-full h-auto flex flex-wrap justify-center items-center px-4">
        <Card icon="📦" title="Total Orders" description="0" />
        <Card icon="🚚" title="Total Shipments" description="0" />
        <Card icon="💰" title="Total Revenue" description="₹ 0.00" />
        <Card icon="👥" title="Total Customers" description="0/200" />
      </div>
    </div>
  );
};

export default CardContainer;
