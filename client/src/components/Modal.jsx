import React, { useEffect } from "react";
import Button from "./Button";
import { X } from "lucide-react";

const Modal = ({ onClose, children, isOpen }) => {
  useEffect(() => {
    const handlekey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handlekey);

    return () => {
      window.removeEventListener("keydown", handlekey);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 bg-bg-inverse/50 flex items-center justify-center gap-2 ">
        <div className="bg-bg-primary w-fit h-fit rounded-2xl p-4 grid  grid-cols-1 gap-2">
          <div>
            <button
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors p-1"
              onClick={onClose}
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
