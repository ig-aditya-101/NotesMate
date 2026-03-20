import { useState } from "react";

import Button from "../utils/Button";
import Input from "../utils/Input";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;
    navigate("/dashboard");
  };
  return (
    <div className="login w-full h-screen bg-bg-secondary px-6 flex flex-col gap-6 py-8 ">
      <div>
        <div>
          <span style={{ fontWeight: 800 }} className="text-display">
            NOTES
          </span>
          <span style={{ fontWeight: 400 }} className="text-display">
            MATE
          </span>
        </div>
        <p className="text-small text-text-muted tracking-widest mt-1">
          SHARE · LEARN · EXCEL
        </p>
      </div>

      <div>
        <div style={{ fontWeight: 600 }} className="text-h1">
          Welcome back
        </div>
        <div className="text-text-secondary text-h3">
          Sign in to your account{" "}
        </div>
      </div>
      <div className="w-full flex flex-col   gap-4">
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-between  ">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 cursor-pointer "
            />
            <label htmlFor="remember" className="text-text-muted text-body-lg">
              Remember me
            </label>
          </div>
          <div className="text-h3 text-text-secondary">Forgot Password?</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 ">
        <Button size={"lg"}
        onClick={handleLogin}>Sign In</Button>

        <div className="mx-auto">or</div>
        <Button variant="secondary" size={"lg"}>
          Continue with Google
        </Button>
        <div className="mx-auto">
          <span className="text-text-secondary text-body-lg ">
            {" "}
            No account?{" "}
          </span>
          <span
            className=" text-body-lg font-bold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
