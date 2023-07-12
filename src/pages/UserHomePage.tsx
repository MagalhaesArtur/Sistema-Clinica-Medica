import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import UserSideBar from "../components/NavBar/UserSideBar";
import AdminSideBar from "../components/NavBar/AdminSideBar";

function UserHomePage() {
  const { isADM } = useContext(AuthContext);
  const isADMAux = localStorage.getItem("@Auth:isADM");

  return (
    <div className="max-w-[100vw]  min-h-screen flex bg-[#130f40]">
      {isADM || isADMAux ? (
        <>
          <section className="min-h-screen">
            <AdminSideBar />
          </section>
        </>
      ) : (
        <section className="min-h-screen">
          <UserSideBar />
        </section>
      )}

      <Outlet />
    </div>
  );
}

export default UserHomePage;
