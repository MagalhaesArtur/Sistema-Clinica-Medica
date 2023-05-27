import { FormEvent, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
// import { LoginApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { Button, TextField } from "@mui/material";
import { Globe } from "@phosphor-icons/react";
import "./login.css";

function LoginForm(props: { isDarkMode: boolean }) {
  //   let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [MessageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // const res = await LoginApi(username, password, rememberMe);
    // if (typeof res == "string") {
    //   setLoading(false);
    //   setIsLoginError(true);
    //   setMessageError(res);
    //   setTimeout(() => {
    //     setIsLoginError(false);
    //   }, 4000);
    // } else {
    //   localStorage.setItem("token", res.token);
    //   setLoading(false);
    //   navigate("/randomUsers");
    // }
  }

  return (
    <div
      id="formContainer"
      className="  flex flex-col justify-around items-center"
    >
      <div className="text-slate-800 mb-6 text-3xl">Bem-vindo de volta</div>
      <form
        id={`${props.isDarkMode ? "textBox" : null}`}
        className="flex items-center w-full  text-slate-200 flex-col"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Login"
          className="!text-red-700"
          type={"email"}
          variant="outlined"
          inputProps={{ maxLength: 30 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            width: "70%",
            "& label.Mui-focused": {
              color: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
              },
              "&:hover fieldset": {
                borderColor: `#18377d`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
              },
            },
          }}
          required
        />

        <br />

        <TextField
          className="username !text-red-400"
          label="Senha"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 30 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "70%",
            "& label.Mui-focused": {
              color: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
              },
              "&:hover fieldset": {
                borderColor: `#18377d`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
              },
            },
          }}
          required
        />

        <br />
        {isLoginError ? (
          <h1 className="text-lg text-red-700 font-bold">{MessageError}</h1>
        ) : null}

        <div className="flex items-center mt-5 w-[250px] justify-start">
          <Checkbox
            defaultChecked
            sx={{
              color: blue[800],
              "&.Mui-checked": {
                color: blue[600],
              },
            }}
            id="check"
            className="mr-4"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label
            htmlFor="check"
            className="text-slate-800 font-semibold text-lg"
          >
            Lembre de Mim
          </label>
        </div>
        <br />
        <button
          onClick={() => {
            setLoading(true);
            if (password == "" || username == "") {
              setLoading(false);
            }
          }}
          id="submitButton"
          type="submit"
        >
          {loading ? <Loading size={30} /> : "Login"}
        </button>
        <footer className="mt-4">
          <h2
            className={`${props.isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Ainda não tem uma conta?{" "}
            <a
              className="text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all"
              onClick={() => {
                // navigate("/register");
              }}
            >
              Criar Conta
            </a>
          </h2>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
