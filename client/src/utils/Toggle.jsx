import React, { useState } from "react";

const Toggle = ({}) => {
  const [isStudent, setIsStudent] = useState(false);

  return (
    <div className="flex gap-2.5  border-bg-secondary border-2 text-h3 rounded-xl w-fit overflow-clip">
      <div
      onClick={()=>setIsStudent(true)}
        className={` px-10 py-1.5 cursor-pointer transition-all duration-200 ease-out ${isStudent ? "bg-text-secondary text-text-inverse  rounded-xl" : "bg-bg-primary text-text-secondary"}`}
      >
        Student
      </div>
      <div
       onClick={()=>setIsStudent(false)}
        className={` px-10 py-1.5 cursor-pointer transition-all duration-200 ease-out ${isStudent ? "bg-bg-primary text-text-secondary" : "bg-text-secondary text-text-inverse  rounded-xl"}`}
      >
        Teacher
      </div>
    </div>
  );
};

export default Toggle;
