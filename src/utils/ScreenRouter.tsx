import { useContext } from "react";
import { HomePageContent } from "../components/HomePage/HomePageContent";
import { AuthContext } from "../context/AuthContext";

function ScreenRouter() {
  const { isADM } = useContext(AuthContext);
  return <>{isADM ? <div>CU</div> : <HomePageContent></HomePageContent>}</>;
}

export default ScreenRouter;
