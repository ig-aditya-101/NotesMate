const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}) => {
  return (
    <select
      value={value || ""}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`border-border-main border-3 bg-bg-primary text-text-primary rounded-xl text-body px-4 py-3 outline-none w-full transition-all ${disabled ? "opacity-50 cursor-not-allowed grayscale" : "hover:border-primary-main"}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => {
        const isObject = typeof opt === "object";
        const optValue = isObject ? opt._id : opt;
        const optLabel = isObject ? opt.name : opt;

        return (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
