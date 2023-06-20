import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { signed } = useContext(AuthContext);
  return signed ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
