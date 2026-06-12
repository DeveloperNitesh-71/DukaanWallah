import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdQrScanner, IoMdPerson, IoMdCheckmarkCircle } from 'react-icons/io';
import { Html5Qrcode } from 'html5-qrcode';
import { useToast } from '../../../context/ToastContext';

const AddCustomerModal = ({ isOpen, onClose, onAdd }) => {
  const { showToast } = useToast();
  const [customerId, setCustomerId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const qrReaderRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => stopScanner();
  }, [isScanning]);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setCustomerId(decodedText);
          setIsScanning(false);
        },
        (errorMessage) => {
          // ignore common errors
        }
      );
    } catch (err) {
      console.error("Scanner error:", err);
      setIsScanning(false);
      showToast("Could not access camera for scanning.", 'error');
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId.trim()) return;

    const newCustomerData = {
      id: customerId.toUpperCase(),
      name: 'New Customer',
      shopName: 'Customer Store',
      phone: '+91 00000 00000',
      address: 'Somewhere in India'
    };

    try {
      const result = await onAdd(newCustomerData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setCustomerId('');
          onClose();
        }, 2000);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tighter uppercase">Connect Customer</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Add to your business network</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all active:scale-90">
            <IoMdClose className="text-2xl text-gray-400" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                <IoMdCheckmarkCircle className="text-6xl" />
              </div>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">Connected Successfully!</p>
            </div>
          ) : (
            <>
              {/* QR Scanner Section */}
              <div 
                className={`relative aspect-square rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden bg-gray-50
                  ${isScanning ? 'border-green-500' : 'border-gray-200'}`}
              >
                <div id="qr-reader" className={`w-full h-full ${!isScanning ? 'hidden' : ''}`}></div>
                
                {!isScanning && (
                  <div className="text-center space-y-4 cursor-pointer group p-8" onClick={() => setIsScanning(true)}>
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm text-gray-300 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300">
                      <IoMdQrScanner className="text-5xl" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Scan Customer QR</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Instantly connect via camera</p>
                    </div>
                  </div>
                )}

                {isScanning && (
                   <button 
                    onClick={() => setIsScanning(false)}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-red-500 shadow-xl hover:bg-white transition-all active:scale-95"
                   >
                     Cancel Scan
                   </button>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-white px-6 text-gray-300 tracking-[0.3em]">OR</span></div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Manual Entry</label>
                  <div className="relative group">
                    <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Enter Customer ID"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!customerId.trim()}
                  className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-gray-200 hover:bg-green-600 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
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
