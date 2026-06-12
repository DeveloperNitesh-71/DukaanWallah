import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBuyer } from '../../context/BuyerContext'

const BuyerSignUpForm = ({handleProcess}) => {
  const navigate = useNavigate();
  const { register, loading, error } = useBuyer();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/buyer');
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
        <div className='w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner'>
          🛍️
        </div>
        <div className='text-center'>
          <h2 className='text-white text-3xl font-black tracking-tight'>Buyer Sign Up</h2>
          <p className='text-gray-500 text-sm font-medium mt-1'>Create your shopping account</p>
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
          className='flex-1 py-3 bg-green-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-900/20'
          onClick={() => handleProcess('signup')}
        >
          Sign Up
        </button>
      </div>

      {error && <p className='text-red-500 text-xs text-center font-bold uppercase tracking-widest'>{error}</p>}

      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <div className='space-y-4'>
          <input 
            name="name"
            type="text" 
            placeholder='Full Name' 
            className='w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm' 
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            name="email"
            type="email" 
            placeholder='Email Address' 
            className='w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm' 
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            name="password"
            type="password" 
            placeholder='Password (min 6 characters)' 
            className='w-full bg-white/5 border border-white/10 px-5 py-4 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-green-500/50 focus:bg-white/10 transition-all text-sm' 
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <p className='text-[10px] text-gray-500 text-center px-4 leading-relaxed'>
          By creating an account, you agree to our <a href="#" className='text-green-500'>Terms of Service</a> and <a href="#" className='text-green-500'>Privacy Policy</a>.
        </p>

        <button 
          type="submit"
          disabled={loading}
          className='w-full py-5 bg-green-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-green-400 transition-all transform active:scale-[0.98] shadow-xl shadow-green-900/20 mt-2 disabled:opacity-50'
        >
          {loading ? 'Registering...' : 'Create Buyer Account →'}
        </button>
      </form>
    </div>
  )
}

export default BuyerSignUpForm
