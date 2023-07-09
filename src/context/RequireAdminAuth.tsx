import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  const { isADM } = useContext(AuthContext);
  const isADMAux = localStorage.getItem("@Auth:isADM");

  if (!isADM && !isADMAux) {
    return <Navigate to="/login" />;
  }

  return children;
};
