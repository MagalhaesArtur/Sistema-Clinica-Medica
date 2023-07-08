import { Doctor } from "../../utils/interfaces";

export const Doc = ({ name, photoURL, specialty }: Doctor) => {
  return (
    <div
      className="p-4 w-full h-[104px]
    bg-[#143789] rounded-lg flex items-center  gap-4 justify-around telaMedia:justify-between"
    >
      <img
        src={photoURL}
        className=" w-14 telaMedia:w-10 telaMedia:h-14 h-20  rounded-lg object-cover"
        alt="doc"
      />
      <div className="text-white w-1/2 font-bold  text-lg">
        <div>{name}</div>
        <span className="text-slate-400  text-sm">{specialty}</span>
      </div>
    </div>
  );
};
