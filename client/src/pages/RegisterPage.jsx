import { useContext, useState, useEffect } from "react";
import Input from "../utils/Input";
import Toggle from "../utils/Toggle";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axios";
import { AuthContext } from "../context/AuthContext";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/\d/, "At least one number")
    .matches(/[!@#$%^&*]/, "At least one symbol")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  college: Yup.string().required("Please select your college"),
  isStudent: Yup.boolean().required(),
});

const RegisterPage = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      college: "",
      isStudent: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post("/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
          college: values.college,
          isStudent: values.isStudent,
        });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("NOTESMATE_TOKEN", res.data.token);
        navigate("/dashboard");
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    },
  });

  const [collegeList, setCollegeList] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchString && searchString !== formik.values.collegeName) {
        fetchColleges(searchString);
      } else {
        setCollegeList([]);
      }
    }, 300);
    return () => clearTimeout(delayTimer);
  }, [searchString]);

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
      <div className="registerForm flex flex-col gap-4 w-full">
        <Input
          placeholder={"Full Name"}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
        />

        <Input
          placeholder={"Email Address"}
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <div className="w-full flex flex-col gap-2">
          <Input
            placeholder={"Password"}
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <div className="px-4 flex flex-col gap-1">
            <p
              className={`text-small flex items-center gap-1 ${formik.values.password.length >= 8 ? "text-accent-green" : "text-text-muted"}`}
            >
              {formik.values.password.length >= 8 ? "✓" : "○"} 8+ characters
            </p>
            <p
              className={`text-small flex items-center gap-1 ${/\d/.test(formik.values.password) ? "text-accent-green" : "text-text-muted"}`}
            >
              {/\d/.test(formik.values.password) ? "✓" : "○"} At least one
              number
            </p>
            <p
              className={`text-small flex items-center gap-1 ${/[!@#$%^&*]/.test(formik.values.password) ? "text-accent-green" : "text-text-muted"}`}
            >
              {/[!@#$%^&*]/.test(formik.values.password) ? "✓" : "○"} At least
              one symbol
            </p>
          </div>
        </div>

        <Input
          placeholder={"Confirm Password"}
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <div className="flex flex-col gap-2">
          <span className="text-small text-text-muted px-4">I am a:</span>
          <Toggle
            value={formik.values.isStudent}
            onChange={(val) => formik.setFieldValue("isStudent", val)}
          />
        </div>

        <div className="w-full relative">
          <Input
            placeholder={"Select College"}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            error={formik.touched.college && formik.errors.college}
          />
          {collegeList.length > 0 && (
            <div className="absolute top-full left-0 z-10 flex flex-col bg-bg-secondary w-full border border-gray-600 rounded mt-1 shadow-xl">
              {collegeList.map((college) => (
                <div
                  key={college._id}
                  className="p-3 hover:bg-gray-700 cursor-pointer text-white border-b border-gray-700 last:border-0"
                  onClick={() => {
                    formik.setFieldValue("college", college._id);
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
      </div>
      <div>
        <Button
          variant="secondary"
          size="lg"
          onClick={formik.handleSubmit}
          className="w-full"
        >
          {formik.isSubmitting ? "Creating Account..." : "Create Account"}
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
