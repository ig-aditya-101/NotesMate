import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
export default ProtectedRoute;
