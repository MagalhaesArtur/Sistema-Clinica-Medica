import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface navProps {
  isLoading: boolean;
}

function NavBar({ isLoading }: navProps) {
  let navigate = useNavigate();
  const { singOut } = useContext(AuthContext);

  function handleLogoutClick() {
    singOut();
    navigate("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <MedicalInformationIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TESTE
        </Typography>
        <Stack direction="row" spacing={2}>
          <button
            onClick={handleLogoutClick}
            className="flex justify-between hover:bg-[#c60a0a] p-2 rounded-xl transition-all"
            color="inherit"
          >
            LOGOUT
            <LogoutIcon className="ml-3" />
          </button>
        </Stack>
      </Toolbar>
      {isLoading ? <LinearProgress variant="indeterminate" /> : null}
    </AppBar>
  );
}

export default NavBar;
