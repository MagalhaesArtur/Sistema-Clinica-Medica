import docImg from "../assets/doctors.svg";
import LoginForm from "./LoginForm";

function LoginScreen() {
  return (
    <nav className="w-[90rem] h-[80vh]  flex justify-center items-center rounded-xl p-10 bg-[#fff]">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="text-3xl font-semibold  w-[50%]">
          Seja bem-vindo à nossa clínica médica.
        </div>
        <img src={docImg} className="w-[70%] h-[50%]" alt="" />
      </div>
      <div className="w-1/2">
        <LoginForm isDarkMode={false} />
      </div>
    </nav>
  );
}

export default LoginScreen;
