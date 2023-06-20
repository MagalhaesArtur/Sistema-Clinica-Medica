import { useEffect, useState } from "react";
import { UserAuthProps } from "../../utils/interfaces";
import { Consultas } from "./Consultas";

export const HomePageContent = () => {
  const [user, setUser] = useState<UserAuthProps>();
  useEffect(() => {
    const user: UserAuthProps = JSON.parse(
      localStorage.getItem("@Auth:user") || "{}"
    );
    setUser(user);
  }, []);

  return (
    <section className="w-full flex ml-10 flex-col items-center justify-between  p-4">
      <div className="w-full mt-10 text-2xl font-bold">
        <span className="text-slate-200">Bem vindo, </span>
        <span className="text-[#36bd42]">{user?.username}!</span>
      </div>
      <div className="w-full mt-20 h-full ">
        <div>
          <Consultas />
        </div>
        <div></div>
      </div>
    </section>
  );
};
