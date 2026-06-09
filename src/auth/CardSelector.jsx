import React from 'react'
import BuyerCard from './BuyerCard'
import SellerCard from './SellerCard'

const CardSelector = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-8 md:gap-12'>
        <SellerCard />
        <BuyerCard />
    </div>
  )
}

export default CardSelector