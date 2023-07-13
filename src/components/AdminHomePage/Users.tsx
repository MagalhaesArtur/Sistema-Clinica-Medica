// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { HomePageContent } from "../UserHomePage/HomePageContent";

// function AdminConsultas() {
//   const { isADM } = useContext(AuthContext);
//   const isADMAux = localStorage.getItem("@Auth:isADM");
//   return <>{isADM || isADMAux ? <div></div> : <HomePageContent />}</>;
// }

// export default AdminConsultas;
import { useEffect, useState } from "react";
import { UserAuthProps } from "../../utils/interfaces";
import { GetUsers } from "../../services/api";
import { User } from "./User";
import "./styles.css";
import { CircularProgress, TextField } from "@mui/material";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function Users() {
  const [users, setUsers] = useState<Array<UserAuthProps> | null>(null);
  const [currentUsers, setCurrentUsers] = useState<
    UserAuthProps[] | [] | undefined
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    const res = await GetUsers();
    setUsers(res?.data);
    setCurrentUsers(res?.data);
  };

  const [currentSearch, setCurrentSearch] = useState("");
  useEffect(() => {
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
            currentSearch == "" ? getUsers() : null;
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
        className={`w-[60%] ${
          currentUsers
            ? currentUsers.length >= 4
              ? "overflow-y-scroll"
              : "overflow-y-hidden"
            : null
        } rounded-lg mt-20 max-h-[500px] flex flex-col  items-center gap-6 p-5 bg-[#143789]`}
      >
        {isLoading ? (
          <CircularProgress size={30} className="text-white" color="inherit" />
        ) : currentUsers ? (
          currentUsers?.length > 0 ? (
            currentUsers?.map((user) => (
              <User
                key={user.id}
                currentUsers={currentUsers}
                setCurrentUsers={setCurrentUsers}
                user={user}
                setIsLoading={setIsLoading}
              />
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
