import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Sidebar from "../components/NavBar/SideBar";
import { Outlet } from "react-router-dom";

function UserHomePage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-w-[100vw] min-h-screen flex bg-[#130f40]">
      <section className="min-h-screen">
        <Sidebar />
      </section>
      {/* <NavBar isLoading={isLoading} setLoading={setIsLoading} />; */}
      <Outlet />
    </div>
  );
}

export default UserHomePage;
