import { useEffect, useState } from "react";
import { GetAllConsultas } from "../../services/api";
import { ConsultasProps } from "../../utils/interfaces";
import { Consulta } from "./Consulta";
import { CircularProgress, TextField } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export function AdminConsultas() {
  let [consultas, setConsultas] = useState<Array<ConsultasProps>>();
  const [currentSearch, setCurrentSearch] = useState("");
  const [auxSwitch, setAuxSwitch] = useState(false);
  const [currentConsultas, setCurrentConsultas] = useState<
    ConsultasProps[] | [] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  function buscarConsultas(textoBusca: string) {
    return consultas?.filter((consulta) => {
      const { doctor, patient } = consulta;
      return (
        doctor.name.toLowerCase().includes(textoBusca.toLowerCase()) ||
        patient.email
          .toString()
          .toLowerCase()
          .includes(textoBusca.toLowerCase()) ||
        patient.username.toLowerCase().includes(textoBusca.toLowerCase())
      );
    });
  }

  const getAllConsultas = async () => {
    setIsLoading(true);
    const res = await GetAllConsultas();
    setConsultas(res?.data);
    setCurrentConsultas(res?.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAllConsultas();
  }, [auxSwitch]);

  return (
    <div className=" flex flex-col  p-5 items-center w-full justify-center">
      <div className="absolute top-10 w-[600px]">
        <TextField
          id="standard-basic"
          color="primary"
          label="Pesquisar"
          value={currentSearch}
          onChange={(e) => {
            currentSearch == "" ? getAllConsultas() : null;
            setIsLoading(true);
            setCurrentSearch(e.target.value);
            setCurrentConsultas(buscarConsultas(e.target.value));
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }}
          variant="standard"
          sx={{
            width: "100%",
            "& label.Mui-focused": {
              color: "#2E6CFD",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2E6CFD",
              },
              "&:hover fieldset": {
                borderColor: "#0cb41a",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2E6CFD",
              },
            },
          }}
        />
      </div>
      <div
        className={`bg-[#143789] max-h-[500px] ${
          consultas
            ? consultas.length >= 3
              ? "overflow-y-scroll"
              : "overflow-y-hidden"
            : null
        } w-[80%] flex flex-col gap-6 items-center  p-5 rounded-lg`}
      >
        {isLoading ? (
          <CircularProgress
            size={30}
            className="text-white m-auto"
            color="inherit"
          />
        ) : currentConsultas ? (
          currentConsultas.length > 0 ? (
            currentConsultas?.map((consulta) => (
              <Consulta
                auxSwitch={auxSwitch}
                setAuxSwitch={setAuxSwitch}
                key={consulta.id}
                setCurrentConsultas={setCurrentConsultas}
                setIsLoading={setIsLoading}
                currentConsultas={currentConsultas}
                consulta={consulta}
              />
            ))
          ) : (
            <>
              <SentimentVeryDissatisfiedIcon className="!text-6xl m-auto text-slate-300" />
              <span className="text-slate-300 font-semibold text-lg">
                Consulta(s) não encontrada(s)!
              </span>
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
