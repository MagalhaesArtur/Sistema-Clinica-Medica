import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return children;
};
