import React, { useState } from 'react'
import BuyerLoginForm from '../forms/BuyersFrom/BuyerLoginForm'
import BuyerSignUpForm from '../forms/BuyersFrom/BuyerSignUpForm'

const BuyerLogin = ({handleSelectCard}) => {
     const [buyerProcess, setBuyerProcess] = useState('login')

    const handleBuyerProcess = (Process) => {
        setBuyerProcess(Process)
    }
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-10'>
       {buyerProcess == 'login' ? <BuyerLoginForm handleProcess={handleBuyerProcess} handleSelectCard={handleSelectCard}/> : <BuyerSignUpForm handleProcess={handleBuyerProcess} handleSelectCard={handleSelectCard}/>}  
    </div>
  )
}

export default BuyerLogin