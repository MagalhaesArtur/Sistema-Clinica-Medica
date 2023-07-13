import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./main.css";
import LoginPage from "./pages/LoginPage.tsx";
import SingUpPage from "./pages/SingUpPage.tsx";
import UserHomePage from "./pages/UserHomePage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RequireAuth } from "./context/RequireAuth.tsx";
import ScreenRouter from "./utils/ScreenRouter.tsx";
import { RequireAdminAuth } from "./context/RequireAdminAuth.tsx";
import AdminHomePage from "./components/AdminHomePage/AdminHomePage.tsx";
import { AdminConsultas } from "./components/AdminHomePage/AdminConsultas.tsx";
import { Users } from "./components/AdminHomePage/Users.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<Navigate to={"/login"} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SingUpPage />} />

          <Route
            path="/home"
            element={
              <RequireAuth>
                <UserHomePage />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<ScreenRouter />}></Route>
          </Route>

          <Route
            path="/ADMPainel"
            element={
              <RequireAdminAuth>
                <AdminHomePage />
              </RequireAdminAuth>
            }
          >
            <Route
              path="/ADMPainel/consultas"
              element={<AdminConsultas />}
            ></Route>
            <Route path="/ADMPainel/users" element={<Users />}></Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </AuthProvider>
);
