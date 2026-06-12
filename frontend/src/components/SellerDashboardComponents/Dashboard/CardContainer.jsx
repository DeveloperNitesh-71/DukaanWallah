import React, { useMemo } from "react";
import Card from "./Card";

const CardContainer = ({ orders, dateLabel }) => {
  const stats = useMemo(() => {
    const today = new Date().setHours(0,0,0,0);
    const todaysOrdersCount = orders.filter(o => new Date(o.createdAt).setHours(0,0,0,0) === today).length;
    
    const totalOrders = orders.length;
    const activeShipments = orders.filter(o => ['processing', 'pending'].includes(o.status.toLowerCase())).length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const completedOrders = orders.filter(o => o.status.toLowerCase() === 'delivered').length;
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
          description={`₹ ${stats.totalRevenue.toFixed(2)}`} 
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


