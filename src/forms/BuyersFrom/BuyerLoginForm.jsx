import React from 'react'
import { useNavigate } from 'react-router-dom'

const BuyerLoginForm = ({handleProcess}) => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full max-w-[440px] p-10 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col gap-8'>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className='absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest'
      >
        <span className='text-lg'>←</span> Back
      </button>

      <div className='flex flex-col items-center gap-4 mt-8'>
        <div className='w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner'>
          🛍️
        </div>
        <div className='text-center'>
          <h2 className='text-white text-3xl font-black tracking-tight'>Buyer Login</h2>
          <p className='text-gray-500 text-sm font-medium mt-1'>Welcome back, shopper!</p>
        </div>
      </div>

      <div className='flex p-1 bg-white/5 rounded-2xl'>
        <button 
          className='flex-1 py-3 bg-green-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-900/20'
          onClick={() => handleProcess('login')}
        >
          Login
        </button>
        <button 
          className='flex-1 py-3 text-gray-400 hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all'
          onClick={() => handleProcess('signup')}
        >
          Sign Up
        </button>
      </div>

      <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
        <div className='space-y-4'>
          <div className='relative group'>
            <input 
              type="email" 
              placeholder='Email Address' 
              className='w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm'
              required
            />
          </div>
          <div className='relative group'>
            <input 
              type="password" 
              placeholder='Password' 
              className='w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm'
              required
            />
          </div>
        </div>

        <div className='flex justify-end'>
          <a href="#" className='text-green-500 text-[10px] font-black uppercase tracking-widest hover:text-green-400 transition-colors'>Forgot Password?</a>
        </div>

        <button 
          onClick={() => navigate('/buyer')}
          className='w-full py-5 bg-green-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-green-400 transition-all transform active:scale-[0.98] shadow-xl shadow-green-900/20 mt-4'
        >
          Start Shopping →
        </button>
      </form>

      <p className='text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest'>
        Secure Buyer Authentication
      </p>
    </div>
  )
}

export default BuyerLoginForm
