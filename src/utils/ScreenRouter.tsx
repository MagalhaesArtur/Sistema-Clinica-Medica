import { useContext } from "react";
import { HomePageContent } from "../components/UserHomePage/HomePageContent";
import { AuthContext } from "../context/AuthContext";
import { AdminHomePage } from "../components/AdminHomePage/AdminHomePage";

function ScreenRouter() {
  const { isADM } = useContext(AuthContext);
  const isADMAux = localStorage.getItem("@Auth:isADM");
  return <>{isADM || isADMAux ? <AdminHomePage /> : <HomePageContent />}</>;
}

export default ScreenRouter;
