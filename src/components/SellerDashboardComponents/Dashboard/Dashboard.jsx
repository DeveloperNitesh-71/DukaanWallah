import React, { useState, useMemo } from "react";
import CardContainer from "./CardContainer";
import OverviewFilter from "./OverviewFilter";
import NewOrders from "./NewOrders";
import { useSellerOrders } from "../../../context/SellerOrderContext";

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('Today')
  const [selectedDate, setSelectedDate] = useState('')
  
  const { 
    orders, 
    acceptOrder, 
    rejectOrder, 
    acceptAllPending, 
    rejectAllPending 
  } = useSellerOrders();

  // Filter for Business Intelligence (Stats) - Responds only to Date
  const overviewFilteredOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const last7Days = new Date(Date.now() - 7 * 86400000);
    const last30Days = new Date(Date.now() - 30 * 86400000);

    return orders.filter(order => {
      let matchesDate = true;
      const orderDate = new Date(order.date);

      if (dateFilter === 'Today') {
        matchesDate = order.date === today;
      } else if (dateFilter === 'Last 7 Days') {
        matchesDate = orderDate >= last7Days;
      } else if (dateFilter === 'Last 30 Days') {
        matchesDate = orderDate >= last30Days;
      } else if (dateFilter === 'Custom' && selectedDate) {
        matchesDate = order.date === selectedDate;
      }
      return matchesDate;
    });
  }, [orders, dateFilter, selectedDate]);

  // Specifically for Today's Pending Orders section
  const todaysPendingOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(order => order.date === today && order.status === 'Pending');
  }, [orders]);

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Dashboard</h2>
            <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Summary for <span className="text-green-600">{dateFilter === 'Custom' ? selectedDate : dateFilter}</span></p>
          </div>
          <OverviewFilter 
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        
        {/* Stats Cards */}
        <CardContainer orders={overviewFilteredOrders} dateLabel={dateFilter === 'Custom' ? selectedDate : dateFilter} />

        {/* Today's Pending Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-green-600 rounded-full"></div>
            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Today's Order Action Center</h3>
          </div>
          <NewOrders 
            orders={todaysPendingOrders}
            showActions={true}
            onAccept={acceptOrder}
            onReject={rejectOrder}
            onAcceptAll={acceptAllPending}
            onRejectAll={rejectAllPending}
          />
        </div>
    </div>
  );
};

export default Dashboard;
