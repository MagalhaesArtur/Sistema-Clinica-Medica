import { useEffect, useState } from "react";
import { ConsultasProps, UserAuthProps } from "../../utils/interfaces";
import { Consultas } from "./Consultas";
import { ScheduleConsulta } from "./ScheduleConsulta";
import { GetConsultas } from "../../services/api";

export const HomePageContent = () => {
  const [user, setUser] = useState<UserAuthProps>();
  const [isLoading, setIsLoading] = useState(false);

  let [consultas, setConsultas] = useState<Array<ConsultasProps>>();

  useEffect(() => {
    const user: UserAuthProps = JSON.parse(
      localStorage.getItem("@Auth:user") || "{}"
    );
    setUser(user);
  }, []);

  const getConsultas = async () => {
    setIsLoading(true);
    const res = await GetConsultas();
    const data = res.data;
    setConsultas(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    getConsultas();
  }, []);

  return (
    <section className="w-full flex ml-10  flex-col items-center justify-between  p-4">
      <div className="w-full mt-10 text-2xl font-bold">
        <span className="text-slate-200">Bem vindo, </span>
        <span className="text-[#36bd42]">{user?.username}!</span>
      </div>
      <div className="w-full flex telaMedia:flex-row flex-col justify-start gap-8 mt-20 h-full ">
        <div className="sm:w-[100px] md:w-[200px] telaMedia:w-[280px] telaGrande:w-[300px] telaGG:w-[400px]">
          <Consultas isLoading={isLoading} consultas={consultas} />
        </div>
        <div className="sm:w-[500px] md:w-[600px] telaMedia:w-[700px] telaGrande:w-[860px] telaGG:w-[960px]">
          <ScheduleConsulta getConsultas={getConsultas} />
        </div>
      </div>
    </section>
  );
};
