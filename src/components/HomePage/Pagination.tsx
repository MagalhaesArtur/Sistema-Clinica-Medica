import { useEffect, useState } from "react";
import { RemainingWeeksProps, PaginationProps } from "./CalendarComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Pagination({
  remainingWeeks,
  getDayOfWeekName,
  getMonthName,
  setIsLoading,
  isLoading,
  setCurrentAppointmentDay,
  setCurrentAppointmentMonth,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDay, setCurrentDay] = useState(-1);

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const weeksPerPage = 1; // Número de dias por página
  const startIndex = currentPage * weeksPerPage;
  const endIndex = startIndex + weeksPerPage;
  const allWeeks = remainingWeeks; // Função que retorna todas as semanas até o fim do ano (exceto a última semana)
  let [currentWeeks, setCurrentWeeks] = useState<RemainingWeeksProps>(
    remainingWeeks.slice(startIndex, endIndex)
  );

  // Função para calcular o número total de páginas
  const totalPages = Math.ceil(allWeeks.length / weeksPerPage);

  useEffect(() => {
    setCurrentWeeks(remainingWeeks.slice(startIndex, endIndex));
    if (
      remainingWeeks.slice(startIndex, endIndex)?.length != 0 &&
      remainingWeeks.slice(startIndex, endIndex)
    ) {
      setCurrentMonth(
        remainingWeeks.slice(startIndex, endIndex)[0][0].monthIndex
      );
    }
  }, [remainingWeeks, currentPage]);

  // Função para exibir as semanas da página atual
  const renderWeeks = () => {
    return currentWeeks?.map((week, index) => (
      <div className="flex gap-8 mx-4 flex-col " key={index}>
        <h1 className="text-slate-300 font-bold text-2xl">
          {getMonthName(currentMonth).replace(
            getMonthName(currentMonth)[0],
            getMonthName(currentMonth)[0].toLocaleUpperCase()
          )}
        </h1>
        <div className="w-full text-white  gap-3 flex justify-end">
          <button
            className={`transition-all ${
              currentPage != 0 && !isLoading
                ? "hover:text-green-400"
                : "text-slate-500 cursor-not-allowed"
            } `}
            onClick={goToPreviousPage}
            disabled={currentPage === 0 || isLoading}
          >
            <ArrowBackIcon />
          </button>
          <button
            className={`transition-all ${
              !(currentPage === totalPages - 1) && !isLoading
                ? "hover:text-green-400"
                : "text-slate-500 cursor-not-allowed"
            } `}
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1 || isLoading}
          >
            <ArrowForwardIcon />
          </button>
        </div>
        <div className="flex justify-between ">
          {week.map((day, dayIndex) => (
            <button
              key={dayIndex}
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);

                setCurrentDay(dayIndex);
                setCurrentAppointmentDay(day.dayOfMonth);
                setCurrentAppointmentMonth(day.monthIndex);

                setCurrentMonth(day.monthIndex);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }}
              className={`flex  justify-center sm:w-10 md:w-14 lg:w-20 items-center p-3 rounded-3xl bg-[#0e2968] cursor-pointer ${
                isLoading ? "!cursor-not-allowed" : null
              } border-2 border-transparent flex-col gap-4  transition-all ${
                currentDay == dayIndex ? "!border-green-400" : null
              }`}
            >
              <span className="text-slate-400 text-lg font-semibold">
                {getDayOfWeekName(day.weekdayIndex)}
              </span>
              <span className={`text-white text-lg font-bold `}>
                {day.dayOfMonth}
              </span>
            </button>
          ))}
        </div>
      </div>
    ));
  };

  // Função para navegar para a página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Função para navegar para a próxima página
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={`w-full  `}>
      <div>{renderWeeks()}</div>
    </div>
  );
}

export default Pagination;
