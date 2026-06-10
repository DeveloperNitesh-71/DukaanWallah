import React, { useState } from 'react';
import { IoMdClose, IoMdQrScanner, IoMdPerson, IoMdCheckmarkCircle } from 'react-icons/io';

const AddCustomerModal = ({ isOpen, onClose, onAdd }) => {
  const [customerId, setCustomerId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId.trim()) return;

    // Simulate finding a customer
    const mockCustomer = {
      id: customerId.toUpperCase(),
      name: 'New Customer',
      shopName: 'Customer Store',
      phone: '+91 00000 00000',
      address: 'Somewhere in India'
    };

    const result = onAdd(mockCustomer);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setCustomerId('');
        onClose();
      }, 2000);
    } else {
      alert(result.message);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scanning for 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      const randomId = 'CUST' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      setCustomerId(randomId);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Connect Customer</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Add to your business network</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
            <IoMdClose className="text-2xl text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <IoMdCheckmarkCircle className="text-6xl" />
              </div>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">Connected Successfully!</p>
            </div>
          ) : (
            <>
              {/* QR Scanner Placeholder */}
              <div 
                className={`relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden
                  ${isScanning ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50'}`}
              >
                {isScanning ? (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-green-500 rounded-2xl animate-pulse relative">
                       <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-scan"></div>
                    </div>
                    <p className="absolute bottom-10 text-[10px] font-black text-green-600 uppercase tracking-widest">Scanning QR Code...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4 cursor-pointer group" onClick={handleScan}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-gray-300 group-hover:text-green-600 transition-colors">
                      <IoMdQrScanner className="text-4xl" />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tap to Scan QR Code</p>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-white px-4 text-gray-300">Or Enter Manually</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer ID</label>
                  <div className="relative group">
                    <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="e.g. CUST001"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!customerId.trim()}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-gray-200 hover:bg-green-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Connect Customer
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
