import { useEffect, useState } from "react";
import { ConsultasProps } from "../../utils/interfaces";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import CheckIcon from "@mui/icons-material/Check";
import { ConfirmConsulta, DeleteConsulta } from "../../services/api";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";

export function Consulta(props: {
  consulta: ConsultasProps;
  currentConsultas: ConsultasProps[];
  setCurrentConsultas: Function;
  setIsLoading: Function;
  auxSwitch: boolean;
  setAuxSwitch: Function;
}) {
  const [day, setDay] = useState<any>();
  const [hours, setHours] = useState<any>();
  const [minutes, setMinutes] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [year, setYear] = useState<any>();
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);

  function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("pt-BR", {
      month: "long",
    });
  }

  const confirmConsulta = async (id: string) => {
    console.log(id);
    await ConfirmConsulta(id);
    props.consulta.isConfirmed = true;
    props.setAuxSwitch(!props.auxSwitch);
  };

  const deleteConsulta = async (id: string) => {
    props.setIsLoading(true);
    const res = await DeleteConsulta(id);
    let index = props.currentConsultas.indexOf(props.consulta);
    let copiaArray = [...props.currentConsultas];

    if (index !== -1) {
      copiaArray.splice(index, 1);
    }
    props.setCurrentConsultas(copiaArray);
    setTimeout(() => {
      props.setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const rawDateAux = new Date(props.consulta.date);
    setDay(rawDateAux.getDate());
    setHours(rawDateAux.getHours());
    setMinutes(rawDateAux.getMinutes());
    setMonth(rawDateAux.getMonth());
    setYear(rawDateAux.getFullYear());
  }, []);
  return (
    <>
      <Dialog.Root
        open={isDialogClientDataOpen}
        onOpenChange={setIsDialogClientDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed outline-none bg-[#2f60d1] py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[600px]  text-[#14163c] rounded-lg w-[500px] telaMedia:w-[700px] shadow-lg shadow-black/40">
            <X
              className="absolute z-10  text-white hover:text-red-500 cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogClientDataOpen(false);
              }}
              size={30}
            />
            <div className="w-[100%] text-white text-lg font-bold rounded-lg mt-4 !p-4 flex items-center justify-center flex-col gap-4  bg-[#2f60d1]">
              Deletar a consulta?
              <div className="p-4 bg-[#143789] w-full flex justify-between items-center rounded-lg    ">
                <div className="text-white  font-bold  text-lg">
                  <div>
                    <span className="text-slate-400  text-sm">Médico:</span>{" "}
                    {props.consulta.doctor.name}
                  </div>
                  <div>
                    <span className="text-slate-400  text-sm">
                      Email do Paciente:{" "}
                    </span>{" "}
                    {props.consulta.patient.email}
                  </div>
                  <div className="w-full">
                    <span className="text-slate-400  text-sm">
                      ID do paciente:{" "}
                    </span>{" "}
                    {props.consulta.patient.id}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-around">
                <button
                  onClick={() => {
                    deleteConsulta(props.consulta.id?.toString() || "");
                  }}
                  className="p-4 bg-green-600 rounded-lg transition-all hover:bg-green-400"
                >
                  SIM
                </button>
                <button
                  onClick={() => {
                    setIsDialogClientDataOpen(false);
                  }}
                  className="p-4 bg-red-600 hover:bg-red-400 rounded-lg transition-all"
                >
                  NÃO
                </button>
              </div>
            </div>

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div
        id="card"
        className="rounded-lg p-4 flex w-full items-center gap-5 text-white bg-[#2f60d1]"
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
                <div className="flex gap-3">
                  <div
                    title="Aguardando confirmação"
                    className="text-[#071008] w-8 flex rounded-md justify-center h-8 items-center bg-yellow-400 text-lg"
                  >
                    <HourglassEmptyRoundedIcon />
                  </div>
                  <div
                    onClick={() => {
                      confirmConsulta(props.consulta.id || "");
                    }}
                    title="Confirmar Consulta"
                    className="text-[#071008] w-8 flex rounded-md justify-center cursor-pointer h-8 transition-all hover:bg-green-600  items-center bg-green-400 text-lg"
                  >
                    <CheckIcon />
                  </div>
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
        <span title="Apagar consulta">
          <X
            className=" text-white transition-all hover:text-red-500 cursor-pointer right-4 top-4"
            onClick={() => {
              setIsDialogClientDataOpen(true);
            }}
            size={30}
          />
        </span>
      </div>
    </>
  );
}
