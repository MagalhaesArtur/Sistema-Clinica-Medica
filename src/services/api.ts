import axios, { AxiosHeaderValue, AxiosHeaders, AxiosInstance } from "axios";
import {
  DTOConsulta,
  DTOdate,
  UserAuthProps,
  UserProps,
} from "../utils/interfaces";

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
  } else {
    localStorage.clear();
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

export const CreateConsulta = async ({
  data,
  doctor_id,
  patient_id,
}: DTOConsulta) => {
  if (await Auth()) {
    const token = localStorage.getItem("@Auth:token");
    console.log(token);
    const response = await api.post(
      "/createConsulta",
      {
        patient_id,
        doctor_id,

        date: {
          dia: data.dia.toString(),
          mes: data.mes?.toString(),
          ano: data.ano.toString(),
          horario: data.horario.toString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } else {
    return null;
  }
};

export const GetDocs = async (token: string) => {
  if (await Auth()) {
    const token = localStorage.getItem("@Auth:token");

    const response = await api.get("/doctors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const GetUsers = async () => {
  if (await Auth()) {
    const token = localStorage.getItem("@Auth:token");

    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } else {
    return null;
  }
};

export const DeleteUser = async (id: string) => {
  if (await Auth()) {
    const token = localStorage.getItem("@Auth:token");
    console.log(token);

    const response = await api.delete("/delete/user/:id", {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // const response = await api.delete(`/delete/user`, {
    //   data: id,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    return response;
  } else {
    return null;
  }
};
