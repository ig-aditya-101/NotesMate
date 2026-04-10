import { useEffect, useState } from "react";
import { createContext } from "react";
import axiosInstance from "../apis/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("NOTESMATE_TOKEN") || null,
  );
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axiosInstance.get("/auth/me");
          const user = res.data.user;
          setUser(user);
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setUser(null);
          setToken(null);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
