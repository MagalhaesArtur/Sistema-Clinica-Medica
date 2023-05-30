import docImg from "../assets/doctors.svg";
import LoginForm from "./Form";

function LoginScreen() {
  return (
    <nav className="w-[80rem] h-[80vh]  flex justify-center items-center rounded-xl pl-10 bg-[#fff]">
      <div className="w-1/2 flex flex-col h-full justify-center items-center">
        <div className="text-3xl font-semibold  w-[60%]">
          Faça login para acessar nossos serviços
        </div>
        <img src={docImg} className="w-[70%] h-[50%]" alt="" />
      </div>
      <div
        id="form"
        className="w-1/2 h-full flex rounded-tr-xl rounded-br-xl flex-col justify-center "
      >
        <LoginForm isLoginPage={true} />
      </div>
    </nav>
  );
}

export default LoginScreen;
