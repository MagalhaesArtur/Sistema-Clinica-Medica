import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { CircularProgress } from "@mui/material";

export interface DateProps {
  dayOfMonth: number;
  monthIndex: number;
  weekdayIndex: number;
}
export interface CurrentWeekProps extends Array<DateProps> {}

export interface RemainingWeeksProps extends Array<CurrentWeekProps> {}
export interface teste {
  remainingWeeks: RemainingWeeksProps | [];
  getDayOfWeekName: Function;
  getMonthName: Function;
  setIsLoading: Function;
  isLoading: boolean;
}

export const CalendarComponent = () => {
  const [remainingMonths, setRemainingMonths] = useState<Array<number>>();
  const [remainingDays, setRemainingDays] = useState<Array<number>>();
  const [currentWeek, setCurrentWeek] = useState<CurrentWeekProps>();
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
        <CircularProgress size={30} className="!text-white" />
      ) : (
        <CircularProgress size={30} className="!invisible" />
      )}

      <Pagination
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getMonthName={getMonthName}
        remainingWeeks={remainingWeeks || aux}
        getDayOfWeekName={getDayOfWeekName}
      />
    </div>
  );
};
