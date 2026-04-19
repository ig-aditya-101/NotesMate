import Select from "../utils/Select";

const FilterBar = ({ filters, lists, onFilterChange }) => {
  return (
    <div className=" flex gap-20 ">
      <Select
        placeholder={"University"}
        options={lists.universities}
        value={filters.university}
        onChange={(e) => onFilterChange("university", e.target.value)}
      />
      <Select
        placeholder={"Course"}
        options={lists.courses}
        value={filters.course}
        onChange={(e) => onFilterChange("course", e.target.value)}
      />

      <Select
        placeholder={"Branch"}
        options={lists.branches}
        value={filters.branch}
        onChange={(e) => onFilterChange("branch", e.target.value)}
      />
    </div>
  );
};
export default FilterBar;
