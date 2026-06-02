import React from 'react'
import BuyerCard from './BuyerCard'
import SellerCard from './SellerCard'

const CardSelector = ({handleSelectCard}) => {
  
  return (
    <div className='flex flex-col sm:flex-row gap-5'>
        <SellerCard handleSelectCard={handleSelectCard}/>
        <BuyerCard handleSelectCard={handleSelectCard}/>
    </div>
  )
}

export default CardSelector