import { ReactNode, createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginApi, api } from "../services/api";

interface AuthProps {
  children: ReactNode;
}

interface LoginProps {
  email: String;
  password: String;
}

export const AuthContext = createContext<any>({} as any);

export const AuthProvider = ({ children }: AuthProps) => {
  let navigate = useNavigate();
  const [isSigned, setSingned] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }: LoginProps) => {
    const res = await LoginApi(email, password);
    if (res == 404 || res == 403) {
      return res;
    } else {
      localStorage.setItem("@Auth:token", res.token);
      localStorage.setItem("@Auth:user", JSON.stringify(res.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      setUser(res.user);
      setSingned(true);
      return res;
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser("");
    setSingned(false);
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        signed: isSigned,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
