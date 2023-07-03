import { useContext, useEffect, useState } from "react";
import { Doctor } from "../../utils/interfaces";
import { Doc } from "./Doc";
import { CreateConsulta, GetDocs } from "../../services/api";
import { CalendarComponent } from "./CalendarComponent";
import { AuthContext } from "../../context/AuthContext";

interface ScheduleConsultaProps {
  getConsultas: Function;
}

export const ScheduleConsulta = ({ getConsultas }: ScheduleConsultaProps) => {
  const [docs, setDocs] = useState<Array<Doctor>>();
  const [currentDoc, setCurrentDoc] = useState<Doctor | null>(null);

  const [currentYear, setCurrentYear] = useState();
  const [currentAppointmentDay, setCurrentAppointmentDay] = useState("");
  const [currentAppointmentMonth, setCurrentAppointmentMonth] = useState<
    number | undefined
  >(undefined);
  const [currentTime, setCurrentTime] = useState("");
  const { token, user } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const aux = new Date();

  useEffect(() => {
    const getDoc = async () => {
      const res = await GetDocs(token);
      if (res != null) {
        setDocs(res.data);
      }
    };
    getDoc();
  }, []);

  const handleCreateConsultaButton = async () => {
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
    setOpenSnackbar(true);
  };

  return (
    <div className="w-full rounded-lg p-4  flex flex-col gap-4 bg-[#2f60d1]">
      <div className="text-white text-lg font-semibold ">Marcar Consulta</div>

      <span className="text-slate-300 text-sm">
        Escolha o Médico e sua especialidade.
      </span>

      <div className="w-[100%] gap-4 justify-between flex">
        {docs?.map((doc) => (
          <span
            key={doc.id}
            onClick={() => {
              setCurrentDoc(doc);
            }}
            className={
              currentDoc == doc
                ? `border-green-500 border-[3px] transition-all rounded-lg cursor-pointer`
                : `border-[3px] border-transparent transition-all rounded-lg cursor-pointer`
            }
          >
            <Doc
              name={doc.name}
              photoURL={doc.photoURL}
              specialty={doc.specialty}
              key={doc.id}
            />
          </span>
        ))}
      </div>
      <CalendarComponent
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
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
