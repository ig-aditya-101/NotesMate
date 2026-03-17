import React from "react";

const Button = ({ variant='primary', children, onClick }) => {
  const variants ={
    primary:' bg-bg-inverse text-text-inverse border-border-strong',
    secondary:"text-text-primary  border-border-strong",
    danger:"bg-error-bg text-text-inverse border-border-main",
  }
  return (
    <div className="">
      <button onClick={onClick} className= {` text-label border-2 rounded-2xl px-6 py-3.5  ${variants[variant]}`}>
        {children}
      </button>
    </div>
  );
};

export default Button;
