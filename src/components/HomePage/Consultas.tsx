import { CircularProgress } from "@mui/material";
import { ConsultasProps } from "../../utils/interfaces";
import { ConsultaCard } from "./ConsultaCard";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";

interface ConsultaProps {
  consultas?: Array<ConsultasProps>;
  isLoading: boolean;
}

export const Consultas = ({ consultas, isLoading }: ConsultaProps) => {
  let [consultasAux, setConsultasAux] = useState<Array<ConsultasProps>>();
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);

  const adjustConsultas = () => {
    consultas != undefined
      ? consultas?.length > 3
        ? setConsultasAux(consultas.slice(0, 3))
        : setConsultasAux(consultas)
      : null;
  };

  useEffect(() => {
    adjustConsultas();
  }, [consultas]);

  return (
    <>
      <Dialog.Root
        open={isDialogClientDataOpen}
        onOpenChange={setIsDialogClientDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed !overflow-y-scroll  bg-[#2f60d1] py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[600px]  text-[#14163c] rounded-lg w-[500px] telaMedia:w-[700px] shadow-lg shadow-black/40">
            <X
              className="absolute z-10  text-white hover:text-red-500 cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogClientDataOpen(false);
              }}
              size={30}
            />
            <div className="w-[100%] rounded-lg mt-4 !p-4 flex flex-col gap-4  bg-[#2f60d1]">
              {consultas?.map((consulta) => (
                <ConsultaCard
                  date={consulta.date}
                  isConfirmed={consulta.isConfirmed}
                  doctor={consulta.doctor}
                  patient={consulta.patient}
                  key={consulta.id}
                />
              ))}
            </div>

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="w-[100%] rounded-lg p-4 flex flex-col gap-4 bg-[#2f60d1]">
        <div className="text-white text-lg font-semibold mb-4">
          Suas Consultas
        </div>

        {consultas?.length == 0 || isLoading ? (
          <div className="w-full flex flex-col items-center justify-center">
            {isLoading ? (
              <CircularProgress size={50} className="!text-white" />
            ) : (
              <>
                <SentimentVeryDissatisfiedIcon className="!text-6xl text-slate-300" />
                <span className="text-slate-300 font-semibold text-lg">
                  Sem consultas marcadas!
                </span>
              </>
            )}
          </div>
        ) : (
          <>
            {consultasAux?.map((consulta) => (
              <ConsultaCard
                date={consulta.date}
                isConfirmed={consulta.isConfirmed}
                doctor={consulta.doctor}
                patient={consulta.patient}
                key={consulta.id}
              />
            ))}
            {consultas != undefined ? (
              consultas?.length > 3 ? (
                <button
                  onClick={() => {
                    setIsDialogClientDataOpen(true);
                  }}
                  className={`p-4 transition-all m-auto border-2 border-transparent cursor-pointer hover:border-green-400 bg-[#143789] rounded-3xl text-white font-bold ${
                    isLoading
                      ? "!cursor-not-allowed hover:border-transparent"
                      : null
                  } `}
                >
                  Todas as consultas
                </button>
              ) : null
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
