const FilterBar = ({ value, onChange, options }) => {
  return (
    <div className="flex gap-2 bg-accent-green">

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Subjects</option>
        
        {/* Assuming 'options' is a simple array of strings like ['Math', 'Science'] */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={() => onChange("")}>
        Reset
      </button>

    </div>
  )
}
export default FilterBar