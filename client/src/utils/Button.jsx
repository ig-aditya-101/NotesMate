import React from "react";

const Button = ({ variant='primary',size='md', children, onClick }) => {
  const sizes = {
  sm: 'text-small px-3 py-1.5',
  md: 'text-body px-4 py-2',
  lg: 'text-h3 px-6 py-3',
}
  const variants ={
    primary:' bg-bg-inverse text-text-inverse border-border-strong',
    secondary:"text-text-primary  border-border-strong",
    danger:"bg-error-bg text-text-inverse border-border-main",          
  }
  return (
    <div className="">
      <button onClick={onClick} className= {`w-full border   rounded-xl  hover:cursor-pointer ${variants[variant]} ${sizes[size]}`}>
        {children}
      </button>
    </div>
  );
};

export default Button;
