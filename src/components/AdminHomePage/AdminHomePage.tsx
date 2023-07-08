import { useEffect, useState } from "react";
import { UserAuthProps } from "../../utils/interfaces";
import { GetUsers } from "../../services/api";
import { User } from "./User";
import "./styles.css";
import { CircularProgress, TextField } from "@mui/material";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function AdminHomePage() {
  const [users, setUsers] = useState<Array<UserAuthProps> | null>(null);
  const [currentUsers, setCurrentUsers] = useState<
    UserAuthProps[] | [] | undefined
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentSearch, setCurrentSearch] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      const res = await GetUsers();
      setUsers(res?.data);
      setCurrentUsers(res?.data);
    };

    getUsers();
  }, []);

  function buscarUsuarios(textoBusca: string) {
    return users?.filter((usuario) => {
      const { email, id, username } = usuario;
      return (
        email.toLowerCase().includes(textoBusca.toLowerCase()) ||
        id.toString().toLowerCase().includes(textoBusca.toLowerCase()) ||
        username.toLowerCase().includes(textoBusca.toLowerCase())
      );
    });
  }

  return (
    <div className=" flex flex-col items-center w-full justify-center">
      <div className="absolute top-10 w-[600px]">
        <TextField
          id="standard-basic"
          color="primary"
          label="Pesquisar"
          value={currentSearch}
          onChange={(e) => {
            setIsLoading(true);
            setCurrentSearch(e.target.value);
            setCurrentUsers(buscarUsuarios(e.target.value));
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }}
          variant="standard"
          sx={{
            width: "100%",
            "& label.Mui-focused": {
              color: "#2E6CFD",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2E6CFD",
              },
              "&:hover fieldset": {
                borderColor: "#0cb41a",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2E6CFD",
              },
            },
          }}
        />
      </div>
      <div
        id="userBox"
        className="w-[60%] rounded-lg mt-20  flex flex-col justify-center items-center gap-6 p-5 bg-[#143789]  "
      >
        {isLoading ? (
          <CircularProgress size={30} className="text-white" color="inherit" />
        ) : currentUsers ? (
          currentUsers?.length > 0 ? (
            currentUsers?.map((user) => (
              <User username={user.username} id={user.id} email={user.email} />
            ))
          ) : (
            <>
              <SentimentVeryDissatisfiedIcon className="!text-6xl text-slate-300" />
              <span className="text-slate-300 font-semibold text-lg">
                Usuário(s) não encontrado(s)!
              </span>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
