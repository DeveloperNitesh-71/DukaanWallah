import React, { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SellerLogin from './pages/SellerLogin'
import BuyerLoginForm from './forms/BuyersFrom/BuyerLoginForm'
import BuyerLogin from './pages/BuyerLogin'
import SellerDashboard from './components/SellerDashboard/SellerDashboard'
import BuyerDashboard from './components/BuyerDashboard/BuyerDashboard'

const App = () => {
  const [selectedCard, setSelectedCard] = useState('/')
  const handleSelectCard = (select) => {
    setSelectedCard(select)
  }
  return (
    // <div className='w-full bg-linear min-h-screen' style={{background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"}}>
    //   {selectedCard == '' ? <LoginPage handleSelectCard={handleSelectCard}/> : ( selectedCard == 'sellerSelected' ? <SellerLogin handleSelectCard={handleSelectCard}/> :  <BuyerLogin handleSelectCard={handleSelectCard}/> )  }
    // </div>
      // <SellerDashboard />
      <BuyerDashboard />
  )
}

export default App