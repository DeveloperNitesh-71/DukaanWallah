import React, { useState } from 'react';
import { IoMdClose, IoMdCheckmarkCircleOutline, IoMdCash, IoMdMap, IoMdPerson, IoMdCheckmark } from 'react-icons/io';

const OrderCheckoutModal = ({ isOpen, onClose, orderId, orderDetails }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !orderDetails) return null;

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      setTimeout(() => {
        onClose();
        setStep(1);
      }, 2000);
    }, 800); // simulate network request
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => step === 1 && !isProcessing && onClose()}
      />
      
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg border border-[#ebebeb] shadow-[0_24px_32px_-8px_rgba(0,0,0,0.06)] z-[70] transform transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        
        {step === 1 ? (
          <div className="flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between bg-[#fafafa]">
              <div>
                <h2 className="text-sm font-semibold text-[#171717]">Order Details</h2>
                <p className="text-[11px] font-mono text-[#888888] mt-0.5 uppercase">ID: {orderId}</p>
              </div>
              <button 
                onClick={onClose} 
                disabled={isProcessing}
                className="p-1 hover:bg-[#ebebeb] rounded-md transition-colors text-[#888888] disabled:opacity-50"
              >
                <IoMdClose className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto no-scrollbar">
              
              {/* Customer Info */}
              <div className="flex items-start gap-3 pb-6 border-b border-[#ebebeb]">
                <div className="w-8 h-8 bg-[#fafafa] border border-[#ebebeb] rounded flex items-center justify-center text-[#888888]">
                  <IoMdPerson className="text-lg" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-[#171717]">John Customer</h3>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    Flat 402, Sunshine Apartments, Sector 44, Noida
                    <br />
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-[11px] font-medium text-[#888888] uppercase tracking-wider mb-3 font-mono">Summary</h3>
                <div className="bg-[#fafafa] rounded-md p-4 border border-[#ebebeb]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#444444]">{orderDetails.name} x {orderDetails.qty}</span>
                    <span className="text-sm font-semibold text-[#171717]">₹{orderDetails.price * orderDetails.qty}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="text-[11px] font-medium text-[#888888] uppercase tracking-wider mb-3 font-mono">Payment Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('cash')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all border ${
                      paymentMethod === 'cash' ? 'bg-[#171717] border-[#171717] text-white' : 'bg-white border-[#ebebeb] text-[#444444] hover:border-[#888888]'
                    }`}
                  >
                    <IoMdCash className="text-base" /> Cash
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all border ${
                      paymentMethod === 'upi' ? 'bg-[#171717] border-[#171717] text-white' : 'bg-white border-[#ebebeb] text-[#444444] hover:border-[#888888]'
                    }`}
                  >
                    UPI / Online
                  </button>
                </div>
              </div>
            </div>

            {/* Footer / Action */}
            <div className="p-6 pt-2">
              <button 
                onClick={handleComplete}
                disabled={isProcessing}
                className="w-full py-2.5 bg-[#171717] text-white font-medium text-sm rounded-md hover:bg-[#333333] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>Complete Delivery</>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-12 h-12 bg-[#0070f3] text-white rounded-full flex items-center justify-center text-2xl mb-4">
              <IoMdCheckmark />
            </div>
            <h2 className="text-lg font-semibold text-[#171717]">Delivery Complete</h2>
            <p className="text-xs text-[#666666] mt-2">Order successfully processed.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCheckoutModal;
