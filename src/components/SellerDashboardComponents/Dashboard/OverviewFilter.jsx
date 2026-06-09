import React, { useRef } from 'react';
import { IoMdCalendar } from 'react-icons/io';

const OverviewFilter = ({ 
  dateFilter, 
  setDateFilter,
  selectedDate,
  setSelectedDate
}) => {
  const dates = ['Today', 'Last 7 Days', 'Last 30 Days', 'Custom'];
  const dateInputRef = useRef(null);

  return (
    <div className="flex items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      {dates.map((date) => {
        const isActive = dateFilter === date;
        return (
          <button
            key={date}
            onClick={() => {
              setDateFilter(date);
              if (date !== 'Custom') setSelectedDate('');
              if (date === 'Custom') dateInputRef.current?.showPicker();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
              isActive
                ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            {date === 'Custom' && selectedDate ? selectedDate : date}
          </button>
        )
      })}
      <div className="w-px h-6 bg-gray-100 mx-3"></div>
      <div className="relative">
        <button 
          onClick={() => {
            setDateFilter('Custom');
            dateInputRef.current?.showPicker();
          }}
          aria-label="Select custom date"
          className={`p-2.5 rounded-xl transition-all active:scale-95 ${dateFilter === 'Custom' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-400 hover:text-gray-900'}`}
        >
          <IoMdCalendar className="text-xl" aria-hidden="true" />
        </button>
        <input 
          ref={dateInputRef}
          type="date" 
          aria-label="Custom date"
          className="absolute opacity-0 pointer-events-none w-0 h-0" 
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setDateFilter('Custom');
          }}
        />
      </div>
    </div>
  );
};

export default OverviewFilter;
