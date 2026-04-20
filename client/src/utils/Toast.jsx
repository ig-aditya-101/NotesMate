import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  const types = {
    success: "text-accent-green",
    error: "text-error",
  };
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div 
      onClick={onClose}
      className={`text-body fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full bg-bg-secondary border-2 border-border-main shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 cursor-pointer ${types[type]}`}
    >
      <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-accent-green' : 'bg-error'}`}></div>
      {message}
    </div>
  );
};

export default Toast;
