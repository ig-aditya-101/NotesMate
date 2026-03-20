import React from "react";

const Input = ({ type, placeholder, value, onChange, error }) => {
  return (
    <div className="w-full ">
      <input
        className="  border-border-main border-3 bg-bg-primary text-text-primary placeholder:text-text-muted rounded-xl text-body px-4 py-3 outline-none w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      {error && (
        <span className="text-small text-error px-4 italic">{error}</span>
      )}
    </div>
  );
};

export default Input;
