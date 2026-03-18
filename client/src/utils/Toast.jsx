import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  const types = {
    success: "text-accent-green",
    error: "text-error",
  };
  useEffect(() => {
    const timer = setTimeout(() => onClose, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div className={`text-body fixed bottom-4 left-1/2 ${types[type]}`}>
      {message}
    </div>
  );
};

export default Toast;
