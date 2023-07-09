import { useEffect, useState } from "react";
import { GetAllConsultas } from "../../services/api";
import { ConsultasProps } from "../../utils/interfaces";
import { Consulta } from "./Consulta";
import { TextField } from "@mui/material";

export function AdminConsultas() {
  let [consultas, setConsultas] = useState<Array<ConsultasProps>>();
  const [currentSearch, setCurrentSearch] = useState("");
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
    const res = await GetAllConsultas();
    setConsultas(res?.data);
    setCurrentConsultas(res?.data);
  };

  useEffect(() => {
    getAllConsultas();
  }, []);

  return (
    <div className=" flex flex-col  p-5 items-center w-full justify-center">
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
      <div className="bg-[#143789] w-[80%]  p-5 rounded-lg">
        {currentConsultas?.map((consulta) => (
          <Consulta consulta={consulta} />
        ))}
      </div>
    </div>
  );
}
