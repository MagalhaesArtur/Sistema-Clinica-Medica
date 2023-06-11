import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";

function UserHomePage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <NavBar isLoading={isLoading} />;
}

export default UserHomePage;
