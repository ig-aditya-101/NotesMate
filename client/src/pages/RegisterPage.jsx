import React, { useState } from "react";
import Input from "../utils/Input";
import Toggle from "../utils/Toggle";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const handleRegister = () => {
    navigate("/dashboard");
  };
  const [name, setName] = useState();
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [college, setCollege] = useState();
  const [isStudent, setIsStudent] = useState();
  const navigate = useNavigate();
  return (
    <div className="w-full py-8 p-7 flex flex-col gap-6">
      <div className="w-full flex flex-col  items-center gap-2">
        <div className="text-h1">Create Account</div>
        <div className="text-text-secondary">Join Your College Network</div>
      </div>
      <div className="registerForm flex flex-col gap-2 justify-center items-center">
        <Input
          placeholder={"Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={"@gmail.com"}
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <Input
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder={"Confirm Password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Toggle value={isStudent} onChange={setIsStudent}/>
        <Input
          placeholder={"Select College"}
          value={college}
          onChange={(e) => setCollege - e.target.value}
        />
      </div>
      <div>
        <Button variant="secondary" size="lg" onClick={handleRegister}>
          Create Account
        </Button>
      </div>
      <div className="mx-auto">
        <span className="text-text-secondary text-body-lg ">
          {" "}
          Have account?{" "}
        </span>
        <span
          className=" text-body-lg font-bold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
