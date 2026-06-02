import React, { useState } from 'react'
import SellerLoginForm from '../forms/SellersForm/SellerLoginForm'
import SellerSignUpForm from '../forms/SellersForm/SellerSignUpForm'

const SellerLogin = ({handleSelectCard}) => {
    const [sellerProcess, setSellerProcess] = useState('login')

    const handleSellerProcess = (process) => {
        setSellerProcess(process)
    }
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-10'>
        {sellerProcess == 'login' ? <SellerLoginForm handleProcess={handleSellerProcess} handleSelectCard={handleSelectCard}/> : <SellerSignUpForm handleProcess={handleSellerProcess} handleSelectCard={handleSelectCard}/>}        
    </div>
  )
}

export default SellerLogin