import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { signed } = useContext(AuthContext);
  console.log(signed);
  return signed ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
