import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AdminSideBar from "../NavBar/AdminSideBar";
import UserSideBar from "../NavBar/UserSideBar";

function AdminHomePage() {
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

export default AdminHomePage;
