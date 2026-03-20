;

const Toggle = ({ value, onChange }) => {
  

  return (
    <div className="flex gap-2.5  border-border-main border-3 text-h3 rounded-xl  overflow-clip w-full">
      <div
        onClick={() => onChange(true)}
        className={`w-full flex justify-center  py-2 cursor-pointer transition-all duration-200 ease-out ${value ? "bg-text-secondary text-text-inverse  rounded-xl" : "bg-bg-primary text-text-secondary"}`}
      >
        Student
      </div>
      <div
        onClick={() => onChange(false)}
        className={`w-full flex justify-center py-2 cursor-pointer transition-all duration-200 ease-out ${value ? "bg-bg-primary text-text-secondary" : "bg-text-secondary text-text-inverse  rounded-xl"}`}
      >
        Teacher
      </div>
    </div>
  );
};

export default Toggle;
