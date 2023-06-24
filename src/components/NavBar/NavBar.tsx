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
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

interface navProps {
  isLoading: boolean;
  setLoading: Function;
}

function NavBar({ isLoading, setLoading }: navProps) {
  const [isLogout, setIsLogout] = useState(false);

  let navigate = useNavigate();
  const { singOut } = useContext(AuthContext);

  function handleLogoutClick() {
    setLoading(true);
    setIsLogout(true);
    setTimeout(() => {
      setIsLogout(false);
      singOut();
      navigate("/login");
    }, 1000);
  }

  return (
    <AppBar position="static" className="!bg-[#143789]">
      <Toolbar id="toolbar">
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <MedicalInformationIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          className="!flex !items-center !justify-start !ml-3"
          sx={{ flexGrow: 1, height: 75 }}
        >
          <span className="font-bold font-sans">MedHub</span>
        </Typography>
        <Stack direction="row" spacing={2}>
          <button
            onClick={handleLogoutClick}
            className="flex justify-between hover:bg-[#c60a0a] p-2 rounded-xl transition-all border-[#c60a0a] border-[1px]"
            color="inherit"
          >
            LOGOUT
            <LogoutIcon className="ml-3" />
          </button>
        </Stack>
      </Toolbar>
      {isLoading ? (
        <LinearProgress
          color={isLogout ? `error` : `success`}
          variant="indeterminate"
        />
      ) : null}
    </AppBar>
  );
}

export default NavBar;
