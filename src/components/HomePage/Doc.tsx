import { Doctor } from "../../utils/interfaces";

export const Doc = ({ name, photoURL, specialty }: Doctor) => {
  return (
    <div className="p-4 bg-[#143789] rounded-lg flex  gap-4 justify-between">
      <img
        src={photoURL}
        className=" w-10 h-14 rounded-lg object-cover"
        alt="doc"
      />
      <div className="text-white font-bold text-lg">
        <div>{name}</div>
        <span className="text-slate-400 text-sm">{specialty}</span>
      </div>
    </div>
  );
};
