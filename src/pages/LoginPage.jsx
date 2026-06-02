import React from 'react'
import LogoName from '../auth/LogoName'
import CardSelector from '../auth/CardSelector'

const LoginPage = ({handleSelectCard}) => {
  
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-20 p-10'>
      <LogoName/>
      <CardSelector handleSelectCard={handleSelectCard}/> 
      
    </div>
  )
}

export default LoginPage