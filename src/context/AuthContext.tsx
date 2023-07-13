import { ReactNode, createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Auth, LoginApi, api } from "../services/api";
import { UserAuthProps } from "../utils/interfaces";
import jwt_decode from "jwt-decode";

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
  const [isAtt, setIsATT] = useState(false);
  const [isADM, setIsADM] = useState(false);
  let [token, setToken] = useState("");

  function updateUrl(newUrl: any) {
    window.location.href = newUrl;
  }

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
          user = null;
          updateUrl(
            window.location.protocol + "//" + window.location.host + "/login"
          );
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
      try {
      } catch (error) {
        console.log("Erro ao decodificar o token:", error);
      }

      setUser(res.user);
      setToken(res.token);
      let decoded = jwt_decode<any>(res.token);
      if (decoded.isAtt) {
        setIsATT(true);
      }
      if (decoded.isADM) {
        setIsADM(true);
        localStorage.setItem("@Auth:isADM", JSON.stringify(true));

        setIsATT(true);
      }
      localStorage.setItem("@Auth:token", res.token);
      localStorage.setItem("@Auth:user", JSON.stringify(res.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
      token = res.token;
      user = res.user;
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
        isADM,
        isAtt,
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
