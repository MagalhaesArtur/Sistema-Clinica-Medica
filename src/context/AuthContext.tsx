import { ReactNode, createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Auth, LoginApi, api } from "../services/api";
import { UserAuthProps } from "../utils/interfaces";

interface AuthProps {
  children: ReactNode;
}

interface LoginProps {
  email: String;
  password: String;
}

export const AuthContext = createContext<any>({} as any);

export const AuthProvider = ({ children }: AuthProps) => {
  let [user, setUser] = useState<UserAuthProps | null>(null);
  let [token, setToken] = useState("");

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken && storageUser) {
        const res = await Auth();
        if (!res || res.status == 500) {
          alert("Sessão Expirada! Faça o login novamente.");
          localStorage.clear();
          setUser(null);
        } else {
          setUser(JSON.parse(storageUser));
        }
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

      setTimeout(() => {
        setUser(res.user);
        setToken(res.token);
      }, 1000);
      return res;
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        signed: user ? true : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
