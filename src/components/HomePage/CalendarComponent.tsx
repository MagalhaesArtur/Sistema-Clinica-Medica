import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { CircularProgress } from "@mui/material";
import { TimeComponent } from "./TimeComponent";

export interface DateProps {
  dayOfMonth: number;
  monthIndex: number;
  weekdayIndex: number;
}
export interface CurrentWeekProps extends Array<DateProps> {}

export interface RemainingWeeksProps extends Array<CurrentWeekProps> {}
export interface PaginationProps {
  remainingWeeks: RemainingWeeksProps | [];
  getDayOfWeekName: Function;
  getMonthName: Function;
  setIsLoading: Function;
  isLoading: boolean;
  setCurrentAppointmentDay: Function;
  setCurrentAppointmentMonth: Function;
}

export interface TimeCompProps {
  time: string;
  isLoading: boolean;
  setIsLoading: Function;
  setCurrentTime: Function;
  currentTime: string;
}

interface CalendarComponentProps {
  currentAppointmentDay: string;
  currentAppointmentMonth?: number;
  currentYear?: string;
  setCurrentAppointmentDay: Function;
  setCurrentAppointmentMonth: Function;
  currentTime: string;
  setCurrentTime: Function;
  handleCreateConsultaButton: Function;
}

export const CalendarComponent = ({
  currentAppointmentDay,
  currentAppointmentMonth,
  currentTime,
  setCurrentTime,
  currentYear,
  setCurrentAppointmentDay,
  handleCreateConsultaButton,
  setCurrentAppointmentMonth,
}: CalendarComponentProps) => {
  const [remainingMonths, setRemainingMonths] = useState<Array<number>>();
  const [remainingDays, setRemainingDays] = useState<Array<number>>();
  const [currentWeek, setCurrentWeek] = useState<
    CurrentWeekProps | undefined
  >();
  const [remainingWeeks, setRemainingWeeks] = useState<RemainingWeeksProps>();
  const [isLoading, setIsLoading] = useState(false);

  function getAllWeeksUntilEndOfYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const endOfYear = new Date(currentYear, 11, 31); // Último dia do ano
    const weeks = [];
    let weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // Início da semana atual

    while (weekStartDate < endOfYear) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStartDate);
        day.setDate(weekStartDate.getDate() + i);

        const weekdayIndex = day.getDay(); // Índice do dia da semana (0 - 6)
        const monthIndex = day.getMonth(); // Índice do mês (0 - 11)
        const dayOfMonth = day.getDate(); // Dia do mês

        week.push({
          weekdayIndex,
          monthIndex,
          dayOfMonth,
        });
      }

      weeks.push(week);
      weekStartDate.setDate(weekStartDate.getDate() + 7); // Próxima semana
    }

    setRemainingWeeks(weeks);
  }

  const getRemainingMonths = (month: number) => {
    let aux = month;
    const listAux = [];
    for (aux; aux < 13; aux++) {
      listAux.push(aux);
    }
    setRemainingMonths(listAux);
  };

  function getCurrentWeek() {
    const currentDate = new Date();
    const currentWeekday = currentDate.getDay(); // Índice do dia da semana atual (0 - 6)
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - currentWeekday + i);

      const weekdayIndex = day.getDay(); // Índice do dia da semana (0 - 6)
      const monthIndex = day.getMonth(); // Índice do mês (0 - 11)
      const dayOfMonth = day.getDate(); // Dia do mês

      week.push({
        weekdayIndex,
        monthIndex,
        dayOfMonth,
      });
    }

    setCurrentWeek(week);
  }

  function diasNoMes(mes: number, ano: number) {
    var data = new Date(ano, mes + 1, 0);
    return data.getDate();
  }

  const appointmentTimes = {
    morning: [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
    ],
    afternoon: [
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
  };

  const getRemainingDays = (day: number, mes: number, ano: number) => {
    let aux = day;
    const listAux = [];
    for (aux; aux <= diasNoMes(mes, ano); aux++) {
      listAux.push(aux);
    }
    setRemainingDays(listAux);
  };

  function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("pt-BR", {
      month: "long",
    });
  }

  function getDayOfWeekName(weekdayIndex: number) {
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return weekdays[weekdayIndex];
  }

  useEffect(() => {
    const rawDateAux = new Date();
    getRemainingMonths(rawDateAux.getMonth() + 1);
    getRemainingDays(
      rawDateAux.getDate(),
      rawDateAux.getMonth(),
      rawDateAux.getFullYear()
    );
    getCurrentWeek();
    getAllWeeksUntilEndOfYear();
  }, []);

  const aux: never[] = [];

  return (
    <div className=" p-4 w-full items-end relative bg-[#143789] rounded-lg flex flex-col  gap-4 justify-between">
      {isLoading ? (
        <CircularProgress size={25} className="!text-white" />
      ) : (
        <CircularProgress size={25} className="!invisible" />
      )}

      <Pagination
        setCurrentAppointmentDay={setCurrentAppointmentDay}
        setCurrentAppointmentMonth={setCurrentAppointmentMonth}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getMonthName={getMonthName}
        remainingWeeks={remainingWeeks || aux}
        getDayOfWeekName={getDayOfWeekName}
      />
      <div className="flex flex-col  w-full p-4 justify-between  gap-2">
        <span className="text-slate-300 font-bold text-2xl">
          Selecione um horário
        </span>
        <div className="telaMedia:flex-row telaGrande:flex-nowrap flex-wrap flex   w-full py-4 justify-start  telaMedia:justify-start gap-5 telaMedia:gap-5">
          {appointmentTimes.morning.map((time) => (
            <TimeComponent
              currentTime={currentTime}
              key={time}
              isLoading={isLoading}
              time={time}
              setIsLoading={setIsLoading}
              setCurrentTime={setCurrentTime}
            />
          ))}
        </div>
      </div>

      {currentAppointmentDay != "" || currentAppointmentMonth != null ? (
        <div className="w-full items-center flex justify-between p-2 bg-[#2f60d1] rounded-xl">
          <span className="text-green-400  font-bold text-lg">
            {currentAppointmentDay} de {""}
            {currentAppointmentMonth == null
              ? null
              : getMonthName(currentAppointmentMonth)}
            {currentTime ? ", " : null} {currentYear}
            <span className="text-slate-300">{currentTime}</span>
          </span>
          <button
            onClick={() => {
              handleCreateConsultaButton();
            }}
            disabled={isLoading}
            className={`p-4 transition-all border-2 border-transparent cursor-pointer hover:border-green-400 bg-[#143789] rounded-3xl text-white font-bold ${
              isLoading ? "!cursor-not-allowed hover:border-transparent" : null
            } `}
          >
            Marcar
          </button>
        </div>
      ) : null}
    </div>
  );
};
