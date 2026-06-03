import React from 'react'

const Card = ({ icon, title, description }) => {
  return (
    <div className='w-[290px] h-[200px] bg-white rounded-lg shadow-md p-4 m-4 border border-gray-300'>
        <span className='text-4xl'>{icon}</span>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <p className='text-gray-800 font-medium text-4xl'>{description}</p>
    </div>
  )
}

export default Card