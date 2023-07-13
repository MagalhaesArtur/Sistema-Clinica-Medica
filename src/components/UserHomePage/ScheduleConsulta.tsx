import { useContext, useEffect, useState } from "react";
import { Doctor } from "../../utils/interfaces";
import { Doc } from "./Doc";
import { CreateConsulta, GetDocs } from "../../services/api";
import { CalendarComponent } from "./CalendarComponent";
import { AuthContext } from "../../context/AuthContext";
import { AlertColor, CircularProgress } from "@mui/material";
import SnackBar from "../SnackBar";

interface ScheduleConsultaProps {
  getConsultas: Function;
}

export const ScheduleConsulta = ({ getConsultas }: ScheduleConsultaProps) => {
  const [docs, setDocs] = useState<Array<Doctor>>();
  const [currentDoc, setCurrentDoc] = useState<Doctor | null>(null);

  const [loadingDocs, setLoadingDocs] = useState(false);

  const [currentYear, setCurrentYear] = useState();
  const [currentAppointmentDay, setCurrentAppointmentDay] = useState("");
  const [currentAppointmentMonth, setCurrentAppointmentMonth] = useState<
    number | undefined
  >(undefined);
  const [currentTime, setCurrentTime] = useState("");
  const { user } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentSnackBarColor, setCurrentSnackBarColor] = useState<
    AlertColor | undefined
  >("success");

  const aux = new Date();

  useEffect(() => {
    const getDoc = async () => {
      setLoadingDocs(true);

      const res = await GetDocs();
      if (res != null) {
        setDocs(res.data);
        setLoadingDocs(false);
      }
    };
    getDoc();
  }, []);

  const handleCreateConsultaButton = async () => {
    if (
      currentDoc == null ||
      currentAppointmentDay == "" ||
      currentTime == ""
    ) {
      if (currentDoc == null) {
        setCurrentSnackBarColor("error");
        setSnackbarMessage("Selecione um médico !");
      } else if (currentTime == "") {
        setCurrentSnackBarColor("error");
        setSnackbarMessage("Selecione um horário !");
      }
      setOpenSnackbar(true);
    } else {
      setCurrentSnackBarColor("success");

      setSnackbarMessage("Consulta enviada para confirmação !");
      setOpenSnackbar(true);
      setCurrentTime("");
      setCurrentDoc(null);
      await CreateConsulta({
        patient_id: user.id,
        doctor_id: currentDoc?.id?.toString() || "",
        data: {
          ano: aux.getFullYear().toString(),
          dia: currentAppointmentDay,
          horario: currentTime,
          mes: currentAppointmentMonth,
        },
      });
      await getConsultas();
    }
  };

  return (
    <div className="w-full rounded-lg p-4  flex flex-col gap-4 bg-[#2f60d1]">
      <SnackBar
        open={openSnackbar}
        color={currentSnackBarColor}
        message={snackbarMessage}
        setOpen={setOpenSnackbar}
      />
      <div className="text-white text-lg font-semibold ">Marcar Consulta</div>

      <span className="text-slate-300 text-sm">
        Escolha o Médico e sua especialidade.
      </span>

      <div className="w-[100%] gap-4 justify-center telaMedia:flex-nowrap flex-wrap telaMedia:justify-between flex">
        {docs ? (
          docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setCurrentDoc(doc);
              }}
              className={
                currentDoc == doc
                  ? `border-green-500 border-[3px] transition-all w-full rounded-lg cursor-pointer`
                  : `border-[3px] border-transparent transition-all w-full rounded-lg cursor-pointer`
              }
            >
              <Doc
                name={doc.name}
                photoURL={doc.photoURL}
                specialty={doc.specialty}
                key={doc.id}
              />
            </button>
          ))
        ) : (
          <CircularProgress size={60} className="!text-white m-auto" />
        )}
      </div>
      <CalendarComponent
        handleCreateConsultaButton={handleCreateConsultaButton}
        currentAppointmentDay={currentAppointmentDay}
        currentAppointmentMonth={currentAppointmentMonth}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        currentYear={currentYear}
        setCurrentAppointmentDay={setCurrentAppointmentDay}
        setCurrentAppointmentMonth={setCurrentAppointmentMonth}
      />
    </div>
  );
};
