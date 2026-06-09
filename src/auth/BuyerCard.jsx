import React from 'react'
import { useNavigate } from 'react-router-dom'

const BuyerCard = () => {
  const navigate = useNavigate();
  return (
    <div 
      className='group relative h-[400px] w-72 overflow-hidden border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 cursor-pointer backdrop-blur-xl flex flex-col p-8' 
      onClick={() => navigate("/buyer-login")}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className='relative z-10 flex flex-col h-full'>
        <div className='w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500'>
          🛍️
        </div>
        
        <h3 className='text-white text-3xl font-black mb-2'>Buyer</h3>
        <p className='text-gray-400 text-sm font-medium mb-8'>Ghar baithe kharido</p>
        
        <ul className='flex flex-col gap-4 flex-grow'>
          {[
            'Apne supplier se order karein',
            'Order track karein',
            'Asaan checkout'
          ].map((item, i) => (
            <li key={i} className='flex items-center gap-3 text-gray-300 text-sm'>
              <div className='w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center'>
                <span className='text-green-500 text-xs'>✓</span>
              </div>
              {item}
            </li>
          ))}
        </ul>
        
        <div className='mt-auto pt-6'>
          <div className='w-full py-4 bg-green-500 text-black font-black text-xs uppercase tracking-widest rounded-xl text-center group-hover:bg-green-400 transition-colors shadow-lg shadow-green-900/20'>
            Continue as Buyer →
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerCard


