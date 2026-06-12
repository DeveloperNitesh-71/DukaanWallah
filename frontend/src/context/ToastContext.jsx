import React, { createContext, useContext, useState, useCallback } from 'react';
import { IoMdCheckmarkCircle, IoMdCloseCircle, IoMdInformationCircle, IoMdClose } from 'react-icons/io';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border
              animate-in slide-in-from-right-10 duration-300
              ${toast.type === 'success' ? 'bg-green-600/90 border-green-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-red-600/90 border-red-500 text-white' : ''}
              ${toast.type === 'info' ? 'bg-gray-900/90 border-gray-800 text-white' : ''}
            `}
          >
            <div className="text-2xl">
              {toast.type === 'success' && <IoMdCheckmarkCircle />}
              {toast.type === 'error' && <IoMdCloseCircle />}
              {toast.type === 'info' && <IoMdInformationCircle />}
            </div>
            <p className="text-xs font-black uppercase tracking-widest">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
