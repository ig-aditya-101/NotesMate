import React from "react";

const Input = ({ type, placeholder, value, onChange, error }) => {
  return (
    <div className=" ">
      <input
        className="  border-border-main bg-bg-secondary text-text-muted rounded-xl text-body px-4 py-3"
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
