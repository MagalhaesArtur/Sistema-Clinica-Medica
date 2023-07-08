import { TimeCompProps } from "./CalendarComponent";

export const TimeComponent = ({
  time,
  isLoading,
  setCurrentTime,
  setIsLoading,
  currentTime,
}: TimeCompProps) => {
  return (
    <button
      onClick={() => {
        setIsLoading(true);

        setCurrentTime(time);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }}
      disabled={isLoading}
      className={`flex telaMedia:w-24 w-20 justify-center  items-center p-3 rounded-3xl bg-[#0e2968] cursor-pointer ${
        isLoading ? "!cursor-not-allowed" : null
      } border-2 border-transparent flex-col gap-4  transition-all ${
        currentTime == time ? "!border-green-400" : null
      }`}
    >
      <span className="text-white text-lg font-semibold">{time}</span>
    </button>
  );
};
