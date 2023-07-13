import { useEffect, useState } from "react";
import { ConsultasProps } from "../../utils/interfaces";
import "./styles.css";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import CheckIcon from "@mui/icons-material/Check";

export function ConsultaCard({ date, doctor, isConfirmed }: ConsultasProps) {
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
    const rawDateAux = new Date(date);
    rawDateAux.setUTCHours(rawDateAux.getUTCHours() - 3);
    setDay(rawDateAux.getDate());
    setHours(rawDateAux.getHours());
    setMinutes(rawDateAux.getMinutes());
    setMonth(rawDateAux.getMonth());
    setYear(rawDateAux.getFullYear());
  }, []);

  return (
    <div
      id="card"
      className="rounded-lg p-4 flex flex-col gap-5 text-white bg-[#143789]"
    >
      <div>
        <div className="flex">
          <img
            className="w-20 h-28 rounded-lg object-cover"
            src={doctor.photoURL}
            alt="doc"
          />
          <div className="ml-4 font-bold text-lg">
            <span>{doctor.name}</span>
            <div className="text-slate-400 text-sm">{doctor.specialty}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 items-center justify-between">
        <div className="w-1/3 text-sm">
          <div className="text-slate-400">Data</div>
          <div className="text-white text-lg">
            {day} {getMonthName(month + 1)} {year}
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-slate-400">Horário</div>
          <div className="text-white text-lg">
            {hours}:{minutes == 0 ? "00" : minutes}
          </div>
        </div>
        <div className="w-1/3">
          <div className="text-slate-400">Status</div>
          {!isConfirmed ? (
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
      <div></div>
    </div>
  );
}
