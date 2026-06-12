import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuyer } from '../../context/BuyerContext'

const SellerSignUpForm = ({handleProcess}) => {
  const navigate = useNavigate();
  const { register, loading, error } = useBuyer();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
    role: 'seller'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/seller');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='relative w-full max-w-[480px] p-10 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-2xl shadow-2xl flex flex-col gap-6'>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className='absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest'
      >
        <span className='text-lg'>←</span> Back
      </button>

      <div className='flex flex-col items-center gap-4 mt-8'>
        <div className='w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner'>
          🏪
        </div>
        <div className='text-center'>
          <h2 className='text-white text-3xl font-black tracking-tight'>Seller Sign Up</h2>
          <p className='text-gray-500 text-sm font-medium mt-1'>Start your business journey</p>
        </div>
      </div>

      <div className='flex p-1 bg-white/5 rounded-2xl'>
        <button 
          className='flex-1 py-3 text-gray-400 hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all'
          onClick={() => handleProcess('login')}
        >
          Login
        </button>
        <button 
          className='flex-1 py-3 bg-orange-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-900/20'
          onClick={() => handleProcess('signup')}
        >
          Sign Up
        </button>
      </div>

      {error && <p className='text-red-500 text-xs text-center font-bold uppercase tracking-widest'>{error}</p>}

      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input 
            name="name"
            type="text" 
            placeholder='Full Name' 
            className='bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm' 
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            name="shopName"
            type="text" 
            placeholder='Shop Name' 
            className='bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm' 
            required
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>
        <input 
          name="email"
          type="email" 
          placeholder='Email Address' 
          className='bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm' 
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          name="password"
          type="password" 
          placeholder='Password (min 6 characters)' 
          className='bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm' 
          required
          value={formData.password}
          onChange={handleChange}
        />
        
        <div className='bg-orange-500/5 border border-orange-500/20 p-5 rounded-2xl flex flex-col gap-3 mt-2'>
          <p className='text-orange-500 text-[11px] font-black uppercase tracking-widest'>⚠️ Delivery Commitment</p>
          <p className='text-[11px] text-gray-400 leading-relaxed'>As a seller, you are responsible for fulfilling and delivering all orders to your customers directly.</p>
          <label className='flex items-center gap-3 cursor-pointer group'>
            <input type="checkbox" className='w-4 h-4 rounded border-white/10 bg-white/5 accent-orange-500 transition-all' required/>
            <span className='text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors'>I accept delivery responsibility</span>
          </label>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className='w-full py-5 bg-orange-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-400 transition-all transform active:scale-[0.98] shadow-xl shadow-orange-900/20 mt-2 disabled:opacity-50'
        >
          {loading ? 'Registering...' : 'Create Seller Account →'}
        </button>
      </form>
    </div>
  )
}

export default SellerSignUpForm
