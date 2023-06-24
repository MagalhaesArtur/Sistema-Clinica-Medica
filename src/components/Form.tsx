import { FormEvent, useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import "./login.css";
import { CreateUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

function LoginForm(props: { isLoginPage: boolean }) {
  const { signIn, user } = useContext(AuthContext);

  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isLoginError, setIsLoginError] = useState(false);
  const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState(false);

  const [MessageError, setMessageError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirmPassword() {
    if (password != confirmPassword) {
      setLoading(false);
      setIsPasswordError(true);
      setMessageError("As senhas não coincidem!");
      setTimeout(() => {
        setIsPasswordError(false);
      }, 5000);
    } else {
      const res = await CreateUser({ username, email, password });
      if (res == 409) {
        setIsEmailAlreadyInUse(true);
        setMessageError("Email já cadastrado!");
        setTimeout(() => {
          setIsEmailAlreadyInUse(false);
        }, 5000);
      }
      setLoading(false);
    }
  }

  async function handleSubmitRegister(event: FormEvent) {
    event.preventDefault();

    handleConfirmPassword();
  }

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const res = await signIn({ email, password });
    if (res == 404 || res == 403) {
      setLoading(false);

      setIsLoginError(true);
      setMessageError("Email ou senha inválidos!");
      setTimeout(() => {
        setIsLoginError(false);
      }, 5000);
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 1000);
    }
  }

  if (user != null) {
    return <Navigate to="/home" />;
  } else {
    return (
      <div
        id="formContainer"
        className="  flex flex-col  justify-around items-center"
      >
        <div className="text-white mb-6 text-3xl">
          {" "}
          {props.isLoginPage ? "Bem-vindo de volta" : "Crie sua conta"}
        </div>
        <form
          id={"textBox"}
          className="flex items-center w-full  text-slate-200 flex-col"
          onSubmit={
            props.isLoginPage ? handleSubmitLogin : handleSubmitRegister
          }
        >
          <TextField
            className=""
            label="E-mail"
            type={"email"}
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "70%",
              "& label.Mui-focused": {
                color: `${
                  isEmailAlreadyInUse || isLoginError ? "#DC2626 " : "#2E6CFD"
                }`,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${
                    isEmailAlreadyInUse || isLoginError ? "#DC2626 " : "#2E6CFD"
                  }`,
                },
                "&:hover fieldset": {
                  borderColor: `#0cb41a`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${
                    isEmailAlreadyInUse || isLoginError ? "#DC2626 " : "#2E6CFD"
                  }`,
                },
              },
            }}
            required
          />

          <br />

          {!props.isLoginPage ? (
            <>
              <TextField
                label="Nome de usuário"
                type="text"
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
                      borderColor: `#0cb41a`,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
                    },
                  },
                }}
                required
              />
              <br />
            </>
          ) : null}

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
                  borderColor: `#0cb41a`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isLoginError ? "#DC2626 " : "#2E6CFD"}`,
                },
              },
            }}
            required
          />

          {!props.isLoginPage ? (
            <>
              <br />
              <TextField
                className="username"
                label="Confirme sua senha"
                type="password"
                variant="outlined"
                inputProps={{ maxLength: 30 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  width: "70%",
                  "& label.Mui-focused": {
                    color: `${isPasswordError ? "#DC2626 " : "#2E6CFD"}`,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${
                        isPasswordError ? "#DC2626 " : "#2E6CFD"
                      }`,
                    },
                    "&:hover fieldset": {
                      borderColor: `#0cb41a`,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${
                        isPasswordError ? "#DC2626 " : "#2E6CFD"
                      }`,
                    },
                  },
                }}
                required
              />
            </>
          ) : null}

          <br />
          {isLoginError || isPasswordError || isEmailAlreadyInUse ? (
            <h1 className="text-lg text-[#DC2626] font-bold">{MessageError}</h1>
          ) : null}

          {props.isLoginPage ? (
            <div className="flex items-center mt-5 w-[250px] justify-start">
              <Checkbox
                defaultChecked
                sx={{
                  color: green[800],
                  "&.Mui-checked": {
                    color: green[600],
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
          ) : null}

          <br />
          <button
            onClick={() => {
              setLoading(true);
              setIsLoginError(false);
              if (password == "" || username == "") {
                setLoading(false);
              }
            }}
            id="submitButton"
            type="submit"
            className="flex justify-center items-center"
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              <div>{props.isLoginPage ? "LOGIN" : "CADASTRE-SE"}</div>
            )}
          </button>
          <footer className="mt-4">
            {props.isLoginPage ? (
              <h2 className={"text-white"}>
                Ainda não tem uma conta?{" "}
                <a
                  className="text-green-600 underline cursor-pointer  hover:text-green-500 transition-all"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Criar Conta
                </a>
              </h2>
            ) : null}
          </footer>
        </form>
      </div>
    );
  }
}

export default LoginForm;
