import { useEffect, useState } from "react";
import { ConsultasProps } from "../../utils/interfaces";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import CheckIcon from "@mui/icons-material/Check";

export function Consulta(props: { consulta: ConsultasProps }) {
  const [day, setDay] = useState<any>();
  const [hours, setHours] = useState<any>();
  const [minutes, setMinutes] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [year, setYear] = useState<any>();

  function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("pt-BR", {
      month: "long",
    });
  }

  useEffect(() => {
    const rawDateAux = new Date(props.consulta.date);
    setDay(rawDateAux.getDate());
    setHours(rawDateAux.getHours());
    setMinutes(rawDateAux.getMinutes());
    setMonth(rawDateAux.getMonth());
    setYear(rawDateAux.getFullYear());
  }, []);
  return (
    <div
      id="card"
      className="rounded-lg p-4 flex  gap-5 text-white bg-[#2f60d1]"
    >
      <div className="w-1/2">
        <div>
          <div className="flex mb-3">
            <img
              className="w-20 h-28 rounded-lg object-cover"
              src={props.consulta.doctor.photoURL}
              alt="doc"
            />
            <div className="ml-4 font-bold text-lg">
              <span>{props.consulta.doctor.name}</span>
              <div className="text-slate-300 text-sm">
                {props.consulta.doctor.specialty}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 items-center justify-between">
          <div className="w-1/3 text-sm">
            <div className="text-slate-300">Data</div>
            <div className="text-white text-lg">
              {day} {getMonthName(month + 1)} {year}
            </div>
          </div>
          <div className="w-1/3">
            <div className="text-slate-300">Horário</div>
            <div className="text-white text-lg">
              {hours}:{minutes == 0 ? "00" : minutes}
            </div>
          </div>
          <div className="w-1/3">
            <div className="text-slate-300">Status</div>
            {!props.consulta.isConfirmed ? (
              <div
                title="Aguardando confirmação"
                className="text-[#071008] w-8 flex rounded-md justify-center h-8 items-center bg-yellow-400 text-lg"
              >
                <HourglassEmptyRoundedIcon />
              </div>
            ) : (
              <div
                title="Consulta Confirmada"
                className="text-[#071008] w-8 flex rounded-md justify-center h-8 items-center bg-green-400 text-lg"
              >
                <CheckIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 text-xl gap-3 flex flex-col">
        <div>
          <span className="text-lg text-slate-300">Paciente:</span>{" "}
          {props.consulta.patient.username}
        </div>
        <div>
          <span className="text-lg text-slate-300">Email:</span>{" "}
          {props.consulta.patient.email}
        </div>
        <div>
          <span className="text-lg text-slate-300">ID:</span>{" "}
          {props.consulta.patient.id}
        </div>
      </div>
    </div>
  );
}
