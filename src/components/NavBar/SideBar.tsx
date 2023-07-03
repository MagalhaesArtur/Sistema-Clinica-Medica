import { IconButton } from "@mui/material";
import { useState } from "react";
import "./styles.css";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { NavLink } from "react-router-dom";

import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";

function Sidebar() {
  const [currentFood, setCurrentFood] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const foods = [
    { name: "Home", element: <HomeIcon />, path: "/home" },
    { name: "Agendar", element: <EventNoteIcon />, path: "/consultas" },
    { name: "Histórico", element: <HistoryIcon />, path: "/history" },
  ];

  return (
    <aside
      id="sidebarTransition"
      className={`bg-[#143789] z-10  h-full  ${
        isSidebarOpen ? "w-72" : "w-32"
      } py-8 px-0 overflow-hidden flex flex-col text-white items-start justify-center `}
    >
      <IconButton
        id="menuButton"
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
        className="hover:cursor-pointer flex  !mx-auto  "
        size="large"
        edge="start"
        sx={{ color: "#fff" }}
        aria-label="logo"
      >
        <MedicalInformationIcon fontSize="large" />
      </IconButton>
      <nav
        id="navItens"
        className=" w-full flex flex-col items-center justify-center h-full"
      >
        <ul
          id="navItens"
          className="flex transition-all gap-3 mt-4 justify-center items-center flex-col h-full"
        >
          {foods.map((food) => (
            <li
              onClick={() => {
                setCurrentFood(food.name);
              }}
              key={food.name}
            >
              <div className="flex transition-all  relative gap-3 mt-4 h-full">
                <NavLink
                  onClick={() => {
                    // document.title = ` Food Commerce  ${
                    //   food.name != "Hambúrgueres" ? "| " + food.name : ""
                    // }
                    //     `;
                  }}
                  to={food.path}
                  id={food.name == currentFood ? "active" : "item"}
                  className={`  p-3 transition-all rounded-lg !flex flex-col !justify-center !items-center gap-4 ${
                    currentFood == food.name ? "bg-[#526ba3]" : null
                  }`}
                >
                  <span
                    className={`${
                      food.name == currentFood
                        ? "!text-white"
                        : "text-slate-400"
                    } !`}
                  >
                    {food.element}
                  </span>
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
