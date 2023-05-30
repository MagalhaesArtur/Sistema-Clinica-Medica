import docImg from "../assets/doctors2.svg";
import SingUpForm from "./Form";

function SingUpScreen() {
  return (
    <nav className="w-[80rem] h-[80vh]  flex justify-center items-center rounded-xl pl-10 bg-[#fff]">
      <div className="w-1/2 flex flex-col h-full justify-center items-center">
        <div className="text-3xl font-semibold  w-[50%]">
          Seja bem-vindo à nossa clínica médica.
        </div>
        <img src={docImg} className="w-[70%] h-[50%]" alt="" />
      </div>
      <div
        id="form"
        className="w-1/2 h-full flex rounded-tr-xl rounded-br-xl flex-col justify-center"
      >
        <SingUpForm isLoginPage={false} />
      </div>
    </nav>
  );
}

export default SingUpScreen;
