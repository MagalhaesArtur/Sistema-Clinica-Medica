import { useEffect, useState } from "react";
import { GetConsultas } from "../../services/api";
import { ConsultasProps } from "../../utils/interfaces";
import { ConsultaCard } from "./ConsultaCard";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const Consultas = () => {
  const [consultas, setConsultas] = useState<Array<ConsultasProps>>();
  console.log(consultas);
  useEffect(() => {
    const getConsultas = async () => {
      const res = await GetConsultas();
      const data = res.data;
      setConsultas(data);
    };
    getConsultas();
  }, []);

  return (
    <div className="w-[100%] rounded-lg p-4  flex flex-col gap-4 bg-[#2f60d1]">
      <div className="text-white text-lg font-semibold mb-4">
        Suas Consultas
      </div>
      {consultas?.length == 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <SentimentVeryDissatisfiedIcon className="!text-6xl text-slate-300" />
          <span className="text-slate-300 font-semibold text-lg">
            Sem consultas marcadas!
          </span>
        </div>
      ) : (
        consultas?.map((consulta) => (
          <ConsultaCard
            date={consulta.date}
            isConfirmed={consulta.isConfirmed}
            doctor={consulta.doctor}
            patient={consulta.patient}
            key={consulta.id}
          />
        ))
      )}
    </div>
  );
};
