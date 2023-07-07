import { useEffect, useState } from "react";
import Sidebar from "../components/NavBar/SideBar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function UserHomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isADM } = useContext(AuthContext);

  useEffect(() => {
    console.log(isADM);
  }, []);

  return (
    <div className="max-w-[100vw]  min-h-screen flex bg-[#130f40]">
      {isADM ? (
        <></>
      ) : (
        <section className="min-h-screen">
          <Sidebar />
        </section>
      )}
      <Outlet />
    </div>
  );
}

export default UserHomePage;
