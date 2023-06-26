import { useEffect, useState } from "react";
import { Doctor } from "../../utils/interfaces";
import { Doc } from "./Doc";
import { GetDocs } from "../../services/api";
import { Calendar } from "@phosphor-icons/react";
import { CalendarComponent } from "./CalendarComponent";

export const ScheduleConsulta = () => {
  const [docs, setDocs] = useState<Array<Doctor>>();
  const [currentDoc, setCurrentDoc] = useState<Doctor | null>(null);

  useEffect(() => {
    const getDoc = async () => {
      const res = await GetDocs();
      setDocs(res.data);
    };
    getDoc();
  }, []);

  return (
    <div className="w-full rounded-lg p-4  flex flex-col gap-4 bg-[#2f60d1]">
      <div className="text-white text-lg font-semibold ">Marcar Consulta</div>

      <span className="text-slate-300 text-sm">
        Escolha o Médico e sua especialidade.
      </span>

      <div className="w-[90%] gap-4 justify-between flex">
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
      <CalendarComponent />
    </div>
  );
};
