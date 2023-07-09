import { useContext } from "react";
import { HomePageContent } from "../components/UserHomePage/HomePageContent";
import { AuthContext } from "../context/AuthContext";
import { Users } from "../components/AdminHomePage/Users";
import { Navigate } from "react-router-dom";

function ScreenRouter() {
  const { isADM } = useContext(AuthContext);
  const isADMAux = localStorage.getItem("@Auth:isADM");
  return (
    <>
      {isADM || isADMAux ? (
        <Navigate to="/ADMPainel/users" />
      ) : (
        <HomePageContent />
      )}
    </>
  );
}

export default ScreenRouter;
