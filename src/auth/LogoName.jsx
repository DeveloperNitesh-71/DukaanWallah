import React from 'react'

const LogoName = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center group'>
      <div className='relative'>
        <div className='w-24 h-24 bg-gradient-to-br from-green-400 to-green-700 rounded-3xl flex items-center justify-center text-5xl shadow-2xl shadow-green-900/40 rotate-6 group-hover:rotate-0 transition-all duration-500 ease-out border border-white/10'>
          🛍️
        </div>
        <div className='absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-500'>
          ✨
        </div>
      </div>
      <div className='text-center'>
        <h1 className='font-black sm:text-7xl text-6xl text-white tracking-tighter leading-none'>
          DUKAAN<span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>WALLAH</span>
        </h1>
        <div className='flex items-center justify-center gap-3 mt-4'>
          <div className='h-[1px] w-8 bg-gradient-to-r from-transparent to-gray-600'></div>
          <p className='text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] whitespace-nowrap'>Premium Hyperlocal Commerce</p>
          <div className='h-[1px] w-8 bg-gradient-to-l from-transparent to-gray-600'></div>
        </div>
      </div>
    </div>
  )
}

export default LogoName