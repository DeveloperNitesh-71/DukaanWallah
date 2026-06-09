import React, { useState } from 'react'
import BuyerLoginForm from '../forms/BuyersFrom/BuyerLoginForm'
import BuyerSignUpForm from '../forms/BuyersFrom/BuyerSignUpForm'

const BuyerLogin = () => {
    const [buyerProcess, setBuyerProcess] = useState('login')

    const handleBuyerProcess = (Process) => {
        setBuyerProcess(Process)
    }
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-6 md:p-10 relative overflow-hidden' style={{background: "#05070a"}}>
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className='relative z-10 w-full flex justify-center'>
            {buyerProcess == 'login' ? <BuyerLoginForm handleProcess={handleBuyerProcess} /> : <BuyerSignUpForm handleProcess={handleBuyerProcess} />}  
        </div>
    </div>
  )
}

export default BuyerLogin