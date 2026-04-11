import { useContext, useState, useEffect } from "react";
import Input from "../utils/Input";
import Toggle from "../utils/Toggle";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axios";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const handleRegister = async () => {
    try {
      if (password !== confirm) {
        return alert("confirm password doesnt match");
      }
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        college,
        isStudent,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("NOTESMATE_TOKEN", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [college, setCollege] = useState();
  const [isStudent, setIsStudent] = useState();
  const [collegeList, setCollegeList] = useState([]);
  const [searchString, setSearchString] = useState();
  const { setToken, setUser } = useContext(AuthContext);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchString) {
        fetchColleges(searchString);
      } else {
        setCollegeList([]);
      }
    }, 300);
    return () => clearTimeout(delayTimer);
  }, [searchString]);

  const navigate = useNavigate();

  const fetchColleges = async (searchString) => {
    try {
      const res = await axiosInstance.get(`/colleges?search=` + searchString);
      setCollegeList(res.data);
    } catch (err) {
      console.error("Librarian failed to find colleges:", err);
    }
  };
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Toggle value={isStudent} onChange={setIsStudent} />
        <Input
          placeholder={"Select College"}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        {collegeList.length > 0 && (
          <div className="flex flex-col bg-bg-secondary w-full border border-gray-600 rounded">
            {collegeList.map((college) => (
              <div
                className="p-3 hover:bg-gray-700 cursor-pointer text-white"
                onClick={() => {
                  setCollege(college._id);
                  setSearchString(college.name);
                  setCollegeList([]);
                }}
              >
                {college.name}
              </div>
            ))}
          </div>
        )}
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
