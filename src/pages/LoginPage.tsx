import LoginScreen from "../components/LoginScreen";
import { LinearProgress } from "@mui/material";
function LoginPage() {
  return (
    <nav className="min-w-[100vw] min-h-[100vh] flex-col flex items-center justify-center bg-[#130f40]">
      <LoginScreen />
    </nav>
  );
}

export default LoginPage;
