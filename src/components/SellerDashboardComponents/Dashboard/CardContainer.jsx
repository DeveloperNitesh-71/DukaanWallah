import React, { useMemo } from "react";
import Card from "./Card";

const CardContainer = ({ orders, dateLabel }) => {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysOrdersCount = orders.filter(o => o.date === today).length;
    
    const totalOrders = orders.length;
    const activeShipments = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.qty * o.price), 0);
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const retentionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      activeShipments,
      totalRevenue,
      retentionRate,
      todaysOrdersCount
    };
  }, [orders]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card 
          icon="📦" 
          title="Gross Orders" 
          description={stats.totalOrders.toLocaleString()} 
          trend="+12.5%" 
          trendUp={true} 
          dateLabel={dateLabel}
        />
        <Card 
          icon="🚚" 
          title="Active Shipments" 
          description={stats.activeShipments.toLocaleString()} 
          trend="+8.2%" 
          trendUp={true} 
          dateLabel={dateLabel}
        />
        <Card 
          icon="💰" 
          title="Total Revenue" 
          description={`₹ ${stats.totalRevenue.toLocaleString()}`} 
          trend="+24.1%" 
          trendUp={true} 
          dateLabel={dateLabel}
        />
        <Card 
          icon="👥" 
          title="Order Target" 
          description={`${stats.todaysOrdersCount}/200`} 
          trend="Today's Progress" 
          trendUp={stats.todaysOrdersCount > 100} 
          dateLabel="Today"
          isSuccessRate={true}
        />
      </div>
    </div>
  );
};

export default CardContainer;


