import React from 'react'
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io'

const Card = ({ icon, title, description, trend, trendUp, dateLabel, isSuccessRate = false }) => {
  return (
    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_-12px_rgba(22,163,74,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full group'>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:rotate-6 ${
          isSuccessRate ? 'bg-green-600 text-white shadow-green-100' : 'bg-gray-900 text-white shadow-gray-100'
        }`}>
          {icon}
        </div>
        {trend && !isSuccessRate && (
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${
            trendUp ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
          }`}>
            {trendUp ? <IoMdTrendingUp className="text-sm" /> : <IoMdTrendingDown className="text-sm" />}
            {trend}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 mt-auto">
        <div>
          <h2 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2'>{title}</h2>
          <p className='text-gray-900 font-black text-3xl tracking-tighter'>{description}</p>
          <p className="text-gray-400 text-[10px] mt-2 font-bold uppercase tracking-wider">{dateLabel || 'this month'}</p>
        </div>
      </div>
    </div>
  )
}


export default Card
