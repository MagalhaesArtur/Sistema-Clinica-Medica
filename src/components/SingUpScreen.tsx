import docImg from "../assets/doctors2.svg";
import SingUpForm from "./Form";

function SingUpScreen() {
  return (
    <div className="telaMedia:w-[75rem] w-[90%] md:w-[47rem] h-[80vh] md:flex-row  flex-col flex justify-center items-center rounded-xl md:pl-10 md:bg-white bg-[#1217c3]">
      <div className="w-1/2  flex-col hidden md:flex h-full justify-center items-center">
        <div className="text-3xl font-semibold  w-[50%]">
          Seja bem-vindo à nossa clínica médica.
        </div>
        <img src={docImg} className="w-[70%] h-[50%]" alt="" />
      </div>
      <div
        id="form"
        className="md:w-1/2 w-full h-full flex md:rounded-tr-xl rounded-lg  md:rounded-br-xl flex-col justify-center"
      >
        <SingUpForm isLoginPage={false} />
      </div>
    </div>
  );
}

export default SingUpScreen;
