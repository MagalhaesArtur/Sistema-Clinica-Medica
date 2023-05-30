import axios from "axios";
import { UserProps } from "../utils/interfaces";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const LoginApi = async (
  login: string,
  password: string,
  rememberMe?: boolean
) => {
  try {
    const response = await api.post("/login", {
      login,
      password,
      rememberMe,
    });
    return response.data;
  } catch (err: any) {
    return err.response.data.error.message;
  }
};

export const CreateUser = async (user: UserProps) => {
  const { password, email, username } = user;
  try {
    const response = await api.post("/users", {
      username,
      email,
      password,
    });
    console.log(response);

    return response;
  } catch (err: any) {
    console.log(err);
    // return err.response.data.erro.message || err.data.message;
  }
};
