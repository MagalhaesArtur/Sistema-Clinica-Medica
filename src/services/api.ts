import axios from "axios";
import { UserAuthProps, UserProps } from "../utils/interfaces";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const LoginApi = async (
  email: String,
  password: String,
  rememberMe?: boolean
) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (err: any) {
    return err.response.status;
  }
};

export const CreateUser = async (user: UserProps) => {
  const { password, email, username } = user;
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return err.response.data.status;
  }
};

export const Auth = async () => {
  const token = localStorage.getItem("@Auth:token");
  if (token != null) {
    const response = await api.post("/auth", {
      token: token,
    });
    return response.data;
  }
};

export const GetConsultas = async () => {
  try {
    const user: UserAuthProps = JSON.parse(
      localStorage.getItem("@Auth:user") || "{}"
    );
    const id = user.id;
    const response = await api.post("/consultas/user", {
      id,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};
