import React from 'react'
import NewOrders from './NewOrders'
import OrdersFilter from './OrdersFilter'
import { IoMdTrendingUp } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const OrdersContainer = ({ 
  orders, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  isDashboardView = false
}) => {
  const navigate = useNavigate();

  const handleExport = () => {
    alert(`Exporting ${orders.length} orders as CSV...`);
  };

  const handleOrderClick = (order) => {
    navigate(`/seller/orders/${order.id}/checkout`);
  };

  return (
    <div className='w-full space-y-6 relative'>
        {!isDashboardView && (
          <div className="px-4">
            <OrdersFilter 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}
        
        <div className='w-full'>
            <NewOrders 
              orders={orders} 
              isDashboardView={isDashboardView} 
              onOrderClick={handleOrderClick} 
            />
        </div>
    </div>
  )
}

export default OrdersContainer